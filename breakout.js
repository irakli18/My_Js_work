/* Constants for bricks */
var NUM_ROWS = 8;
var BRICK_TOP_OFFSET = 10;
var BRICK_SPACING = 2;
var NUM_BRICKS_PER_ROW = 10;
var BRICK_HEIGHT = 10;
var SPACE_FOR_BRICKS = getWidth() - (NUM_BRICKS_PER_ROW + 1) * BRICK_SPACING;
var BRICK_WIDTH = SPACE_FOR_BRICKS / NUM_BRICKS_PER_ROW;
var Xpos=BRICK_SPACING;
var Ypos=BRICK_TOP_OFFSET;

/* Constants for ball and paddle */
var PADDLE_WIDTH = 80;
var PADDLE_HEIGHT = 15;
var PADDLE_OFFSET = 10;
var BALL_RADIUS = 15;
var dx = 5;
var dy = 5;
var ball;
var paddle;
var rect;
var life=3;
var lives=new Text(life, "30pt Monoscape");
lives.setPosition(0,getHeight()/2);
add(lives);
var countertowin=80;
var score=0;

function start(){
	drawSet(Color.red);
	drawSet(Color.orange);
	drawSet(Color.green);
	drawSet(Color.blue);
	
	ball = new Circle(BALL_RADIUS);
	ball.setPosition(getWidth()/2, getHeight()/2);
	add(ball);
	setTimer(check, 20);
	mouseClickMethod(stop);
	
	paddle = new Rectangle(PADDLE_WIDTH, PADDLE_HEIGHT);
	paddle.setPosition(getWidth()/2-PADDLE_WIDTH/2, getHeight()-PADDLE_HEIGHT-PADDLE_OFFSET);
	add(paddle);
	mouseMoveMethod(control);
}
function control(e){
    if (e.getX()+PADDLE_WIDTH/2  < getWidth() && e.getX()-PADDLE_WIDTH/2  > 0 ) {
        paddle.setPosition(e.getX()-PADDLE_WIDTH/2, getHeight()-PADDLE_HEIGHT-PADDLE_OFFSET);
    }
}
function check(){
    ball.move(dx, dy);
	checkWalls();
	lives.setText(life);
	checkPaddleCol();
	checkBrickCol();
	if (life==0) {
	    removeAll();
	    var lose=new Text("You lose, Your score is: " + score + " points", "15pt Monoscape");
        lose.setPosition(getWidth()/2 - lose.getWidth()/2,getHeight()/2);
        lose.setColor(Color.red);
        add(lose);
        stopTimer(check);
	}
	if (countertowin==0) {
	    removeAll();
	    var win=new Text("You Win :)", "30pt Monoscape");
        win.setPosition(getWidth()/2 - win.getWidth()/2,getHeight()/2);
        win.setColor(Color.green);
        add(win);
        stopTimer(check);
	}
	
}
//check paddle surface and paddle sides
function checkPaddleCol() {
    if(ball.getY() + ball.getRadius() > getHeight()-PADDLE_HEIGHT-PADDLE_OFFSET && ball.getX() >= paddle.getX() && ball.getX() <= paddle.getX()+PADDLE_WIDTH ){
		dy = -dy;
    }
    if (ball.getY() + ball.getRadius()>= getHeight()-PADDLE_HEIGHT-PADDLE_OFFSET && ball.getY() + ball.getRadius() <= getHeight() && ball.getX()+ball.getRadius() == paddle.getX() ) {
        dx = -dx;
    }
}
function checkBrickCol() {
	var elem = getElementAt(ball.getX(), ball.getY()-ball.getRadius()-1);
	    if (elem != null && elem != lives && elem != paddle) {
	        dy = -dy;
		    remove(elem);
		    countertowin--;
		    score++;
	    }
	    var elem = getElementAt(ball.getX()-ball.getRadius()-1, ball.getY());
	    if (elem != null && elem != lives && elem != paddle) {
	        dy = -dy;
		    remove(elem);
		    countertowin--;
		    score++;
	    }
	    var elem = getElementAt(ball.getX()+ball.getRadius()+1, ball.getY());
	    if (elem != null && elem != lives && elem != paddle) {
	        dy = -dy;
		    remove(elem);
		    countertowin--;
		    score++;
	    }
    }

function checkWalls(){
	// Bounce off right wall
	if(ball.getX() + ball.getRadius() > getWidth()){
		dx = -dx;
	}
	// Bounce off left wall
	if(ball.getX() - ball.getRadius() < 0){
		dx = -dx;
	}
	// Bounce off bottom line, 
	if(ball.getY() + ball.getRadius() > getHeight()){
	    life= life-1;
		dy = -dy;
	}
	// Bounce off top wall
	if(ball.getY() - ball.getRadius() < 0){
		dy = -dy;
	}
}
function drawSet(color) {
    for (var i = 0; i < NUM_BRICKS_PER_ROW * 2; i++ ) {
	    drawRect(color, Xpos,Ypos);
	    Xpos += BRICK_WIDTH +BRICK_SPACING;
	    if (Xpos >= getWidth()){
	        Ypos = Ypos + BRICK_HEIGHT +BRICK_SPACING;
	        Xpos = BRICK_SPACING
	    }
	}
}
function drawRect(color, x,y) {
    rect= new Rectangle(BRICK_WIDTH,BRICK_HEIGHT);
    rect.setColor(color);
    rect.setPosition(x,y);
	add(rect);
}
function stop(){
    stopTimer(check);
	mouseClickMethod(resume);
}

function resume(){
    setTimer(check, 20);
    mouseClickMethod(stop);
}
//Made by iko