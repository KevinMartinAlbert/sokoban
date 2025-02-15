import Box from "/sokoban/src/Box.js";
import Tile from "/sokoban/src/Tile.js";
import Player from "/sokoban/src/Player.js";
import Button from "/sokoban/src/Button.js";

class Level {
    constructor(data, spriteSheet) {
        if (!data) {
            throw new Error("No level data received");
        }

        this.tiles = data.tiles || [];
        this.boxes = (data.boxes || []).map(box => new Box(box.x, box.y, box.type, spriteSheet));
        this.player = data.player ? new Player(data.player.x, data.player.y, spriteSheet) : null;
        this.buttons = (data.buttons || []).map(btn => new Button(btn.x, btn.y, btn.requiredType));
        this.spriteSheet = spriteSheet;

        if (!this.player) {
            throw new Error("Player data missing from the level");
        }
    }

    update() {
        this.boxes.forEach(box => box.updateState(this));
    }

    isNearFire(x, y) {
        const adjacentPositions = [
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
        ];
        
        return this.tiles[y][x] === "f" ||
            this.boxes.some(box => box.x === x && box.y === y && box.type === "$f") ||
            adjacentPositions.some(({ dx, dy }) =>
                this.tiles[y + dy]?.[x + dx] === "f" ||
                this.boxes.some(box => box.x === x + dx && box.y === y + dy && box.type === "$f")
            );
    }

    isNearElectricity(x, y) {
        const adjacentPositions = [
            { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
            { dx: 0, dy: -1 }, { dx: 0, dy: 1 }
        ];
        
        return this.tiles[y][x] === "e" ||
            adjacentPositions.some(({ dx, dy }) =>
                this.tiles[y + dy]?.[x + dx] === "e" ||
                this.boxes.some(box => box.x === x + dx && box.y === y + dy && box.type === "&e")
            );
    }

    draw(ctx, tileSize) {
        for (let y = 0; y < this.tiles.length; y++) {
            for (let x = 0; x < this.tiles[y].length; x++) {
                new Tile(this.tiles[y][x], this.spriteSheet).draw(ctx, x, y, tileSize);
            }
        }
        this.boxes.forEach(box => box.draw(ctx, tileSize));
        this.player.draw(ctx, tileSize);
    }

    canMoveTo(x, y) {
        if (this.tiles[y][x] === "#") return false;
        return !this.boxes.some(box => box.x === x && box.y === y);
    }

    getBoxAt(x, y) {
        return this.boxes.find(box => box.x === x && box.y === y);
    }

    isCompleted() {
        return this.buttons.every(button => button.isPressed(this));
    }
}

export default Level;
