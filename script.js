const frames = [

    {
        image: "IMG_8684.png",
        category: "ОТЕЛЬ",
        number: "00",
        title: "ВРЕМЯ<br>ОСТАНОВИТЬСЯ",
        description: "Место, где город наконец становится тише."
    },

    {
        image: "IMG_8685.png",
        category: "ПРИБЫТИЕ",
        number: "01",
        title: "ПЕРВЫЕ<br>СЕКУНДЫ",
        description: "Впечатление начинается ещё до номера."
    },

    {
        image: "IMG_8687.png",
        category: "ПРИБЫТИЕ",
        number: "02",
        title: "ОСТАВИТЬ<br>ГОРОД",
        description: "Всё лишнее остаётся по ту сторону двери."
    },

    {
        image: "IMG_8688.png",
        category: "ПРОСТРАНСТВО",
        number: "03",
        title: "СВОБОДА<br>ПРОСТРАНСТВА",
        description: "Архитектура, которой не нужно ничего доказывать."
    },

    {
        image: "IMG_8691.png",
        category: "ПРОСТРАНСТВО",
        number: "04",
        title: "КАЖДАЯ<br>ДЕТАЛЬ",
        description: "Свет, материал и пропорции работают вместе."
    },

    {
        image: "IMG_8692.png",
        category: "ПРОСТРАНСТВО",
        number: "05",
        title: "ТИШИНА<br>МЕЖДУ",
        description: "Иногда самое важное находится между пространствами."
    },

    {
        image: "IMG_8693.png",
        category: "ПРОСТРАНСТВО",
        number: "06",
        title: "НЕ СПЕШИТЬ<br>НИКУДА",
        description: "Здесь у времени другой ритм."
    },

    {
        image: "IMG_8694.png",
        category: "ПРОСТРАНСТВО",
        number: "07",
        title: "ЛИЧНОЕ<br>ПРОСТРАНСТВО",
        description: "Место, которое остаётся только вашим."
    },

    {
        image: "IMG_8695.png",
        category: "НОМЕРА",
        number: "08",
        title: "ВАШ<br>НОМЕР",
        description: "Пространство для собственного ритма."
    },

    {
        image: "IMG_8697.png",
        category: "НОМЕРА",
        number: "09",
        title: "НИЧЕГО<br>ЛИШНЕГО",
        description: "Только то, что действительно нужно."
    },

    {
        image: "IMG_8698.png",
        category: "НОМЕРА",
        number: "10",
        title: "МОЖНО<br>ОСТАТЬСЯ",
        description: "Иногда лучший план на вечер отсутствует."
    },

    {
        image: "IMG_8699.png",
        category: "ДЕТАЛИ",
        number: "11",
        title: "МАЛЕНЬКИЕ<br>МГНОВЕНИЯ",
        description: "Именно они остаются в памяти."
    },

    {
        image: "IMG_8700.png",
        category: "ДЕТАЛИ",
        number: "12",
        title: "ВАШ<br>МОМЕНТ",
        description: "Время, которое принадлежит только вам."
    },

    {
        image: "IMG_8702.png",
        category: "ДЕТАЛИ",
        number: "13",
        title: "ГОРОД<br>ОСТАЁТСЯ ВНИЗУ",
        description: "Сургут продолжает жить где-то там."
    },

    {
        image: "IMG_8703.png",
        category: "ДЕТАЛИ",
        number: "14",
        title: "ОСТАТЬСЯ<br>ЕЩЁ НЕМНОГО",
        description: "Пожалуй, именно ради этого всё и начиналось."
    }

];


/* =========================================
   ЭЛЕМЕНТЫ
========================================= */

const photo = document.getElementById("photo");
const category = document.getElementById("category");
const frameNumber = document.getElementById("frameNumber");
const title = document.getElementById("title");
const description = document.getElementById("description");
const currentFrame = document.getElementById("currentFrame");

const previous = document.getElementById("previous");
const next = document.getElementById("next");

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");

const menuOverlay = document.getElementById("menuOverlay");

const bookButton = document.getElementById("bookButton");
const closeBooking = document.getElementById("closeBooking");

const bookingOverlay = document.getElementById("bookingOverlay");

const brandButton = document.getElementById("brandButton");

const barItems =
    document.querySelectorAll(".bar-item");

const menuLinks =
    document.querySelectorAll(".menu-links button");


let currentIndex = 0;

let isAnimating = false;


/* =========================================
   ПРЕДЗАГРУЗКА
========================================= */

frames.forEach(frame => {

    const img = new Image();

    img.src = frame.image;

});


/* =========================================
   АКТИВНАЯ СЕКЦИЯ
========================================= */

function updateBar(index) {

    let activeIndex = 0;

    if (index >= 1 && index <= 2) {
        activeIndex = 1;
    }

    if (index >= 3 && index <= 7) {
        activeIndex = 2;
    }

    if (index >= 8 && index <= 10) {
        activeIndex = 3;
    }

    if (index >= 11) {
        activeIndex = 4;
    }


    barItems.forEach((item, i) => {

        item.classList.toggle(
            "active",
            i === activeIndex
        );

    });
}


