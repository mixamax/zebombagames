export class Path {
    steps = [];
    position = 0;

    currentSteps = [];
    currentStepNumber = 0;
    currentStep = {};

    constructor(steps) {
        this.steps = steps;
        this.currentSteps = this.steps[this.position];
        this.currentStep = this.currentSteps[this.currentStepNumber];
    }

    getStartX() {
        return this.currentStep.x;
    }
    getStartY() {
        return this.currentStep.y;
    }
    next() {
        this.position += 1;
        if (this.position > Object.keys(this.steps).length - 1) {
            return null;
        }
        this.currentSteps = this.steps[this.position];
        this.currentStepNumber = 0;
        this.currentStep = this.currentSteps[this.currentStepNumber];
        return this.currentSteps;
    }

    getNextCurrentStep() {
        if (this.currentStepNumber >= this.currentSteps.length - 1) {
            return null;
        }
        this.currentStepNumber += 1;
        this.currentStep = this.currentSteps[this.currentStepNumber];
        return this.currentStep;
    }
}
