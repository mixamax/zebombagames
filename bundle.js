(function () {
    'use strict';

    const steps = {
        0: [{ x: 443, y: 504 }],
        1: [
            { x: 443, y: 504 },
            { x: 417, y: 490 },
            { x: 398, y: 467 },
            { x: 384, y: 461 },
            { x: 373, y: 463 },
            { x: 352, y: 474 },
        ],
        2: [
            { x: 352, y: 474 },
            { x: 277, y: 517 },
        ],

        3: [
            { x: 277, y: 517 },
            { x: 247, y: 531 },
            { x: 224, y: 535 },
            { x: 190, y: 536 },
        ],
        4: [
            { x: 190, y: 536 },
            { x: 161, y: 531 },
            { x: 140, y: 525 },
            { x: 110, y: 508 },
        ],
        5: [
            { x: 110, y: 508 },
            { x: 86, y: 491 },
            { x: 81, y: 473 },
            { x: 87, y: 468 },
            { x: 117, y: 452 },
            { x: 124, y: 444 },
        ],
    };

    class Player {
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

    class Path {
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

    const canvasWidth = 980;
    const canvasHeight = 630;
    const playerImageSrc = "./images/persona.png";

    function initCanvas(canvas) {
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

    const data = {
        rating: [
            {
                id: "123",
                name: "Владимир",
                lastName: "Ларионов",
                img: "./male.png",
                points: "463",
            },
            {
                id: "9",
                name: "Владимир",
                lastName: "Сергеев",
                img: "./male.png",
                points: "521",
            },
            {
                id: "231",
                name: "Вениамин",
                lastName: "Васильев",
                img: "./male.png",
                points: "865",
            },
            {
                id: "321",
                name: "Мария",
                lastName: "Логинова",
                img: "./female.png",
                points: "865",
            },
            {
                id: "492",
                name: "Борис",
                lastName: "Казанцев",
                img: "./male.png",
                points: "784",
            },
            {
                id: "452",
                name: "Полина",
                lastName: "Калинина",
                img: "./female.png",
                points: "225",
            },
            {
                id: "796",
                name: "Даниил",
                lastName: "Воробьёв",
                img: "./male.png",
                points: "642",
            },
            {
                id: "4",
                name: "Эрик",
                lastName: "Аксёнов",
                img: "./male.png",
                points: "150",
            },
            {
                id: "1155",
                name: "Иван",
                lastName: "Иванов",
                img: "./male.png",
                points: "100",
            },
            {
                id: "12145",
                name: "Артем",
                lastName: "Алексеев",
                img: "./male.png",
                points: "1000",
            },
        ],
        friends: [
            {
                id: "9",
                name: "Владимир",
                lastName: "Сергеев",
                img: "./male.png",
            },
            {
                id: "4",
                name: "Эрик",
                lastName: "Аксёнов",
                img: "./male.png",
            },
            {
                id: "15411",
                name: "Ирина",
                lastName: "Чеснокова",
                img: "./female.png",
            },
            {
                id: "15564",
                name: "Дарина",
                lastName: "Боброва",
                img: "./female.png",
            },
        ],
    };

    const canvas = document.getElementById("canvas");
    const goToUniversityBtn = document.querySelector(".go");
    const ratingBoard = document.querySelector(".rating-board");
    const ratingBtn = document.querySelector(".rating");
    const ratingBoardItems = document.querySelector(".rating-board__items");
    const sliderTrack = document.querySelector(".slider__track");
    const leftArrow = document.querySelector(".slider__arrow_left");
    const rightArrow = document.querySelector(".slider__arrow_right");
    const closeRatingBoardBtn = document.querySelector(".rating-board__close-btn");

    const { player, loop } = initCanvas(canvas);

    goToUniversityBtn.addEventListener("click", () => {
        player.setNextPoint();
    });

    ratingBtn.addEventListener("click", () => {
        ratingBoard.classList.toggle("rating-board__shown");
        canvas.classList.toggle("canvas__filter");
    });

    closeRatingBoardBtn.addEventListener("click", () => {
        ratingBoard.classList.toggle("rating-board__shown");
        canvas.classList.toggle("canvas__filter");
    });

    //запускаем RAF
    loop();

    function slider() {
        let position = 0;

        leftArrow.addEventListener("click", () => {
            position -= 60;
            sliderTrack.style.transform = `translateX(${position}px)`;
        });

        rightArrow.addEventListener("click", () => {
            position += 60;
            sliderTrack.style.transform = `translateX(${position}px)`;
        });
    }

    slider();

    const sortedData = data.rating.sort((a, b) => {
        return b.points - a.points;
    });
    const friends = data.friends;

    //заполняем рейтинг
    sortedData.forEach((item, i) => {
        const friend = friends.find((friend) => friend.id === item.id);
        const ratingBoardItem = document.createElement("div");
        ratingBoardItem.classList.add("rating-board__item");
        friend ? ratingBoardItem.classList.add("rating-board__item_yellow") : "";
        ratingBoardItem.innerHTML = `
        <span class="rating-board__item-value">${i + 1}</span>
        <div class="rating-board__item-value"></div>
        <span class="rating-board__item-value">${item.name} ${
        item.lastName
    }</span>
        <span class="rating-board__item-value">${item.points}</span>
    `;
        ratingBoardItems.appendChild(ratingBoardItem);
    });

    //заполняем слайдер
    sortedData.forEach(() => {
        const sliderItem = document.createElement("div");
        sliderItem.classList.add("slider__item");
        sliderItem.innerHTML = `
         <img height="38px" src="./images/user.png" />`;
        sliderTrack.appendChild(sliderItem);
    });

})();
