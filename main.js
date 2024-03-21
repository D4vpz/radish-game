let engine = new Coffee();

engine.createWindow(320, 240);

let mouse_pos = null;

class Player {
    constructor() {
        this.pos = {
            x: 50,
            y: 50,
        };
        this.img = null;
    }
}

let player = new Player();

window.onload = function () {
    engine.displayWindow();

    setInterval(loop, 10);
}

function loop() {
    engine.cover('black');

    engine.fillColor = 'white';
    engine.fillRect(player.pos.x, player.pos.y, 16, 16);
    engine.fillRect(mouse_pos.x - 4, mouse_pos.y - 4, 8, 8);

    if (CoffeeKeys.w || CoffeeKeys.ArrowUp) {
        player.pos.y--;
    }
    if (CoffeeKeys.s || CoffeeKeys.ArrowDown) {
        player.pos.y++;
    }
    if (CoffeeKeys.a || CoffeeKeys.ArrowLeft) {
        player.pos.x--;
    }
    if (CoffeeKeys.d || CoffeeKeys.ArrowRight) {
        player.pos.x++;
    }
}

window.onmousemove = function (event) {
    mouse_pos = engine.getMousePosition(event);
}