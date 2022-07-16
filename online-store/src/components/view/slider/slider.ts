import '../../../libs/nouislider/nouislider.min.css';
import * as noUiSlider from 'nouislider';
import './slider.scss';

const priceSlider = document.querySelector('.slider-price__slider') as noUiSlider.target;
const dateSlider = document.querySelector('.slider-date__slider') as noUiSlider.target;

noUiSlider.create(priceSlider, {
    start: [0, 845],
    connect: true,
    range: {
        min: 0,
        max: 845,
    },
    step: 1,
    format: {
        from: (value) => parseInt(value),
        to: (value) => Math.round(value),
    },
});

noUiSlider.create(dateSlider, {
    start: [2008, 2022],
    connect: true,
    range: {
        min: 2008,
        max: 2022,
    },
    step: 1,
    format: {
        from: (value) => parseInt(value),
        to: (value) => Math.round(value),
    },
});
