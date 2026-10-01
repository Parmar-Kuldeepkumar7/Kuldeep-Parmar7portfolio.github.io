/* ==========================================================================
   Kuldeepkumar Parmar Portfolio - Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Elements
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile Drawer
    function toggleMobileMenu() {
        const isOpen = navLinks.classList.contains('mobile-open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            navLinks.classList.add('mobile-open');
            navOverlay.classList.add('mobile-open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        navLinks.classList.remove('mobile-open');
        navOverlay.classList.remove('mobile-open');
        document.body.style.overflow = '';
    }

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }

    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // 2. Active Section Highlight (ScrollSpy using IntersectionObserver)
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                allNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 3. Header Shadow on Scroll
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // 4. Subtle Reveal Animations (Respects prefers-reduced-motion)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll('.project-card, .skill-group, .experience-card, .education-card');
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(12px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color var(--transition-normal), box-shadow var(--transition-normal)';
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
});
