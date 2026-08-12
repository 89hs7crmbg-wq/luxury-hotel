const frames = [
    {
        image: "IMG_8684.png",
        category: "ОТЕЛЬ",
        code: "00",
        title: "ВРЕМЯ<br>ОСТАНОВИТЬСЯ",
        description: "Место, где город наконец становится тише."
    },
    {
        image: "IMG_8685.png",
        category: "ПРИБЫТИЕ",
        code: "01",
        title: "ПЕРВЫЕ<br>СЕКУНДЫ",
        description: "Впечатление начинается ещё до номера."
    },
    {
        image: "IMG_8687.png",
        category: "ПРИБЫТИЕ",
        code: "02",
        title: "ОСТАВИТЬ<br>ГОРОД",
        description: "Всё лишнее остаётся по ту сторону двери."
    },
    {
        image: "IMG_8688.png",
        category: "ПРОСТРАНСТВО",
        code: "03",
        title: "СВОБОДА<br>ПРОСТРАНСТВА",
        description: "Архитектура, которой не нужно ничего доказывать."
    },
    {
        image: "IMG_8691.png",
        category: "ПРОСТРАНСТВО",
        code: "04",
        title: "КАЖДАЯ<br>ДЕТАЛЬ",
        description: "Свет, материал и пропорции работают вместе."
    },
    {
        image: "IMG_8692.png",
        category: "ПРОСТРАНСТВО",
        code: "05",
        title: "ТИШИНА<br>МЕЖДУ",
        description: "Иногда самое важное находится между пространствами."
    },
    {
        image: "IMG_8693.png",
        category: "ПРОСТРАНСТВО",
        code: "06",
        title: "НЕ СПЕШИТЬ<br>НИКУДА",
        description: "Здесь у времени другой ритм."
    },
    {
        image: "IMG_8694.png",
        category: "ПРОСТРАНСТВО",
        code: "07",
        title: "ЛИЧНОЕ<br>ПРОСТРАНСТВО",
        description: "Место, которое остаётся только вашим."
    },
    {
        image: "IMG_8695.png",
        category: "НОМЕРА",
        code: "08",
        title: "ВАШ<br>НОМЕР",
        description: "Пространство для собственного ритма."
    },
    {
        image: "IMG_8697.png",
        category: "НОМЕРА",
        code: "09",
        title: "НИЧЕГО<br>ЛИШНЕГО",
        description: "Только то, что действительно нужно."
    },
    {
        image: "IMG_8698.png",
        category: "НОМЕРА",
        code: "10",
        title: "МОЖНО<br>ОСТАТЬСЯ",
        description: "Иногда лучший план на вечер отсутствует."
    },
    {
        image: "IMG_8699.png",
        category: "ДЕТАЛИ",
        code: "11",
        title: "МАЛЕНЬКИЕ<br>МГНОВЕНИЯ",
        description: "Именно они остаются в памяти."
    },
    {
        image: "IMG_8700.png",
        category: "ДЕТАЛИ",
        code: "12",
        title: "ВАШ<br>МОМЕНТ",
        description: "Время, которое принадлежит только вам."
    },
    {
        image: "IMG_8702.png",
        category: "ДЕТАЛИ",
        code: "13",
        title: "ГОРОД<br>ОСТАЁТСЯ ВНИЗУ",
        description: "Сургут продолжает жить где-то там."
    },
    {
        image: "IMG_8703.png",
        category: "ДЕТАЛИ",
        code: "14",
        title: "ОСТАТЬСЯ<br>ЕЩЁ НЕМНОГО",
        description: "Пожалуй, именно ради этого всё и начиналось."
    }
];


const photo = document.getElementById("photo");
const category = document.getElementById("category");
const frameCode = document.getElementById("frameCode");
const title = document.getElementById("title");
const description = document.getElementById("description");
const counterCurrent = document.getElementById("counterCurrent");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const navItems = document.querySelectorAll(".nav-item");

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const menuPanel = document.getElementById("menuPanel");

const bookingButton = document.getElementById("bookingButton");
const closeBooking = document.getElementById("closeBooking");
const bookingPanel = document.getElementById("bookingPanel");

const homeButton = document.getElementById("homeButton");

