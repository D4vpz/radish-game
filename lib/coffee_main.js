// Coffee :D
class Coffee {
    /**
     * The core engine of the Coffee library. Needed for every project.
     */
    constructor() {
        this.lineWidth = 1;
        this.lineColor = '#000000';

        this.fillColor = '#000000';

        this.ux = 0;
        this.uy = 0;
        this.uw = null;
        this.uy = null;

        this.resolutionScale = 1;

        this.font = '50px serif';

        this.boxes = [];
    }

    /**
     * Create the window object for the Coffee engine.
     * @param {Number} width
     * @param {Number} height
     */
    createWindow(width = 320, height = 240) {
        this.window = document.createElement('canvas');
        this.window.id = 'coffee_window';
        this.window.width = width;
        this.window.height = height;
        this.window.style.border = '1px solid white';
        this.ctx = this.window.getContext('2d');

        this.origin_x = this.window.width / 2;
        this.origin_y = this.window.height / 2;
    }

    /**
     * Makes the Coffee window visible.
     */
    displayWindow() {
        document.body.appendChild(this.window);
    }

    /**
     * Adjusts window dimensions to the specified width and height.
     * @param {Number} width
     * @param {Number} height
     */
    resizeWindow(width = this.window.width, height = this.window.height) {
        this.window.width = width;
        this.window.height = height;

        this.origin_x = this.window.width / 2;
        this.origin_y = this.window.height / 2;
    }

    /**
     * Rotates the Coffee window a specified amount of radians around 0,0.
     * @param {Number} angle
     */
    rotateWindow(angle) {
        this.ctx.rotate(angle);
    }

    /**
     * Draws a CoffeeSprite on to the window.
     * @param {CoffeeSprite} sprite
     * @param {Number} x
     * @param {Number} y
     */
    drawSprite(sprite, x, y) {
        this.ctx.beginPath();
        let is_cropped =
            this.ux != null &&
            this.uy != null &&
            this.uw != null &&
            this.uh != null;
        if (is_cropped.image) {
            this.ctx.drawImage(
                sprite,
                this.ux,
                this.uy,
                this.uw,
                this.uh,
                x * this.resolutionScale,
                y * this.resolutionScale,
                sprite.width * this.resolutionScale,
                sprite.height * this.resolutionScale
            );
        } else {
            this.ctx.drawImage(
                sprite.image,
                x * this.resolutionScale,
                y * this.resolutionScale,
                sprite.width * this.resolutionScale,
                sprite.height * this.resolutionScale
            );
        }
    }

    /**
     * Draws a sprite rotated around its center by specified radians.
     * @param {CoffeeSprite} sprite
     * @param {Number} x
     * @param {Number} y
     * @param {Number} rotation
     */
    drawSpriteRotated(sprite, x, y, rotation) {
        this.ctx.translate(x + sprite.width / 2, y + sprite.height / 2);
        this.ctx.rotate(rotation);
        this.drawSprite(sprite, -sprite.width / 2, -sprite.height / 2);
        this.ctx.rotate(-rotation);
        this.ctx.translate(-(x + sprite.width / 2), -(y + sprite.height / 2));
    }

    /**
     * Draws a CoffeeObject onto the screen
     * @param {CoffeeObject} object
     */
    drawObject(object) {
        this.drawSpriteRotated(
            object.sprite,
            object.x,
            object.y,
            object.rotation
        );
    }

    /**
     * Crops a sprite to specified dimensions. Great for spritesheets.
     * @param {Number} ux
     * @param {Number} uy
     * @param {Number} uw
     * @param {Number} uh
     */
    cropSprite(ux, uy, uw, uh) {
        this.ux = ux;
        this.uy = uy;
        this.uw = uw;
        this.uh = uh;
    }

    /**
     * Draws a line on the Coffee surface.
     * @param {Number} x0
     * @param {Number} y0
     * @param {Number} x1
     * @param {Number} y1
     */
    line(x0, y0, x1, y1) {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth * this.resolutionScale;
        this.ctx.beginPath();
        this.ctx.moveTo(x0 * this.resolutionScale, y0 * this.resolutionScale);
        this.ctx.lineTo(x1 * this.resolutionScale, y1 * this.resolutionScale);
        this.ctx.stroke();
    }

    /**
     * Draws a line based on angle radians instead of coordinates.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} angle
     * @param {Number} length
     */
    angledLine(x, y, angle, length) {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth * this.resolutionScale;
        this.ctx.beginPath();
        this.ctx.moveTo(x * this.resolutionScale, y * this.resolutionScale);
        let end_x = x + Math.sin(angle) * length;
        let end_y = y + Math.cos(angle) * length;
        this.ctx.lineTo(
            end_x * this.resolutionScale,
            end_y * this.resolutionScale
        );
        this.ctx.stroke();
    }

