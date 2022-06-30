const carouselContainer = document.querySelector('.section__carousel-container')
const carousel = document.querySelector('[data-carousel]');
const carouselItems = Array.from(document.querySelectorAll('[data-carousel-item]'));

const carouselIndicators = Array.from(document.querySelectorAll('.carousel-indicator'));

const next = document.querySelector('[data-carousel-button="next"]');
const prev = document.querySelector('[data-carousel-button="prev"]');

let translate = carousel.clientWidth + 48;
let currentIndex = 0;
let previousItem = '';
let currentItem = carouselItems[currentIndex];
let previousIndicator = '';
let currentIndicator = carouselIndicators[currentIndex];

currentItem.classList.add('current-item');
currentIndicator.classList.add('current-indicator');

next.addEventListener('click', () => {  
    if(currentIndex >= carouselItems.length - 1) {
        currentIndex = 0;
        // const clonedItems = cloneCarouselItems()
        // carouselContainer.append(clonedItems);
    } else {
        currentIndex++;
    }

    carousel.style.transform = `translateX(${-translate * currentIndex}px)`;
    
    setCurrentItem(currentIndex);
});

prev.addEventListener('click', () => {
    if(currentIndex <= 0) {
        currentIndex = carouselItems.length - 1;
        // const clonedItems = cloneCarouselItems()
        // carouselContainer.prepend(clonedItems);
    } else {
        currentIndex--;
    }

    carousel.style.transform = `translateX(${-translate * currentIndex}px)`;

    setCurrentItem(currentIndex);
});

carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        if(currentIndex <= 0) {
            currentIndex = carouselItems.length - 1;
        }

        currentIndex = index;

        carousel.style.transform = `translateX(${-translate * currentIndex}px)`;

        setCurrentItem(currentIndex);
    });
});

const setCurrentItem = (currentIndex) => {
    previousIndicator = currentIndicator;
    previousIndicator.classList.remove('current-indicator');

    currentIndicator = carouselIndicators[currentIndex];
    currentIndicator.classList.add('current-indicator');

    currentItem.style.transition = 'transform 1s ease-out, filter 1s ease-out';

    previousItem = currentItem;
    previousItem.classList.remove('current-item');

    currentItem = carouselItems[currentIndex];
    currentItem.classList.add('current-item');  
    
    currentItem.style.transition = 'transform 1s ease-out, filter 1s ease-out';
}

// Clone array of items
const cloneCarouselItems = () => {
    const clonedItems = [...carouselItems];
    const newCarousel = document.createElement('ul');
    newCarousel.classList.add('section__carousel', 'flex');

    for(let i = 0; i < carouselItems.length; i++) {
        newCarousel.append(clonedItems[i]);
    }

    return newCarousel;
}

window.addEventListener('resize', () => {
    translate = carousel.clientWidth + 48
    carousel.style.transform = `translateX(${-translate * currentIndex}px)`;
})