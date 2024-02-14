const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const buttonContainer = document.getElementById('buttonContainer');
const text = document.getElementById("text");

const messages = ["Wrong Button?", "Please try again", "You sure?", "Please say yes","WHY","Im gonna cry","PLEASE","NOOOO","hehe you cant read this"];
let messageIndex = 0;
let yesScaleFactor = 1;
let noScaleFactor = 2;
noButton.addEventListener('click', function() {
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    yesScaleFactor += 0.1;
    noScaleFactor -= 0.2;

    console.log(yesScaleFactor);
    buttonContainer.style.transform = `scale(${yesScaleFactor})`;
    this.style.transform = `scale(${noScaleFactor})`;

    if(noScaleFactor < 0.2)
    {
        buttonContainer.innerHTML = "<button id=\"yesButton\">Yes</button>";
        document.getElementById('yesButton').addEventListener('click', function() {
            buttonContainer.innerHTML = "<p>YIIIIPPPPPPEEEEE!!!!!</p>";
            document.getElementById("wait").innerHTML = "<img src=\"resources/yipe.gif\">";
            text.innerHTML = "";
            text.style.backgroundColor = "rgba(0,0,0,0)";
            text.style.boxShadow = "rgba(0,0,0,0)";
        });
    }
});

yesButton.addEventListener('click', function() {
    buttonContainer.innerHTML = "<p>YIIIIPPPPPPEEEEE!!!!!</p>";
    document.getElementById("wait").innerHTML = "<img src=\"resources/yipe.gif\">";
    text.innerHTML = "";
    text.style.backgroundColor = "rgba(0,0,0,0)";
    text.style.boxShadow = "rgba(0,0,0,0)";
    buttonContainer.transform = 'scale(2)';
});

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Adjust canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the image
const img = new Image();
img.src = 'resources/heart.png'; // Path to your image

let particles = [];

// Define a class to represent each image instance
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50; // Size of the image
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }

    draw() {
        ctx.drawImage(img, this.x, this.y, this.size, this.size);
    }

    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = 100; // Max distance for reaction
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < maxDistance) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 1000; i++) { // Number of images
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update(mouse);
    }
    requestAnimationFrame(animate);
}

let mouse = {
    x: null,
    y: null,
}

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

img.onload = init;
animate();