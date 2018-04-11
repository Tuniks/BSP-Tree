var height = 480;
var width = 640;

var mouseStartPos;
var mouseEndPos;
var auxPoint;
var toDraw = false;

var lines = [];
var pressedMouseLine = null;

function setup() {
  createCanvas(width, height);
  mouseStartPos = createVector(0,0);
  mouseEndPos = createVector(0,0);
  auxPoint = createVector(0,0);
}

function draw() {
  stroke(153);  
  clear();
  line(0,0,100, 10);
  if (pressedMouseLine != null){
  	line(pressedMouseLine[0], pressedMouseLine[1], pressedMouseLine[2], pressedMouseLine[3])
  }
  for (var i = 0; i < lines.length; i++){
  	line(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);
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
	lines.push([mouseStartPos.x, mouseStartPos.y, mouseEndPos.x, mouseEndPos.y]);
	pressedMouseLine = null;

	return false;
}

function mouseDragged(){
	pressedMouseLine = [mouseStartPos.x, mouseStartPos.y, mouseX, mouseY];
}





class Node {
	constructor(vertices){
		this.vertices = vertices;
		this.color = [random(255), random(255), random(255)];
		this.noChildren = true;
		children = [null, null];
	}

	draw(){

	}

	checkIfDividing(start, end){
		if ((checkIfInside(start, this.vertices)) && (checkIfInside(end, this.vertices)) && (noChildren)){
			createChildren(start, end);
		} else if  ((checkIfInside(start, this.vertices)) && (checkIfInside(end, this.vertices)) && (!noChildren)){
			if(this.children[0] != null)
				checkIfDividing(this.children[0])
			if(this.children[1] != null)
				checkIfDividing(this.children[1])
		} else if ((checkIfInside(start, this.vertices)) || (checkIfInside(end, this.vertices)))
			//deleteNode
		}
	}

	createChildren(start, end){
		this.noChildren = false;

		var newStart = createVector(0,0);
		var newEnd = createVector(0,0);
		var auxStart = createVector(0,0);
		var auxEnd = createVector(0,0);

		//geting y = ax+b
		if(end.x - start.x == 0)
			end.x += 0.00001;
		var a = (end.y - start.y) / (end.x - start.x);
		var b = end.y - a * end.x;
		//expanding line segment to the screen limits for covenience sake
		newStart.x = 0;
		newStart.y = b;
		newEnd.x = width;
		newEnd.y = a * width + b;

		//testing if line segments intersect and getting those points
		for(var i = 0; i < vertices.length; i++){
			auxStart.x = vertices[i][0];
			auxStart.y = vertices[i][1];
			mod = (i+1)%vertices.length;
			auxEnd.x = vertices[mod][0];
			auxEnd.y = vertices[mod][1];
			if(intersectionExists(start, end, auxStart, auxEnd)){

			}
		}

	}

	checkIfInside(point, vertices){
		//baseado em https://github.com/substack/point-in-polygon
		var x = point.x;
		var y = point.y;
		isInside = false;

		for (var i = 0, j = vertices.length - 1; i < vertices.length; j = i++){
			var xi = vertices[i][0];
			var yi = vertices[i][1];
			var xj = vertices[j][0];
			var yj = vertices[j][1];

			if (((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi))
				inside = !inside;
		}

		return inside;
	}

	intersectionExists(startR, endR, startS, endS){
		//baseado em https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
		var det, gamma, lambda;
		det = (endR.x - startR.x) * (endS.y - startS.y) - (endS.x - startS.x) * (endR.y - startR.y);
		if(det == 0)
			return false;
		else{
			lambda = ((endS.y - startS.y) * (endS.x - startR.x)
						 + (startS.x - endS.x) * (endS.y - startR.y)) / det;
			gamma = ((startR.y - endR.y) * (endS.x - startR.x)
						 + (endR.x - startR.x) * (endS.y - startR.y)) / det;
			return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
		}
	}

	intersectionPoint(startR, endR, startS, endS){
		//y = ax + b
		if(endR.x - startR.x == 0)
			endR.x += 0.00001;
		var a = (endR.y - startR.y) / (endR.x - startR.x);
		var b = endR.y - a * endR.x;

		//y = cx + d
		if(endS.x - startS.x == 0)
			endS.x += 0.00001;
		var c = (endS.y - startS.y) / (endS.x - startS.x);
		var d = endS.y - c * endS.x;

		var r = createVector((d-b)/(a-c),(a*d - b*c)/(a - c));
		return r;
	}


}