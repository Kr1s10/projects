import '../../../libs/nouislider/nouislider.min.css';
import './slider.scss';
import * as noUiSlider from 'nouislider';

export class Slider {
    public slider: noUiSlider.target;
    public values: number[];
    private type: string;
    private minmax: number[];
    private inputs: HTMLInputElement[];

    constructor(values: number[], minmax: number[], type: string, option?: number[]) {
        this.values = option || values;
        this.minmax = minmax;
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
                min: this.minmax[0],
                max: this.minmax[1],
            },
            step: 1,
            format: {
                from: (value) => Number(value),
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
