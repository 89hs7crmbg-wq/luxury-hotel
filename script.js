document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ====================================== */

    const scenes = [
        ...document.querySelectorAll(".scene")
    ];

    const progressDots = [
        ...document.querySelectorAll(".progress__dot")
    ];

    const menu = document.getElementById("menu");
    const menuButton = document.getElementById("menuButton");
    const menuClose = document.getElementById("menuClose");

    const backTop = document.getElementById("backTop");


    /* =====================================
       SCENE OBSERVER
    ====================================== */

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const scene =
                    entry.target;

                const index =
                    scene.dataset.index;

                activateScene(index);

            });

        },
        {
            threshold: 0.55
        }
    );


    scenes.forEach((scene) => {
        observer.observe(scene);
    });


    /* =====================================
       ACTIVATE SCENE
    ====================================== */

    function activateScene(index) {

        scenes.forEach((scene) => {

            scene.classList.toggle(
                "active",
                scene.dataset.index === index
            );

        });


        progressDots.forEach((dot) => {

            dot.classList.toggle(
                "active",
                dot.textContent.trim() === index
            );

        });


        if (index !== "00") {

            backTop.classList.add(
                "visible"
            );

        } else {

            backTop.classList.remove(
                "visible"
            );

        }

    }


    /* =====================================
       NAVIGATION
    ====================================== */

    function goTo(targetId) {

        const target =
            document.getElementById(
                targetId
            );

        if (!target) {
            return;
        }


        closeMenu();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================
       PROGRESS BUTTONS
    ====================================== */

    progressDots.forEach((dot) => {

        dot.addEventListener(
            "click",
            () => {

                const target =
                    dot.dataset.target;

                goTo(target);

            }
        );

    });


    /* =====================================
       MENU BUTTONS
    ====================================== */

    menuButton.addEventListener(
        "click",
        () => {

            menu.classList.add("open");

            document.body.style.overflow =
                "hidden";

        }
    );


    menuClose.addEventListener(
        "click",
        closeMenu
    );


    function closeMenu() {

        menu.classList.remove(
            "open"
        );

        document.body.style.overflow =
            "";

    }


    /* =====================================
       MENU NAVIGATION
    ====================================== */

    menu
        .querySelectorAll("[data-target]")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const target =
                        button.dataset.target;

                    goTo(target);

                }
            );

        });


    /* =====================================
       ESCAPE CLOSE
    ====================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMenu();

            }

        }
    );


    /* =====================================
       BACK TO TOP
    ====================================== */

    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================
       KEYBOARD NAVIGATION
    ===================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            const current =
                scenes.findIndex(
                    (scene) =>
                        scene.classList.contains(
                            "active"
                        )
                );


            if (
                event.key === "ArrowDown" ||
                event.key === "PageDown"
            ) {

                event.preventDefault();

                const next =
                    Math.min(
                        current + 1,
                        scenes.length - 1
                    );

                goTo(
                    scenes[next].id
                );

            }


            if (
                event.key === "ArrowUp" ||
                event.key === "PageUp"
            ) {

                event.preventDefault();

                const previous =
                    Math.max(
                        current - 1,
                        0
                    );

                goTo(
                    scenes[previous].id
                );

            }

        }
    );


    /* =====================================
       IMAGE PRELOADING
    ====================================== */

    scenes.forEach((scene) => {

        const image =
            scene.querySelector("img");

        if (!image) {
            return;
        }

        image.addEventListener(
            "error",
            () => {

                console.error(
                    "Не удалось загрузить:",
                    image.src
                );

            }
        );

    });


    /* =====================================
       INITIAL STATE
    ====================================== */

    if (scenes.length > 0) {

        scenes[0].classList.add(
            "active"
        );

    }

});
