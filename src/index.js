document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let sx = 0
  let sy = 0
  canvas.width = 400;
  canvas.height = 400;

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

  document.body.appendChild(canvas);


})
