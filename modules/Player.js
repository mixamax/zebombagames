export class Player {
    speed = 8;
    percent = 3;
    width = 22;
    height = 70;
    constructor(path, url, ctx) {
        this.img = new Image();
        this.img.src = url;
        this.x = path.getStartX();
        this.y = path.getStartY();
        this.ctx = ctx;
        this.targetX = this.x;
        this.targetY = this.y;
        this.path = path;
    }

    isInPoint() {
        return this.x === this.targetX;
    }
    draw() {
        this.move();
        this.ctx.drawImage(
            this.img,
            this.x - this.width / 2,
            this.y - this.height,
            this.width,
            this.height
        );
    }
    setNextPoint() {
        const steps = this.path.next();
        if (!steps) {
            return;
        }
        const { x, y } = steps[steps.length - 1];
        this.targetX = x;
        this.targetY = y;
    }
    move() {
        if (!this.isInPoint()) {
            let currentStep = this.path.currentStep;
            if (
                this.x / currentStep.x > 1 - this.percent / 100 &&
                this.x / currentStep.x < 1 + this.percent / 100 &&
                this.y / currentStep.y > 1 - this.percent / 100 &&
                this.y / currentStep.y < 1 + this.percent / 100
            ) {
                this.x = currentStep.x;
                this.y = currentStep.y;
                currentStep = this.path.getNextCurrentStep();
            }

            if (currentStep) {
                this.x += (currentStep.x - this.x) / this.speed;
                this.y += (currentStep.y - this.y) / this.speed;
            }
        } else {
            return;
        }
    }
}
