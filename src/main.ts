


class Player {
	constructor(x,y,dy, width, height, color) {
		this.x = x;
		this.y = y;
		this.dy = dy;
		this.dx = 0;
		this.width = width;
		this.height = height;
		this.color = color;
		this.points = 0;
	}

	move(direction) { //direction is a value between 1 and -1, if positive move down, if negative move down
		this.dy = 3.5*direction;
		return;
	}

	speedUp(direction) {
		this.dy += 3.5*direction;
	}

	pushForward(direction) { //direction is a value between 1 and -1, if positive move right if negative move left
		this.dx = 5*direction;	
		return;
	 
	}
	pushBack(object) {
		this.x = object.x;
		this.dx = 0;	
	}


	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = this.color;
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.closePath();
	}

	update() {
		if (this.y + this.height + this.dy >= WindowHeight || this.y+this.dy <= 0) {
			this.dy = -this.dy;
		}
		
		//if x cordinates is more than 27.5 from start position reverse speed 
		if (this.x > data.One.x+27.5) {
			this.dx = -this.dx;			
		}

		if (this.x > data.Two.x-27.5) {
			this.dx = -this.dx;
		}

		if (this.x < data.One.x) {
			this.pushBack(data.One);
		}
		if (this.x > data.Two.x) {
		 	this.pushBack(data.Two);
		}

		if (Math.abs(this.dy) > 3.5) {
			this.dy = this.dy*0.985;
			console.log(this.dy);
		}

		this.y += this.dy;

		if(this.dx != 0) {
			this.x += this.dx;
		}

		this.draw();
	}

	center() {
		this.dy = 0;
		this.y = 150;
		return;
	}

	increasePoints() {
		this.points += 1;
		if (this.points >= 10) {
			stopGame();
		}
	}
}

	const windowWidth = window.innerWidth;
	const WindowHeight = window.innerHeight-40; //-40 because scoreboard takes up upperspace

	const centerX = windowWidth/2;
	const centerY = WindowHeight/2;
	
	var colors = ["#fce094"];





	const canvas = document.getElementsByTagName("canvas")[0];
	canvas.width = windowWidth;
	canvas.height = WindowHeight;
	const ctx = canvas.getContext("2d");
	const players = [playerOne,playerTwo];

function startGame(index) {
	const setting = difficulty[index];
	const speedX = randomSpeed(setting.speed);
	const speedY = randomSpeed(setting.speed);

	const circle = new Circle(centerX, centerY, speedX, speedY, setting.radius, colors[0]);
	const playerOne = new Player(data.One.x, setting.y, 0, data.w , setting.h, colors[0]);
	const playerTwo = new Player(data.Two.x, setting.y, 0, data.w , setting.h, colors[0]);

	document.getElementsByClassName('menu-container')[0].style.display = "none";
	document.getElementsByClassName('sidebars')[0].style.display = "none";
	document.getElementsByClassName('sidebars')[1].style.display = "none";
	document.getElementsByTagName("h1")[0].style.visibility = "visible";
	animate();
}

function randomSpeed(array) {
	var randomIndex = Math.floor(Math.random()*array.length);
	return array[randomIndex];
}

	var requestId;

function animate() {
	requestId = undefined;
	startAnimation();
	ctx.clearRect(0,0, canvas.width, canvas.height);
	circle.update();
	playerOne.update();
	playerTwo.update();
	updateScore();
}	

function startAnimation() {
    if (!requestId) {
       requestId = window.requestAnimationFrame(animate); 
    }
}

function stopAnimation() {
    if (requestId) {
       window.cancelAnimationFrame(requestId);
       requestId = undefined;
    }
}


function updateScore() {
	document.getElementById("pOne-Counter").innerHTML = playerOne.points;
	document.getElementById("pTwo-Counter").innerHTML = playerTwo.points; 
}

function stopGame() {
	document.getElementsByClassName('menu-container')[0].style.display = "block";
	document.getElementsByClassName('menu')[0].style.display = "none";

	document.getElementsByClassName('winner-container')[0].style.display = "block";
	if (playerOne.points == 10) {
		document.getElementsByClassName('winner-message')[0].innerHTML = 'Player One wins!';
	}
	if (playerTwo.points == 10) {
		document.getElementsByClassName('winner-message')[0].innerHTML = 'Player Two wins!';
	}
	stopAnimation();
}


function reset() {
	document.getElementsByClassName('menu')[0].style.display = "block";
	document.getElementsByClassName('winner-container')[0].style.display = "none";
	document.getElementById("pOne-Counter").innerHTML = 0;
	document.getElementById("pTwo-Counter").innerHTML = 0;
	ctx.clearRect(0,0,canvas.width,canvas.height);
	delete playerOne;
	delete playerTwo;
	document.getElementsByClassName('sidebars')[0].style.display = "block";
	document.getElementsByClassName('sidebars')[1].style.display = "block";
}

window.addEventListener("keydown", movePlayer, false);

  var lastKeyCode;
function movePlayer(e) {
    switch(e.keyCode) {
 		//player one has WS
 		case 87: playerOne.move(-1);
        	//up W key pressed 
        		if (lastKeyCode == e.keyCode) {
        			playerOne.speedUp(-1);
        		}
        	break;
        case 83: playerOne.move(1);
        	//down S key pressed
        		if (lastKeyCode == e.keyCode) {
        			playerOne.speedUp(1);
        		} 
        	break;
        case 68: playerOne.pushForward(1);
        	//D key, move to the right
        	break;

        //player two has up and down arrow
         case 38: playerTwo.move(-1);
            // up arrow key pressed
            	if (lastKeyCode == e.keyCode) {
        			playerTwo.speedUp(-1);
        		}
        	break;
        case 40: playerTwo.move(1);
            // down arrow key pressed
            	if (lastKeyCode == e.keyCode) {
        			playerTwo.speedUp(1);
        		}
            break;  
        case 37: playerTwo.pushForward(-1);
        	//left arrow key, move to the left 
        	break;
    } 
   	lastKeyCode = e.keyCode; 
    e.preventDefault();
           
}  

function showInstructions() {
	document.getElementsByClassName('menu')[0].style.display = "none";
	document.getElementsByClassName('instructions-container')[0].style.display = "flex";
}




function rotate(velocity, angle) {
	const rotatedVelocities = {
		x: velocity.x * Math.cos(angle) - velocity.y*Math.sin(angle),
		y: velocity.x * Math.sin(angle) - velocity.y*Math.cos(angle)
	};
	return rotatedVelocities;
}


function momentum(ball, player) {
	const angle = -Math.atan2(player.y-ball.y, player.x-ball.x);
	const m1 = ball.masss;
	const m2 = player.mass;
	const u1 = rotate(ball.velocity, angle);
	const u2 = rotate(player.dy, angle);
}