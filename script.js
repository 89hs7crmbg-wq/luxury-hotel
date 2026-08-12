const scenes = [

    {
        image: "IMG_8684.png",
        category: "THE HOTEL",
        index: "00",
        title: "THE<br>HOTEL",
        description: "Пространство,\nсозданное для\nтишины."
    },

    {
        image: "IMG_8685.png",
        category: "ARRIVAL",
        index: "01",
        title: "FIRST<br>IMPRESSION",
        description: "Первые секунды\nначинаются ещё\nдо номера."
    },

    {
        image: "IMG_8687.png",
        category: "ARRIVAL",
        index: "02",
        title: "ENTER<br>QUIETLY",
        description: "Город остаётся\nпо ту сторону\ndвери."
    },

    {
        image: "IMG_8688.png",
        category: "SPACE",
        index: "03",
        title: "THE<br>SPACE",
        description: "Архитектура,\nкоторая не требует\nобъяснений."
    },

    {
        image: "IMG_8691.png",
        category: "SPACE",
        index: "04",
        title: "DETAILS<br>MATTER",
        description: "Материалы.\nСвет.\nПропорции."
    },

    {
        image: "IMG_8692.png",
        category: "SPACE",
        index: "05",
        title: "MOVE<br>UP",
        description: "Каждый переход\nстановится частью\nопыта."
    },

    {
        image: "IMG_8693.png",
        category: "SPACE",
        index: "06",
        title: "BETWEEN<br>PLACES",
        description: "Тишина\nстановится\nощутимой."
    },

    {
        image: "IMG_8694.png",
        category: "SPACE",
        index: "07",
        title: "PRIVATE<br>FLOOR",
        description: "Пространство,\nкоторое остаётся\nтолько вашим."
    },

    {
        image: "IMG_8695.png",
        category: "ROOMS",
        index: "08",
        title: "YOUR<br>ROOM",
        description: "Здесь начинается\nваше время."
    },

    {
        image: "IMG_8697.png",
        category: "ROOMS",
        index: "09",
        title: "PRIVATE<br>SPACE",
        description: "Ничего лишнего.\nТолько необходимое."
    },

    {
        image: "IMG_8698.png",
        category: "ROOMS",
        index: "10",
        title: "SLOW<br>DOWN",
        description: "Место,\nгде не нужно\nторопиться."
    },

    {
        image: "IMG_8699.png",
        category: "DETAILS",
        index: "11",
        title: "REST<br>HERE",
        description: "Вечер.\nТишина.\nВаше пространство."
    },

    {
        image: "IMG_8700.png",
        category: "DETAILS",
        index: "12",
        title: "YOUR<br>MOMENT",
        description: "Иногда роскошь\nвыглядит именно\nтак."
    },

    {
        image: "IMG_8702.png",
        category: "THE VIEW",
        index: "13",
        title: "ABOVE<br>THE CITY",
        description: "Город остаётся\nгде-то далеко\nвнизу."
    },

    {
        image: "IMG_8703.png",
        category: "DETAILS",
        index: "14",
        title: "YOUR<br>TIME",
        description: "Время,\nкоторое принадлежит\nтолько вам."
    }

];


let current = 0;

const mainImage = document.getElementById("mainImage");
const imageWrap = document.getElementById("imageWrap");

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


function showScene(index) {

    current = (index + scenes.length) % scenes.length;

    const scene = scenes[current];

    imageWrap.classList.add("change");

    setTimeout(() => {

        mainImage.src = scene.image;

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

        navItems.forEach(item => {

            item.classList.remove("active");

        });

        const categoryIndex =
            getCategoryIndex(scene.category);

        if (navItems[categoryIndex]) {

            navItems[categoryIndex]
                .classList.add("active");

        }

        imageWrap.classList.remove("change");

    }, 350);
}


function getCategoryIndex(categoryName) {

    if (categoryName === "THE HOTEL") {
        return 0;
    }

    if (categoryName === "ARRIVAL") {
        return 1;
    }

    if (categoryName === "SPACE") {
        return 2;
    }

    if (categoryName === "ROOMS") {
        return 3;
    }

    return 4;
}


prevButton.addEventListener("click", () => {

    showScene(current - 1);

});


nextButton.addEventListener("click", () => {

    showScene(current + 1);

});


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const categoryIndex =
            Number(item.dataset.index);

        const targetCategories = [
            "THE HOTEL",
            "ARRIVAL",
            "SPACE",
            "ROOMS",
            "DETAILS"
        ];

        const target =
            targetCategories[categoryIndex];

        const found =
            scenes.findIndex(
                scene => scene.category === target
            );

        if (found !== -1) {

            showScene(found);

        }

    });

});


/* =========================
   KEYBOARD
========================= */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {

        showScene(current + 1);

    }

    if (event.key === "ArrowLeft") {

        showScene(current - 1);

    }

});


/* =========================
   SWIPE
========================= */

let touchStartX = 0;

document.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event.changedTouches[0].screenX;

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
   MENU
========================= */

const menuButton =
    document.getElementById("menuButton");

const menuOverlay =
    document.getElementById("menuOverlay");

const closeMenu =
    document.getElementById("closeMenu");

menuButton.addEventListener("click", () => {

    menuOverlay.classList.add("open");

});


closeMenu.addEventListener("click", () => {

    menuOverlay.classList.remove("open");

});


document
    .querySelectorAll("[data-menu]")
    .forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.menu);

            const categories = [
                "THE HOTEL",
                "ARRIVAL",
                "SPACE",
                "ROOMS",
                "DETAILS"
            ];

            const found =
                scenes.findIndex(
                    scene =>
                        scene.category ===
                        categories[index]
                );

            if (found !== -1) {

                showScene(found);

            }

            menuOverlay.classList.remove("open");

        });

    });


/* =========================
   HOME
========================= */

document
    .getElementById("homeBtn")
    .addEventListener("click", () => {

        showScene(0);

    });


/* =========================
   BOOKING
========================= */

const bookingPanel =
    document.getElementById("bookingPanel");

const closeBooking =
    document.getElementById("closeBooking");


document
    .querySelector(".brand")
    .addEventListener("dblclick", () => {

        bookingPanel.classList.add("open");

    });


closeBooking.addEventListener("click", () => {

    bookingPanel.classList.remove("open");

});
