/// <reference path="../../p5.global-mode.d.ts" />

let amongUsFont;
let fixWiringBackdrop;
let wireTip;

function preload() {
    amongUsFont = loadFont("../../among us font.ttf");
    fixWiringBackdrop = loadImage("./images/Fix_Wiring_Backdrop.png");
    wireTip = loadImage("./images/wire.PNG");
}
let hasStarted = false;
let colors = {};
let yPos = [];
let shuffledColors = [];
let shuffledColors2 = [];
let connections = {};
let draggingIndex = -1;
let correctConnections = {};

function setup() {
    createCanvas(windowWidth, windowHeight);

    textFont(amongUsFont);
    imageMode(CENTER);

    colors = {
        "rgba(255,0,0,1)": "rgba(165,0,0,1)",
        "rgba(253,233,9,1)": "rgba(168,155,0,1)",
        "rgba(250,33,249,1)": "rgba(166,18,165,1)",
        "rgba(36,44,252,1)": "rgba(29,25,164,1)",
    };
    yPos = [
        -157,
        -53,
        51,
        154
    ]
    shuffledColors = shuffle(Object.keys(colors), false);
    shuffledColors2 = shuffle(Object.keys(colors), false);

}

let scl;

function draw() {
    background(0);
    scl = min(width, height) / 500;
    push();
    translate(width / 2, height / 2);
    scale(scl);
    image(fixWiringBackdrop, 0, 0);
    pop();
    push();
    translate(width / 2, height / 2);
    scale(scl);
    strokeWeight(4);

    Object.keys(connections).forEach((item, i) => {
        if (item !== null) {
            push();
            translate(208.1 - 35, yPos[item] + 10);
            // rotate(angle);
            image(wireTip, 0, 0, 105 / 3, 93 / 3);
            pop();
            push();
            stroke(colors[shuffledColors[connections[item]]]);
            strokeWeight(23.7);
            line(-248.1 + 40, yPos[connections[item]] + 10, 208.1 - 50, yPos[item] + 10);
            stroke(shuffledColors[connections[item]]);
            strokeWeight(15);
            line(-248.1 + 40, yPos[connections[item]] + 10, 208.1 - 50, yPos[item] + 10);


            strokeWeight(4);

            pop();
        }
    });
    shuffledColors.forEach((item, i) => {
        fill(item);
        stroke(colors[item]);

        if (draggingIndex === i && !Object.values(connections).includes(i)) {
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
            let angle = 0;

            yPos.forEach((item, i) => {
                // console.log()
                if (connections[i] == undefined && shuffledColors[draggingIndex] == shuffledColors2[i] && dist(inputX, inputY, 208.1 - 15, item + 10) <= 100 / 2) {
                    connections[i] = draggingIndex;
                    // console.log(connections);
                    releaseInput();
                }
            });

            push();
            translate(inputX + 15, inputY);
            rotate(angle);
            image(wireTip, 0, 0, 105 / 3, 93 / 3);
            pop();
            push();
            stroke(colors[item]);
            strokeWeight(23.7);
            line(-248.1 + 40, yPos[i] + 10, inputX, inputY);
            stroke(item);
            strokeWeight(15);
            line(-248.1 + 40, yPos[i] + 10, inputX, inputY);

            strokeWeight(4);

            pop();
        } else if (!Object.values(connections).includes(i)) {
            push();
            translate(-248.1 + 53, yPos[i] + 10);
            image(wireTip, 0, 0, 105 / 3, 93 / 3);
            pop();
        }

        rect(-248.1, yPos[i], 40, 20);
        noStroke();
        rect(-248.1 + 40 - 3, yPos[i] + 2, 5.3, 20 - 4);
        fill(218, 201, 3);
        rect(-248.1, yPos[i] - 15, 30, 11);
        fill(255, 0, 0, 120);
        // ellipse(-248.1 + 53, yPos[i] + 10, 75);
    });
    // translate(-40, 0);
    shuffledColors2.forEach((item, i) => {
        fill(item);
        stroke(colors[item]);

        push();
        translate(208.1 - 15, yPos[i] + 10);
        rotate(PI);
        image(wireTip, 0, 0, 105 / 3, 93 / 3);
        pop();

        rect(208.1, yPos[i], 40, 20);
        noStroke();
        rect(208.1 - 1.5, yPos[i] + 2, 4.7, 20 - 4);
        fill(218, 201, 3);
        if (connections[i] != undefined && item == shuffledColors[connections[i]]) {
            rect(208.1 + 10, yPos[i] - 15, 30, 11);
        }
        fill(255, 0, 0, 120);
        // ellipse(208.1 - 15, yPos[i] + 10, 75);
    });



    pop();
    translate(width / 2, height / 2);
    scale(scl);
    if (!hasStarted) {
        drawStarting();
    }

}
let fs = false;

function useInput(x, y) {
    x -= width / 2;
    y -= height / 2;
    x *= 1 / scl;
    y *= 1 / scl;
    if (!hasStarted) {
        hasStarted = !hasStarted;
    } else {
        yPos.forEach((item, i) => {
            // console.log()
            if (dist(x, y, -248.1 + 53, item + 10) <= 75 / 2) {
                draggingIndex = i;
            }
        });


    }
}

function releaseInput() {
    draggingIndex = -1;

    if (Object.keys(connections).length >= 4) {
        //done task
        setTimeout(() => {
            noLoop();
            drawFinished();
        }, 300);
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
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