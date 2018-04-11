var height = 720;
var width = 1280;

var mouseStartPos;
var mouseEndPos;
var auxPoint;
var toDraw = false;

var pressedMouseLine = null;

var initialVertices = [[0,0],
						[width, 0],
						[width, height],
						[0, height]]
var rootNode;

function setup() {
  createCanvas(1280, 720);
  mouseStartPos = createVector(0,0);
  mouseEndPos = createVector(0,0);
  auxPoint = createVector(0,0);
  rootNode = new Node(initialVertices, null, null);
}

function draw() {
  clear();
  stroke(255,255,255);
  strokeWeight(4);
  rootNode.draw();
  if (pressedMouseLine != null){
  	line(pressedMouseLine[0], pressedMouseLine[1], pressedMouseLine[2], pressedMouseLine[3])
  }
}

function mousePressed(){
	mouseStartPos.x = mouseX;
	mouseStartPos.y = mouseY;
	return false;
}

function mouseReleased(){
	mouseEndPos.x = mouseX;
	mouseEndPos.y = mouseY;
	pressedMouseLine = null;
	rootNode.checkIfDividing(mouseStartPos, mouseEndPos);
	return false;
}

function mouseDragged(){
	pressedMouseLine = [mouseStartPos.x, mouseStartPos.y, mouseX, mouseY];
}