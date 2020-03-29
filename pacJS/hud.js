class EnergyBar {
	constructor(_x,_y){
		this.x=_x;
		this.y=_y;
		this.width=300;
		this.height=10;
		this.backColor = color(156,32,32);
		this.foreColor = color(208,208,80);
	}

	Show = function (_energy){
		fill(this.backColor);
        rect(this.x,this.y,this.width,this.height);
        
        fill(this.foreColor);
        rect(this.x,this.y,
        	 _energy*this.width/100,
        	 this.height);
	}
}


class HUD {
	constructor(){
		var energyBar;
		this.width = 540;
    	this.height = 60;
    	this.x = (width / 2) - (this.width/2);
    	this.y = 276;

    	this.energyBar = new EnergyBar(this.x+((this.width-250)/2),this.y+5);
	}

	Show = function (_lives,_score,_energy){
		//backgrount
		fill(144,144,144);
        rect(this.x, this.y, this.width, this.height);

        //Energy Bar
        this.energyBar.Show(_energy);

        //'ENERGY' string...
        fill(0);
        //textStyle(BOLD);
        textFont('Wide Latin');
        textSize(11);
        textAlign(LEFT);
        text('ENERGY',this.x+40,this.y+14);
		
        //Score
		fill(28,32,156);
        //textStyle(BOLD);
        textFont('Wide Latin');
        textSize(20);
        textAlign(RIGHT);
        text(_score,(width/2)+130,this.y+55);

        //'joke' string
        fill(160,160,52);
        textStyle(BOLDITALIC);
		textFont('Arial');
		textSize(12);
		textAlign(LEFT);
        text('ZUPTIVISION',this.x+60,this.y+74);
        textStyle(NORMAL);

        //Lives....
        for(var i=0;i<_lives;i++){
        	Enterprise.ShowLive(this.energyBar.x+16+(i*42),this.energyBar.y+7.5);	
        }
		//Enterprise.ShowLive(this.energyBar.x+16,this.energyBar.y+7.5);
		//Enterprise.ShowLive(this.energyBar.x+58,this.energyBar.y+7.5);
        //Enterprise.ShowLive(this.energyBar.x+100,this.energyBar.y+7.5);
	}

}