    /**
     * Draws a single pixel on the Coffee surface.
     * @param {Number} x
     * @param {Number} y
     * @param {String} col
     */
    pixel(x, y, col) {
        this.ctx.fillStyle = col;
        this.ctx.beginPath();
        this.ctx.fillRect(
            x * this.resolutionScale,
            y * this.resolutionScale,
            1 * this.resolutionScale,
            1 * this.resolutionScale
        );
    }

    rect(x, y, w, h) {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth * this.resolutionScale;
        this.ctx.beginPath();
        this.ctx.rect(
            x * this.resolutionScale,
            y * this.resolutionScale,
            w * this.resolutionScale,
            h * this.resolutionScale
        );
        this.ctx.stroke();
    }

    fillRect(x, y, w, h) {
        this.ctx.fillStyle = this.fillColor;
        this.ctx.beginPath();
        this.ctx.fillRect(
            x * this.resolutionScale,
            y * this.resolutionScale,
            w * this.resolutionScale,
            h * this.resolutionScale
        );
    }

    /**
     * Draws a circular outline at center (x, y) with (r) radius.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} r
     */
    circle(x, y, r) {
        if (r < 0) {
            alert('Error: Cricle radius cannot be negative.');
            return 0;
        }
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth * this.resolutionScale;
        this.ctx.beginPath();
        this.ctx.arc(
            x * this.resolutionScale,
            y * this.resolutionScale,
            r * this.resolutionScale,
            0,
            2 * Math.PI
        );
        this.ctx.stroke();
    }

    fillCircle(x, y, r) {
        if (r < 0) {
            alert('Error: Cricle radius cannot be negative.');
            return 0;
        }
        this.ctx.fillStyle = this.fillColor;
        this.ctx.beginPath();
        this.ctx.arc(
            x * this.resolutionScale,
            y * this.resolutionScale,
            r * this.resolutionScale,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }

    /**
     * Creates an arc outline on the surface.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} r
     * @param {Number} start_a
     * @param {Number} end_a
     */
    arc(x, y, r, start_a, end_a) {
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth * this.resolutionScale;
        this.ctx.beginPath();
        this.ctx.arc(
            x * this.resolutionScale,
            y * this.resolutionScale,
            r * this.resolutionScale,
            start_a,
            end_a
        );
        this.ctx.stroke();
    }

    /**
     * Creates a filled arc on the surface. Useful for shapes like semi-circles.
     * @param {Number} x
     * @param {Number} y
     * @param {Number} r
     * @param {Number} start_a
     * @param {Number} end_a
     */
    fillArc(x, y, r, start_a, end_a) {
        this.ctx.fillStyle = this.fillColor;
        this.ctx.beginPath();
        this.ctx.arc(
            x * this.resolutionScale,
            y * this.resolutionScale,
            r * this.resolutionScale,
            start_a,
            end_a
        );
        this.ctx.fill();
    }

    /**
     * Draws a triangle outline on the surface.
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x3
     * @param {Number} y3
     */
    triangle(x1, y1, x2, y2, x3, y3) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1 * this.resolutionScale, y1 * this.resolutionScale);
        this.ctx.lineTo(x2 * this.resolutionScale, y2 * this.resolutionScale);
        this.ctx.lineTo(x3 * this.resolutionScale, y3 * this.resolutionScale);
        this.ctx.closePath();

        this.ctx.lineWidth = this.lineWidth * this.resolutionScale;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.stroke();
    }

    /**
     * Draws a filled triangle on the surface.
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} x3
     * @param {Number} y3
     */
    fillTriangle(x1, y1, x2, y2, x3, y3) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1 * this.resolutionScale, y1 * this.resolutionScale);
        this.ctx.lineTo(x2 * this.resolutionScale, y2 * this.resolutionScale);
        this.ctx.lineTo(x3 * this.resolutionScale, y3 * this.resolutionScale);
        this.ctx.closePath();

        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();
    }

    /**
     * Clears the Coffee surface.
     */
    wipe() {
        this.ctx.clearRect(0, 0, this.window.width, this.window.height);
    }

    /**
     * Fills the Coffee window with the specified color.
     * @param {String} color
     */
    cover(color) {
        this.fillColor = color;
        this.fillRect(0, 0, this.window.width, this.window.height);
    }

    /**
     * Displays a gradient on the surface.
     * @param {LinearGradient} gradient
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    fillGradient(gradient, x, y, w, h) {
        this.fillColor = gradient.gradient;
        this.fillRect(x, y, w, h);
    }

    /**
     * Draws an outline of text on the surface.
     * @param {String} text
     * @param {Number} x
     * @param {Number} y
     * @param {Number} max_width
     */
    text(text, x, y, max_width = 200) {
        this.ctx.font = this.font;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeText(text, x, y, max_width);
    }

    /**
     * Fills text on the surface.
     * @param {String} text
     * @param {Number} x
     * @param {Number} y
     * @param {Number} max_width
     */
    fillText(text, x, y, max_width = 200) {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fillText(text, x, y, max_width);
    }

    checkBoxBox(box1, box2) {
        let box1_a = this.boxes[box1];
        let box2_a = this.boxes[box2];
        let box1_c = [box1_a[0], box1_a[1], box1_a[2], box1_a[3]];
        let box2_c = [box2_a[0], box2_a[1], box2_a[2], box2_a[3]];

        let c_lr = false;
        let c_ud = false;

        if ((box1_c[0] < box2_c[2]) && (box1_c[2] > box2_c[0])) {
            c_lr = true;
        }
        if ((box1_c[1] < box2_c[3]) && (box1_c[3] > box2_c[1])) {
            c_ud = true;
        }
    }
}

