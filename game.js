// fanger lige canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var particles = [];
var tick = 0;

function createParticles() {
    // check on every 10th tick
    if (tick % 10 === 0) {
        // add particle if fewer end 100
        if (particles.length < 100) {
            particles.push({
                x: Math.random() * canvas.width, // between 0 and canvas width
                y: 0,
                speed: 2 + Math.random() * 3, // between 2 and 5
                radius: 5 + Math.random() * 5, // between 5 and 10
                color: "white"
            });
        }
    }
}

function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
        var part = particles[i];
        part.y += part.speed;
    }
}

function killParticles() {
    for (var i = 0; i < particles.length; i++) {
        var part = particles[i];
        if (part.y > canvas.height) {
            part.y = 0;
        }
    }
}

function drawParticles() {
    for (var i = 0; i < particles.length; i++) {
        var part = particles[i];
        ctx.beginPath();
        ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = part.color;
        ctx.fill();
    }
}

function gameLoop() {
    tick++;
    // clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Partikelsystem
    createParticles();
    updateParticles();
    killParticles();
    drawParticles();

    // tegn spil elementerne
    ctx.fillStyle = '#ccddff';
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 50);
    ctx.lineTo(50, 50);
    ctx.lineTo(50, 100);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgb(0, 128, 0)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // få fat i næste frame
    requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
