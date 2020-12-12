/// <reference path="../p5.global-mode.d.ts" />

let amongUsFont;
let taskBarBlank;
let taskBarText;

function preload() {
    amongUsFont = loadFont("../among us font.ttf");
    taskBarBlank = loadImage("./taskBarBlank.png");
    taskBarText = loadImage("./taskBarText.png");
}
let socket;
let startButton;
let peopleNumSelection;
let tasksPerPersonNumSelection;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(amongUsFont);
    textAlign(CENTER, CENTER);
    fill(255);
    noStroke();
    imageMode(CENTER);

    startButton = new AmongUSButton("Start", 0, 150, 200, 75);

    peopleNumSelection = new NumberSelection(-250, 0, 150, 200, 0, 1, 0, 12);
    tasksPerPersonNumSelection = new NumberSelection(250, 0, 150, 200, 0, 1, 0, 12);

    socket = io();
    socket.on('connect', () => {
        socket.emit("type", "host");
        console.log("connected to server!");
    });
    socket.on('updateNumDevices', (data) => {
        totalDevicesConnect = data;
    });
}
let scl;
let totalDevicesConnect = 0;
let totalPeoplePlaying = 0;
let tasksPerPerson = 0;
let totalCount = 0;
let menu = "";

function draw() {
    background(0);
    scl = min(width, height) / 800;
    if (menu == "main") {
        push();
        translate(width / 2, height / 2);
        scale(scl);
        textSize(65);
        text(`Tasks Connected:\n${totalDevicesConnect}`, 0, -100);
        tasksPerPerson = tasksPerPersonNumSelection.num;
        totalPeoplePlaying = peopleNumSelection.num;
        tasksPerPersonNumSelection.show();
        peopleNumSelection.show();
        startButton.updateColor();
        startButton.show();
        pop();
    } else if (menu == "taskBar") {
        push();
        translate(width / 2, height / 2);
        let tempImgScl = width / 1000;
        scale(tempImgScl);
        image(taskBarBlank, 0, -50, 838, 54);
        //Draw Bar here

        image(taskBarText, 0, -50, 838, 54);
        pop();
    } else {
        menu = "main";
    }

}

function useInput(x, y) {
    if (menu == "main") {
        if (startButton.isHovering(x, y) && totalPeoplePlaying > 0 && tasksPerPerson > 0 && totalDevicesConnect > 0) {
            menu = "taskBar";
        }
        x -= width / 2;
        y -= height / 2;
        x *= 1 / scl;
        y *= 1 / scl;
        tasksPerPersonNumSelection.update(x, y);
        peopleNumSelection.update(x, y);
    } else if (menu == "taskBar") {

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