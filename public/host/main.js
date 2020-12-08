/// <reference path="../p5.global-mode.d.ts" />

let amongUsFont;

function preload() {
    amongUsFont = loadFont("../among us font.ttf");
}
let socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);

    socket = io();
    socket.on('connect', () => {
        socket.emit("type", "host");
        console.log("connected to server!");
    });
}
let scl;

function draw() {
    background(0);
    push();
    scl = min(width, height) / 800;
    translate(width / 2, height / 2);
    scale(scl);
    text
    pop;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}