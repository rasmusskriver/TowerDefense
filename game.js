// fanger lige canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game loop
function gameLoop() {
	// clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

        // tegn spil elementerne
	// eksempel lav et basic tårn
	ctx.fillStyle = 'green';
	ctx.fillRect(50, 50, 30, 30);

	// få fat i næste frame
	requestAnimationFrame(gameLoop);
}

// start game loop
gameLoop();
