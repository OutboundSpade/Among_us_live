function drawStarting(txtWidDiv = 50) {
    wid = width * scl;
    hei = height * scl;
    push();
    // ellipse(width, height, 20)
    noStroke();
    fill(0, 0, 0, 200);
    rect(-wid / 2, -hei / 2, 99999, 99999);
    textSize(txtWidDiv);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Touch anywhere to play", 0, -50);
    pop();
}

function drawFinished(txtWidDiv = 50) {
    wid = width * scl;
    hei = height * scl;
    push();
    stroke(0);
    strokeWeight(2);
    fill(0, 0, 0, 200);
    rect(-wid / 2, -hei / 2, 99999, 99999);
    textSize(txtWidDiv);
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    text("TASK COMPLETED!", 0, -50);
    pop();
}