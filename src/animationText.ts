import debounce from 'lodash/debounce';

const targets = Array.from(
    document.querySelectorAll('[data-hide-animation]')
) as Array<HTMLElement>;

targets.forEach((target, index) => {
    const animationQue: Array<number> = [];
    let currentPosition = { top: 0, bottom: 0 };
    let animationPosition = { top: 0, bottom: 0 };
    let scrollTop = 0;
    const targetText = target.innerText;
    const targetTextLength = targetText.length;
    const securedText = '•'.repeat(targetTextLength);
    target.innerText = securedText;

    const getElementPosition = (): { top: number; bottom: number } => {
        const { offsetHeight, offsetTop } = target;

        return { top: offsetTop, bottom: offsetTop + offsetHeight };
    };

    const getAnimationPosition = (): { top: number; bottom: number } => {
        const top =
            currentPosition.top - innerHeight * (index === 0 ? 0.9 : 0.8);
        const bottom =
            currentPosition.bottom - innerHeight * (index === 0 ? 0.8 : 0.7);

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
            const inStepAnimation: number = Math.round(
                relativeAnimation * targetTextLength
            );

            if (animationQue[animationQue.length - 1] !== inStepAnimation) {
                animationQue.push(Math.abs(inStepAnimation));
            }
        }

        requestAnimationFrame(createAnimationQue);
    };

    requestAnimationFrame(createAnimationQue);

    const setupString = (index: number): string => {
        let newString = '';

        for (let i = 0; i < targetTextLength; i++) {
            if (index <= i) {
                newString += securedText[i];
            } else {
                newString += targetText[i];
            }
        }

        return newString;
    };

    const animate = () => {
        const animationStepValue = animationQue.shift();

        if (typeof animationStepValue !== 'undefined') {
            const text = setupString(animationStepValue);
            target.innerText = text;
        }

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
});
