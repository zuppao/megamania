function Invader(_x,_y) {
    this.x = _x;
    this.y = _y;
    this.r = 30;

    this.Show = function () {
        fill(255,0,200);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
    }

    
}


