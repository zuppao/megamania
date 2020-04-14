class Ship {

	constructor(_x,_y){
		var cannon;
		var passedTime, energy;
        var shipHit;
        
        this.shipHitColorArray=[color(56,64,176),
                               color(74,86,240),
                               color(165,184,251),
                               color(255,255,255),
                               color(165,184,251),
                               color(74,86,240)];
        this.shipHitColorArrayIdx=0;

		this.x = _x;
    	this.y = _y;
		this.width=28;
	    this.height=40;
    	this.foreColor = color(56,64,176);
        this.shipHit = false;
    	this.passedTime=0;
        
    	this.cannon =  {
	    	x: this.x+(this.width/2),
    		y: this.y-10
    	}
    	this.passedTime=0
    	this.energy=0;
    	this.collider = {
    		x1: this.x+2,
    		y1: this.y+2,
    		x2: this.x+2+this.width-4,
    		y2: this.y+2+this.height-4
    	}
	}

	Move = function (dir) {
        this.x += dir*5;
        this.SetCannon();
        this.SetCollider();
    }


    Show = function (_playing) {
        if(_playing) this.Update();

        noStroke();
        fill(this.foreColor);
		//---------------------------
		rect(this.x,this.y+(this.height/2),4,(this.height/2),2);
        rect(this.x+4,this.y+(this.height/2)+(this.height/6),4,4);
        rect(this.x+this.width-4,this.y+(this.height/2),4,(this.height/2),2);
        rect(this.x+this.width-8,this.y+(this.height/2)+(this.height/6),4,4);

        rect(this.x+8,this.y+(this.height/2)+2,this.width-16,(this.height/6),
            2,2,0,0);
        rect(this.x+4.5,this.y+5,this.width-9   ,4);

        rect(this.x+(this.width/2)-2,this.y,4,this.height/6*5,1);
        rect(this.x+8,this.y+2,this.width-16,12,
            2,2,3,3);
        //---------------------------
    }


    Update = function (){
        this.passedTime+=deltaTime;

        if(this.shipHit){
            if(this.passedTime>=100){
                this.passedTime=0;
                this.foreColor = this.shipHitColorArray[this.shipHitColorArrayIdx];
                if(this.shipHitColorArrayIdx==3){
                    this.shipHitColorArrayIdx=0;
                }else{
                    this.shipHitColorArrayIdx++;
                }

            }
            return;
        }
    	this.foreColor = color(56,64,176);

    	if(this.passedTime>=500){
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
        var vWidth=36;
        var vHeight=22;

        noStroke();
        fill(foreColor);

        rect(_x,_y,(vWidth/2),3,2);
        rect(_x+(vWidth/2)-(vWidth/6)-3,_y+3,3,4);

        rect(_x,_y+vHeight-3,(vWidth/2),3,2);
        rect(_x+(vWidth/2)-(vWidth/6)-3,_y+vHeight-6,3,4);
        
        rect(_x+(vWidth/2)-2-vWidth/6,_y+6,vWidth/6,vHeight-12,
            0,2,2,0);
        
        rect(_x+vWidth-9,_y+3.5,3,vHeight-7);

        rect(_x+(vWidth/6),_y+(vHeight/2)-2,vWidth/6*5,3,1);

        rect(_x+vWidth-2-12,_y+6,12,vHeight-12.5,
            3,2,2,3);
    }
}