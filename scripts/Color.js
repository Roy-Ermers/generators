export default class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    lerp(a, amplifier) {
        let result = new Color(0, 0, 0);
        result.r = this.r + amplifier * (a.r - this.r);
        result.g = this.g + amplifier * (a.g - this.r);
        result.b = this.b + amplifier * (a.b - this.r);
        return result;
    }
    invert() {
        return new Color(255 - this.r, 255 - this.g, 255 - this.b);
    }
    add(a, amplifier = 1) {
        let result = new Color(0, 0, 0);
        result.r = this.r + (a.r * amplifier);
        result.g = this.g + (a.g * amplifier);
        result.b = this.b + (a.b * amplifier);
        return result;
    }
    difference(a) {
        return new Color(Math.abs(this.r - a.r), Math.abs(this.g - a.g), Math.abs(this.b - a.b));
    }
    darken(amplifier) {
        return new Color(this.r * amplifier, this.g * amplifier, this.b * amplifier);
    }
    toString(type) {
        if (!type || type == "rgb")
            return `rgb(${this.r}, ${this.g}, ${this.b})`;
        else
            return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
