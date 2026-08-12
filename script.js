const scenes = [

    {
        image: "IMG_8684.png",
        category: "ОТЕЛЬ",
        number: "00",
        title: "THE HOTEL",
        description: "Пространство,\nсозданное для тишины.",
        section: "hotel"
    },

    {
        image: "IMG_8685.png",
        category: "ПРИБЫТИЕ",
        number: "01",
        title: "ПЕРВОЕ ВПЕЧАТЛЕНИЕ",
        description: "Первые секунды\nначинаются ещё до номера.",
        section: "arrival"
    },

    {
        image: "IMG_8687.png",
        category: "ПРИБЫТИЕ",
        number: "02",
        title: "ВХОД В ТИШИНУ",
        description: "Город остаётся\nпо ту сторону двери.",
        section: "arrival"
    },

    {
        image: "IMG_8688.png",
        category: "ПРОСТРАНСТВО",
        number: "03",
        title: "САМО ПРОСТРАНСТВО",
        description: "Архитектура,\nкоторая не требует объяснений.",
        section: "space"
    },

    {
        image: "IMG_8691.png",
        category: "ПРОСТРАНСТВО",
        number: "04",
        title: "КАЖДАЯ ДЕТАЛЬ",
        description: "Материалы.\nСвет. Пропорции.",
        section: "space"
    },

    {
        image: "IMG_8692.png",
        category: "ПРОСТРАНСТВО",
        number: "05",
        title: "ПУТЬ ВВЕРХ",
        description: "Каждый переход\nстановится частью опыта.",
        section: "space"
    },

    {
        image: "IMG_8693.png",
        category: "ПРОСТРАНСТВО",
        number: "06",
        title: "МЕЖДУ ПРОСТРАНСТВАМИ",
        description: "Тишина становится\nощутимой.",
        section: "space"
    },

    {
        image: "IMG_8694.png",
        category: "ПРОСТРАНСТВО",
        number: "07",
        title: "ЛИЧНОЕ ПРОСТРАНСТВО",
        description: "Пространство,\nкоторое остаётся только вашим.",
        section: "space"
    },

    {
        image: "IMG_8695.png",
        category: "НОМЕРА",
        number: "08",
        title: "ВАШ НОМЕР",
        description: "Здесь начинается\nваше время.",
        section: "rooms"
    },

    {
        image: "IMG_8697.png",
        category: "НОМЕРА",
        number: "09",
        title: "ЛИЧНОЕ ПРОСТРАНСТВО",
        description: "Ничего лишнего.\nТолько необходимое.",
        section: "rooms"
    },

    {
        image: "IMG_8698.png",
        category: "НОМЕРА",
        number: "10",
        title: "ВРЕМЯ ОСТАНОВИТЬСЯ",
        description: "Место,\nгде не нужно торопиться.",
        section: "rooms"
    },

    {
        image: "IMG_8699.png",
        category: "ДЕТАЛИ",
        number: "11",
        title: "ОСТАНОВИТЕСЬ ЗДЕСЬ",
        description: "Вечер.\nТишина. Ваше пространство.",
        section: "details"
    },

    {
        image: "IMG_8700.png",
        category: "ДЕТАЛИ",
        number: "12",
        title: "ВАШ МОМЕНТ",
        description: "Иногда роскошь\nвыглядит именно так.",
        section: "details"
    },

    {
        image: "IMG_8702.png",
        category: "ДЕТАЛИ",
        number: "13",
        title: "ГОРОД СВЕРХУ",
        description: "Город остаётся\nгде-то далеко внизу.",
        section: "details"
    },

    {
        image: "IMG_8703.png",
        category: "ДЕТАЛИ",
        number: "14",
        title: "ВАШЕ ВРЕМЯ",
        description: "Время, которое\nпринадлежит только вам.",
        section: "details"
    }

];


let currentIndex = 0;
let changing = false;


/* =====================================
   ЭЛЕМЕНТЫ
===================================== */

const image = document.getElementById("mainImage");

const category = document.getElementById("category");
const sceneNumber = document.getElementById("sceneNumber");

const title = document.getElementById("title");
const description = document.getElementById("description");

const current = document.getElementById("current");

const menuPanel = document.getElementById("menuPanel");
const bookingPanel = document.getElementById("bookingPanel");


/* =====================================
   ПРЕДЗАГРУЗКА
===================================== */

scenes.forEach(scene => {

    const img = new Image();

    img.src = scene.image;

});


/* =====================================
   АКТИВНЫЙ BAR
===================================== */

