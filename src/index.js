// const PROXYURL = 'https://cors-anywhere.herokuapp.com/'
const URL = 'http://localhost:3000/ships';
const API_WEBSOCK_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};


document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.createElement("canvas");
  let node = document.getElementById("ships")
  let ctx = canvas.getContext("2d");
  let sx = 0
  let sy = 0
  canvas.className = "ui center aligned"
  canvas.width = 400;
  canvas.height = 400;

  // fetch(URL, {mode: 'no-cors'})
  //   .then(res => res.json())
  //   .then(ships => ships.forEach(ship => render(node, ship)))

function render(node, ship) {
  let li = document.createElement("li")
  li.innerText = ship.name
  node.append(li)
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        sy+= 10
        make_base(sx, sy)
    }
    else if (e.keyCode == '40') {
        sy-= 10
        make_base(sx, sy)
    }
    else if (e.keyCode == '37') {
       sx+= 10
        make_base(sx, sy)
    }
    else if (e.keyCode == '39') {
       sx-= 10
        make_base(sx, sy)
    }

}

  make_base(0,0);

  function make_base(sx, sy) {
    base_image = new Image();
    base_image.src = "assets/images/space.png";
    base_image.onload = function(){
      ctx.drawImage(base_image, sx, sy, 1640, 820);
    }
  }

  b.append(canvas);

  const shipForm = document.getElementById('new-ship-form')
  shipForm.addEventListener('submit', createShip)


  function createShip(e) {
    let name = document.getElementById('input-name')
    let color = document.getElementById('input-color')

    e.preventDefault()

    let obj = {ship : {
      name: name.value,
      color: color.value,
    }}

    fetch(URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(console.log)
    .then(window.matchSocket = new WebSocket(API_WEBSOCK_ROOT))
    .catch(() => console.log("can't access " + URL))
  }

})
