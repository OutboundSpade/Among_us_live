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
        socket.emit('resetPoints');
        console.log("connected to server!");
    });
    socket.on('updateNumDevices', (data) => {
        totalDevicesConnect = data;
    });
    socket.on('updatePoints', pts => {
        points = pts;

    });
}
let scl;
let totalDevicesConnect = 0;
let totalPeoplePlaying = 0;
let tasksPerPerson = 0;
let totalCount = totalPeoplePlaying * tasksPerPerson;
let menu = "";
let barWid;
let points = 0;

function draw() {
    background(0);
    scl = min(width, height) / 800;
    if (menu == "main") {
        push();
        translate(width / 2, height / 2);
        scale(scl);
        textSize(50);
        text(`Tasks Connected:\n${totalDevicesConnect}`, 0, -50);
        textSize(40);
        text(`Total Players`, -250, -150);
        text(`Tasks Per Person`, 250, -150);
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
        rectMode(CORNER);
        noStroke();
        fill(67, 217, 68);
        barWid = (points / totalCount) * 827;
        rect(-838 / 2 + 4, -54 / 0.77, barWid, 37);

        image(taskBarText, 0, -50, 838, 54);

        if (points == totalCount) {
            background(0, 0, 0, 120);
            textSize(120);

            text("GAME OVER\nCREWMATES WIN!", 0, 0);
        }
        pop();
    } else {
        menu = "main";
    }


}

function useInput(x, y) {
    if (menu == "main") {
        if (startButton.isHovering(x, y) && totalPeoplePlaying > 0 && tasksPerPerson > 0 && totalDevicesConnect > 0) {
            totalCount = totalPeoplePlaying * tasksPerPerson;
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