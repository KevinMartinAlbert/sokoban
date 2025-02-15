class World {
    constructor(name, levels) {
        this.name = name;
        this.levels = levels;
        this.spritesheet = this.loadSpritesheet(name);
    }

    loadSpritesheet(worldName) {
        return new Image();
    }
}

export default World;