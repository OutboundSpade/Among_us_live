class TaskSelection {
    constructor(x, y, name, img = null, imgWid, imgHei) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.name = name;
        this.color = "rgba(255,255,255,1)";
        this.wid = 750;
        this.hei = 1000;
        this.imgWid = imgWid;
        this.imgHei = imgHei;
    }
    show() {
        push();
        textAlign(CENTER, CENTER);
        noStroke();
        fill(this.color);
        textSize(min(this.wid, this.hei) / 6);

        text(this.name, this.x + this.wid / 2, this.y + this.hei / 1.15);
        // rectMode(CENTER);
        noFill();
        stroke(this.color);
        strokeWeight(min(this.wid, this.hei) / 100);
        line(this.x, this.y + this.hei / 1.3, this.x + this.wid, this.y + this.hei / 1.3);
        rect(this.x, this.y, this.wid, this.hei, 30);
        imageMode(CENTER);
        image(this.img, this.x + this.wid / 2, this.y + this.hei / 2 - this.hei * 0.15, this.wid / this.imgWid, this.hei / this.imgHei); //1.1 - 1.65
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
        // inputX -= width / 2;
        // inputY -= height / 2;
        // console.log(inputX);
        inputX *= 1 / scl;
        inputY *= 1 / scl;
        return (inputX >= this.x && inputX <= this.x + this.wid && inputY >= this.y && inputY <= this.y + this.hei);
    }
}