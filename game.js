// fanger lige canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game loop
function gameLoop() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// tegn spil elementerne
	ctx.fillStyle = '#ccddff';
	ctx.beginPath();
	ctx.moveTo(100,100);
	ctx.lineTo(100,50);
	ctx.lineTo(50,50);
	ctx.lineTo(50,100);
	ctx.closePath();
	ctx.fill();
	ctx.strokeStyle = 'rgb(0,128,0)';
	ctx.lineWidth = 1;
	ctx.stroke();
	// få fat i næste frame
	requestAnimationFrame(gameLoop);
}

// start game loop
gameLoop();
