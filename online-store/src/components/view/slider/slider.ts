import '../../../libs/nouislider/nouislider.min.css';
import * as noUiSlider from 'nouislider';
import './slider.scss';

export class Slider {
    public slider: noUiSlider.target;
    private type: string;
    values: number[];
    inputs: HTMLInputElement[];

    constructor(values: number[], type: string) {
        this.values = values;
        this.type = type;
        this.slider = document.querySelector(`.slider-${type}__slider`) as noUiSlider.target;
        this.inputs = [
            document.querySelector(`#input-${this.type}_low`) as HTMLInputElement,
            document.querySelector(`#input-${this.type}_high`) as HTMLInputElement,
        ];
        this.create();
    }

    private create(): void {
        noUiSlider.create(this.slider, {
            start: this.values,
            connect: true,
            range: {
                min: this.values[0],
                max: this.values[1],
            },
            step: 1,
            format: {
                from: (value) => parseInt(value),
                to: (value) => Math.round(value),
            },
        });
        this.changeValues();
    }

    private changeValues(): void {
        this.slider.noUiSlider?.on('update', (values, handle) => {
            this.inputs[handle].value = values[handle].toString();
            this.values[handle] = +values[handle];
        });

        this.inputs.forEach((el, i) => {
            el.addEventListener('change', (e) => {
                this.values[i] = +(e.currentTarget as HTMLInputElement).value;
                this.slider.noUiSlider?.set(this.values);
            });
        });
    }
}
