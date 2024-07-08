// Henter canvas elementet
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Funktion til at generere et tilfældigt heltal mellem min og max
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Starter den første runde
document.getElementById('startButton').addEventListener('click', () => {
	if (antalFjernet > 10) {
console.log("der er game over")
	}
	else {
	startNyRunde();
	visbesked();
	}
});

// Initialiserer arrays til at holde firkanter, projektiler og tårne
const maxRunder = 10;
const firkanterPrRunde = 5;
let firkanter = [];
let projektiler = [];
let taarn = [];
let runde = 1;
let rundeAktiv = false;
let animationId;
let towersCreatedThisRound = 50;
let antalSkudt = 0;
let antalFjernet = 0;

// Funktion til at generere en ny firkant
function createNewSquare() {
	return {
		x: -60,
		y: getRandomInt(0, canvas.height - 50),
		width: 50,
		height: 50,
		speed: getRandomInt(1 + runde, 2 + runde)
	};
}

// Funktion til at generere et nyt projektil
function createNewProjektil(x, y, target) {
	return {
		x: x,
		y: y,
		width: 5,
		height: 5,
		speed: 5,
		target: target
	};
}

// Funktion til at generere et nyt tårn
function createNewTower(x, y) {
	return {
		x: x,
		y: y,
		width: 20,
		height: 20,
		range: 200,
		shootInterval: 1000,
		lastShootTime: 0
	};
}

// Funktion til at starte en ny runde
function startNyRunde() {


	cancelAnimationFrame(animationId);
	if (runde <= maxRunder) {
		rundeAktiv = true;
		towersCreatedThisRound += 1;
		for (let i = 0; i < firkanterPrRunde * runde; i++) {
			firkanter.push(createNewSquare());
		}
		setTimeout(() => {
			animate();
		}, 2000);

	}
}

function GameOver() {
	if (antalFjernet > 10) {

		cancelAnimationFrame(animationId);
		// Viser besked om ny runde i 2 sekunder
		ctx.fillStyle = "red";
		ctx.font = "30px Arial";
		ctx.fillText(`GAME OVER`, canvas.width / 2 - 100, canvas.height / 2);
	}
}

function visbesked() {

	if (runde <= maxRunder) {
	// Viser besked om ny runde i 2 sekunder
	ctx.fillStyle = "yellow";
	ctx.font = "30px Arial";
	ctx.fillText(`Runde ${runde} starter!`, canvas.width / 2 - 100, canvas.height / 2);
	runde++;
	}
}
function visBesked() {
	// Find det element, hvor beskeden skal vises
	let beskedContainer = document.getElementById('besked-container');
	// Fjern eksisterende besked, hvis der er en
	while (beskedContainer.firstChild) {
		beskedContainer.removeChild(beskedContainer.firstChild);
	}

	// Opret en besked
	let besked = document.createElement('p');
	besked.textContent = 'Du kan ikke lave flere tårne denne runde';

	// Tilføj beskeden til containeren
	beskedContainer.appendChild(besked);
	setTimeout(function() {
		beskedContainer.removeChild(besked);
	}, 5000); // 5000 ms = 5 sekunder
}

function drawSquare(square) {
	ctx.fillStyle = "red";
	ctx.fillRect(square.x, square.y, square.width, square.height);
}

function updateSquare(square) {
	square.x += square.speed;
}

// Funktion til at fjerne firkanter, der er ude af skærmen eller ramt af projektiler
function removeOffScreenSquares() {
    // Fjern firkanter der er ude af skærmen
    firkanter = removeOffScreen(firkanter);

    // Fjern firkanter der er ramt
    firkanter = removeHitSquares(firkanter);
}

function removeOffScreen(firkanter) {
    // Filtrer ud firkanter der er ude af skærmen
    return firkanter.filter(square => square.x <= canvas.width + square.width);
}

function removeHitSquares(firkanter) {
    // Filtrer ud firkanter der er ramt
    return firkanter.filter(square => !square.hit);
}

