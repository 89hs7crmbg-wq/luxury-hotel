const scenes = [
    {
        image: "IMG_8684.png",
        section: "hotel",
        category: "ОТЕЛЬ",
        index: "00",
        title: "THE HOTEL",
        description: "Пространство,\nсозданное для\nтишины."
    },

    {
        image: "IMG_8685.png",
        section: "arrival",
        category: "ПРИБЫТИЕ",
        index: "01",
        title: "ПЕРВОЕ ВПЕЧАТЛЕНИЕ",
        description: "Первые секунды\nначинаются ещё\nдо номера."
    },

    {
        image: "IMG_8687.png",
        section: "arrival",
        category: "ПРИБЫТИЕ",
        index: "02",
        title: "ВХОД В ТИШИНУ",
        description: "Город остаётся\nпо ту сторону двери."
    },

    {
        image: "IMG_8688.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "03",
        title: "САМО ПРОСТРАНСТВО",
        description: "Архитектура,\nкоторая не требует\nобъяснений."
    },

    {
        image: "IMG_8691.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "04",
        title: "КАЖДАЯ ДЕТАЛЬ",
        description: "Материалы.\nСвет.\nПропорции."
    },

    {
        image: "IMG_8692.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "05",
        title: "ПУТЬ ВВЕРХ",
        description: "Каждый переход\nстановится частью опыта."
    },

    {
        image: "IMG_8693.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "06",
        title: "МЕЖДУ ПРОСТРАНСТВАМИ",
        description: "Тишина\nстановится\nощутимой."
    },

    {
        image: "IMG_8694.png",
        section: "space",
        category: "ПРОСТРАНСТВО",
        index: "07",
        title: "ЛИЧНОЕ ПРОСТРАНСТВО",
        description: "Пространство,\nкоторое остаётся\nтолько вашим."
    },

    {
        image: "IMG_8695.png",
        section: "rooms",
        category: "НОМЕРА",
        index: "08",
        title: "ВАШ НОМЕР",
        description: "Здесь начинается\nваше время."
    },

    {
        image: "IMG_8697.png",
        section: "rooms",
        category: "НОМЕРА",
        index: "09",
        title: "ЛИЧНОЕ ПРОСТРАНСТВО",
        description: "Ничего лишнего.\nТолько необходимое."
    },

    {
        image: "IMG_8698.png",
        section: "rooms",
        category: "НОМЕРА",
        index: "10",
        title: "ВРЕМЯ ОСТАНОВИТЬСЯ",
        description: "Место,\nгде не нужно\nторопиться."
    },

    {
        image: "IMG_8699.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "11",
        title: "ОСТАНОВИТЕСЬ ЗДЕСЬ",
        description: "Вечер.\nТишина.\nВаше пространство."
    },

    {
        image: "IMG_8700.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "12",
        title: "ВАШ МОМЕНТ",
        description: "Иногда роскошь\nвыглядит именно так."
    },

    {
        image: "IMG_8702.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "13",
        title: "ГОРОД СВЕРХУ",
        description: "Город остаётся\nгде-то далеко внизу."
    },

    {
        image: "IMG_8703.png",
        section: "details",
        category: "ДЕТАЛИ",
        index: "14",
        title: "ВАШЕ ВРЕМЯ",
        description: "Время,\nкоторое принадлежит\nтолько вам."
    }
];


/* =========================================
   СОСТОЯНИЕ
========================================= */

let currentScene = 0;

let isAnimating = false;


/* =========================================
   ЭЛЕМЕНТЫ
========================================= */

const mainImage =
    document.getElementById("mainImage");

const frameCategory =
    document.getElementById("frameCategory");

const frameIndex =
    document.getElementById("frameIndex");

const frameTitle =
    document.getElementById("frameTitle");

const frameDescription =
    document.getElementById("frameDescription");

const currentNumber =
    document.getElementById("currentNumber");

const menu =
    document.getElementById("menu");

const booking =
    document.getElementById("booking");


/* =========================================
   ПРЕДЗАГРУЗКА
========================================= */

scenes.forEach(scene => {

    const image =
        new Image();

    image.src =
        scene.image;

});


/* =========================================
   НАВИГАЦИЯ
========================================= */

const sectionStart = {
    hotel: 0,
    arrival: 1,
    space: 3,
    rooms: 8,
    details: 11
};


