//https://p5js.org/reference
// http://www.atari2600.com.br/Atari/Roms/01mL/Megamania
// criar uma funcao pra quando matar todos os enemies...
//
// -> Backlog <-
//  - desenhar nave original e deixar disponivel
//  - clean-up

//var ship;
var hud;
var shipBullet;
var hamburgers = [];
var enemyBullets = [];

var xwing;
var teste;
var stopGame, gameOver, pauseGame, gameStep;
var lives;
var score;
var sfxEmptying, sfxEnemyHit, sfxLoad, sfxShipHit, sfxShipShoot, sfxEmptyingLoop;
var elapsedTime, shipHitElapsedTime;
var elapsedPoints;
const GAMESTEPS = {
    FUELLING: 'fuelling',
    EMPTYING: 'emptying',
    PLAYING: 'playing',
    SHIP_HIT: 'ship_hit',
    PAUSED: 'paused',
    RESET: 'reset',
    RESTART: 'restart'

};


function preload(){
    soundFormats('wav');
    this.sfxEmptying = loadSound('sfx/emptying');
    this.sfxEmptyingLoop = new p5.SoundLoop(function (){
                                                sfxEmptying.play();
                                            },0.45);
    this.sfxEnemyHit = loadSound('sfx/enemyHit');
    this.sfxLoad = loadSound('sfx/load');
    this.sfxShipHit = loadSound('sfx/shipHit');
    this.sfxShipShoot =loadSound('sfx/shipShoot');
}


function setup() {
    //atari resolution... [160x192] [192,224]
    createCanvas(570,356);

    this.hud = new HUD();
    this.shipBullet = null;
    this.xwing = new Enterprise((width/2)-16,232);
    this.RepositionShip();
    this.teste = new Teste(200,228);
    //frameRate(120);//120

    this.gameOver=false;
    this.lives=3;
    this.score=0;
    this.elapsedPoints=0;
    
    this.pauseGame=false;
    this.stopGame = true;
    this.gameStep = GAMESTEPS.RESET;

    this.elapsedTime=0;
    this.shipHitElapsedTime=0;
    //for (var i = 0; i < 6; i++) {
    //    this.hamburgers[i] = new Hamburger(width+(100*i),10,1);
    //    this.hamburgers[i+6] = new Hamburger(width+(100*i)+50,34,1);
    //    this.hamburgers[i+12] = new Hamburger(width+(100*i),58,1);
    //}

    //teste.....
    
    
}

function draw() {
    if(this.gameOver){
        return;
    }

    if(this.gameStep === GAMESTEPS.PAUSED){
        this.ScreenMessage('GAME PAUSED!');
        return;
    }

    if(this.gameStep === GAMESTEPS.PLAYING){
        this.Update();
    }
    
    noStroke();
    background(15);



    if(this.stopGame){
        //console.log('rotinas..');
        this.elapsedTime+=deltaTime;
        if(this.elapsedTime>=20){
            this.shipHitElapsedTime+=this.elapsedTime;
            this.elapsedTime=0;



            switch(this.gameStep){
                case GAMESTEPS.FUELLING:
                    this.xwing.energy+=2.5;
                    //console.log(this.xwing.energy);
                    if(this.xwing.energy>=100){
                        //this.gameStep = GAMESTEPS.RESET;
                        this.gameStep = GAMESTEPS.PLAYING;
                        this.stopGame=false;
                        //console.log(this.gameStep);
                        //console.log(this.stopGame);
                    }
                    break;
                case GAMESTEPS.EMPTYING:
                    this.xwing.energy-=1;
                    this.score+=15;this.elapsedPoints+=15;

                    if(this.xwing.energy<=0){
                        this.xwing.energy=0;
                        this.sfxEmptyingLoop.stop();
                        this.gameStep = GAMESTEPS.RESET;
                    }
                    break;
                case GAMESTEPS.SHIP_HIT:
                    //animacao...
                    //console.log(this.shipHitElapsedTime);
                    if(this.shipHitElapsedTime>4000){
                        this.shipHitElapsedTime=0;
                        this.gameStep = GAMESTEPS.RESTART;
                        this.xwing.shipHit=false;
                        this.RepositionShip();
                    }
                    break;
                case GAMESTEPS.RESTART:
                    this.Restart();
                    this.gameStep = GAMESTEPS.FUELLING;
                    this.sfxLoad.play();
                    break;
                case GAMESTEPS.RESET:                
                    //this.elapsedTime=0;
                    //this.RepositionShip();
                    for (var i = 0; i < 6; i++) {
                        this.hamburgers[i] = new Hamburger(width+(100*i),10,1);
                        this.hamburgers[i+6] = new Hamburger(width+(100*i)+50,34,1);
                        this.hamburgers[i+12] = new Hamburger(width+(100*i),58,1);
                    }
                    //this.stopGame=false;
                    //this.gameStep = GAMESTEPS.PLAYING;
                    this.gameStep = GAMESTEPS.FUELLING;
                    this.sfxLoad.play();
                    break;

            }



            
/*
            if(this.xwing.energy<=0){
                //reset
                this.xwing.energy=100;
                this.elapsedTime=0;

                for (var i = 0; i < 6; i++) {
                    this.hamburgers[i] = new Hamburger(width+(100*i),10,1);
                    this.hamburgers[i+6] = new Hamburger(width+(100*i)+50,34,1);
                    this.hamburgers[i+12] = new Hamburger(width+(100*i),58,1);
                }
                this.stopGame=false;
            }
*/




        }






    }else {
        //playing.........

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



        //show and move the ship 'Bullets'
        //check if the ship bullet hits the enemy
        if(this.shipBullet != null){
            this.shipBullet.Move();
            this.shipBullet.Show();

           for (var j = 0; j < this.hamburgers.length; j++) {
                if (this.shipBullet.Hits(this.hamburgers[j])) {
                    this.sfxEnemyHit.play();
                    this.shipBullet=null;
                    this.hamburgers.splice(j,1);
                    this.score+=20;this.elapsedPoints+=20;
                    break;
                }
            }

            if(this.shipBullet != null && this.shipBullet.y <= 0){
                this.shipBullet=null;
            }
        }

        //show and move the enemies 'Bullets'
        //check if the enemy bullet hits the ship
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


        //this.xwing.Show();

    }
    this.xwing.Show();

    if(this.elapsedPoints>=4000){
        this.elapsedPoints=0;
        this.lives+=1;
    }
    
    noStroke();
    this.hud.Show(this.lives,this.score,this.xwing.energy);
}