const menuItems = document.querySelectorAll(".menu-list button");


let currentIndex = 0;
let changing = false;


/* =========================
   PRELOAD
========================= */

frames.forEach((frame) => {
    const image = new Image();
    image.src = frame.image;
});


/* =========================
   ACTIVE BOTTOM ITEM
========================= */

function updateNavigation(index) {

    let section = 0;

    if (index >= 1 && index <= 2) {
        section = 1;
    }

    if (index >= 3 && index <= 7) {
        section = 2;
    }

    if (index >= 8 && index <= 10) {
        section = 3;
    }

    if (index >= 11) {
        section = 4;
    }

    navItems.forEach((item, i) => {
        item.classList.toggle("active", i === section);
    });
}


/* =========================
   UPDATE
========================= */

function updateContent(index) {

    const frame = frames[index];

    category.textContent = frame.category;

    frameCode.textContent = frame.code;

    counterCurrent.textContent =
        String(index + 1).padStart(2, "0");

    title.innerHTML = frame.title;

    description.textContent = frame.description;

    updateNavigation(index);
}


/* =========================
   CHANGE FRAME
========================= */

function changeFrame(newIndex) {

    if (changing) {
        return;
    }

    if (newIndex < 0) {
        newIndex = frames.length - 1;
    }

    if (newIndex >= frames.length) {
        newIndex = 0;
    }

    if (newIndex === currentIndex) {
        return;
    }

    changing = true;

    photo.classList.add("fade");

    setTimeout(() => {

        currentIndex = newIndex;

        const frame = frames[currentIndex];

        photo.src = frame.image;

        updateContent(currentIndex);

        requestAnimationFrame(() => {
            photo.classList.remove("fade");
        });

        setTimeout(() => {
            changing = false;
        }, 220);

    }, 120);
}


/* =========================
   ARROWS
========================= */

prev.addEventListener("click", () => {
    changeFrame(currentIndex - 1);
});

next.addEventListener("click", () => {
    changeFrame(currentIndex + 1);
});


/* =========================
   BOTTOM NAV
========================= */

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const index =
            Number(item.dataset.index);

        changeFrame(index);

    });

});


/* =========================
   MENU
========================= */

function openMenu() {

    menuPanel.classList.add("open");

}

function closeMenuPanel() {

    menuPanel.classList.remove("open");

}

menuButton.addEventListener("click", openMenu);

closeMenu.addEventListener("click", closeMenuPanel);


menuItems.forEach((item) => {

    item.addEventListener("click", () => {

        const index =
            Number(item.dataset.index);

        closeMenuPanel();

        changeFrame(index);

    });

});


/* =========================
   BOOKING
========================= */

bookingButton.addEventListener("click", () => {

    bookingPanel.classList.add("open");

});

closeBooking.addEventListener("click", () => {

    bookingPanel.classList.remove("open");

});


/* =========================
   HOME
========================= */

homeButton.addEventListener("click", () => {

    changeFrame(0);

});


/* =========================
   ESC
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMenuPanel();

        bookingPanel.classList.remove("open");

    }

    if (event.key === "ArrowLeft") {
        changeFrame(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
        changeFrame(currentIndex + 1);
    }

});


/* =========================
   SWIPE
========================= */

let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (event) => {

    if (
        menuPanel.classList.contains("open") ||
        bookingPanel.classList.contains("open")
    ) {
        return;
    }

    const touch = event.touches[0];

    startX = touch.clientX;
    startY = touch.clientY;

}, {
    passive: true
});


document.addEventListener("touchend", (event) => {

    if (
        menuPanel.classList.contains("open") ||
        bookingPanel.classList.contains("open")
    ) {
        return;
    }

    const touch = event.changedTouches[0];

    const deltaX =
        touch.clientX - startX;

    const deltaY =
        touch.clientY - startY;

    if (Math.abs(deltaX) < 60) {
        return;
    }

    if (
        Math.abs(deltaX) <= Math.abs(deltaY)
    ) {
        return;
    }

    if (deltaX < 0) {
        changeFrame(currentIndex + 1);
    } else {
        changeFrame(currentIndex - 1);
    }

}, {
    passive: true
});


/* =========================
   START
========================= */

updateContent(0);
