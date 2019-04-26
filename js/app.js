const ActionCable = require('actioncable')


const URL = 'http://localhost:3000/ships';
const API_WEBSOCK_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};
// start cable
CABLE = ActionCable.createConsumer(API_WEBSOCK_ROOT)


let activePlayerId;
let activePlayers = []

document.addEventListener("DOMContentLoaded", () => {

  const play = document.getElementById('submit')

  play.addEventListener('click', createShip)

  function hideModal() {
    $('.tiny.modal')
      .modal('hide')
    ;
  }


  function createShip(e) {
    let name = document.getElementById('input-name')
    let email = document.getElementById('input-email')

    e.preventDefault()

    let obj = {ship : {
      name: name.value,
      email: email.value
    }}

    fetch(URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(ship => {
      activePlayerId = ship.data.id
      connect(activePlayerId)
      hideModal()

      // create player
      // game.scene.scenes[0].createPlayer(ship.data.attributes)
    })
    .catch((errors) => {
      $(".field").addClass("error")
    })
  }

  connect = function(id) {
    CABLE.subscriptions.create({channel: 'MatchChannel', shipId: id}, {
      connected: function (data) {;
        console.log("successfully connected")
        // game = new Phaser.Game(config) // create game object and pass the above configs
      },
      disconnected: function (e) {
        CABLE.subscriptions.subscriptions[0].send({action: "disconnect", ship_data: "hello"})
      },
      received: function (data) {
        if(data["bullet_data"]) {
          game.scene.scenes[0].renderShots(data["bullet_data"])
        } else if(data["c_data"]) {
          game.scene.scenes[0].movePlayers(data["c_data"])
        } else {
          activePlayers = data.data
          game.scene.scenes[0].renderPlayers(activePlayers, activePlayerId)
        }

      }
    });
  }