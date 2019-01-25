class SceneMain extends Phaser.Scene {
    constructor() {
      super({key: "SceneMain"})
      this.bulletTimer = 0
    }


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
      this.load.image('shot', 'assets/shot.png')
      this.load.image('baddie', 'assets/baddie.png')
      'black_hole'.setSize
      // load bullets
      this.load.image('bullet', 'assets/bullet.png');


    }

    random(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    createPlayer(attributes) {
      const {id,x,y,name,color,health, angle} = attributes
      // create player
      this.text = this.add.text(x-50, y-50, name, {font: 'normal 16px Arial'})
      this.player = this.physics.add.sprite(x, y, 'ship')
      this.player.id = id
      this.player.setScale(0.2)
      this.player.alive = true
      this.player.name = name
      this.player.health = 1000
      this.player.fixedToCamera = true
      // make the camera follow the player
      this.cameras.main.startFollow(this.player);
      this.player.angle = angle
    }

    createBaddies(attributes) {
      // create a group for foreign players
      const {id,x,y,name,color,health, angle} = attributes
      const newPlayer = this.physics.add.sprite(x, y, 'baddie')
      newPlayer.name = name
      newPlayer.id = id
      newPlayer.angle = angle
      newPlayer.health = health
      newPlayer.alive = true
      newPlayer.setScale(0.25)
      // newPlayer.setScale(0.1)

      this.baddies.add(newPlayer)
    }

    addPlayers(players, activePlayerId) {
      console.log(players)
      players.forEach(player => {
        if (parseInt(player.id) === parseInt(activePlayerId)) {
          this.createPlayer(player.attributes)
        } else {
          this.createBaddies(player.attributes)
          console.log("created baddies")

          // if (players.length > 1) baddies.getChildren().forEach( (ship)=> {
        //   //   if (parseInt(player.id) === parseInt(ship.id)) {
        //   //     ship.();
        //   //   } else {
        //   //     this.createOtherPlayer(player.attributes)
        //   //   }
        //   // })
        // }
      }
    })
    }

    updatePlayers(players, activePlayerId) {
      console.log('in update')
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
            } else {
              this.createBaddies(player.attributes)
            }
          }
        }
      })
      if (players.length <= baddiesSet.size) {
        baddiesSet.entries.forEach(baddie => {
          console.log(baddie)
          let player = players.find(player => parseInt(player.id) === parseInt(baddie.id))
          if (!player) {
            console.log('destroying', baddie.id)
            baddie.destroy()
          }
        })
      }
    }

    renderPlayers(players, activePlayerId) {
      // checking if current player exists
      console.log('inrender')
      if (this.player === undefined) {
        console.log('adding')
        this.addPlayers(players, activePlayerId)
      } else {
        // render updates of current players
        this.updatePlayers(players, activePlayerId)
      }



    }


    create(){
      // create enemies
      this.baddies = this.physics.add.group()



      // create bullets
      this.bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize:10000
      })
      this.rect = new Phaser.Geom.Rectangle(0, 0, 5000, 5000);


      this.cameras.main.setViewport(0, 0, 1000, 800)
      this.cameras.main.setBounds(0, 0, 5000, 5000).setName('main');



      //create score
      this.scoreBox = this.add.text(this.cameras.main.scrollX, this.cameras.main.scrollY, "Scores")
      this.score = this.add.text(this.cameras.main.scrollX, this.cameras.main.scrollY + 30, `Name: Points`)

      /*this.physics.add.overlap(this.player, this.bullets, () => {
        this.player.setVisible(false).setActive(false)
        this.bullets.clear(true)
      })*/


      // // // ship movement with keys
      // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      // this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
      // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      // this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      //
      this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
      this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

      // // ship movment with thrust

      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

      this.maxSpeed = 400
      this.moveSpeed = 400
      // this.player.body.maxVelocity.setTo(this.maxSpeed, this.maxSpeed);

      this.createStarfield()

    }

    update(){

      if (this.player) {

        // // ship mvmnt with thrust
        // WSAD
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
            let bulletSpacing = 250
            let bullet = this.bullets.get()
            if(bullet) {
              bullet.x = this.player.x
              bullet.y = this.player.y
              bullet.setActive(true);
              bullet.setVisible(true);
              bullet.angle = this.player.angle;
              this.physics.velocityFromAngle(bullet.angle, bulletSpeed, bullet.body.velocity);
              this.bulletTimer = this.time.now + bulletSpacing;
            }
          }
        }
      } // end if this.player




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
      this.scoreBox.x = this.cameras.main.scrollX + 40
      this.scoreBox.y = this.cameras.main.scrollY + 40
      this.score.x = this.cameras.main.scrollX + 40
      this.score.y = this.cameras.main.scrollY+ 70
      object.x = object.x + distance * Math.cos(object.rotation);
      object.y = object.y + distance * Math.sin(object.rotation);
      this.text.x = object.x - 50
      this.text.y = object.y - 50
      const {x, y, id, angle} = object
      CABLE.subscriptions.subscriptions[0].send({action: "move", data: {x, y, id, angle}})
    }

}
