import { AppView } from '../view/appView';
import { Controller } from '../controller/controller';
import { ICard, TOPtions } from '../../types/interface';
import data from '../../data';

export class App {
    view: AppView;
    constroller: Controller;
    defaultOptions: TOPtions;
    searchField: HTMLInputElement;
    select: HTMLSelectElement;

    constructor() {
        this.view = new AppView();
        this.constroller = new Controller();
        this.defaultOptions = {
            search: '',
            sliderPrice: this.view.sliderPrice.values,
            sliderDate: this.view.sliderDate.values,
            genre: (document.querySelectorAll('.genre-list__input') as unknown) as HTMLInputElement[],
            lang: (document.querySelectorAll('.lang-list__input') as unknown) as HTMLInputElement[],
            binding: (document.querySelectorAll('.binding-list__input') as unknown) as HTMLInputElement[],
        };
        this.searchField = document.querySelector('.search__input') as HTMLInputElement;
        this.select = document.querySelector('.sort__select') as HTMLSelectElement;
    }

    init() {
        this.draw(this.defaultOptions);

        this.select.addEventListener('change', this.sortHandler);

        this.view.sliderPrice.slider.noUiSlider?.on('change', this.sliderHandler);
        this.view.sliderPrice.inputs.forEach((input) => {
            input.addEventListener('change', this.sliderHandler);
        });

        this.view.sliderDate.slider.noUiSlider?.on('change', this.sliderHandler);
        this.view.sliderDate.inputs.forEach((input) => {
            input.addEventListener('change', this.sliderHandler);
        });
    }

    sortHandler = () => {
        this.draw(this.defaultOptions, this.select.value);
    };

    sliderHandler = () => {
        this.draw(this.defaultOptions);
    };

    draw(options: TOPtions, typeSort?: string) {
        const filteredData = this.constroller.filter(data, options);
        const sortedData: ICard[] = this.constroller.sort(filteredData, typeSort);
        this.view.drawCards(sortedData);
    }
}
