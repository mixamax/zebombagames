import { initCanvas } from "./canvas.js";
import { data } from "./data.js";

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
