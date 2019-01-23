const URL = 'http://localhost:3000/ships';
const API_WEBSOCK_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};


document.addEventListener("DOMContentLoaded", () => {

  const shipForm = document.getElementById('new-ship-form')
  shipForm.addEventListener('submit', createShip)


  function createShip(e) {
    let name = document.getElementById('input-name')
    let color = document.getElementById('input-color')
    let email = document.getElementById('input-email')

    e.preventDefault()

    let obj = {ship : {
      name: name.value,
      color: color.value,
      email: email.value
    }}

    fetch(URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then( (ship) => {
      connect()
    })
    .catch((errors) => console.log("error: ", errors))
  }

  function connect() {
        ws = new WebSocket(API_WEBSOCK_ROOT, []);
        ws.onmessage = () => console.log('message recieved') // ping every 3 seconds
        ws.onopen = () => console.log('handshake successful')
        ws.onerror = () => console.log('ERROR!!')
    }

})
