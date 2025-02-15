class Player {
    constructor(x, y, spriteSheet) {
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.spriteCoordinates = { x: 128, y: 0 };
    }

    handleInput(key, level) {
        let newX = this.x;
        let newY = this.y;
        
        switch (key) {
            case "ArrowUp": newY--; break;
            case "ArrowDown": newY++; break;
            case "ArrowLeft": newX--; break;
            case "ArrowRight": newX++; break;
            default: return;
        }
        
        let box = level.getBoxAt(newX, newY);
        if (box) {
            let pushX = newX + (newX - this.x);
            let pushY = newY + (newY - this.y);
            if (level.canMoveTo(pushX, pushY)) {
                box.move(newX - this.x, newY - this.y, level);
                this.x = newX;
                this.y = newY;
            }
        } else if (level.canMoveTo(newX, newY)) {
            this.x = newX;
            this.y = newY;
        }
    }

    draw(ctx, tileSize) {
        if (this.spriteSheet.complete) {
            ctx.drawImage(
                this.spriteSheet,
                this.spriteCoordinates.x, this.spriteCoordinates.y, 16, 16,
                this.x * tileSize, this.y * tileSize, tileSize, tileSize
            );
        } else {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x * tileSize + 5, this.y * tileSize + 5, tileSize - 10, tileSize - 10);
        }
    }
}

export default Player;
