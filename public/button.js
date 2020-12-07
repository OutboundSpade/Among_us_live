/// <reference path="./p5.global-mode.d.ts" />
class AmongUSButton {
    constructor(text, x, y, wid, hei, img = null) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.wid = wid;
        this.hei = hei;
        this.color = "rgba(255,255,255,1)";
        this.img = img;
    }
    show() {
        push();
        textAlign(CENTER, CENTER);
        noStroke();
        fill(this.color);
        textSize(min(this.wid, this.hei) / 1);

        text(this.text, this.x, this.y);
        rectMode(CENTER);
        noFill();
        stroke(this.color);
        strokeWeight(min(this.wid, this.hei) / 25);
        rect(this.x, this.y, this.wid, this.hei, 10);
        pop();
    }
    updateColor(x = mouseX, y = mouseY) {
        // x -= width / 2;
        // y -= height / 2;
        if (this.isHovering(x, y)) {
            this.color = "rgba(0,255,0,1)";
        } else {
            this.color = "rgba(255,255,255,1)";
        }
    }
    isHovering(inputX = mouseX, inputY = mouseY) {

        inputX -= width / 2;
        inputY -= height / 2;
        inputX *= 1 / scl;
        inputY *= 1 / scl;
        return (inputX >= this.x - this.wid / 2 && inputX <= this.x + this.wid / 2 && inputY >= this.y - this.hei / 2 && inputY <= this.y + this.hei / 2);
    }
}