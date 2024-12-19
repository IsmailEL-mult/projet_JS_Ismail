class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.controls = controls;
        this.width = 20;
        this.height = 20;
        this.points = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(keysPressed, canvas) {
        if (keysPressed[this.controls.up] && this.y > 0) this.y -= 2;
        if (keysPressed[this.controls.down] && this.y < canvas.height - this.height) this.y += 2;
        if (keysPressed[this.controls.left] && this.x > 0) this.x -= 2;
        if (keysPressed[this.controls.right] && this.x < canvas.width - this.width) this.x += 2;
    }

    checkCollisionWithExit(exit) {
        return (
            this.x < exit.x + exit.radius * 2 &&
            this.x + this.width > exit.x &&
            this.y < exit.y + exit.radius * 2 &&
            this.y + this.height > exit.y
        );
    }

    checkCollisionWithObstacles(obstacles) {
        for (const obstacle of obstacles) {
            if (
                this.x < obstacle.x + obstacle.width &&
                this.x + this.width > obstacle.x &&
                this.y < obstacle.y + obstacle.height &&
                this.y + this.height > obstacle.y
            ) {
                return true;
            }
        }
        return false;
    }
}

class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 20;
        this.height = 20;
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    move(canvas) {
        this.y += this.speed;
        if (this.y > canvas.height || this.y < 0) {
            this.speed = -this.speed;
        }
    }
}

class Exit {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
}

class Obstacle {
    constructor(x, y, width, height, moveSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.moveSpeed = moveSpeed; // La vitesse de déplacement de l'obstacle
        this.direction = Math.random() > 0.5 ? 1 : -1; // Direction initiale
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update(canvas) {
        this.x += this.moveSpeed * this.direction;

        // Changer de direction si l'obstacle touche les bords
        if (this.x <= 0 || this.x + this.width >= canvas.width) {
            this.direction *= -1;
        }
    }
}

class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.players = [];
        this.enemies = [];
        this.obstacles = [];
        this.keysPressed = {};
        this.level = 1;
        this.exit = new Exit(750, 450, 15);
        this.timer = 0;
        this.gameOver = false;
        this.startTime = null;

        this.setupListeners();
        this.setupAudioControl();
    }

    setupListeners() {
        window.addEventListener("keydown", (e) => this.keysPressed[e.key] = true);
        window.addEventListener("keyup", (e) => this.keysPressed[e.key] = false);
    }

    setupAudioControl() {
        const audio = document.getElementById("gameAudio");
        const playButton = document.getElementById("playButton");

        playButton.addEventListener("click", () => {
            audio.play();
        });
    }

    addPlayer(player) {
        this.players.push(player);
    }

    addEnemy(enemy) {
        this.enemies.push(enemy);
    }

    addObstacle(obstacle) {
        this.obstacles.push(obstacle);
    }

    update() {
        this.players.forEach(player => {
            player.move(this.keysPressed, this.canvas);

            if (player.checkCollisionWithExit(this.exit)) {
                this.endGame(`${player.color} gagne avec ${this.timer}s !`);
            }

            if (player.checkCollisionWithObstacles(this.obstacles)) {
                this.endGame(`${player.color} est mort !`);
            }
        });

        this.enemies.forEach(enemy => enemy.move(this.canvas));
        this.obstacles.forEach(obstacle => obstacle.update(this.canvas));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.players.forEach(player => player.draw(this.ctx));
        this.enemies.forEach(enemy => enemy.draw(this.ctx));
        this.obstacles.forEach(obstacle => obstacle.draw(this.ctx));
        this.exit.draw(this.ctx);
        this.updateTimer();
    }

    updateTimer() {
        const now = Date.now();
        this.timer = Math.floor((now - this.startTime) / 1000);
        document.getElementById("timer").innerText = `Temps : ${this.timer}s`;
    }

    start() {
        this.startTime = Date.now();
        this.loop();
    }

    loop() {
        if (this.gameOver) return;

        this.update();
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    endGame(message) {
        this.gameOver = true;
        document.getElementById("winMessage").innerText = message;
        document.getElementById("winMessage").style.display = "block";
    }
}

const game = new Game("gameCanvas");
game.addPlayer(new Player(50, 450, "red", { up: "z", down: "s", left: "q", right: "d" }));
game.addPlayer(new Player(100, 450, "blue", { up: "ArrowUp", down: "ArrowDown", left: "ArrowLeft", right: "ArrowRight" }));
game.addEnemy(new Enemy(100, 50, 2));
game.addEnemy(new Enemy(400, 300, 3));
game.addObstacle(new Obstacle(200, 200, 50, 10, 1));
game.addObstacle(new Obstacle(500, 400, 100, 20, 2));
game.start();