function updateBottomNavigation(section) {

    document
        .querySelectorAll(".bottom-item")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.section === section
            );

        });

}


/* =========================================
   ОТОБРАЖЕНИЕ КАДРА
========================================= */

function updateScene(index) {

    const scene =
        scenes[index];

    currentNumber.textContent =
        String(index + 1).padStart(2, "0");

    frameCategory.textContent =
        scene.category;

    frameIndex.textContent =
        scene.index;

    frameTitle.textContent =
        scene.title;

    frameDescription.textContent =
        scene.description;

    updateBottomNavigation(
        scene.section
    );
}


/* =========================================
   ПЕРЕКЛЮЧЕНИЕ КАДРА
========================================= */

function goToScene(index) {

    if (isAnimating) {
        return;
    }

    if (index < 0) {
        index =
            scenes.length - 1;
    }

    if (index >= scenes.length) {
        index = 0;
    }

    const scene =
        scenes[index];

    isAnimating = true;

    mainImage.classList.add(
        "changing"
    );

    setTimeout(() => {

        mainImage.src =
            scene.image;

        currentScene =
            index;

        updateScene(index);

        requestAnimationFrame(() => {

            mainImage.classList.remove(
                "changing"
            );

        });

        setTimeout(() => {

            isAnimating = false;

        }, 350);

    }, 170);
}


/* =========================================
   СТРЕЛКИ
========================================= */

document
    .getElementById("prevButton")
    .addEventListener(
        "click",
        () => {

            goToScene(
                currentScene - 1
            );

        }
    );


document
    .getElementById("nextButton")
    .addEventListener(
        "click",
        () => {

            goToScene(
                currentScene + 1
            );

        }
    );


/* =========================================
   НИЖНИЙ BAR
========================================= */

document
    .querySelectorAll(".bottom-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                goToScene(
                    sectionStart[section]
                );

            }
        );

    });


/* =========================================
   МЕНЮ
========================================= */

document
    .getElementById("menuButton")
    .addEventListener(
        "click",
        () => {

            menu.classList.add(
                "open"
            );

        }
    );


document
    .getElementById("closeMenu")
    .addEventListener(
        "click",
        () => {

            menu.classList.remove(
                "open"
            );

        }
    );


document
    .querySelectorAll(".menu-links button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const section =
                    button.dataset.section;

                menu.classList.remove(
                    "open"
                );

                setTimeout(() => {

                    goToScene(
                        sectionStart[section]
                    );

                }, 180);

            }
        );

    });


/* =========================================
   ЛОГОТИП
========================================= */

document
    .getElementById("homeButton")
    .addEventListener(
        "click",
        () => {

            goToScene(0);

        }
    );


/* =========================================
   БРОНИРОВАНИЕ
========================================= */

document
    .getElementById("bookingButton")
    .addEventListener(
        "click",
        () => {

            booking.classList.add(
                "open"
            );

        }
    );


document
    .getElementById("closeBooking")
    .addEventListener(
        "click",
        () => {

            booking.classList.remove(
                "open"
            );

        }
    );


/* =========================================
   КНОПКА ЗАПРОСА
========================================= */

document
    .getElementById("sendBooking")
    .addEventListener(
        "click",
        () => {

            alert(
                "Форма отправки заявки будет подключена следующим этапом."
            );

        }
    );


/* =========================================
   СВАЙП
========================================= */

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        if (isAnimating) {
            return;
        }

        if (
            menu.classList.contains("open") ||
            booking.classList.contains("open")
        ) {
            return;
        }

        const touchEndX =
            event.changedTouches[0].screenX;

        const touchEndY =
            event.changedTouches[0].screenY;

        const deltaX =
            touchEndX - touchStartX;

        const deltaY =
            touchEndY - touchStartY;


        if (
            Math.abs(deltaX) < 55 ||
            Math.abs(deltaX) <= Math.abs(deltaY)
        ) {
            return;
        }


        if (deltaX < 0) {

            goToScene(
                currentScene + 1
            );

        } else {

            goToScene(
                currentScene - 1
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
    event => {

        if (event.key === "ArrowRight") {

            goToScene(
                currentScene + 1
            );

        }

        if (event.key === "ArrowLeft") {

            goToScene(
                currentScene - 1
            );

        }

        if (event.key === "Escape") {

            menu.classList.remove(
                "open"
            );

            booking.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================
   СТАРТ
========================================= */

updateScene(0);
