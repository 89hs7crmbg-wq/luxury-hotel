const scenes = [

    {
        image: "IMG_8684.png",
        section: "hotel",
        category: "ОТЕЛЬ",
        index: "00",
        title: "THE<br>HOTEL",
        description: "Пространство,\nсозданное для\nтишины."
    },

    {
        image: "IMG_8685.png",
        section: "arrival",
        category: "ПРИБЫТИЕ",
        index: "01",
        title: "ПЕРВОЕ<br>ВПЕЧАТЛЕНИЕ",
        description: "Первые секунды\nначинаются ещё\nдо номера."
    },

    {
        image: "IMG_8687.png",
        section: "arrival",
        category: "ПРИБЫТИЕ",
        index: "02",
        title: "ВХОД<br>В ТИШИНУ",
        description: "Город остаётся\nпо ту сторону двери."
    },

    {
        image: "IMG_8688.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "03",
        title: "САМО<br>ПРОСТРАНСТВО",
        description: "Архитектура,\nкоторая не требует\nобъяснений."
    },

    {
        image: "IMG_8691.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "04",
        title: "ВАЖНА<br>КАЖДАЯ ДЕТАЛЬ",
        description: "Материалы.\nСвет.\nПропорции."
    },

    {
        image: "IMG_8692.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "05",
        title: "ПУТЬ<br>ВВЕРХ",
        description: "Каждый переход\nстановится частью опыта."
    },

    {
        image: "IMG_8693.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "06",
        title: "МЕЖДУ<br>ПРОСТРАНСТВАМИ",
        description: "Тишина\nстановится\nощутимой."
    },

    {
        image: "IMG_8694.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "07",
        title: "ЛИЧНОЕ<br>ПРОСТРАНСТВО",
        description: "Пространство,\nкоторое остаётся\nтолько вашим."
    },

    {
        image: "IMG_8695.png",
        section: "rooms",
        category: "НОМЕРА",
        index: "08",
        title: "ВАШ<br>НОМЕР",
        description: "Здесь начинается\nваше время."
    },

    {
        image: "IMG_8697.png",
        section: "rooms",
        category: "НОМЕРА",
        index: "09",
        title: "ЛИЧНОЕ<br>ПРОСТРАНСТВО",
        description: "Ничего лишнего.\nТолько необходимое."
    },

    {
        image: "IMG_8698.png",
        section: "rooms",
        category: "НОМЕРА",
        index: "10",
        title: "ВРЕМЯ<br>ОСТАНОВИТЬСЯ",
        description: "Место,\nгде не нужно\nторопиться."
    },

    {
        image: "IMG_8699.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "11",
        title: "ОСТАНОВИТЕСЬ<br>ЗДЕСЬ",
        description: "Вечер.\nТишина.\nВаше пространство."
    },

    {
        image: "IMG_8700.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "12",
        title: "ВАШ<br>МОМЕНТ",
        description: "Иногда роскошь\nвыглядит именно так."
    },

    {
        image: "IMG_8702.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "13",
        title: "ГОРОД<br>СВЕРХУ",
        description: "Город остаётся\nгде-то далеко внизу."
    },

    {
        image: "IMG_8703.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "14",
        title: "ВАШЕ<br>ВРЕМЯ",
        description: "Время,\nкоторое принадлежит\nтолько вам."
    }

];


let current = 0;


/* ELEMENTS */

const image =
    document.getElementById("mainImage");

const imageWrap =
    document.getElementById("imageWrap");

const currentNumber =
    document.getElementById("currentNumber");

const category =
    document.getElementById("category");

const contentIndex =
    document.getElementById("contentIndex");

const title =
    document.getElementById("title");

const description =
    document.getElementById("description");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const menuButton =
    document.getElementById("menuButton");

const menuOverlay =
    document.getElementById("menuOverlay");

const closeMenu =
    document.getElementById("closeMenu");

const bookingButton =
    document.getElementById("bookingButton");

const bookingPanel =
    document.getElementById("bookingPanel");

const closeBooking =
    document.getElementById("closeBooking");

const homeButton =
    document.getElementById("homeBtn");


/* ==================================================
   SHOW SCENE
================================================== */

function showScene(index) {

    current = index;

    if (current < 0) {
        current = scenes.length - 1;
    }

    if (current >= scenes.length) {
        current = 0;
    }

    const scene = scenes[current];


    imageWrap.classList.add("change");


    setTimeout(function () {

        image.src = scene.image;

        image.alt = scene.category;

        currentNumber.textContent =
            String(current + 1).padStart(2, "0");

        category.textContent =
            scene.category;

        contentIndex.textContent =
            scene.index;

        title.innerHTML =
            scene.title;

        description.textContent =
            scene.description;


        updateNavigation(
            scene.section
        );


        imageWrap.classList.remove("change");

    }, 250);

}


/* ==================================================
   NAVIGATION
================================================== */

function updateNavigation(section) {

    const items =
        document.querySelectorAll(
            ".nav-item"
        );

    items.forEach(function (item) {

        if (
            item.dataset.section === section
        ) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


/* ==================================================
   OPEN SECTION
================================================== */

function openSection(section) {

    const index =
        scenes.findIndex(function (scene) {

            return scene.section === section;

        });


    if (index !== -1) {

        showScene(index);

    }

}


/* ==================================================
   BOTTOM NAVIGATION
================================================== */

document
    .querySelectorAll(".nav-item")
    .forEach(function (item) {

        item.onclick = function () {

            openSection(
                item.dataset.section
            );

        };

    });


/* ==================================================
   MENU NAVIGATION
================================================== */

document
    .querySelectorAll(
        ".menu-grid button[data-section]"
    )
    .forEach(function (item) {

        item.onclick = function () {

            openSection(
                item.dataset.section
            );

            menuOverlay.classList.remove(
                "open"
            );

        };

    });


/* ==================================================
   ARROWS
================================================== */

prevButton.onclick = function () {

    showScene(current - 1);

};


nextButton.onclick = function () {

    showScene(current + 1);

};


/* ==================================================
   MENU
================================================== */

menuButton.onclick = function () {

    menuOverlay.classList.add(
        "open"
    );

};


closeMenu.onclick = function () {

    menuOverlay.classList.remove(
        "open"
    );

};


/* ==================================================
   HOME
================================================== */

homeButton.onclick = function () {

    openSection("hotel");

};


/* ==================================================
   BOOKING
================================================== */

bookingButton.onclick = function () {

    bookingPanel.classList.add(
        "open"
    );

};


closeBooking.onclick = function () {

    bookingPanel.classList.remove(
        "open"
    );

};


/* ==================================================
   REQUEST
================================================== */

document
    .getElementById("requestButton")
    .onclick = function () {

        alert(
            "Форма заявки будет подключена следующим этапом."
        );

    };


/* ==================================================
   SWIPE
================================================== */

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    function (event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function (event) {

        const touchEndX =
            event.changedTouches[0].screenX;

        const distance =
            touchEndX - touchStartX;


        if (
            Math.abs(distance) < 50
        ) {
            return;
        }


        if (distance < 0) {

            showScene(current + 1);

        } else {

            showScene(current - 1);

        }

    },
    {
        passive: true
    }
);


/* ==================================================
   KEYBOARD
================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "ArrowRight"
        ) {

            showScene(current + 1);

        }


        if (
            event.key === "ArrowLeft"
        ) {

            showScene(current - 1);

        }


        if (
            event.key === "Escape"
        ) {

            menuOverlay.classList.remove(
                "open"
            );

            bookingPanel.classList.remove(
                "open"
            );

        }

    }
);
