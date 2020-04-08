class ShipBullet{
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;    
    }
    
    Show = function () {
        stroke(176,60,60);
        strokeWeight(3);
        line(this.x, this.y, this.x, this.y+18);
    }

    Move = function () {
        this.y -= 10;
    }

    Hits = function (_enemy) {
        if (this.y >= _enemy.y && this.y < (_enemy.y + _enemy.height) &&
            this.x >= _enemy.x && this.x < (_enemy.x + _enemy.width)) {
            return true;
        } else {
            return false;
        }
    }
}


class EnemyBullet{
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;    
    }

    Show = function () {
        stroke(42,48,132);
        strokeWeight(3);
        line(this.x, this.y, this.x, this.y+12);
    }

    Move = function () {
        this.y += 5;
    }

    Hits = function(_ship) {
        //if(this.x>_ship.x && this.x<(_ship.x+_ship.width) &&
        //    (this.y+18) >= _ship.y && this.y<= (_ship.y+_ship.height)) {
        //    return true;
        //} else {
        //    return false;
        //}

        if(this.x>=_ship.collider.x1 && this.x<=_ship.collider.x2 &&
            (this.y+18) >= _ship.collider.y1 && this.y<= _ship.collider.y2) {
            return true;
        } else {
            return false;
        }

    }

}