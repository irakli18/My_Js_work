// 2 dots challenge! Made by IKO
var delay=40;
var point=0;
var rect;
var x;
var dx;
var dy;
var circle1;
var circle2;
var circle3;
var CIRCLE_RADIUS=10;
var xSpeed=0;
var sound = new Sound("d4", "triangle");
var ypos;
var defeat;
var topline;
var bottomline;
var firstline;
var secondline;
var timeToChange=1;

function start(){
    drawSquare(Color.black, getWidth(), getHeight(),0,0);
    mouseClickMethod(action);
    startingText();
}
function action(){
    drawSquare(Color.black, getWidth(), getHeight(),0,0);
    drawCenterCircles(CIRCLE_RADIUS,getWidth()/2, getHeight()/2);
    shootingBalls();
    mouseClickMethod(shoot);
    lines();
    setTimer(checkline, 10);
    setTimer(rotateCircles, delay);
    drawPointText();
}
function checkMatchColor(){
    if (circle3.getY() - circle3.getRadius() == bottomline.getY()) {
        var elem1 = getElementAt(circle3.getX(), circle3.getY() -10 );
	    } if (elem1 != null && elem1.getColor() == circle3.getColor()) {
		    point++;
		    stopTimer(rotateCircles);
		    delay-=4;
		    sound.playFor(0.1);
		    stopTimer(shootToTop);
		    stopTimer(shootToBottom);
		    remove(x);
		    remove(circle3);
		    drawPointText();
		    action();
	    }
	if (circle3.getY() + circle3.getRadius() == topline.getY()) {
        var elem = getElementAt(circle3.getX(), circle3.getY() +10);
        if (elem != null && elem.getColor() == circle3.getColor()) {
		    point++;
		    stopTimer(rotateCircles);
		    delay-=4;
		    sound.playFor(0.1);
		    stopTimer(shootToTop);
		    stopTimer(shootToBottom);
		    remove(x);
		    remove(circle3);
		    drawPointText();
		    action();
        }
	}
}

function lines() {
    topline = new Line(175,200,225,200);
	bottomline= new Line(175,270,225,270);
	add(topline);
	add(bottomline);
}
function checkline(){
    if (circle1.getY()<circle2.getY()) {
	    topline.setColor(Color.red);
	    bottomline.setColor(Color.cyan);
	} if (circle1.getY()>circle2.getY()) {
	    topline.setColor(Color.cyan);
	    bottomline.setColor(Color.red);
	}
}
function shoot(e) {
    if (ypos==2) {
        setTimer(shootToTop, 30);
    }
    if (ypos==1) {
        setTimer(shootToBottom, 30);
    }
}
function shootToTop() {
    if (circle3.getY() - circle3.getRadius() != bottomline.getY()) {
        circle3.move(0,-10);
        checkMatchColor();
    } else {
        lose();
    }
}
function shootToBottom() {
    if (circle3.getY() + circle3.getRadius() != topline.getY()) {
        circle3.move(0,10);
        checkMatchColor();
    } else {
        lose();
    }
}
function shootingBalls(){
    ypos=Randomizer.nextInt(1,2);
    var color=Randomizer.nextInt(1,2);
    if (ypos==1 && color == 1 ) {
        drawCircle(CIRCLE_RADIUS,Color.red,getWidth()/2,CIRCLE_RADIUS);
    }
    if (ypos==1 && color == 2) {
        drawCircle(CIRCLE_RADIUS,Color.cyan,getWidth()/2,CIRCLE_RADIUS);
    }
    if (ypos==2 && color == 1) {
        drawCircle(CIRCLE_RADIUS,Color.red,getWidth()/2,getHeight()-CIRCLE_RADIUS);
    }
    if (ypos==2 && color == 2) {
        drawCircle(CIRCLE_RADIUS,Color.cyan,getWidth()/2,getHeight()-CIRCLE_RADIUS);
    }
}
function rotateCircles() {
	xSpeed += 0.1;
	dx = 10 * Math.cos(xSpeed);
	dy = 10 * Math.sin(xSpeed);
	if (point != 0 && point % 3 ==0) {
	    dy=-dy;
	    xSpeed +=0.05;
	}
	circle1.setPosition(getWidth()/2 + dx, getHeight()/2-CIRCLE_RADIUS/2 - dy);
	circle2.setPosition(getWidth()/2 - dx, getHeight()/2-CIRCLE_RADIUS/2 + dy);
}

function drawCenterCircles(radius,x,y){
    circle1 = new Circle(radius);
    circle1.setPosition(x+CIRCLE_RADIUS,y);
    circle1.setColor(Color.red);
    add(circle1);
    circle2 = new Circle(radius);
    circle2.setPosition(x-CIRCLE_RADIUS,y);
    circle2.setColor(Color.cyan);
    add(circle2);
}
function drawPointText(){
    x= new Text(point, "30pt Arial");
    x.setPosition(10,40);
    x.setColor(Color.white);
    add(x);
}
function drawCircle(radius,color,x,y){
    circle3 = new Circle(radius);
    circle3.setPosition(x,y);
    circle3.setColor(color);
    add(circle3);
}
function drawSquare(color, width, height,x,y ){
    rect = new Rectangle(width, height);
    rect.setPosition(x,y);
    rect.setColor(color);
    add(rect);
}
function startingText() {
    var text= new Text("2 Balls Challenge", "30pt Monoscape");
    text.setPosition(getWidth()/2- text.getWidth()/2,getHeight()/2);
    text.setColor(Color.red);
    add(text);
    var text1= new Text("Click to Start", "20pt Arial");
    text1.setPosition(getWidth()/2- text1.getWidth()/2,getHeight()/2 + 50);
    text1.setColor(Color.red);
    add(text1);
    var text2= new Text("Try to get 10 points", "10pt Arial");
    text2.setPosition(getWidth()/2- text2.getWidth()/2,getHeight()/2 + 80);
    text2.setColor(Color.yellow);
    add(text2);
    firstline = new Line(50,190,350,190);
    add(firstline);
    secondline = new Line(50,340,350,340);
    add(secondline);
    setTimer(changeLineColor, 500);
}
function changeLineColor(){
    timeToChange++;
    if (timeToChange % 2 == 0) {
        firstline.setColor(Color.cyan);
        secondline.setColor(Color.red);
    } else {
        firstline.setColor(Color.red);
        secondline.setColor(Color.cyan);
    }
}
function lose (){
    removeAll();
    drawSquare(Color.black, getWidth(), getHeight(),0,0);
    var defeat= new Text("Your score is: " + point + " point", "25pt Monoscape");
    defeat.setPosition(getWidth()/2- defeat.getWidth()/2,getHeight()/2);
    defeat.setColor(Color.red);
    add(defeat);
    var defeat2= new Text(" Click to try again", "20pt Arial");
    defeat2.setPosition(getWidth()/2- defeat2.getWidth()/2,getHeight()/2 + 50);
    defeat2.setColor(Color.white);
    add(defeat2);
    mouseClickMethod(tryAgain);
}
function tryAgain() {
    removeAll();
    stopTimer(rotateCircles);
    stopTimer(shootToTop);
    stopTimer(shootToBottom);
    point=0;
    delay=40;
    action();
}