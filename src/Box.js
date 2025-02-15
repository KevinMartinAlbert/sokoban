class Box {
    constructor(x, y, type, spriteSheet) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.spriteSheet = spriteSheet;
        this.spriteCoordinates = {
            "$": { x: 16, y: 0 },
            "&": { x: 32, y: 0 },
            "$f": { x: 160, y: 0 },
            "&e": { x: 176, y: 0 }
        };
    }

    move(dx, dy, level) {
        this.x += dx;
        this.y += dy;
    }

    updateState(level) {
        if (this.type === "$" && level.isNearFire(this.x, this.y)) {
            this.type = "$f";
        } else if (this.type === "$f" && !level.isNearFire(this.x, this.y)) {
            this.type = "$";
        } else if (this.type === "&" && level.isNearElectricity(this.x, this.y)) {
            this.type = "&e";
        } else if (this.type === "&e" && !level.isNearElectricity(this.x, this.y)) {
            this.type = "&";
        }
    }

    draw(ctx, tileSize) {
        const sprite = this.spriteCoordinates[this.type];
        if (sprite && this.spriteSheet.complete) {
            ctx.drawImage(
                this.spriteSheet,
                sprite.x, sprite.y, 16, 16,
                this.x * tileSize, this.y * tileSize, tileSize, tileSize
            );
        } else {
            ctx.fillStyle = "brown";
            ctx.fillRect(this.x * tileSize + 5, this.y * tileSize + 5, tileSize - 10, tileSize - 10);
        }
    }
}

export default Box;
