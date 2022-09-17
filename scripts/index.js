const body = document.body;

// Mobile nav-toggle events
const primaryHeader = document.querySelector('.primary-header');
const logo = primaryHeader.querySelector('.logo');
const navToggleContainer = primaryHeader.querySelector('.nav-toggle-container');
const navToggle = primaryHeader.querySelector('.nav-toggle');
const nav = primaryHeader.querySelector('.primary-navigation');

navToggleContainer.addEventListener('click', () => {
    const navVisibility = nav.getAttribute('data-visible');

    if(navVisibility === "false") {
        nav.setAttribute('data-visible', true);
        navToggle.setAttribute('aria-expanded', true);
        navToggle.setAttribute('aria-pressed', true);
    } else {
        nav.setAttribute('data-visible', false);
        navToggle.setAttribute('aria-expanded', false);
        navToggle.setAttribute('aria-pressed', false);
    }
});

// Scroll effects for primary header and navigation
// Needs some sort of limiter for showing header on scroll-up because any little bit of scroll-up shows the header which is annoying
let lastScrollPosition = 0;
window.addEventListener('load', () => {
    let currentScrollPosition = window.scrollY;
    
    // invert colours
    if(currentScrollPosition >= 200) {
        primaryHeader.classList.add('bg-dark');

        if(primaryHeader.hasAttribute('data-invert-header-styles')) {
            logo.src = './assets/logo-inverted.svg';
            navToggle.classList.add('inverse');
            nav.setAttribute('data-inverse-state', 'inverse');
        }    
    } else {
        primaryHeader.classList.remove('bg-dark');

        if(primaryHeader.hasAttribute('data-invert-header-styles')) {
            logo.src = './assets/logo.svg';
            navToggle.classList.remove('inverse');
            nav.removeAttribute('data-inverse-state', 'inverse');
        }
    }
});

window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        let currentScrollPosition = window.scrollY;

        if(navToggle.getAttribute('aria-expanded') === 'true') {
            body.classList.remove('.scroll-down');
            return;
        }

        if(currentScrollPosition <= 0) {
            body.classList.remove('scroll-up');
        }

        if(currentScrollPosition > lastScrollPosition && !body.classList.contains('scroll-down')) {
            body.classList.remove('scroll-up');
            body.classList.add('scroll-down');
        }

        if(currentScrollPosition < lastScrollPosition && body.classList.contains('scroll-down')) {
            body.classList.remove('scroll-down');
            body.classList.add('scroll-up');
        }

        // invert colours
        if(currentScrollPosition >= 200) {
            primaryHeader.classList.add('bg-dark');

            if(primaryHeader.hasAttribute('data-invert-header-styles')) {
                logo.src = './assets/logo-inverted.svg';
                navToggle.classList.add('inverse');
                nav.setAttribute('data-inverse-state', 'inverse');
            }    
        } else {
            primaryHeader.classList.remove('bg-dark');

            if(primaryHeader.hasAttribute('data-invert-header-styles')) {
                logo.src = './assets/logo.svg';
                navToggle.classList.remove('inverse');
                nav.removeAttribute('data-inverse-state', 'inverse');
            }
        }

        lastScrollPosition = currentScrollPosition;
    });
});