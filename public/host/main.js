/// <reference path="../p5.global-mode.d.ts" />

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    scale(min(width, height) / 800);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}