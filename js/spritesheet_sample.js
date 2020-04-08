var img;
//var sWidth, sHeight;
//var ssPos;
var cannon;
function preload() {
    img = loadImage('img/ship.png');
}

function XWing(_x,_y) {
    this.sWidth=105;
    this.sHeight=144;
    this.ssPos=0;
    this.x = _x-(this.sWidth/4);
    this.y = _y-(this.sHeight/4);
    
    this.cannon =  {
    	x: this.x+(this.sWidth/4),
    	y: this.y-10
    }


	this.Move = function (dir) {
        this.x += dir*5;
        this.cannon.x = this.x+(this.sWidth/4);
    }


    this.Show = function () {
        image(img,
        	  this.x,this.y,
        	  this.sWidth/2,this.sHeight/2,
        	  0,0+(this.ssPos*this.sHeight),
        	  this.sWidth,this.sHeight);
        if(this.ssPos==2){
    		this.ssPos=0;
    	}else{
    		this.ssPos++;
    	}
    	
    }

	
   
}

