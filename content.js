
$('body').prepend('<canvas id="canvas"></canvas>');

var snowParticleArray = [];
var snowflakes = 10000;

var gravity = 1.5;

var width = 0;
var height = 0;

var canvas = null;
var ctx = null;

var windSpeed = 0;
var maxWindSpeed = 1;
var minWindSpeed = -1;

function flake(size,positionX, positionY, depthZ ,accelX, accelY, accelZ) {
	//properties
	this.size=size;
	
	//positions
	this.positionX=positionX;
	this.positionY=positionY;
	this.depthZ=depthZ;
	
	//movement
	this.accelX=accelX;
	this.accelY=accelY;
	this.accelZ=accelZ;
	this.maxSpeed = (this.size /10) + (Math.random() * 3)
	this.maxSpeed = (this.size /50) + (Math.random() * 1)
}


function setup() {
	//inital variable values
	//used as a reset
	width = window.innerWidth;
	height = window.innerHeight;
	
	//old
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d"); 
}

function spawnSnowFlake () {
	//is there enough snow
	if (snowParticleArray.length >= snowflakes) {
		return false;
	}
		//create snow
		var chance = Math.random() *100;
		if (chance >= 40) {
			
			//spawn
			ss = Math.random() * 10;
			xx = Math.random() * width;
			yy = Math.random() * height;
		
			newFlake = new flake(ss, xx, -20, 100, 0, 0, 0);
			
			snowParticleArray.push(newFlake);
		
	}
}

function run() {
	
	windSpeed = windSpeed + (0.5- (Math.random())); //+/- wind on each frame
	if (windSpeed >= maxWindSpeed) {
		windSpeed = maxWindSpeed;
	} else if (windSpeed <= minWindSpeed) {
		windSpeed = minWindSpeed;
	}
	
	//console.log(windSpeed);
	
	ctx.clearRect(0, 0, width, height);
	
	spawnSnowFlake();
	r = 255;
	g = 255;
	b = 255;
	
	for (m=snowParticleArray.length-1; m >=0  ; m--) {
		obj = snowParticleArray[m];
		
		//falling
		obj.accelY = obj.accelY + gravity/(obj.size *10);
		if (obj.accelY >= obj.maxSpeed) {
			obj.accelY = obj.maxSpeed;	
		}
		obj.positionY= obj.positionY + obj.accelY;
		//wind
		obj.accelX = obj.accelX + windSpeed/(30);
		if (obj.accelX >= obj.maxSpeedX) {
			obj.accelX = obj.maxSpeedX;	
		}
		obj.positionX= obj.positionX + obj.accelX;
		
		
		/* draw */
		ctx.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", 1)"
		ctx.beginPath();
		ctx.arc(obj.positionX, obj.positionY, obj.size, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		
	
		if (obj.positionY > height) {
			snowParticleArray.splice(m, 1)
		}
	}
}

function init()
{	

	//style canvas
	$('#canvas').css({
   position:'fixed',
	top:0,
	bottom:0,
	left:0,
	right:0, 
	'z-index':100,
	'pointer-events':'none'
});
	
	
	
    canvas = document.getElementById("canvas");
    canvas.width = document.width;
    canvas.height = document.height;
    canvasW = canvas.width;
    canvasH = canvas.height;
	
	
	
    if( canvas.getContext )
    {
        setup();
        setInterval( run , 2 );
    }
}

   init();