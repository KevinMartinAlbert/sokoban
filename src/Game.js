import World from "/src/World.js";
import Level from "/src/Level.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.tileSize = 50;

        this.world = null;
        this.levelIndex = 1;
        this.worldIndex = 1;
        this.spriteSheet = new Image();
        this.running = false;

        this.loadWorld(this.worldIndex);
    }

    async loadWorld(worldIndex) {
        try {
            const response = await fetch("/assets/levels/levels.json");
            const data = await response.json();
            const worldKey = worldIndex.toString();

            if (data.worlds[worldKey]) {
                this.world = new World(worldKey, data.worlds[worldKey].levels);

                this.spriteSheet.src = `/assets/sprites/sprite_sheet_world_${worldIndex}.png`;
                this.spriteSheet.onload = () => {
                    this.loadLevel(this.levelIndex);
                };
            } else {
                console.error("World not found", worldKey);
            }
        } catch (error) {
            console.error("Error loading world:", error);
        }
    }

    loadLevel(levelIndex) {
        const levelKey = levelIndex.toString();

        if (this.world && this.world.levels[levelKey]) {
            this.level = new Level(this.world.levels[levelKey], this.spriteSheet);
            this.width = this.level.tiles[0].length * this.tileSize;
            this.height = this.level.tiles.length * this.tileSize;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.player = this.level.player;
            this.init();
        } else {
            console.error("Level not found", levelKey);
        }
    }

    init() {
        this.running = true;
        this.bindEvents();
        this.loop();
    }

    bindEvents() {
        if (!this.eventsBound) {
            window.addEventListener("keydown", (event) => {
                this.player.handleInput(event.key, this.level);
                setTimeout(() => this.checkVictory(), 10);
            });
            this.eventsBound = true;
        }
    }

    loop() {
        if (!this.running) return;

        this.update();
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    update() {
        this.level.update();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.level.draw(this.ctx, this.tileSize);
    }

    checkVictory() {
        if (this.level.isCompleted()) {
            console.log("Good job ! Level complete !");
            this.running = false;
            this.nextLevel();
        }
    }

    nextLevel() {
        this.levelIndex++;

        if (!this.world.levels[this.levelIndex.toString()]) {
            this.levelIndex = 1;
            this.worldIndex++;

            // Vérifier si le monde suivant existe
            fetch("/assets/levels/levels.json")
                .then(response => response.json())
                .then(data => {
                    if (data.worlds[this.worldIndex.toString()]) {
                        this.loadWorld(this.worldIndex);
                    } else {
                        console.log("Congratulations, you completed the game !");
                    }
                })
                .catch(error => console.error("Error while loading level :", error));
        } else {
            this.loadLevel(this.levelIndex);
        }
    }
}


export default Game;
