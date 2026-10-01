/* =========================================================
   KULDEEPKUMAR PARMAR
   PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const navOverlay = document.getElementById("nav-overlay");

    const navigationLinks =
        document.querySelectorAll(".nav-link");


    function openMenu() {

        navLinks.classList.add("mobile-open");
        navOverlay.classList.add("mobile-open");

        navToggle.setAttribute("aria-expanded", "true");

        document.body.style.overflow = "hidden";
    }


    function closeMenu() {

        navLinks.classList.remove("mobile-open");
        navOverlay.classList.remove("mobile-open");

        navToggle.setAttribute("aria-expanded", "false");

        document.body.style.overflow = "";
    }


    if (navToggle) {

        navToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.contains("mobile-open");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

    }


    if (navOverlay) {

        navOverlay.addEventListener("click", closeMenu);

    }


    navigationLinks.forEach((link) => {

        link.addEventListener("click", closeMenu);

    });


    /* =====================================================
       CLOSE MENU WITH ESCAPE
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const currentId =
                        entry.target.getAttribute("id");


                    navigationLinks.forEach((link) => {

                        const href =
                            link.getAttribute("href");


                        if (href === `#${currentId}`) {

                            link.classList.add("active");

                        } else {

                            link.classList.remove("active");

                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


    sections.forEach((section) => {

        navObserver.observe(section);

    });


    /* =====================================================
       HEADER BORDER / SHADOW ON SCROLL
       ===================================================== */

    const header =
        document.getElementById("navbar");


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 15) {

                header.style.boxShadow =
                    "0 8px 25px rgba(0, 0, 0, 0.28)";

            } else {

                header.style.boxShadow = "none";

            }

        },
        { passive: true }
    );


    /* =====================================================
       CLOSE MOBILE MENU WHEN RESIZING
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1040) {

            closeMenu();

        }

    });


    /* =====================================================
       REVEAL PROJECT / CARD ELEMENTS
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealElements =
            document.querySelectorAll(
                ".project-card, .skill-group, .experience-card, .certification-item, .education-card"
            );


        revealElements.forEach((element) => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(10px)";

            element.style.transition =
                "opacity 0.45s ease, transform 0.45s ease";

        });


        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";


                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    }

});
