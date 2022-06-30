import { svgsObserver } from "./observer.js";

const svgs = document.querySelectorAll('.svg');
const paths = document.querySelectorAll('path');

paths.forEach(path => {
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength; 
});

svgs.forEach(svg => {
    svgsObserver.observe(svg);
});

// const linePath = document.querySelector('.line');
// const linePathLength = linePath.getTotalLength();
// linePath.style.strokeDasharray = linePathLength + ' ' + linePathLength;
// linePath.style.strokeDashoffset = linePathLength;

// window.addEventListener("scroll", () => {
//     requestAnimationFrame(() => {
//         const scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

//         const drawLength = linePathLength * scrollPercentage * 3;

//         linePath.style.strokeDashoffset = linePathLength - drawLength;
//     });
// });