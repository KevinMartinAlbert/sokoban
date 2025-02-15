class Tile {
    constructor(type, spriteSheet) {
        this.type = type;
        this.spriteSheet = spriteSheet;
        this.spriteCoordinates = {
            "p": { x: 128, y: 0 },
            "#": { x: 0, y: 0 },
            "$": { x: 16, y: 0 },
            "&": { x: 32, y: 0 },
            "f": { x: 80, y: 0 },
            "e": { x: 96, y: 0 },
            "$f": { x: 160, y: 0 },
            "&e": { x: 176, y: 0 },
            ".": { x: 48, y: 0 },
            "@": { x: 64, y: 0 },
            "@f": { x: 112, y: 0 },
            "@e": { x: 144, y: 0 }
        };
    }

    draw(ctx, x, y, tileSize) {
        const sprite = this.spriteCoordinates[this.type];
        if (sprite && this.spriteSheet.complete) {
            ctx.drawImage(
                this.spriteSheet,
                sprite.x, sprite.y, 16, 16,
                x * tileSize, y * tileSize, tileSize, tileSize
            );
        } else {
            ctx.fillStyle = "gray";
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            ctx.strokeStyle = "#ccc";
            ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}

export default Tile;
