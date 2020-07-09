/* ____    ___       _      _       ____  
  / ___|  / _ \     / \    | |     / ___| 
 | |  _  | | | |   / _ \   | |     \___ \ 
 | |_| | | |_| |  / ___ \  | |___   ___) |
  \____|  \___/  /_/   \_\ |_____| |____/ 
                       
1) Continuous drawing
2) Use HSB to make new squares change colors
3) Use mouse button to draw
4) Make continuous strokes instead of dots

  ____    _____   ____    _____   _____    ____   _   _ 
 / ___|  |_   _| |  _ \  | ____| |_   _|  / ___| | | | |
 \___ \    | |   | |_) | |  _|     | |   | |     | |_| |
  ___) |   | |   |  _ <  | |___    | |   | |___  |  _  |
 |____/    |_|   |_| \_\ |_____|   |_|    \____| |_| |_|

6)  Have the strokeWeight oscillate between 5 and 15, emulating the
    stroke of a quill.
7)  Use other shapes in different configurations to create other effects.
8)  Have the color only change when you press certain keys.
9)  Have color change by assigning hue randomly.
10) Mess with the saturation, brightness, and background colors to create
    different color families.
11) Kind of like 6, but make the quill behave as in reality, where moving
    the quill (mouse) faster makes the stroke thinner.
*/

// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
 *    HSB,
 *    background,
 *    colorMode,
 *    createCanvas,
 *    fill,
 *    mouseX,
 *    mouseY,
 *    stroke,
 *    rect,
 *    strokeWeight,
 *    random,
 *    keyCode,
 *    ENTER,
 *    loadImage,
 *    image,
 *    mouseIsPressed,
 *    ellipse,
 *    line,
 *    noFill,
 *    square,
 *    triangle,
 *    slider,
 *    createSlider,
 *    text
 */
let xCan = window.innerWidth - 20;
let yCan = window.innerHeight - 20;

let backgndCol = 95;

let x1, y1;
let brushHue;

let trash, pencil, pen, can;
let trashW;
if (yCan > xCan) {
  trashW = yCan / 18;
} else {
  trashW = xCan / 25;
}

let weight = 1;
let dir = 1;

let style = "";
let utensil = "";

let l = trashW * 0.9;

let v;
let width;
let wSelect;

let hueSelect;

function setup() {
  // Canvas & color settings
  createCanvas(xCan, yCan);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;

  trash = loadImage(
    "https://lh3.googleusercontent.com/proxy/NJIcL_Jso-caTKKgaCs-nRhYdUlg-eRy7-JLY4BUXjx2UjebeYSXKh-Hv_xLm5-79lzSdy95QGhtV3JCoKYSphhz1wATFjNgciMyICbSf16bRwCu0qaNrDBX6E3-OdlAKtTdxvaEBbJe0fYgZSZtbnrv8AthHGsQ8kY4jQgsMeGlPUeVbUU"
  );

  pencil = loadImage(
    "https://images2.minutemediacdn.com/image/upload/c_crop,h_1411,w_2097,x_14,y_0/v1554932488/shape/mentalfloss/istock-172863370.jpg?itok=guoHdz0l"
  );

  pen = loadImage(
    "https://cms.cloudinary.vpsvc.com//image/fetch/q_auto:eco,w_700,f_auto,dpr_auto/https://s3-eu-west-1.amazonaws.com/sitecore-media-bucket/prod%2Fen%2F%7B3D1BD3F1-6E86-40F6-9377-23044E5B9A42%7D"
  );

  can = loadImage(
    "https://img.pngio.com/can-graffiti-spray-png-image-aerosol-png-239633-pngtube-spray-can-png-920_1361.png"
  );

  refresh();

  hueSelect = createSlider(0, 361, 361);
  hueSelect.position(15, l * 1.75);

  wSelect = createSlider(1, 30, 8);
  wSelect.position(150, l * 1.75);
}

function draw() {
  strokeWeight(weight);

  chooseColors();
  image(trash, (xCan - trashW) / 2, 3, trashW, trashW * 1.2);
  image(pencil, xCan - trashW - 15, 3, trashW * 1.2, trashW * 1.2);
  image(pen, (7 * xCan) / 8 - trashW - 15, 3, trashW * 1.2, trashW * 1.2);
  image(can, (6 * xCan) / 8 - trashW - 15, 3, trashW * 1.2, trashW * 1.2);

  x1 = mouseX;
  y1 = mouseY;

  width = wSelect.value();
}

function chooseColors() {
  if (hueSelect.value() == 361) {
    brushHue += 1;
    brushHue %= 360;
  } else {
    brushHue = hueSelect.value();
  }

  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}

