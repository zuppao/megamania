//https://p5js.org/reference
// http://www.atari2600.com.br/Sites/Atari/AtariFull.aspx
// criar uma funcao pra quando matar todos os enemies...
//  - transformar a barra de energia em pontos... e recomecar...

//var ship;
var hud;
var shipBullet;
var hamburgers = [];
var enemyBullets = []

var xwing;
var teste;
var stopGame;
var lives;
var score;

function setup() {
    //atari resolution... [160x192] [192,224]
    createCanvas(570,356);

    //this.ship = new Ship();
    this.hud = new HUD();
    for (var i = 0; i < 6; i++) {
        this.hamburgers[i] = new Hamburger(width+(100*i),10,1);
        this.hamburgers[i+6] = new Hamburger(width+(100*i)+50,34,1);
        this.hamburgers[i+12] = new Hamburger(width+(100*i),58,1);
    }
    this.shipBullet = null;

    //this.xwing = new XWing(width/2,height/4*3);
    this.xwing = new Enterprise((width/2)-16,232);
    this.teste = new Teste(200,228);
    //frameRate(120);//120

    this.stopGame = false;
    this.lives=3;
    this.score=0;
}
function draw() {
    if(this.stopGame){
        return;
    }
    this.Update();



    noStroke();
	background(15);
    

    // show and move the enemies
    for (var i = 0; i < this.hamburgers.length; i++) {
        this.hamburgers[i].Move();
        this.hamburgers[i].Show();

        //check if it should shoot
        if(i>=this.hamburgers.length-6){
            var r = round( random(1,350));
            if(r===3){
                var enemyBullet = new EnemyBullet(this.hamburgers[i].x+(this.hamburgers[i].width/2), this.hamburgers[i].y+(this.hamburgers[i].height/2));
                this.enemyBullets.push(enemyBullet);
            }   
        }

    }
	
    //show and move the spaceship 'Bullets'
    if(this.shipBullet != null){
        this.shipBullet.Move();
        this.shipBullet.Show();

       for (var j = 0; j < this.hamburgers.length; j++) {
            if (this.shipBullet.Hits(this.hamburgers[j])) {
                this.shipBullet=null;
                this.hamburgers.splice(j,1);
                this.score+=20;
                break;
            }
        }

        if(this.shipBullet != null && this.shipBullet.y <= 0){
            this.shipBullet=null;
        }
    }






    //show and move the enemies 'Bullets'
    for (var i = 0; i < this.enemyBullets.length; i++){
            this.enemyBullets[i].Move();
            this.enemyBullets[i].Show();
            if(this.enemyBullets[i].Hits(this.xwing)){
                this.enemyBullets.splice(i,1);
                this.ShipHit();
                break;
            }
            if(this.enemyBullets[i].y>=height){
                this.enemyBullets.splice(i,1);
            }
    }



    this.xwing.Show();
    //this.teste.Show();
    noStroke();
    this.hud.Show(this.lives,this.score,this.xwing.energy);
}

function Update() {

    if (keyIsDown(RIGHT_ARROW) && 
        (this.xwing.x+this.xwing.width)<(this.hud.x+this.hud.width)) {
        //this.ship.Move(0.5);
        this.xwing.Move(0.5);
    }
    if (keyIsDown(LEFT_ARROW) &&
        this.xwing.x>this.hud.x) {
        //this.ship.Move(-0.5);
        this.xwing.Move(-0.5);
    }

    if(this.xwing.energy<=0){
        console.log('game over');
        this.stopGame=true;    
    }

    if(this.hamburgers.length==0){
        console.log('YOU WON');
        this.stopGame=true;
        this.YouWon();
    }
}


function keyPressed() {
	if (key === ' ' && this.shipBullet === null) {
        this.shipBullet = new ShipBullet(this.xwing.cannon.x, this.xwing.cannon.y);
    }

}



function ShipHit() {
    this.stopGame=true;
    this.lives-=1;
    if(this.lives==0){
        console.log('game over');
        return;
    }

    Repositioning();
    this.enemyBullets.splice(0,this.enemyBullets.length);
    this.xwing.energy=100;
    this.stopGame=false;
}

function Repositioning () {
    for (var i = 0; i < this.hamburgers.length; i++) {
        this.hamburgers[i].x += width;
    }
    this.xwing.x = (width/2)-16;
    this.xwing.y = 232;
}