function setActiveBar(index) {

    const section =
        scenes[index].section;

    document
        .querySelectorAll(".bar-item")
        .forEach(item => {

            const start =
                Number(item.dataset.start);

            let active = false;

            if (section === "hotel") {
                active = start === 0;
            }

            if (section === "arrival") {
                active = start === 1;
            }

            if (section === "space") {
                active = start === 3;
            }

            if (section === "rooms") {
                active = start === 8;
            }

            if (section === "details") {
                active = start === 11;
            }

            item.classList.toggle(
                "active",
                active
            );

        });
}


/* =====================================
   ОБНОВЛЕНИЕ
===================================== */

function render(index) {

    const scene =
        scenes[index];

    category.textContent =
        scene.category;

    sceneNumber.textContent =
        scene.number;

    title.textContent =
        scene.title;

    description.textContent =
        scene.description;

    current.textContent =
        String(index + 1).padStart(2, "0");

    setActiveBar(index);
}


/* =====================================
   ПЕРЕКЛЮЧЕНИЕ
===================================== */

function changeScene(newIndex) {

    if (changing) {
        return;
    }

    if (newIndex < 0) {
        newIndex = scenes.length - 1;
    }

    if (newIndex >= scenes.length) {
        newIndex = 0;
    }

    if (newIndex === currentIndex) {
        return;
    }

    changing = true;

    image.classList.add("fade");


    setTimeout(() => {

        currentIndex =
            newIndex;

        image.src =
            scenes[currentIndex].image;

        render(currentIndex);

        requestAnimationFrame(() => {

            image.classList.remove("fade");

        });

        setTimeout(() => {

            changing = false;

        }, 280);

    }, 180);
}


/* =====================================
   СТРЕЛКИ
===================================== */

document
    .getElementById("prev")
    .addEventListener("click", () => {

        changeScene(
            currentIndex - 1
        );

    });


document
    .getElementById("next")
    .addEventListener("click", () => {

        changeScene(
            currentIndex + 1
        );

    });


/* =====================================
   НИЖНИЙ BAR
===================================== */

document
    .querySelectorAll(".bar-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    Number(button.dataset.start);

                changeScene(target);

            }
        );

    });


/* =====================================
   МЕНЮ
===================================== */

document
    .getElementById("openMenu")
    .addEventListener("click", () => {

        menuPanel.classList.add("open");

    });


document
    .getElementById("closeMenu")
    .addEventListener("click", () => {

        menuPanel.classList.remove("open");

    });


/* =====================================
   ПУНКТЫ МЕНЮ
===================================== */

document
    .querySelectorAll(".menu-list button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const target =
                    Number(button.dataset.start);

                menuPanel.classList.remove(
                    "open"
                );

                setTimeout(() => {

                    changeScene(target);

                }, 120);

            }
        );

    });


/* =====================================
   THE HOTEL
===================================== */

document
    .getElementById("logoButton")
    .addEventListener("click", () => {

        changeScene(0);

    });


/* =====================================
   БРОНИРОВАНИЕ
===================================== */

document
    .getElementById("openBooking")
    .addEventListener("click", () => {

        bookingPanel.classList.add("open");

    });


document
    .getElementById("closeBooking")
    .addEventListener("click", () => {

        bookingPanel.classList.remove("open");

    });


/* =====================================
   СВАЙП
===================================== */

let startX = 0;
let startY = 0;

document.addEventListener(
    "touchstart",
    event => {

        if (
            menuPanel.classList.contains("open") ||
            bookingPanel.classList.contains("open")
        ) {
            return;
        }

        startX =
            event.changedTouches[0].clientX;

        startY =
            event.changedTouches[0].clientY;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    event => {

        if (changing) {
            return;
        }

        if (
            menuPanel.classList.contains("open") ||
            bookingPanel.classList.contains("open")
        ) {
            return;
        }

        const endX =
            event.changedTouches[0].clientX;

        const endY =
            event.changedTouches[0].clientY;

        const dx =
            endX - startX;

        const dy =
            endY - startY;


        if (
            Math.abs(dx) < 50 ||
            Math.abs(dx) < Math.abs(dy)
        ) {
            return;
        }


        if (dx < 0) {

            changeScene(
                currentIndex + 1
            );

        } else {

            changeScene(
                currentIndex - 1
            );

        }

    },
    { passive: true }
);


/* =====================================
   КЛАВИАТУРА
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {

            changeScene(
                currentIndex + 1
            );

        }

        if (event.key === "ArrowLeft") {

            changeScene(
                currentIndex - 1
            );

        }

        if (event.key === "Escape") {

            menuPanel.classList.remove("open");

            bookingPanel.classList.remove("open");

        }

    }
);


/* =====================================
   СТАРТ
===================================== */

render(0);