function Update() {
    if(this.stopGame){
        return;
    }

    if (keyIsDown(RIGHT_ARROW) && 
        (this.xwing.x+this.xwing.width)<(this.hud.x+this.hud.width)) {
        this.xwing.Move(0.5);
    }
    if (keyIsDown(LEFT_ARROW) &&
        this.xwing.x>this.hud.x) {
        this.xwing.Move(-0.5);
    }

    if(this.xwing.energy<=0){
        this.GameOver();
    }



    if(this.hamburgers.length==0){
        //next stage......
        this.stopGame=true;
        this.gameStep = GAMESTEPS.EMPTYING;
        this.sfxEmptyingLoop.start();
        //this.YouWon();
    }
}


function keyPressed() {
    if(this.stopGame){
        return;
    }

	if (key === ' ' && this.shipBullet === null) {
        this.shipBullet = new ShipBullet(this.xwing.cannon.x, this.xwing.cannon.y);
        this.sfxShipShoot.play();
    }

    if(key === 'Control'){
        //this.gameStep = (this.gameStep == GAMESTEPS.PLAYING ? GAMESTEPS.PAUSED : this.gameStep);
        if(this.gameStep === GAMESTEPS.PLAYING){
            this.gameStep = GAMESTEPS.PAUSED;
        } else if(this.gameStep === GAMESTEPS.PAUSED){
            this.gameStep = GAMESTEPS.PLAYING;
        }


        //teste.....
        this.sfxEmptyingLoop.stop();
        //this.gameStep = 'paused';
    }
}



function ShipHit() {
    this.stopGame=true;
    this.lives-=1;
    if(this.lives<0){
        this.GameOver();
        return;
    }
    this.xwing.shipHit=true;
    //Repositioning();
    //this.enemyBullets.splice(0,this.enemyBullets.length);
    //this.xwing.energy=0;
    this.gameStep = GAMESTEPS.SHIP_HIT;
    this.sfxShipHit.play();
}

//eliminat essa funcao
/*
function Repositioning () {
    for (var i = 0; i < this.hamburgers.length; i++) {
        this.hamburgers[i].x += width;
    }
    this.xwing.x = (width/2)-16;
    this.xwing.y = 232;
}*/

function Restart() {
    this.enemyBullets.splice(0,this.enemyBullets.length);
    this.shipBullet=null;
    this.xwing.energy=0;
    for (var i = 0; i < this.hamburgers.length; i++) {
        this.hamburgers[i].x += width;
    }
    //this.RepositionShip();    
}

function RepositionShip(){
    this.xwing.x = (width/2)-16;
    this.xwing.y = 232;   
}

function ScreenMessage(_text){
        noStroke();
        fill(10,200,20);
        textFont('Verdana');
        textSize(36);
        text(_text,150,height/2);    
}


function GameOver(){
    this.ScreenMessage('GAME OVER');
    this.gameOver=true;
    //console.log('game over');
}