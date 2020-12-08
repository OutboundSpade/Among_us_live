/// <reference path="../../p5.global-mode.d.ts" />

// const e = require("express");

let amongUsFont;
let locksImage;
let keysImage;
let keysSingleImage;
let keyTopImage;

function preload() {
    amongUsFont = loadFont("../../among us font.ttf");
    locksImage = loadImage("./images/locks.png");
    keysSingleImage = loadImage("./images/keySingle.PNG");
    keysImage = loadImage("./images/keys.png");
    keyTopImage = loadImage("./images/keyTop.png");
}
let hasStarted = false;
let hasFinished = false;
let keyPos = [];
let chosenKey;
let socket;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);
    imageMode(CENTER);

    keyPos = [
        //First Column
        createVector(73, -132),
        createVector(75, -64),
        createVector(75, 1.4),
        createVector(75, 65.5),
        createVector(75, 130),
        //Second Column
        createVector(168.3, -131.5),
        createVector(170.5, -63.5),
        createVector(170.5, 1.4),
        createVector(170.5, 65.5),
        createVector(170.5, 130)
    ];

    chosenKey = random(keyPos);

    socket = io();
    socket.on('connect', () => {
        socket.emit("type", "Insert Keys");
        console.log("connected to server!");
    });
}

let scl;
let isDraggingKey = false;
let rotateKey = false;
let keyRotation = 0;
let keyInSlot = false;
let keysScl = 0.75;

function draw() {
    background(0);
    scl = min(width, height) / 500;
    push();
    translate(width / 2, height / 2);
    scale(scl);
    let locksScl = 0.7;
    image(locksImage, 75, 0, 115 * locksScl, 525 * locksScl);
    image(locksImage, 90 + 115 * locksScl, 0, 115 * locksScl, 525 * locksScl);
    if (!isDraggingKey && !keyInSlot) {
        image(keysImage, -120, 0, 208 * keysScl, 431 * keysScl);
    } else {
        image(keysSingleImage, -120, 0, 208 * keysScl, 431 * keysScl);
    }

    pop();
    push();
    translate(width / 2, height / 2);
    scale(scl);
    noFill();
    // keyPos.map((item) => {
    if (keyInSlot) {
        stroke(33, 163, 206);
    } else {
        stroke(230, 230, 0);
    }

    strokeWeight(3);
    ellipse(chosenKey.x, chosenKey.y, 53);

    if (keyInSlot) {
        stroke(13, 76, 167);
    } else {
        stroke(208, 129, 40);
    }
    strokeWeight(5);
    ellipse(chosenKey.x, chosenKey.y, 60);
    // });
    fill(255, 0, 0, 120);
    noStroke();
    // ellipse(-158, 90, 160);
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

    if (isDraggingKey && !keyInSlot) {
        image(keyTopImage, inputX, inputY, 85 * 0.3, 223 * 0.3);
        if (dist(inputX, inputY, chosenKey.x, chosenKey.y) <= 25) {
            isDraggingKey = false;
            keyInSlot = true;
        }

    }
    if (rotateKey) {
        keyRotation = constrain(keyRotation + 4, 0, 90);
    }
    push();
    if (keyInSlot) {
        translate(chosenKey.x, chosenKey.y);
        rotate(radians(keyRotation));
        image(keyTopImage, 0, 0, 85 * 0.3, 223 * 0.3);
    }
    pop();
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
    } else {
        if (dist(x, y, -158, 90) <= 160 / 2) {
            isDraggingKey = true;
        }

        if (keyInSlot && dist(x, y, chosenKey.x, chosenKey.y) <= 25) {
            rotateKey = true;
            setTimeout(() => {
                hasFinished = true;
            }, 700);
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    }
}

function releaseInput() {
    isDraggingKey = false;
}

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