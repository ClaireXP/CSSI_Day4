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
 */
let xCan = window.innerWidth - 20;
let yCan = window.innerHeight - 20;
let scale = (xCan * yCan) / 50000;
let w = scale / 2;

let brushHue;

function setup() {
  // Canvas & color settings
  createCanvas(xCan, yCan);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
}

function draw() {
  background(95);
  chooseColors();
  rect(mouseX, mouseY, scale, scale);
}

function chooseColors() {
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}
