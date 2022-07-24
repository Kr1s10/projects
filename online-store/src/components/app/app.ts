import { AppView } from '../view/appView';
import { Controller } from '../controller/controller';
import { ICard, TOPtions } from '../../types/interface';
import { LocalStorageService } from '../../services/localStorageService';
import data from '../../data';
import { maxNumberInCart, defaultDateValues, defaultPriceValues, Message } from '../../types/constants';

export class App {
    private view: AppView;
    private constroller: Controller;
    private defaultOptions: TOPtions;
    private options: TOPtions;
    private searchField: HTMLInputElement;
    private select: HTMLSelectElement;
    private checkboxes: NodeListOf<HTMLInputElement>;
    private filters: HTMLDivElement;
    private resetFilterBtn: HTMLButtonElement;
    private resetAllBtn: HTMLButtonElement;
    private cart: string[];
    private cartDiv: HTMLSpanElement;
    private cardsWrapper: HTMLDivElement;

    constructor() {
        this.view = new AppView();
        this.constroller = new Controller();
        this.defaultOptions = {
            sort: 'nameAZ',
            search: '',
            sliderPrice: this.view.sliderPrice.values,
            sliderDate: this.view.sliderDate.values,
            checkboxes: [],
        };
        this.options =
            LocalStorageService.getItem<TOPtions>('options') ||
            (JSON.parse(JSON.stringify(this.defaultOptions)) as TOPtions);
        this.cart = LocalStorageService.getItem('cart') || [];
        this.searchField = document.querySelector('.search__input') as HTMLInputElement;
        this.select = document.querySelector('.sort__select') as HTMLSelectElement;
        this.checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
        this.filters = document.querySelector('.filters') as HTMLDivElement;
        this.resetFilterBtn = document.querySelector('.reset-filters-btn') as HTMLButtonElement;
        this.resetAllBtn = document.querySelector('.reset-all-btn') as HTMLButtonElement;
        this.cartDiv = document.querySelector('.cart-number') as HTMLSpanElement;
        this.cardsWrapper = document.querySelector('.book-cards') as HTMLDivElement;
    }

    public init(): void {
        this.draw(this.options);

        this.sliderEvents();
        this.select.addEventListener('change', this.sortHandler);
        this.filters.addEventListener('click', this.filterHandler);
        this.searchField.addEventListener('input', this.searchHandler);
        this.cardsWrapper.addEventListener('click', this.cartHandler);
        this.resetFilterBtn.addEventListener('click', this.resetFiltersHandler);
        this.resetAllBtn.addEventListener('click', () => {
            LocalStorageService.clear();
            location.reload();
        });
    }

    private cartHandler = (e: Event): void => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('buy-btn')) {
            const btnId = target.dataset.id as string;
            if (target.classList.contains('active')) {
                this.removeInCart(target, btnId);
            } else {
                if (this.cart.length < maxNumberInCart) {
                    this.addInCart(target, btnId);
                } else {
                    alert(Message.fullCart);
                }
            }
            LocalStorageService.setItem('cart', this.cart);
        }
        this.saveAndDraw();
    };

    private addInCart(target: HTMLElement, id: string): void {
        target.innerHTML = Message.addInCart;
        target.classList.add('active');
        this.cart.push(id);
    }

    private removeInCart(target: HTMLElement, id: string): void {
        target.innerHTML = Message.removeInCart;
        target.classList.remove('active');
        this.cart.splice(this.cart.indexOf(id), 1);
    }

    private resetFiltersHandler = (): void => {
        this.options.checkboxes = [];
        this.options.search = '';
        this.searchField.value = '';
        this.view.sliderPrice.slider.noUiSlider?.set(defaultPriceValues);
        this.view.sliderDate.slider.noUiSlider?.set(defaultDateValues);
        this.saveAndDraw();
    };

    private searchHandler = (): void => {
        this.options.search = this.searchField.value;
        this.saveAndDraw();
    };

    private filterHandler = (e: Event): void => {
        const target = e.target as HTMLInputElement;
        if (target.type) {
            const checkboxesChecked: boolean[] = [];
            this.checkboxes.forEach((chbox, idx) => {
                checkboxesChecked[idx] = chbox.checked;
            });
            this.options.checkboxes = checkboxesChecked;
            this.saveAndDraw();
        }
    };

    private sortHandler = (): void => {
        this.options.sort = this.select.value;
        this.saveAndDraw();
    };

    private saveAndDraw(): void {
        LocalStorageService.setItem<TOPtions>('options', this.options);
        this.draw(this.options);
    }

    private sliderEvents(): void {
        this.view.sliderPrice.slider.noUiSlider?.on('change', (values, inputIndex) => {
            this.options.sliderPrice[inputIndex] = Number(values[inputIndex]);
            this.saveAndDraw();
        });

        this.view.sliderDate.slider.noUiSlider?.on('change', (values, inputIndex) => {
            this.options.sliderDate[inputIndex] = Number(values[inputIndex]);
            this.saveAndDraw();
        });

        this.view.sliderPrice.slider.noUiSlider?.on('set', () => {
            const priceRange = this.view.sliderPrice.slider.noUiSlider?.get();
            this.options.sliderPrice = priceRange as number[];
            this.saveAndDraw();
        });

        this.view.sliderDate.slider.noUiSlider?.on('set', () => {
            const dateRange = this.view.sliderDate.slider.noUiSlider?.get();
            this.options.sliderDate = dateRange as number[];
            this.saveAndDraw();
        });
    }

    private draw(options: TOPtions): void {
        const sort = LocalStorageService.getItem<TOPtions>('options')?.sort;
        const search = LocalStorageService.getItem<TOPtions>('options')?.search;
        this.cartDiv.innerHTML = `${this.cart.length}`;

        if (sort) this.select.value = sort;
        if (search) this.searchField.value = search;

        const filteredData = this.constroller.filter(data, options);
        const sortedData: ICard[] = this.constroller.sort(filteredData);
        if (!sortedData.length) {
            this.cardsWrapper.innerHTML = Message.noCoincidences;
        } else {
            this.view.drawCards(sortedData, this.cart);
        }
    }
}
