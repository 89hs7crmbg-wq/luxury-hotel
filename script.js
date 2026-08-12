const images = [
    "IMG_8684.png",
    "IMG_8685.png",
    "IMG_8687.png",
    "IMG_8688.png",
    "IMG_8691.png",
    "IMG_8692.png",
    "IMG_8693.png",
    "IMG_8694.png",
    "IMG_8695.png",
    "IMG_8697.png",
    "IMG_8698.png",
    "IMG_8699.png",
    "IMG_8700.png",
    "IMG_8702.png",
    "IMG_8703.png"
];

let current = 0;

const image = document.getElementById("mainImage");
const number = document.getElementById("currentNumber");

const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

function changeImage(index) {

    current = index;

    if (current < 0) {
        current = images.length - 1;
    }

    if (current >= images.length) {
        current = 0;
    }

    image.src = images[current];

    number.textContent =
        String(current + 1).padStart(2, "0");
}


/* СТРЕЛКА ВПРАВО */

nextButton.onclick = function () {
    changeImage(current + 1);
};


/* СТРЕЛКА ВЛЕВО */

prevButton.onclick = function () {
    changeImage(current - 1);
};


/* МЕНЮ */

menuButton.onclick = function () {

    menuOverlay.classList.add("open");

};


/* ЗАКРЫТЬ МЕНЮ */

closeMenu.onclick = function () {

    menuOverlay.classList.remove("open");

};


/* ПУНКТЫ МЕНЮ */

const menuItems =
    menuOverlay.querySelectorAll(
        "button[data-section]"
    );

menuItems.forEach(function (item) {

    item.onclick = function () {

        menuOverlay.classList.remove("open");

    };

});


/* КЛАВИАТУРА */

document.onkeydown = function (event) {

    if (event.key === "ArrowRight") {
        changeImage(current + 1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(current - 1);
    }

    if (event.key === "Escape") {
        menuOverlay.classList.remove("open");
    }

};
