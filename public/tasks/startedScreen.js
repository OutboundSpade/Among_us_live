function drawStarting(txtWidDiv = 20) {
    wid = width * scl;
    hei = height * scl;
    push();
    ellipse(width, height, 20)
    noStroke();
    fill(0, 0, 0, 200);
    rect(-wid / 2, -hei / 2, wid, hei);
    textSize(min(wid, hei) / txtWidDiv);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Touch anywhere to play", 0, -50);
    pop();
}

function drawFinished(txtWidDiv = 20) {
    push();
    stroke(0);
    strokeWeight(2);
    fill(0, 0, 0, 200);
    rect(-width / 2, -height / 2, width, height);
    textSize(min(width, height) / txtWidDiv);
    fill(0, 255, 0);
    textAlign(CENTER, CENTER);
    text("TASK COMPLETED!", 0, -50);
    pop();
}