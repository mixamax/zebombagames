import { steps } from "./steps.js";
import { Player } from "./Player.js";
import { Path } from "./Path.js";

const canvasWidth = 980;
const canvasHeight = 630;
const playerImageSrc = "./images/persona.png";

export function initCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = canvasWidth);
    const h = (canvas.height = canvasHeight);

    const path = new Path(steps);
    const player = new Player(path, playerImageSrc, ctx);

    function loop() {
        ctx.clearRect(0, 0, w, h);
        player.draw();
        window.requestAnimationFrame(() => loop());
    }

    return {
        player,
        loop,
    };
}
