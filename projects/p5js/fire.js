let particles = [];
let maxParticles = 10;
let particle;
let fps = 0;

function setup() {
	createCanvas(windowWidth, windowHeight / 1.25);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);

	let particleAmount = particles.length;

	if (frameCount % 2 == 0) {
		fps = frameRate();
	}



	if (mouseIsPressed) {
		for (let i = 0; i < 5; i++) {
			particles.push(new Particle());
	
		}
	}
	
	for (let i = particles.length-1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();


		if (particles[i].finished()) {
			particles.splice(i, 1);
		}

	}

	fill(255);

	text("Hold left mouse button to make fire", 20, 20);
	text("Particle Count: " + particleAmount, 20, 40);
	text("FPS: " + floor(fps), 20, 60);

}

class Particle {
	constructor() {
		this.x = mouseX;
		this.y = mouseY;
		this.r = 32;
		this.vx = map(random(-100, 100), -100, 100, -1, 1);
		this.vy = map(random(-500, -100), -500, -100, -4, -1);

		this.alpha = 255;
		this.alphaChange = 3;

		this.interp = 0;

		this.red = random(200, 255);
		this.green = random(50, 100);

		this.color = color(this.red, this.green, 0, this.alpha);

		this.smokeRandom = random(75, 125);
		this.smokeColor = color(this.smokeRandom, this.smokeRandom, this.smokeRandom, 75);
		this.isSmoke = false;
	}

	finished() {
		return this.alpha < 0;
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
		this.alpha -= this.alphaChange;

		this.color = color(this.red, this.green, 0, this.alpha);

		if (this.alpha > 100) {
			// yes
		}
		else {

			this.color = lerpColor(this.color, this.smokeColor, this.interp);
			this.color.setAlpha(this.alpha);

			this.interp += 0.01;

			this.r += 0.5;
			this.alphaChange = 0.5;
			this.vx *= 1.001;

		}
		

	}

	show() {
		fill(this.color);
		//stroke(255);
		noStroke();
		ellipse(this.x, this.y, this.r);
	}
}