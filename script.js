const navDialog = document.getElementById('nav-dialog')
function handleMenu() {
    navDialog.classList.toggle('hidden')
}

// function for the companies logo movement
/**
 * Sets up an IntersectionObserver to monitor the visibility of a given element.
 *
 * @param {Element} line - The DOM element to observe.
 * @param {boolean} isLTR - Indicates if the direction is left-to-right.
 * @param {number} speed - The speed at which the element should be animated or processed.
 */

const initialTranslateLTR = -48*4;
const initialTranslateRTL = 28*4;

function setupIntersectionObserver(line, isLTR, speed) {
    const intersectionCallback = (entries) => {
        const isIntersecting = entries[0].isIntersecting; //return boolean if intersecting the veiwport
        if (isIntersecting) {
            document.addEventListener('scroll', scrollHandler);
        } else {
            document.removeEventListener('scroll', scrollHandler);
        }
    }
    const intersectionObserver = new IntersectionObserver(intersectionCallback)
    intersectionObserver.observe(line);

    function scrollHandler() {
        const translateX = (window.innerHeight - line.getBoundingClientRect().top) * speed
        
        let totalTranslate = 0;
        if (isLTR) {
            totalTranslate = translateX + initialTranslateLTR;
        } else {
            totalTranslate = - (translateX + initialTranslateRTL);
        }
        line.style.transform = `translateX(${totalTranslate}px)`
    }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

setupIntersectionObserver(line1, true, 0.15)
setupIntersectionObserver(line2, false, 0.15)
setupIntersectionObserver(line3, true, 0.15)

const questions = document.querySelectorAll('dt');
console.log(questions);
questions.forEach(question => {
    question.addEventListener('click', () => {
        const arrow = question.getElementsByTagName('i')[0]; //get the first i tag
        const ddID = question.getAttribute('aria-controls'); //returns the value of the attribute
        const dd = document.getElementById(ddID); //now get element by id
        
        dd.classList.toggle('hidden');
        arrow.classList.toggle('rotate-180');
    });
});
