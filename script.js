/* =========================================
   THE HOTEL
   CINEMATIC SCROLL ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       ELEMENTS
    ====================================== */

    const body = document.body;

    const preloader =
        document.getElementById("preloader");

    const journey =
        document.getElementById("journey");

    const frames =
        Array.from(
            document.querySelectorAll(
                ".journey__frame"
            )
        );

    const sceneNumber =
        document.getElementById(
            "sceneNumber"
        );

    const sceneName =
        document.getElementById(
            "sceneName"
        );

    const sceneTitle =
        document.getElementById(
            "sceneTitle"
        );

    const sceneDescription =
        document.getElementById(
            "sceneDescription"
        );

    const progressBar =
        document.getElementById(
            "progressBar"
        );


    /* =====================================
       SETTINGS
    ====================================== */

    const totalScenes =
        frames.length;

    let currentScene = 0;

    let ticking = false;


    /* =====================================
       PRELOADER
    ====================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                preloader.classList.add(
                    "is-hidden"
                );

                body.classList.remove(
                    "is-loading"
                );

            }, 500);

        }
    );


    /* =====================================
       INITIAL STATE
    ====================================== */

    if (frames.length > 0) {

        activateScene(0);

    }


    /* =====================================
       ACTIVATE SCENE
    ====================================== */

    function activateScene(index) {

        if (
            index < 0 ||
            index >= totalScenes
        ) {
            return;
        }


        if (
            index === currentScene &&
            frames[index].classList.contains(
                "is-active"
            )
        ) {

            updateSceneInformation(
                index
            );

            return;

        }


        frames.forEach(
            (frame, frameIndex) => {

                frame.classList.toggle(
                    "is-active",
                    frameIndex === index
                );

            }
        );


        currentScene = index;

        updateSceneInformation(
            index
        );

    }


    /* =====================================
       SCENE INFORMATION
    ====================================== */

    function updateSceneInformation(
        index
    ) {

        const frame =
            frames[index];

        if (!frame) {
            return;
        }


        const number =
            String(
                Number(
                    frame.dataset.index
                )
            ).padStart(2, "0");


        const name =
            frame.dataset.name ||
            "";


        const title =
            frame.dataset.title ||
            name;


        const description =
            frame.dataset.description ||
            "";


        sceneNumber.textContent =
            number;

        sceneName.textContent =
            name;

        sceneTitle.textContent =
            title;

        sceneDescription.textContent =
            description;


        const progress =
            totalScenes > 1
                ? (index / (totalScenes - 1)) * 100
                : 0;


        progressBar.style.height =
            `${progress}%`;

    }


    /* =====================================
       CALCULATE SCROLL PROGRESS
    ====================================== */

    function updateJourney() {

        if (!journey) {
            return;
        }


        const rect =
            journey.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        const totalDistance =
            journey.offsetHeight -
            viewportHeight;


        if (totalDistance <= 0) {
            return;
        }


        const distancePassed =
            Math.min(
                Math.max(
                    -rect.top,
                    0
                ),
                totalDistance
            );


        const progress =
            distancePassed /
            totalDistance;


        /*
            Convert scroll progress
            into scene index.
        */

        const scenePosition =
            progress *
            totalScenes;


        let nextScene =
            Math.floor(
                scenePosition
            );


        /*
            Prevent going outside
            the available frames.
        */

        nextScene =
            Math.min(
                Math.max(
                    nextScene,
                    0
                ),
                totalScenes - 1
            );


        activateScene(
            nextScene
        );


        /*
            Smooth progress indicator.
        */

        const visualProgress =
            Math.min(
                progress * 100,
                100
            );


        progressBar.style.height =
            `${visualProgress}%`;

    }


    /* =====================================
       SCROLL HANDLER
    ====================================== */

    function handleScroll() {

        if (ticking) {
            return;
        }


        ticking = true;


        requestAnimationFrame(
            () => {

                updateJourney();

                ticking = false;

            }
        );

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateJourney
    );


    /* =====================================
       PREVENT BROKEN IMAGE STATES
    ====================================== */

    frames.forEach(
        (frame) => {

            const image =
                frame.querySelector(
                    "img"
                );

            if (!image) {
                return;
            }


            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        `Не удалось загрузить изображение: ${image.src}`
                    );

                }
            );

        }
    );


    /* =====================================
       MENU BUTTON
    ====================================== */

    const menuButton =
        document.getElementById(
            "menuButton"
        );


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "menu-open"
                );

            }
        );

    }


    /* =====================================
       HERO SCROLL INDICATOR
    ====================================== */

    const scrollIndicator =
        document.querySelector(
            ".scroll-indicator"
        );


    if (scrollIndicator) {

        scrollIndicator.addEventListener(
            "click",
            () => {

                journey.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

        scrollIndicator.style.cursor =
            "pointer";

    }


    /* =====================================
       SMOOTH SCROLL START
    ====================================== */

    updateJourney();

});
