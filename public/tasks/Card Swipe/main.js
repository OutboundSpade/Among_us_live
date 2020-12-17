/// <reference path="../../p5.global-mode.d.ts" />

let segmentFont;
let cardImage;
let walletImage;
let walletCardImage;
let scannerTop;
let scannerBottom;

function preload() {
    segmentFont = loadFont("../../7segment font.ttf");
    cardImage = loadImage("./images/card.png");
    walletImage = loadImage("./images/wallet.png");
    walletCardImage = loadImage("./images/walletWithCard.png");
    scannerTop = loadImage("./images/topScanner.png");
    scannerBottom = loadImage("./images/bottomScanner.png");
}
let socket;

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    textFont(segmentFont);
    imageMode(CENTER);

    // socket = io();
    // socket.on('connect', () => {
    //     socket.emit("type", "Template");
    //     console.log("connected to server!");
    // });
}

let scl;
let hasStarted = true;
let hasFinished = false;
let isOutOfWallet = false;
let scannerText = "PLEASE INSERT CARD";

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
    let scannerScl = 0.65;
    image(scannerBottom, 0, -100, 563 * scannerScl, 276 * scannerScl);
    //Card stuff
    let walletCardScl = 0.7;
    if (!isOutOfWallet) {
        image(walletCardImage, 0, 195, 472 * walletCardScl, 165 * walletCardScl);
    } else {
        image(walletImage, 0, 197, 470 * walletCardScl, 167 * walletCardScl);

    }

    image(scannerTop, 0, -100, 569 * scannerScl, 282 * scannerScl);

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
        isOutOfWallet = !isOutOfWallet;
    }
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