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
 *    random
 *    keyCode
 *    ENTER
 *    loadImage
 *    image
 *    mouseIsPressed
 *    ellipse
 *    line
 *    noFill
 *    square
 */
let xCan = window.innerWidth - 20;
let yCan = window.innerHeight - 20;

let backgndCol = 95;

let x1, y1;
let brushHue;

let trash;
let trashW;
if (yCan > xCan) {
  trashW = yCan / 18;
} else {
  trashW = xCan / 18;
}

let weight = 1;
let dir = 1;

let style = "";

let l = trashW * 0.9;

let v;

function setup() {
  // Canvas & color settings
  createCanvas(xCan, yCan);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;

  trash = loadImage(
    "https://lh3.googleusercontent.com/proxy/NJIcL_Jso-caTKKgaCs-nRhYdUlg-eRy7-JLY4BUXjx2UjebeYSXKh-Hv_xLm5-79lzSdy95QGhtV3JCoKYSphhz1wATFjNgciMyICbSf16bRwCu0qaNrDBX6E3-OdlAKtTdxvaEBbJe0fYgZSZtbnrv8AthHGsQ8kY4jQgsMeGlPUeVbUU"
  );

  refresh();
}

function draw() {
  strokeWeight(weight);

  chooseColors();
  image(trash, (xCan - trashW) / 2, 3, trashW, trashW * 1.2);

  x1 = mouseX;
  y1 = mouseY;
}

function chooseColors() {
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}

function refresh() {
  background(backgndCol);
  shapes();
}

function mouseClicked() {
  if (mouseX >= (xCan - trashW) / 2 && mouseX <= (xCan - trashW) / 2 + trashW) {
    if (mouseY >= 10 && mouseY <= trashW * 1.2 + 10) {
      refresh();
    }
  }

  if (mouseY >= trashW * 1.2 - l - 2 && mouseY <= trashW * 1.2 - 2) {
    if (mouseX >= xCan / 8 - l / 2 && mouseX <= xCan / 8 + l / 2) {
      style = "ellipse";
    }
    if (mouseX >= (2 * xCan) / 8 - l && mouseX <= (2 * xCan) / 8) {
      style = "square";
    }
    if (mouseX >= 12 && mouseX <= l + 12) {
      style = "line";
    } if (mouseX >= (3 * xCan) / 8 - l && mouseX <= (3 * xCan) / 8) {
      style = "triangle";
    }
  }
}

function deviceShaken() {
  refresh();
}

function mouseDragged() {
  // brushHue = random(255);
  brushHue += 1;
  brushHue %= 360;

  if (style == "ellipse") {
    strokeWeight(1);
    ellipse(mouseX, mouseY, weight);
  } else if (style == "square") {
    strokeWeight(1);
    square(mouseX, mouseY, weight);
  } else {
    line(x1, y1, mouseX, mouseY);
  }

  calcVel();
  weight = 5 + Math.abs(8 / v);

  shapes();
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
  ellipse(xCan / 8, trashW * 1.2 - l / 2 - 2, l);

  //square icon
  square(2 * xCan / 8 - l, 12, l);

  //line icon
  line(12, 12, 12 + l, 12 + l);
  
  //triangle icon
  triangle(3 * xCan / 8 - l, 12, 3 * xCan / 8, 12);
}

function calcVel() {
  v = Math.abs(Math.sqrt(Math.pow(mouseX - x1, 2) + Math.pow(mouseY - y1, 2)));
}
