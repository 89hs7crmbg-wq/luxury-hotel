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
        description: "Город остаётся\nпо ту сторону\ndвери."
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
        description: "Каждый переход\nстановится частью\nопыта."
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
        description: "Иногда роскошь\nвыглядит именно\nтак."
    },

    {
        image: "IMG_8702.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "13",
        title: "ГОРОД<br>СВЕРХУ",
        description: "Город остаётся\nгде-то далеко\nвнизу."
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

const mainImage =
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

const navItems =
    document.querySelectorAll(".nav-item");

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


/* =========================
   ПОКАЗ КАДРА
========================= */

function showScene(index) {

    current =
        (index + scenes.length) %
        scenes.length;

    const scene =
        scenes[current];

    imageWrap.classList.add("change");

    setTimeout(() => {

        mainImage.src =
            scene.image;

        mainImage.alt =
            scene.category;

        category.textContent =
            scene.category;

        contentIndex.textContent =
            scene.index;

        currentNumber.textContent =
            String(current + 1).padStart(2, "0");

        title.innerHTML =
            scene.title;

        description.textContent =
            scene.description;

        updateNavigation(
            scene.section
        );

        imageWrap.classList.remove(
            "change"
        );

    }, 300);
}


/* =========================
   НАВИГАЦИЯ ПО РАЗДЕЛАМ
========================= */

function updateNavigation(section) {

    navItems.forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.section === section
        );

    });

}


/* =========================
   ПЕРВЫЙ КАДР РАЗДЕЛА
========================= */

function openSection(section) {

    const index =
        scenes.findIndex(
            scene =>
                scene.section === section
        );

    if (index === -1) {
        return;
    }

    showScene(index);

}


/* =========================
   НИЖНЯЯ НАВИГАЦИЯ
========================= */

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            openSection(
                item.dataset.section
            );

        }
    );

});


/* =========================
   СТРЕЛКИ
========================= */

prevButton.addEventListener(
    "click",
    () => {

        showScene(current - 1);

    }
);


nextButton.addEventListener(
    "click",
    () => {

        showScene(current + 1);

    }
);


/* =========================
   СВАЙП
========================= */

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0]
                .screenX;

        const distance =
            touchEndX - touchStartX;

        if (Math.abs(distance) < 50) {
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


/* =========================
   МЕНЮ
========================= */

menuButton.addEventListener(
    "click",
    () => {

        menuOverlay.classList.add(
            "open"
        );

    }
);


closeMenu.addEventListener(
    "click",
    () => {

        menuOverlay.classList.remove(
            "open"
        );

    }
);


document
    .querySelectorAll(
        "[data-section]"
    )
    .forEach(button => {

        if (
            button.classList.contains(
                "nav-item"
            )
        ) {
            return;
        }

        button.addEventListener(
            "click",
            () => {

                openSection(
                    button.dataset.section
                );

                menuOverlay.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================
   ЛОГОТИП
========================= */

document
    .getElementById("homeBtn")
    .addEventListener(
        "click",
        () => {

            openSection("hotel");

        }
    );


/* =========================
   БРОНИРОВАНИЕ
========================= */

bookingButton.addEventListener(
    "click",
    () => {

        bookingPanel.classList.add(
            "open"
        );

    }
);


closeBooking.addEventListener(
    "click",
    () => {

        bookingPanel.classList.remove(
            "open"
        );

    }
);


/* =========================
   ESC
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }

        menuOverlay.classList.remove(
            "open"
        );

        bookingPanel.classList.remove(
            "open"
        );

    }
);


/* =========================
   КЛАВИАТУРА
========================= */

document.addEventListener(
    "keydown",
    event => {

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

    }
);
