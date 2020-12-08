import debounce from 'lodash/debounce';

const animationQue: Array<number> = [];

let currentPosition = { top: 0, bottom: 0 };
let animationPosition = { top: 0, bottom: 0 };
let scrollTop = 0;
const target = document.querySelector(
    '[data-animation-security]'
) as HTMLElement;

const getElementPosition = (): { top: number; bottom: number } => {
    const { offsetHeight, offsetTop } = target;

    return { top: offsetTop, bottom: offsetTop + offsetHeight };
};

const getAnimationPosition = (): { top: number; bottom: number } => {
    const top = currentPosition.top - innerHeight * 0.8;
    const bottom = currentPosition.bottom - innerHeight * 0.5;

    return {
        top,
        bottom,
    };
};

requestAnimationFrame(() => {
    currentPosition = getElementPosition();
    animationPosition = getAnimationPosition();
});

window.addEventListener(
    'resize',
    debounce(() => {
        currentPosition = getElementPosition();
        animationPosition = getAnimationPosition();
    }, 250)
);

window.addEventListener('scroll', () => {
    scrollTop = scrollY;
});

const createAnimationQue = () => {
    if (
        scrollTop > animationPosition.top &&
        scrollTop < animationPosition.bottom
    ) {
        const relativeAnimation =
            (scrollTop - animationPosition.top) /
            (animationPosition.top - animationPosition.bottom);
        const inStepAnimation: number = Math.round(relativeAnimation * 72);

        if (animationQue[animationQue.length - 1] !== inStepAnimation) {
            animationQue.push(inStepAnimation);
        }
    }

    requestAnimationFrame(createAnimationQue);
};

requestAnimationFrame(createAnimationQue);

const animate = () => {
    const animationStepValue = animationQue.shift();

    if (typeof animationStepValue !== 'undefined') {
        target.style.animationDelay = `${animationStepValue}s`;
    }

    requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
