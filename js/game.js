let config = {
  type: Phaser.AUTO, // phaser auto decides how to render
  width: 1000, // width
  height: 800, // height
  parent: "phase",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {x:0, y:0}
    }
  },
  scene: [
    SceneMain
  ]
}

let game = new Phaser.Game(config) // create game object and pass the above configs
// console.log(game)
// // create scene
//
// function preload() {
//   // this.load.image('background', 'assets/background.png')
//
//   // load spaceship
//   this.load.image('ship', 'assets/spaceship.svg')
//   this.load.image('smallStar', 'assets/smallstar.png');
//   this.load.image('sun', 'assets/sun.png');
//   this.load.image('smallestStar', 'assets/smallestStar.png');
//   this.load.image('moon', 'assets/moons.png');
//
//
// }
//
// function create() {
//
//   // add spaceship
//
//   this.ship = this.physics.add.sprite(5000, this.sys.game.config.height/2, 'ship')
//   this.ship.setScale(0.2)
//
//   this.cameras.main.setBounds(0, 0, 10000, 600).setName('main')
//
//   this.input.on('pointermove', (pointer) => {
//     this.physics.accelerateToObject(this.ship, pointer, 300, 800, 800)
//
//   })
//
//   // create cursor
//   this.cursors = this.input.keyboard.createCursorKeys()
//
//   // this.ship.setMaxVelocity()
//
//
//   this.ship.setBounce(0,0)
//   // this.ship.setCollideWorldBounds(true)
//   this.ship.onWorldBounds = true
//
//
//   // this.createStarfield()
//
// }
//
// function update() {
//
//   console.log(this)
//   this.cameras.main.scrollX = this.ship.x - 400
//
//   if (this.cursors.right.isDown) {
//     this.ship.setAccelerationX(200)
//   }
//   if (this.cursors.left.isDown) {
//     this.ship.setAccelerationX(-200)
//   }
// }
//
// // game configs
//
//
// function createStarfield ()
// {
//     //  Starfield background
//
//     //  Note the scrollFactor values which give them their 'parallax' effect
//
//     var group = this.add.group({ key: 'smallStar', frameQuantity: 40});
//
//     group.createMultiple({ key: 'smallestStar', frameQuantity: 80 });
//
//     group.createMultiple({key: 'sun', frameQuantity: 2});
//
//     group.createMultiple({key: 'moon', frameQuantity: 2});
//
//
//     var rect = new Phaser.Geom.Rectangle(0, 0, 3200, 550);
//
//     Phaser.Actions.RandomRectangle(group.getChildren(), rect);
//
//     group.children.iterate(function (child, index) {
//
//         var sf = Math.max(0.3, Math.random());
//
//         if (child.texture.key === 'bigStar')
//         {
//             sf = 0.2;
//         }
//
//         child.setScrollFactor(sf);
//
//     }, this);
// }
//
//
//
//
// //---------------- NOTES
//
// // Scenes are conpartments where actions take place. A game can have MANY Scenes
// // PHASER 3 -> game can have multiple open scenes at once
// // - It's necessary to tell game what dimensions in pixels will be,
// // - A game has no set size.
// // - Phaser can use different rendering systems, as such setting type to Phase.Auto will tell phaser to render however it
//
//
// // -- THE SCENE LIFECYCLE
//
// // when a scene starts, init() is called, where we setup parameters for scene or game
// // preload phaser is next, phaser will load images and assets into memory before game launch
// // create method is executed following preload, this is where you create main entites for game
// // update method is ran while the game IS running.
// // - update is executed multiple times per second(game will try for 60 fps)
