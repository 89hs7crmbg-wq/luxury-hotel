document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MENU
    ========================= */

    const menu = document.getElementById("menu");
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");

    menuToggle.addEventListener("click", () => {
        menu.classList.add("active");
        document.body.style.overflow = "hidden";
    });

    menuClose.addEventListener("click", closeMenu);

    function closeMenu() {
        menu.classList.remove("active");
        document.body.style.overflow = "";
    }


    /* =========================
       MENU LINKS
    ========================= */

    const menuLinks = menu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =========================
       ESC CLOSE
    ========================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =========================
       IMAGE REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =========================
       BACK TO TOP
    ========================= */

    const backTop =
        document.getElementById("backTop");

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 900) {

                backTop.classList.add(
                    "visible"
                );

            } else {

                backTop.classList.remove(
                    "visible"
                );

            }

        },
        {
            passive: true
        }
    );


    backTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =========================
       IMAGE PARALLAX
    ========================= */

    const heroImage =
        document.querySelector(".hero-image img");

    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `scale(1.02) translateY(${scroll * 0.08}px)`;

                }

            },
            {
                passive: true
            }
        );

    }

});
