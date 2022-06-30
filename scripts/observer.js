const options = {
    rootMargin: "0px",
    threshold: 1
}

export const svgsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        else {
            entry.target.classList.add('animate-svg');
            
            observer.unobserve(entry.target);
        }
    });
}, options);