function logHitSquares(firkanter) {
	// Gennemgår hver firkant
	firkanter.forEach(square => {
		// Tjekker om firkanten er ramt
	if (square.hit) {
			antalSkudt++;
			document.getElementById('antalSkudt').innerText = antalSkudt;
			if (antalSkudt % 10 === 0) {
				towersCreatedThisRound += 2;
			}
		}
	});
}

function countAndDisplayRemoved(firkanter) {
    // Gennemgår hver firkant
    firkanter.forEach(square => {
        // Tjekker om firkanten er fjernet fra banen
        if (square.x > canvas.width + square.width) {
            antalFjernet++;
            // Opdaterer HTML-elementet med id 'antalFjernet' for at vise antallet af fjernede firkanter
            document.getElementById('antalFjernet').innerText = antalFjernet;
        }
    });
}

function AntalTaarneDerKanBygges() {
	document.getElementById('antalTaarne').innerText = towersCreatedThisRound
}

// Funktion til at opdatere og tegne projektiler
function updateAndDrawProjektiler() {
	for (let i = 0; i < projektiler.length; i++) {
		let projektil = projektiler[i];
		let target = projektil.target;

		// Beregn retningen mod målet
		let dx = target.x + target.width / 2 - projektil.x;
		let dy = target.y + target.height / 2 - projektil.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		let moveX = (dx / distance) * projektil.speed;
		let moveY = (dy / distance) * projektil.speed;

		projektil.x += moveX;
		projektil.y += moveY;

		ctx.fillStyle = "blue";
		ctx.fillRect(projektil.x, projektil.y, projektil.width, projektil.height);

		// Tjekker kollision med målet
		if (
			projektil.x < target.x + target.width &&
				projektil.x + projektil.width > target.x &&
				projektil.y < target.y + target.height &&
				projektil.y + projektil.height > target.y
		) {
			target.hit = true;
			projektiler.splice(i, 1);
			i--;
		}
	}

	// Fjerner projektiler, der er uden for skærmen
	projektiler = projektiler.filter(projektil => projektil.x <= canvas.width && projektil.y <= canvas.height);
}

// Funktion til at opdatere og tegne tårne
function updateAndDrawTowers(time) {
	taarn.forEach(tower => {
		ctx.fillStyle = "green";
		ctx.fillRect(tower.x, tower.y, tower.width, tower.height);

		// Tjek om tårnet skal skyde
		if (time - tower.lastShootTime > tower.shootInterval) {
			let closestSquare = null;
			let closestDistance = tower.range;

			// Find nærmeste firkant inden for rækkevidde
			firkanter.forEach(square => {
				let distance = Math.sqrt(
					Math.pow(square.x + square.width / 2 - tower.x, 2) +
						Math.pow(square.y + square.height / 2 - tower.y, 2)
				);

				if (distance < closestDistance) {
					closestSquare = square;
					closestDistance = distance;
				}
			});

			if (closestSquare) {
				projektiler.push(createNewProjektil(tower.x + tower.width / 2, tower.y + tower.height / 2, closestSquare));
				tower.lastShootTime = time;
			}
		}
	});
}

// Tilføjer et tårn ved klik på canvas
canvas.addEventListener('click', (event) => {
	if (towersCreatedThisRound > 0) {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		taarn.push(createNewTower(x, y));
		towersCreatedThisRound--;
	}
	else {
		visBesked()
	}
});

// Funktionerne skal jo også lige skubbes i gang
function animate(time) {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Rydder canvas
	GameOver();

AntalTaarneDerKanBygges();
	firkanter.forEach(updateSquare);
	firkanter.forEach(drawSquare);
	logHitSquares(firkanter);
	countAndDisplayRemoved(firkanter);
	removeOffScreenSquares();
	updateAndDrawProjektiler();
	updateAndDrawTowers(time);

	animationId = requestAnimationFrame(animate);
}