class CoffeeSprite {
    /**
     * Creates new sprite for use with the Coffee engine.
     * @param {String} src
     * @param {Number} width
     * @param {Number} height
     */
    constructor(src, width = 128, height = 128) {
        this.image = document.createElement('img');
        this.image.src = src;
        this.image.setAttribute('hidden', '');
        document.body.appendChild(this.image);
        this.width = width;
        this.height = height;
    }
}

let CoffeeKeys = {};

document.addEventListener('keydown', function (event) {
    CoffeeKeys[event.key] = true;
});

document.addEventListener('keyup', function (event) {
    CoffeeKeys[event.key] = false;
});

class CoffeeObject {
    /**
     * The main building block of the game. Can be a player, box, enemy, etc.
     */
    constructor() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
        this.sprite = null;
    }

    /**
     * Changes the objects image to given sprite.
     * @param {CoffeeSprite} sprite
     */
    setSprite(sprite) {
        this.sprite = sprite;
    }

    /**
     * Sets object's x and y.
     * @param {Number} x
     * @param {Number} y
     */
    goTo(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Scales an object to the specified width and height.
     * @param {Number} w
     * @param {Number} h
     */
    scaleTo(w, h) {
        this.sprite.width = w;
        this.sprite.height = h;
    }

    /**
     * Sets the object's rotation to given radians.
     * @param {Number} rotation
     */
    rotateTo(rotation) {
        this.rotation = rotation;
    }
}

class LinearGradient {
    /**
     * Creates a linear gradient from (x1, y1) to (x2, y2).
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     */
    constructor(ctx, x1, y1, x2, y2) {
        this.ctx = ctx;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.gradient = this.ctx.createLinearGradient(
            this.x1,
            this.y1,
            this.x2,
            this.y2
        );
    }

    /**
     * Adds a color stop at the given ratio of the gradient.
     * @param {Number} ratio
     * @param {String} color
     */
    colorStop(ratio, color) {
        this.gradient.addColorStop(ratio, color);
    }
}

class RadialGradient {
    /**
     * Creates a radial gradient from (x1, y1, r1) to (x2, y2, r2).
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} r1
     * @param {Number} x2
     * @param {Number} y2
     * @param {Number} r2
     */
    constructor(ctx, x1, y1, r1, x2, y2, r2) {
        if (r1 < 0 || r2 < 0) {
            alert('Error: Cricle radius cannot be negative.');
            return 0;
        }
        this.ctx = ctx;
        this.x1 = x1;
        this.y1 = y1;
        this.r1 = r1;
        this.x2 = x2;
        this.y2 = y2;
        this.r2 = r2;
        this.gradient = this.ctx.createRadialGradient(
            this.x1,
            this.y1,
            this.r1,
            this.x2,
            this.y2,
            this.r2
        );
    }

    /**
     * Adds a color stop at the given ratio of the gradient.
     * @param {Number} ratio
     * @param {String} color
     */
    colorStop(ratio, color) {
        this.gradient.addColorStop(ratio, color);
    }
}

class CoffeeSound {
    constructor(src) {
        this.sound = document.createElement('audio');
        this.sound.src = src;
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        document.body.appendChild(this.sound);
        this.play = function () {
            this.sound.play();
        };
        this.stop = function () {
            this.sound.pause();
        };
    }
}

class CoffeeBox {
    /**
     * A class used to add collision boxes to your game.
     * @param {Coffee} engine
     * @param {Number} x
     * @param {Number} y
     * @param {Number} w
     * @param {Number} h
     */
    constructor(engine, x, y, w, h) {
        this.coords = [x, y, x + w, y + h];
        engine.boxes.push(this.coords);
    }
}
