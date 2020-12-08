/// <reference path="../../p5.global-mode.d.ts" />

let amongUsFont;

function preload() {
    amongUsFont = loadFont("../../among us font.ttf");
}
let socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);

    socket = io();
    socket.on('connect', () => {
        socket.emit("type", "Template");
        console.log("connected to server!");
    });
}

let scl;
let hasStarted = false;
let hasFinished = false;

function draw() {
    background(0);
    scl = min(width, height) / 500;
    push();
    translate(width / 2, height / 2);
    scale(scl);
    pop();
    push();
    translate(width / 2, height / 2);
    scale(scl);

    let inputX;
    let inputY;
    if (touches.length > 0) {
        inputX = touches[0].x;
        inputY = touches[0].y;
    } else {
        inputX = mouseX;
        inputY = mouseY;
    }
    inputX -= width / 2;
    inputY -= height / 2;
    inputX *= 1 / scl;
    inputY *= 1 / scl;

    if (!hasStarted) {
        drawStarting();
    }
    if (hasFinished) {
        drawFinished();
    }
    pop();
}

function useInput(x, y) {
    x -= width / 2;
    y -= height / 2;
    x *= 1 / scl;
    y *= 1 / scl;
    // console.log(`${x} - ${y}`);
    if (!hasStarted) {
        hasStarted = !hasStarted;
    } else {}
}

function releaseInput() {}

function mousePressed() {
    useInput(mouseX, mouseY);
}

function mouseReleased() {
    releaseInput();
}

function touchStarted() {
    useInput(touches[0].x, touches[0].y);
}

function touchEnded() {
    if (touches.length == 0) {
        releaseInput();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}