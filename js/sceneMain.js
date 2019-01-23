class SceneMain extends Phaser.Scene {
    constructor() {
      super({key: "SceneMain"})
    }


    preload(){
      // load spaceship
      this.load.image('ship', 'assets/spaceship.svg')
      this.load.image('smallStar', 'assets/smallstar.png');
      this.load.image('sun', 'assets/sun.png');
      this.load.image('smallestStar', 'assets/smallestStar.png');
      this.load.image('moon', 'assets/moons.png');
      this.load.image('shot', 'assets/shot.png')
    }

    create(){
      this.player = this.physics.add.sprite(this.sys.game.config.width * 0.5, this.sys.game.config.height * 0.5, 'ship')
      this.player.setScale(0.1)

      this.bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize:10
      })

      // this.player.onWorldBounds = true

      this.player.fixedToCamera = true
      this.cameras.main.setBounds(0, 0, 5000, 5000).setName('main');
      this.cameras.main.startFollow(this.player);
   // make the camera follow the player






      // // ship movement with keys
      this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
      this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
      // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
      this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
      //
      this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
      // this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
      this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
      this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

      // // ship movment with thrust

      this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

      this.maxSpeed = 400
      this.moveSpeed = 400
      this.player.angle = 0
      // this.player.body.maxVelocity.setTo(this.maxSpeed, this.maxSpeed);


      this.createStarfield()
    }

    update(){
      // WSAD
      // if (this.keyW.isDown || this.keyUp.isDown) {
      //   this.player.body.velocity.y = -this.moveSpeed
      // } else if (this.keyS.isDown || this.keyDown.isDown) {
      //   this.player.body.velocity.y = this.moveSpeed
      // } else {
      //   this.player.body.velocity.y = 0
      // }
      //
      // if (this.keyA.isDown || this.keyLeft.isDown) {
      //   this.player.body.velocity.x = -this.moveSpeed
      // } else if (this.keyD.isDown || this.keyRight.isDown) {
      //   this.player.body.velocity.x = this.moveSpeed
      // } else {
      //   this.player.body.velocity.x = 0
      // }

      // // ship mvmnt with thrust

      // WSAD
      if (this.keyW.isDown || this.keyUp.isDown) {
        // this.player.body.acceleration.y = -this.moveSpeed
        this.move(this.player,10)
      }
      // else if (this.keyS.isDown || this.keyDown.isDown) {
      //   // this.player.body.acceleration.y = this.moveSpeed
      //   this.move(this.player,-10)
      // }
      else {
        this.player.body.acceleration.y = 0
      }

      if (this.keyA.isDown || this.keyLeft.isDown) {
        this.player.angle -= 8
      }
      else if (this.keyD.isDown || this.keyRight.isDown) {
        this.player.angle += 8
      }
      else {
        this.player.angle += 0
      }

      var bullet = this.bullets.get(this.player.x, this.player.y);





    }

    createStarfield() {
      let group = this.add.group({ key: 'smallStar', frameQuantity: 10});
      group.createMultiple({ key: 'smallestStar', frameQuantity: 400 });
      group.createMultiple({key: 'sun', frameQuantity: 3});
      group.createMultiple({key: 'moon', frameQuantity: 4});

      let rect = new Phaser.Geom.Rectangle(0, 0, 3600, 3600);
      Phaser.Actions.RandomRectangle(group.getChildren(), rect);
      group.children.iterate(function (child, index) {
        let sf = Math.max(0.3, .4);
        if (child.texture.key === 'bigStar') {
          sf = 0.2;
        }
        child.setScrollFactor(sf);
      }, this);
    }

    move(object, distance) {
	    object.x = object.x + distance * Math.cos(object.rotation);
	    object.y = object.y + distance * Math.sin(object.rotation);
    }
}
