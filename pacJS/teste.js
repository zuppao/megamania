
function Teste(_x,_y){
	this.x = _x;
    this.y = _y;
    this.width = 32;
    this.height = 46;
    this.shipColor = color(255,0,200);

  	

    //25x35
    this.Show = function () {
		strokeWeight(1);    	
		stroke(240);

		//noFill();
		//rect(this.x,this.y,this.width,this.height);
		fill(255,0,200);
		//---------------------------
		strokeWeight(2);
		line(this.x+(this.width/2),this.y+(this.height/2),
        	 this.x+(this.width/4*3),this.y+(this.height/4*3));
		line(this.x+(this.width/2),this.y+(this.height/2),
        	 this.x+(this.width/4),this.y+(this.height/4*3));


		strokeWeight(1);
		ellipse(this.x+(this.width/2),this.y+(this.height/2.5),7,this.width/1.3);        
        circle(this.x+(this.width/2),this.y+(this.height/4),this.width/1.5);
        circle(this.x+(this.width/2),this.y+(this.height/4),this.width/6);
        ellipse(this.x+(this.width/4),this.y+ (this.height/4*3),4,16);
        ellipse(this.x+(this.width/4*3),this.y+ (this.height/4*3),4,16);
        //---------------------------
    }

    this.Move = function (dir) {

    }

}

