/// <reference path="../p5.global-mode.d.ts" />
let placeholder;
let amongUsFont;
let wiringImage;
let insertKeysImage;

function preload() {
    wiringImage = loadImage("./Wiring.png");
    placeholder = loadImage("../placeholder.jpg");
    amongUsFont = loadFont("../among us font.ttf");
    insertKeysImage = loadImage("./InsertKeys.png");
}
let wiringTask;
let insertKeysTask;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);
    wiringTask = new TaskSelection(200, 150, "Fix Wiring", wiringImage, 1.1, 1.65);
    insertKeysTask = new TaskSelection(1200, 150, "Insert Keys", insertKeysImage, 1.1, 1.65);


}
let scl;

function draw() {
    background(0);
    scl = min(width, height) / 3000;
    scale(scl);
    // console.log(scl)
    // image(placeholder, 0, 0);
    wiringTask.updateColor();
    wiringTask.show();
    insertKeysTask.updateColor();
    insertKeysTask.show();
}

function useInput(x, y) {
    if (wiringTask.isHovering(x, y)) {
        window.location.assign('./Fix Wiring');
    } else if (insertKeysTask.isHovering(x, y)) {
        window.location.assign('./Insert Keys');
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