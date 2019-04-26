let config = {
  type: Phaser.AUTO, // phaser auto decides how to render
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, // width
  height: window.innerHEight || document.documentElement.clientHeight || document.body.clientHeight, // height
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
