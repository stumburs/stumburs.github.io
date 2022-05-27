let wind;

let leaf;

let leaves = [];

let noiseValue = 0;

function setup() {
	createCanvas(windowWidth, windowHeight / 1.25);
	wind = new Wind();
	leaf = new Leaf();

	for (let i = 0; i < 4000; i++) {
		leaves[i] = new Leaf();
	}
}

function draw() {
	background(0, 5);
	
	//translate(width / 2, height / 2);

	wind.update();
	//wind.draw();

	leaf.update();
	leaf.draw();

	for (let i = leaves.length - 1; i >= 0; i--) {
		leaves[i].update();
		leaves[i].draw();

		if (leaves[i].finished()) {
			leaves.splice(i, 1);
			leaves.push(new Leaf(0));
		}
	}

	fill(255);
	text("Particles: " + str(leaves.length), 20, 20);

}


class Wind {
	constructor() {
		this.vec = createVector(200, 0);

	}

	update() {

		//noiseValue += 0.01;

		this.vec.x = mouseX - width / 2;//map(noise(noiseValue), 0, 1, 0, 200);


	}

	draw() {
		push();
		translate(width / 2, height / 2);
		stroke(255);
		strokeWeight(2);
		line(0, 0, this.vec.x, this.vec.y);
		pop();
	}

}

class Leaf {
	constructor(y) {
		//this.pos = createVector(random(-width * 4, width), random(-height, 0));
		if (y) {
		this.pos = createVector(random(-width * 2, width * 3), y);

		}
		else {
			this.pos = createVector(random(-width * 2, width * 3), random(-height, 0));
		}

		this.vel = createVector(0, 0);
		this.gravity = createVector(0, 0.01);
		this.fallSpeed = map(random(100), 0, 100, 1, 3);
		this.red = random(0);
		this.green = random(255);
		this.randomOffset = random(-100, 50);
	}

	finished() {
		if (this.pos.y >= height) {
			return true;
		}
	}

	update() {
		let x = (0 + wind.vec.x);//dist(0, 0, wind.vec.x, wind.vec.y);
		let xNew = x + this.randomOffset;
		this.pos.y += this.fallSpeed;
		this.pos.x += xNew / 100;
	}

	draw() {
		fill(this.red, this.green, 0);
		noStroke();
		ellipse(this.pos.x, this.pos.y, 10);
	}
}