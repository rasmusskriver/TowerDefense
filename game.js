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
	// Tegn tårnet
	// Tegn tårnens krop
	//    ctx.fillStyle = '#8B4513'; // Brun farve
	//    ctx.fillRect(100, 150, 50, 150); // Rektangulær krop
	//
	//    // Tegn tårnets top
	//    ctx.fillStyle = '#CD853F'; // Lysere brun farve
	//    ctx.fillRect(75, 100, 100, 50); // Rektangulær top
	//
	//    // Tegn vindue
	//    ctx.fillStyle = '#ADD8E6'; // Blå farve
	//    ctx.fillRect(90, 160, 20, 20); // Vindue
	//	ctx.fillStyle = '#ccddff';
	//	ctx.beginPath();
	//	ctx.moveTo(60,60);
	//	ctx.lineTo(100,50);
	//	ctx.lineTo(150,80);
	//	ctx.closePath();
	//	ctx.fill();
	//	ctx.strokeStyle = 'rgb(0,128,0)';
	//	ctx.lineWidth = 1;
	//	ctx.stroke();
	// få fat i næste frame
	requestAnimationFrame(gameLoop);
}

// start game loop
gameLoop();
