class Button {
    constructor(x, y, requiredType = null) {
        this.x = x;
        this.y = y;
        this.requiredType = requiredType;
    }

    isPressed(level) {
        return level.boxes.some(box => box.x === this.x && box.y === this.y && 
            (this.requiredType === null || box.type === this.requiredType));
    }
}

export default Button;