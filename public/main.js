/// <reference path="./p5.global-mode.d.ts" />
let backgroundImage;
let amongUsFont;

function preload() {
    backgroundImage = loadImage("among us background.jpg");
    amongUsFont = loadFont("among us font.ttf");
}

let hostButton;
let tasksButton;

function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textFont(amongUsFont);

    hostButton = new AmongUSButton("Host", -150, 50, 200, 100);
    tasksButton = new AmongUSButton("Tasks", 150, 50, 200, 100);
}
let scl;

function draw() {
    background(0);
    translate(width / 2, height / 2);
    scl = min(width, height) / 800;
    scale(scl);
    image(backgroundImage, 0, 0);
    hostButton.updateColor();
    hostButton.show();
    tasksButton.updateColor();
    tasksButton.show();
}

function useInput(x, y) {
    if (hostButton.isHovering(x, y)) {
        window.location.assign('./host');
    } else if (tasksButton.isHovering(x, y)) {
        window.location.assign('./tasks');
    }
}

function mousePressed() {
    // console.log("mouse");
    useInput(mouseX, mouseY);
}

function touchStarted() {
    useInput(touches[0].x, touches[0].y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}