function refresh() {
  fill(backgndCol);
  rect(0, l * 2.5, xCan, yCan - l * 2.5 - 1);
  shapes();
}

function mouseClicked() {
  if (mouseY >= 3 && mouseY <= 3 + trashW * 1.2) {
    if (
      mouseX >= (xCan - trashW) / 2 &&
      mouseX <= (xCan - trashW) / 2 + trashW
    ) {
      refresh();
    }
    if (mouseX >= xCan - trashW - 15 && mouseX <= xCan - 15) {
      utensil = "pencil";
    }
    if (
      mouseX >= (7 * xCan) / 8 - trashW - 15 &&
      mouseX <= (7 * xCan) / 8 - 15
    ) {
      utensil = "pen";
    }
    if (
      mouseX >= (6 * xCan) / 8 - trashW - 15 &&
      mouseX <= (7 * xCan) / 8 - trashW - 15
    ) {
      utensil = "can";
    }
  }

  if (mouseY >= 12 && mouseY <= 12 + l) {
    if (mouseX >= xCan / 8 - l / 2 && mouseX <= xCan / 8 + l / 2) {
      style = "ellipse";
    }
    if (mouseX >= (2 * xCan) / 8 - l && mouseX <= (2 * xCan) / 8) {
      style = "square";
    }
    if (mouseX >= 12 && mouseX <= l + 12) {
      style = "line";
    }
    if (
      mouseX >= (3 * xCan) / 8 - (3 / 2) * l &&
      mouseX <= (3 * xCan) / 8 - l / 2
    ) {
      style = "triangle";
    }
  }
}

function deviceShaken() {
  refresh();
}

function mouseDragged() {
  if (mouseY > l * 2.5) {
    if (utensil != "can") {
      if (style == "ellipse") {
        drawEll(0, 0, 1);
      } else if (style == "square") {
        drawSqu(0, 0, 1);
      } else if (style == "triangle") {
        drawTri(0, 0, 1);
      } else {
        drawLine(0, 0, weight);
      }
    } else {
      if (style == "ellipse") {
        for (var i = 0; i < 5; i++) {
          drawEll(
            random(-weight, weight),
            random(-weight, weight),
            random(3, 6)
          );
        }
      } else if (style == "square") {
        for (var i = 0; i < 5; i++) {
          drawSqu(
            random(-weight, weight),
            random(-weight, weight),
            random(3, 6)
          );
        }
      } else if (style == "triangle") {
        for (var i = 0; i < 5; i++) {
          drawTri(
            random(-weight, weight),
            random(-weight, weight),
            random(3, 6)
          );
        }
      } else {
        for (var i = 0; i < 5; i++) {
          drawLine(
            random(-weight, weight),
            random(-weight, weight),
            weight / 5
          );
        }
      }
    }

    if (utensil == "pencil") {
      weight = width;
    } else {
      calcVel();
      weight = width * 0.5 + Math.abs((2.5 * width) / v);
    }

    shapes();
  }
}

function drawEll(o, o2, s) {
  strokeWeight(1);
  ellipse(mouseX + o, mouseY + o2, weight / s);
}

function drawSqu(o, o2, s) {
  strokeWeight(1);
  square(mouseX + o, mouseY + o2, weight / s);
}

function drawTri(o, o2, s) {
  strokeWeight(1);
  triangle(
    mouseX - weight / (2 * s) + o,
    mouseY + weight / (2 * s) + o2,
    mouseX + weight / (2 * s) + o,
    mouseY + weight / (2 * s) + o2,
    mouseX + o,
    mouseY - weight / (2 * s) + o2
  );
}

function drawLine(o, o2, s) {
  strokeWeight(s);
  line(x1, y1, mouseX + o, mouseY + o2);
}

function keyPressed() {
  if (keyCode == ENTER) {
    refresh();
  }
}

function shapes() {
  noFill();
  stroke(0);
  strokeWeight(1);

  //circle icon
  ellipse(xCan / 8, 12 + l / 2, l);

  //square icon
  square((2 * xCan) / 8 - l, 12, l);

  //line icon
  line(12, 12, 12 + l, 12 + l);

  //triangle icon
  triangle(
    (3 * xCan) / 8 - (3 / 2) * l,
    12 + l,
    (3 * xCan) / 8 - (1 / 2) * l,
    12 + l,
    (3 * xCan) / 8 - l,
    12
  );

  text("Hue Slider", 15, l * 2.3);
  text("Width Slider", 150, l * 2.3);
}

function calcVel() {
  v = Math.abs(Math.sqrt(Math.pow(mouseX - x1, 2) + Math.pow(mouseY - y1, 2)));
}
