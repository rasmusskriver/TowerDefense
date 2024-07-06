// henter lige canas elementet
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// laver start position til firkanten
var FirkantStartPos= {
	x: -60,
	y: 50,
	width: 50,
	height: 50,
	speed: 1,
}
function firkant(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "red";
	ctx.fillRect(FirkantStartPos.x, FirkantStartPos.y, FirkantStartPos.width, FirkantStartPos.height);
}
function updateSquare() {
	FirkantStartPos.x += FirkantStartPos.speed;
	if (FirkantStartPos.x > canvas.width + 50) {
		FirkantStartPos.x = -FirkantStartPos.width;
	}
}
// funktionerne skal jo også lige skubbes igang
function animate() {
	updateSquare()
	firkant()
	requestAnimationFrame(animate)
}
animate()
