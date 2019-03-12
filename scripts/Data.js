"use strict";
class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString(type) {
        if (!type || type == "rgb")
            return `rgb(${this.r}, ${this.g}, ${this.b})`;
        else
            "#" + this.r.toString(16) + this.g.toString(16) + this.b.toString(16);
    }
}
