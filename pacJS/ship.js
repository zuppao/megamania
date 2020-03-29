function Ship() {
    this.x = (width / 2)-12;
    this.y = (height/4*3)-35;

    this.Show = function () {
        fill(155);
        //rectMode(CENTER);
        rect(this.x, this.y, 25, 35);
    }

    this.Move = function (dir) {
        this.x += dir*5;
    }
}
