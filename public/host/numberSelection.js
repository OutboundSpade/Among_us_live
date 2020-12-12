class NumberSelection {
    constructor(x, y, w, h, num = 0, increment = 1, min = 0, max = 99) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.num = num;
        this.increment = increment;
        this.min = min;
        this.max = max;
    }
    show() {
        push();
        noFill();
        stroke(255);
        rectMode(CENTER);
        textAlign(CENTER, CENTER);
        rect(this.x, this.y, this.w, this.h, 40);
        line(this.x - this.w / 2, this.y - this.h / 4, this.x + this.w / 2, this.y - this.h / 4); //Top line
        line(this.x - this.w / 2, this.y + this.h / 4, this.x + this.w / 2, this.y + this.h / 4); //Bottom line
        textSize(min(this.w, this.h) / 2);
        fill(255);
        noStroke();

        push(); //+
        translate(this.x, this.y - this.h / 2.4);
        text("-", 0, 0);
        rotate(HALF_PI);
        text("-", this.h / 20, -this.w / 19); //X and y inverted due to 90 degree rotation
        pop();

        push(); //-
        translate(this.x, this.y + this.h / 3);
        text("-", 0, 0);
        pop();

        text(this.num, this.x, this.y);

        pop();
    }
    update(x = mouseX, y = mouseY) {
        if (this.isHoveringPlus(x, y) && this.num < this.max) {
            this.num += this.increment;
        } else if (this.isHoveringMinus(x, y) && this.num > this.min) {
            this.num -= this.increment;
        }
    }
    isHoveringPlus(x, y) {
        return (x >= this.x - this.w / 2 && x <= this.x + this.w / 2 && y >= this.y - this.h / 2 && y <= this.y - this.h / 4);
    }
    isHoveringMinus(x, y) {
        return (x >= this.x - this.w / 2 && x <= this.x + this.w / 2 && y <= this.y + this.h / 2 && y >= this.y + this.h / 4);
    }
}