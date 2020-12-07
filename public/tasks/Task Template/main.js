/// <reference path="../../p5.global-mode.d.ts" />

let amongUsFont;

function preload() {
    amongUsFont = loadFont("../../among us font.ttf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);
}

let scl;

function draw() {
    background(0);
    scl = min(width, height) / 1000;
    scale(scl);
}

function useInput(x, y) {}

function mousePressed() {
    useInput(mouseX, mouseY);
}

function touchStarted() {
    useInput(touches[0].x, touches[0].y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}