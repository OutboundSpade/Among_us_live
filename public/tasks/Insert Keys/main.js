/// <reference path="../../p5.global-mode.d.ts" />

let amongUsFont;
let locksImage;
let keysImage;
let keysSingleImage;

function preload() {
    amongUsFont = loadFont("../../among us font.ttf");
    locksImage = loadImage("./images/locks.png");
    keysSingleImage = loadImage("./images/keySingle.PNG");
    keysImage = loadImage("./images/keys.png");
}
let hasStarted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);
    imageMode(CENTER);
}

let scl;

function draw() {
    background(0);
    scl = min(width, height) / 500;
    push();
    translate(width / 2, height / 2);
    scale(scl);
    let locksScl = 0.7;
    image(locksImage, 75, 0, 115 * locksScl, 525 * locksScl);
    image(locksImage, 90 + 115 * locksScl, 0, 115 * locksScl, 525 * locksScl);
    pop();
    translate(width / 2, height / 2);
    scale(scl);
    if (!hasStarted) {
        drawStarting();
    }
}

function useInput(x, y) {
    x -= width / 2;
    y -= height / 2;
    x *= 1 / scl;
    y *= 1 / scl;
    console.log(`${x} - ${y}`);
    if (!hasStarted) {
        hasStarted = !hasStarted;
    } else {

    }
}

function mousePressed() {
    useInput(mouseX, mouseY);
}

function touchStarted() {
    useInput(touches[0].x, touches[0].y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// function drawStarting() {
//     push();
//     noStroke();
//     fill(0, 0, 0, 200);
//     rect(-width / 2, -height / 2, width, height);
//     textSize(min(width, height) / 20);
//     fill(255);
//     textAlign(CENTER, CENTER);
//     text("Touch anywhere to play", 0, -50);
//     pop();
// }

// function drawFinished() {
//     push();
//     stroke(0);
//     strokeWeight(2);
//     fill(0, 0, 0, 200);
//     rect(-width / 2, -height / 2, width / 2, height / 2);
//     textSize(min(width, height) / 20);
//     fill(0, 255, 0);
//     textAlign(CENTER, CENTER);
//     text("TASK COMPLETED!", width / scl / 2, height / scl / 3);
//     pop();
// }