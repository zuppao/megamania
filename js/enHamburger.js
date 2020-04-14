class Hamburger {
//function Hamburger(_x,_y) {
	constructor(_x,_y,_speed) {
		this.speed = _speed;
        var passedTime;//, downStep, downTimes;
    	this.x = _x;
    	this.y = _y;
    	//this.width = 30;
    	//this.height = 16;
    	this.passedTime=0;
        //this.downStep=8;this.downTimes=0;

    	this.enemyColor = color(192,112,176);
    	this.windowPos = {
  			x : this.x,
  			y : this.y
  		}
    //this.Show = function () {
    //	fill(255, 0, 200);
    //    rect(this.x, this.y, this.width, this.height);    
    //}
	}

    /*Show = function () {
        this.Update();
    	//fill(255, 0, 200);
        //rect(this.x, this.y, this.width, this.height);    
        noStroke();
		

		//---------------------------
        fill(this.enemyColor);
        rect(this.x+7, this.y,this.width/2,this.height);
        rect(this.x, this.y+2,this.width,this.height-4);

        fill(0);
        rect(this.x-1, this.y+4,this.width+2,this.height-8);

        fill(this.enemyColor);
		rect(this.windowPos.x, this.windowPos.y,8,this.height-12);
		rect(this.windowPos.x+3+8, this.windowPos.y,8,this.height-12);
		rect(this.windowPos.x+6+16, this.windowPos.y,8,this.height-12);
        //---------------------------
    }

    Update = function (){
        this.passedTime+=deltaTime;

        if(this.passedTime>=5000){
            this.passedTime=0;
            this.y+=this.downStep;
            this.downTimes++;
            if(this.downTimes===3){
                this.downTimes=0;
                this.downStep*=-1;
            }
        }
    }

    Move = function () {
		if(this.x<= -this.width){
			this.x = width;
		}

    	this.x-=2*this.speed;
    	this.windowPos = {
  			x : this.x,
  			y : this.y+6
  		}
    }*/

}




Hamburger.prototype.downStep=8;
Hamburger.prototype.downTimes=0;

Hamburger.prototype.width = 30;
Hamburger.prototype.height = 16;
Hamburger.prototype.Show = function () {
        this.Update();
        //fill(255, 0, 200);
        //rect(this.x, this.y, this.width, this.height);    
        noStroke();
        

        //---------------------------
        fill(this.enemyColor);
        rect(this.x+7, this.y,this.width/2,this.height);
        rect(this.x, this.y+2,this.width,this.height-4);

        fill(0);
        rect(this.x-1, this.y+4,this.width+2,this.height-8);

        fill(this.enemyColor);
        rect(this.windowPos.x, this.windowPos.y,8,this.height-12);
        rect(this.windowPos.x+3+8, this.windowPos.y,8,this.height-12);
        rect(this.windowPos.x+6+16, this.windowPos.y,8,this.height-12);
        //---------------------------
}

Hamburger.prototype.Update = function (){
        this.passedTime+=deltaTime;

        if(this.passedTime>=5000){
            this.passedTime=0;
            this.y+=this.downStep;
            this.downTimes++;
            if(this.downTimes===3){
                this.downTimes=0;
                this.downStep*=-1;
            }
        }
}

Hamburger.prototype.Move = function () {
        if(this.x<= -this.width){
            this.x = width;
        }

        this.x-=2*this.speed;
        this.windowPos = {
            x : this.x,
            y : this.y+6
        }
}