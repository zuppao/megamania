class Enterprise {

	constructor(_x,_y){
		var cannon;
		var passedTime, energy;
		this.x = _x;
    	this.y = _y;
		this.width=32;
	    this.height=42;
    	this.foreColor = color(56,64,176);
    	
    	this.cannon =  {
	    	x: this.x+(this.width/2),
    		y: this.y-10
    	}
    	this.passedTime=0
    	this.energy=100;
    	this.collider = {
    		x1: this.x+7,
    		y1: this.y+2,
    		x2: this.x+7+this.width-14,
    		y2: this.y+2+this.height-8
    	}
	}

	Move = function (dir) {
        this.x += dir*5;
        this.SetCannon();
        this.SetCollider();
    }


    Show = function () {
    	this.Update();
       	
		stroke(240);

		//strokeWeight(1);
		//noFill();
		//rect(this.x+7,this.y+2,this.width-14,this.height-8);
		fill(this.foreColor);
		//---------------------------
		strokeWeight(2);
		line(this.x+(this.width/2),this.y+(this.height/2),
        	 this.x+(this.width/4),this.y+(this.height/4*3));
		line(this.x+(this.width/2),this.y+(this.height/2),
        	 this.x+(this.width/4*3),this.y+(this.height/4*3));
		
		strokeWeight(1);
		ellipse(this.x+(this.width/2),this.y+(this.height/2.5),7,this.width/1.3);        
        circle(this.x+(this.width/2),this.y+(this.height/4),this.width/1.5);
        circle(this.x+(this.width/2),this.y+(this.height/4),this.width/6);
        ellipse(this.x+(this.width/4),this.y+ (this.height/4*3),4,16);
        ellipse(this.x+(this.width/4*3),this.y+ (this.height/4*3),4,16);
        //---------------------------
    	
    }

    Update = function (){
    	this.passedTime+=deltaTime;
    	if(this.passedTime>=500){
    		//console.log('meio segundo');
    		this.passedTime=0;
    		this.energy-=1.11;
    	}
    }

    SetCannon(){
    	this.cannon.x = this.x+(this.width/2);
    } 

    SetCollider(){
    	this.collider.x1 = this.x+7;
    	this.collider.x2 = this.x+7+this.width-14;
    }



    static ShowLive(_x,_y){
    	var foreColor = color(56,64,176);
    	var vWidth=42;
	    var vHeight=32;

    	stroke(240);
    	//temp.....
    	//noFill();
		//rect(_x,_y,vWidth,vHeight);
		//---------
		fill(foreColor);

		//---------------------------
		strokeWeight(2);
		line(_x+(vWidth/2),_y+(vHeight/2),
        	 _x+(vWidth/4),_y+(vHeight/4));
		line(_x+(vWidth/2),_y+(vHeight/2),
        	 _x+(vWidth/4),_y+(vHeight/4*3));


		strokeWeight(1);
		ellipse(_x+(vWidth/1.77),_y+(vHeight/2),vHeight/1.3,7);
        circle(_x+vWidth-(vWidth/4),_y+(vHeight/2),vHeight/1.5);
        circle(_x+vWidth-(vWidth/4),_y+(vHeight/2),vHeight/6);
        ellipse(_x+(vWidth/4),_y+ (vHeight/4),16,4);
        ellipse(_x+(vWidth/4),_y+ (vHeight/4*3),16,4);
        //---------------------------
    }

    

}