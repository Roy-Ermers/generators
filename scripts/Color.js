export default class Color {
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    lerp(a, amplifier) {
        let result = new Color(0, 0, 0);
        result.r = this.r + amplifier * (a.r - this.r);
        result.g = this.g + amplifier * (a.g - this.r);
        result.b = this.b + amplifier * (a.b - this.r);
        result.a = this.a;
        return result;
    }
    invert() {
        return new Color(255 - this.r, 255 - this.g, 255 - this.b, this.a);
    }
    add(a, amplifier = 1) {
        let result = new Color(0, 0, 0);
        result.r = this.r + (a.r * amplifier);
        result.g = this.g + (a.g * amplifier);
        result.b = this.b + (a.b * amplifier);
        result.a = this.a;
        return result;
    }
    difference(a) {
        return new Color(Math.abs(this.r - a.r), Math.abs(this.g - a.g), Math.abs(this.b - a.b));
    }
    darken(amplifier) {
        return new Color(this.r * amplifier, this.g * amplifier, this.b * amplifier, this.a);
    }
    toString(type) {
        if (!type || type == "rgb")
            return `rgba(${this.r}, ${this.g}, ${this.b},${this.a})`;
        else
            return "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
