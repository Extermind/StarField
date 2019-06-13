/************
Name: Tthrough Univers
Author: Piotr "Extermind" Wierzchowski
Date of last edit: 25.05.2019
************/

//customize//
var size = 0.5;						//starting size of stars
var starsCount = 3000;				//how many stars will be displayed
var speed = 1;						//starting speed of stars
var depth = 1.5;					//depth of screen
var glowingEffectRadius = 1.25;		//radius of the "atmosfere"

//colors array is for the main color of star/planets
const colors = ['#E53D00', '#3B00E9', '#FF206E','#F5B700','#04E762','#00A1E4','#89FC00','#0D0106','#FFA69E','#FED766','#009FB7','#028090','#F0F3BD','#EFF1F3','#FF0022','#B91372'];
//glowingEffect array is for the "atmosfere" colors use rgba() or hex values
const glowingEffect = ['#E53D0055', '#3B00E955', '#FF206E55','#F5B70055','#04E76255','#00A1E455','#89FC0055','#0D010655','#FFA69E55','#FED76655','#009FB755','#02809055','#F0F3BD55','#EFF1F355','#FF002255','#B9137255','#000000FF'];
//just space color 
const spaceColor = '#0D161B'; //new: #0D161B old:#050116

var canvas = document.querySelector('canvas');
var cs = getComputedStyle(canvas);
var width = parseInt(cs.getPropertyValue('width'), 10);
var height = parseInt(cs.getPropertyValue('height'), 10);
canvas.width = width;
canvas.height = height;
var c = canvas.getContext("2d");


var fl = canvas.width;
var centerX = canvas.width/2;
var centerY = canvas.height/2;

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function Star(x, y, z, glowingColor, color) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.color = color;
	this.glowingColor = glowingColor;

	this.draw = function() {

		var newX, newY, newS;

		newX = (this.x - centerX) * (fl/this.z);
		newX = newX + centerX;

		newY = (this.y - centerY) * (fl/this.z);
		newY = newY + centerY;

		newS = size * (fl/this.z);
		
		//glowing effect
		c.beginPath();
		c.fillStyle = this.glowingColor;
		c.arc(newX, newY, newS * glowingEffectRadius, 0, Math.PI *2);
		c.fill();
		c.closePath();
		
		//drawing arc
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(newX, newY, newS, 0, Math.PI *2);
		c.fill();
		c.closePath();
	}

	this.update = function() {		
		this.z = this.z - speed;
		if(this.z < 0){
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.z = canvas.width * depth;
			this.color = randomColor(colors);
		}
		this.draw();
	}
}

var starsArr = [];

for(var i = 0; i < starsCount; i++){
	var x = Math.random() * canvas.width;
	var y = Math.random() * canvas.height;
	var z = (Math.random() * canvas.width) * depth;
	starsArr.push(new Star(x, y, z, randomColor(glowingEffect), randomColor(colors)));
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	c.fillStyle = spaceColor;
	c.fillRect(0, 0, innerWidth, innerHeight);

	for(var i = 0; i < starsArr.length; i++){
		starsArr[i].update();
	}

}

animate();