/* =========================================
   ОТРИСОВКА ТЕКСТА
========================================= */

function updateText(index) {

    const frame = frames[index];

    category.textContent =
        frame.category;

    frameNumber.textContent =
        frame.number;

    currentFrame.textContent =
        String(index + 1).padStart(2, "0");

    title.innerHTML =
        frame.title;

    description.textContent =
        frame.description;

    updateBar(index);
}


/* =========================================
   СМЕНА КАДРА
========================================= */

function changeFrame(index) {

    if (isAnimating) {
        return;
    }

    if (index < 0) {
        index = frames.length - 1;
    }

    if (index >= frames.length) {
        index = 0;
    }

    if (index === currentIndex) {
        return;
    }


    isAnimating = true;

    photo.classList.add("changing");


    /*
        Сначала меняем текст.
        Никаких цепочек setTimeout,
        которые потом начинают дёргать
        интерфейс на iPhone.
    */

    setTimeout(() => {

        currentIndex = index;

        photo.src =
            frames[currentIndex].image;

        updateText(currentIndex);

        photo.onload = () => {

            requestAnimationFrame(() => {

                photo.classList.remove("changing");

            });

        };


        /*
            Если изображение уже находится
            в кеше браузера, onload может быть
            не нужен.
        */

        if (photo.complete) {

            requestAnimationFrame(() => {

                photo.classList.remove("changing");

            });

        }


        setTimeout(() => {

            isAnimating = false;

        }, 260);

    }, 120);
}


/* =========================================
   СТРЕЛКА НАЗАД
========================================= */

previous.addEventListener(
    "click",
    function () {

        changeFrame(
            currentIndex - 1
        );

    }
);


/* =========================================
   СТРЕЛКА ВПЕРЁД
========================================= */

next.addEventListener(
    "click",
    function () {

        changeFrame(
            currentIndex + 1
        );

    }
);


/* =========================================
   НИЖНИЙ BAR
========================================= */

barItems.forEach(item => {

    item.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    this.dataset.index
                );

            changeFrame(index);

        }
    );

});


/* =========================================
   БУРГЕР
========================================= */

menuButton.addEventListener(
    "click",
    function () {

        menuOverlay.classList.add("open");

        menuOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/* =========================================
   ЗАКРЫТЬ МЕНЮ
========================================= */

closeMenu.addEventListener(
    "click",
    function () {

        menuOverlay.classList.remove("open");

        menuOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }
);


/* =========================================
   ПУНКТЫ МЕНЮ
========================================= */

menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    this.dataset.index
                );

            menuOverlay.classList.remove(
                "open"
            );

            menuOverlay.setAttribute(
                "aria-hidden",
                "true"
            );

            changeFrame(index);

        }
    );

});


/* =========================================
   THE HOTEL
========================================= */

brandButton.addEventListener(
    "click",
    function () {

        changeFrame(0);

    }
);


/* =========================================
   БРОНИРОВАНИЕ
========================================= */

bookButton.addEventListener(
    "click",
    function () {

        bookingOverlay.classList.add(
            "open"
        );

        bookingOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }
);


/* =========================================
   ЗАКРЫТЬ БРОНЬ
========================================= */

closeBooking.addEventListener(
    "click",
    function () {

        bookingOverlay.classList.remove(
            "open"
        );

        bookingOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }
);


/* =========================================
   SWIPE
========================================= */

let touchStartX = 0;
let touchStartY = 0;

let touchStartTime = 0;


document.addEventListener(
    "touchstart",
    function (event) {

        if (
            menuOverlay.classList.contains("open") ||
            bookingOverlay.classList.contains("open")
        ) {
            return;
        }

        const touch =
            event.touches[0];

        touchStartX =
            touch.clientX;

        touchStartY =
            touch.clientY;

        touchStartTime =
            Date.now();

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        if (
            menuOverlay.classList.contains("open") ||
            bookingOverlay.classList.contains("open")
        ) {
            return;
        }

        const touch =
            event.changedTouches[0];

        const deltaX =
            touch.clientX - touchStartX;

        const deltaY =
            touch.clientY - touchStartY;

        const duration =
            Date.now() - touchStartTime;


        /*
            Не воспринимаем обычный тап
            как свайп.
        */

        if (duration > 700) {
            return;
        }

        if (Math.abs(deltaX) < 55) {
            return;
        }

        if (
            Math.abs(deltaX) <
            Math.abs(deltaY) * 1.25
        ) {
            return;
        }


        if (deltaX < 0) {

            changeFrame(
                currentIndex + 1
            );

        } else {

            changeFrame(
                currentIndex - 1
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================
   КЛАВИАТУРА
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "ArrowRight") {

            changeFrame(
                currentIndex + 1
            );

        }

        if (event.key === "ArrowLeft") {

            changeFrame(
                currentIndex - 1
            );

        }

        if (event.key === "Escape") {

            menuOverlay.classList.remove(
                "open"
            );

            bookingOverlay.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================
   СТАРТ
========================================= */

updateText(0);
