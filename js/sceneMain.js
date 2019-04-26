class SceneMain extends Phaser.Scene {
    constructor() {
      super({key: "SceneMain"})
      this.bulletTimer = 0
      this.userLoc = {}
      this.gameStart = false

      this.bulletCollision = this.bulletCollision.bind(this)
      this.explode = this.explode.bind(this)
    }

    // -------------------- Loading Assets
    preload(){
      // load spaceship
      this.load.image('ship', 'assets/ship.png')
      // load space
      this.load.image('smallStar', 'assets/smallstar.png');
      this.load.image('sun', 'assets/sun.png');
      this.load.image('earth', 'assets/earth.png');
      this.load.image('black_hole', 'assets/black_hole.png');
      this.load.image('smallestStar', 'assets/smallestStar.png');
      this.load.image('moon', 'assets/moons.png');
      this.load.image('baddie', 'assets/baddie.png')
      'black_hole'.setSize
      // load bullets
      this.load.image('bullet', 'assets/bullet.png');
      this.load.image('shot', 'assets/shot.png');
      
      // load explosions...
      this.load.image('explode', 'assets/explode.png');
      this.load.image('smoke', 'assets/smoke.png')
      this.load.image('blue', 'assets/blue.webp')


    }

    random(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    createPlayer(attributes) {
      const {id,x,y,name,color,health, angle} = attributes
      // create player
      this.playerText = this.add.text(x-50, y-50, name, {font: 'normal 16px Arial'})
      this.player = this.physics.add.image(x, y, 'ship')
      this.player.id = id
      this.player.setScale(0.2)
      this.player.alive = true
      this.player.name = name
      this.player.health = 1000
      this.player.fixedToCamera = true
      this.player.kills = 0
      // make the camera follow the player
      this.cameras.main.startFollow(this.player);
      this.player.angle = angle
      
      // define start of game
      this.gameStart= true

      // collisions
   
    }

    createBaddies(attributes) {
      // create a group for foreign players
      const {id,x,y,name,color,health, angle} = attributes
      const newPlayer = this.physics.add.image(x, y, 'ship')
      const newText = this.add.text(x-50, y-50, name, {font: 'normal 16px Arial'})
      const newBullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize:10000
      })
      newBullets.id = id
      newText.id = id
      newPlayer.name = name
      newPlayer.id = id
      newPlayer.angle = angle
      newPlayer.health = health
      newPlayer.alive = true
      newPlayer.setScale(0.2)

      this.baddies.add(newPlayer)
      this.baddieTextGroup.add(newText)
      this.baddieBulletSet[id] = newBullets

      // collision between ENEMY bullets and USER
      this.physics.add.overlap(this.player, newBullets, this.bulletCollision)
    }

    bulletCollision(player, shot) {
      shot.destroy()
      player.setTint(0xff0000)
      setTimeout(() => player.setTint(0xffffff), 100)
      player.health -= 10

      if (player.health < 0 && this.player === player) {

        // console.log(this.emitter)
        
        this.explode(player.x, player.y)
        // e.setBlendMode(Phaser.BlendModes.ADD)
        player.alive = false
        // player.destroy()

        this.gameOver()
      } else if (player.health < 0) {
        this.explode(player.x, player.y)
        this.player.kills += 1
        this.score._text = `Kills: ${this.player.kills}`
        
        // delete player && name from game
        // player.destroy()
        let text = this.baddieTextGroup.children.entries.find(text => parseInt(text.id) === parseInt(player.id))
        this.baddieTextGroup.remove(text, true, true)

        if (this.baddies.children.size === 0) {
          this.champion()
        }
      }

    }


    gameOver() {
      this.add.text(this.cameras.main.scrollX + 400, this.cameras.main.scrollY + 100, 'GAME OVER', { fontSize: '32px', fill: '#fff'})
    }

    champion() {
      this.add.text(this.cameras.main.scrollX + 400, this.cameras.main.scrollY + 100, 'Champion!', { fontSize: '32px', fill: '#fff'})
    }
   
    addPlayers(players, activePlayerId) {
      players.forEach(player => {
        if (parseInt(player.id) === parseInt(activePlayerId)) {
          this.createPlayer(player.attributes)
        } else {
          this.createBaddies(player.attributes)
      }
    })
    }

    updatePlayers(players, activePlayerId) {
      let baddiesSet = this.baddies.children
      players.forEach(player => {
        if (parseInt(player.id) !== parseInt(activePlayerId)) {
          if(baddiesSet.size < 1) {
            // console.log("creating a newwww baddy")
            this.createBaddies(player.attributes)
          } else {
            let baddie = baddiesSet.entries.find(baddie => parseInt(baddie.id) === parseInt(player.id))
            if(baddie) {
              //console.log(`modifying x and y of baddie: ${baddie.id}`)
              baddie.x = player.attributes.x
              baddie.y = player.attributes.y
              baddie.angle = player.attributes.angle
              let baddieText = this.baddieTextGroup.children
              let text = baddieText.entries.find(text => parseInt(text.id) === parseInt(player.id))
              text.x = baddie.x - 50
              text.y = baddie.y - 50
            } else {
              this.createBaddies(player.attributes)
            }
          }
        }
      })
      if (players.length <= baddiesSet.size) {
        baddiesSet.entries.forEach(baddie => {
          let player = players.find(player => parseInt(player.id) === parseInt(baddie.id))
          if (!player) {
            this.baddies.remove(baddie, true, true)
            let baddieText = this.baddieTextGroup.children
            let text = baddieText.entries.find(text => parseInt(text.id) === parseInt(baddie.id))
            this.baddieTextGroup.remove(text, true, true)

          }
        })
      }
    }

    renderPlayers(players, activePlayerId) {
      if (this.player === undefined) {
        this.addPlayers(players, activePlayerId)
      } else {
        // render updates of current players
        this.updatePlayers(players, activePlayerId)
      }
    }

    renderShots(data) {
      const {x, y, id, angle} = data
      let ammo = this.baddieBulletSet[id]
      if(ammo) {
        let bullet = ammo.get()
        if(bullet) {
          const bulletSpeed = 2000
          const bulletSpacing = 100

          bullet.x = x
          bullet.y = y
          bullet.setActive(true);
          bullet.setVisible(true);
          bullet.angle = angle;

          this.bulletTimer = this.time.now + bulletSpacing;
          this.physics.velocityFromAngle(bullet.angle, bulletSpeed, bullet.body.velocity);
        }
      }
    }

    movePlayers(data) {
      const {x, y, id, angle} = data
      let baddiesSet = this.baddies.children
      let baddie = baddiesSet.entries.find(baddie => parseInt(baddie.id) === parseInt(data.id))
        if(baddie) {
          baddie.x = x
          baddie.y = y
          baddie.angle = angle
        }
      let baddieText = this.baddieTextGroup.children
      let text = baddieText.entries.find(text => parseInt(text.id) === parseInt(data.id))
      if(text) {
        text.x = x - 50
        text.y = y - 50
      }
    }

    
    explode(x, y) {
      // this.emitterRing.emitParticleAt(x, y)
      // this.emitterExplode.emitParticleAt(x, y)
      this.emitterBlue.emitParticleAt(x, y)
    }


    create(){
      // create enemies
      this.baddies = this.physics.add.group()
      this.baddieTextGroup = this.physics.add.group()
      this.baddieBulletSet = new Set()
    
      // create bullets
      this.bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize:10000
      })

      // // create explosion animations
      // this.emitterRing = this.add.particles('bullet').createEmitter({
      //   angle: { min: 0, max: 360, steps: 32 },
      //   lifespan: 1000,
      //   speed: 400,
      //   quantity: 32,
      //   scale: { start: 0.3, end: 0 },
      //   on: false
      // })

      // this.emitterExplode = this.add.particles('explode').createEmitter({
      //   lifespan: 200,
      //   scale: { start: 2, end: 0 },
      //   rotate: { start: 0, end: 180 },
      //   quantity: 1,

      //   on: false
      // });

      this.emitterBlue = this.add.particles('blue').createEmitter({
        angle: { min: 0, max: 360 },
        speed: 100,
        // gravityY: 200,
        lifespan: { min: 1000, max: 10000 },
        blendMode: 'ADD',
        quantity:10,
        on: false
      })

      // collision between USER bullets and Baddies
      this.physics.add.overlap(this.baddies, this.bullets, this.bulletCollision)

      this.rect = new Phaser.Geom.Rectangle(0, 0, 5000, 5000);


      this.cameras.main.setViewport(0, 0, window.innerWidth, window.innerHeight)
      this.cameras.main.setBounds(0, 0, 5000, 5000).setName('main');

      //create screen texts
      this.scoreBox = this.add.text(this.cameras.main.scrollX +10, this.cameras.main.scrollY +30, "Stats")
      this.score = this.add.text(this.cameras.main.scrollX +10, this.cameras.main.scrollY + 60, `Kills: `)
      this.health = this.add.text(this.cameras.main.scrollX +10, this.cameras.main.scrollY + 90, `Health: `)
      this.playerNumbers = this.add.text(this.cameras.main.scrollX + 10, this.cameras.main.scrollY + 120, `Players in Game: `)
      /*this.physics.add.overlap(this.player, this.bullets, () => {
        this.player.setVisible(false).setActive(false)
        this.bullets.clear(true)
      })*/

      this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
      this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

      // // ship movment with thrust

      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

      this.maxSpeed = 400
      this.moveSpeed = 400

      // this.defineCollisions()

      this.createStarfield()

    }

    update(){

      if (this.player) {
      
        if (this.keyUp.isDown) {
          // this.player.body.acceleration.y = -this.moveSpeed
          this.move(this.player,10)
        }
        else if (this.keyDown.isDown) {
          // this.player.body.acceleration.y = this.moveSpeed
          this.move(this.player,-5)
        }
        else {
          this.player.body.acceleration.y = 0
        }

        if (this.keyLeft.isDown) {
          this.player.angle -= 8
          this.move(this.player,0)
        }
        else if (this.keyRight.isDown) {
          this.player.angle += 8
          this.move(this.player, 0)
        }   
        else {
          this.player.angle += 0
        }

        if(this.keySpace.isDown) {
          if (this.time.now > this.bulletTimer) {
            let bulletSpeed = 1000
            let bulletSpacing = 100
            let bullet = this.bullets.get()
            if(bullet) {
              bullet.x = this.player.x
              bullet.y = this.player.y
              bullet.setActive(true);
              bullet.setVisible(true);    
              bullet.angle = this.player.angle;
              this.physics.velocityFromAngle(bullet.angle, bulletSpeed, bullet.body.velocity);
              this.bulletTimer = this.time.now + bulletSpacing;
              this.sendBullet(bullet, this.player.id)
            }
          }
        }

        this.health._text = `Health: ${this.player.health}`
        this.health.updateText()
        this.score.updateText()

        this.playerNumbers._text = `Players in Game: ${this.baddies.children.size}`
        this.playerNumbers.updateText()

        const {x, y, angle, id} = this.player

        this.userLoc = {x, y, angle, id}
        
      } 

      
    }

    sendLocation({x, y, angle, id}) {
      CABLE.subscriptions.subscriptions[0].send({action: "disconnect", c_data: {x, y, id, angle}})
    }

    sendBullet({x, y, angle}, id) {
      CABLE.subscriptions.subscriptions[0].send({action: "shoot", bullet_data: {x, y, id, angle}})
    }

    createStarfield() {
      let group = this.add.group({ key: 'smallStar', frameQuantity: 200});
      group.createMultiple({ key: 'smallestStar', frameQuantity: 600 });
      group.createMultiple({key: 'sun', frameQuantity: 12});
      group.createMultiple({key: 'moon', frameQuantity: 15});
      group.createMultiple({key: 'earth', frameQuantity: 3});
      group.createMultiple({key: 'black_hole', frameQuantity: 20});

      Phaser.Actions.RandomRectangle(group.getChildren(), this.rect);
      group.children.iterate(function (child, index) {
        let sf = Math.max(0.3, .4);
        if (child.texture.key === 'bigStar') {
          sf = 0.2;
        }
        child.setScrollFactor(sf);
      }, this);
    }

    move(object, distance) {
      this.scoreBox.x = this.cameras.main.scrollX + 10
      this.scoreBox.y = this.cameras.main.scrollY +30
      this.score.x = this.cameras.main.scrollX + 10
      this.score.y = this.cameras.main.scrollY + 60
      this.health.x = this.cameras.main.scrollX + 10
      this.health.y = this.cameras.main.scrollY + 90
      this.playerNumbers.x = this.cameras.main.scrollX + 10
      this.playerNumbers.y = this.cameras.main.scrollY+ 120
      object.x = object.x + distance * Math.cos(object.rotation);
      object.y = object.y + distance * Math.sin(object.rotation);
      this.playerText.x = object.x - 50
      this.playerText.y = object.y - 50
      const {x, y, id, angle} = object
      CABLE.subscriptions.subscriptions[0].send({action: "move", c_data: {x, y, id, angle}})
    }

}
