import { Slider } from './slider/slider';
import { Cards } from './cards/cards';
import { ICard, TOPtions } from '../../types/interface';
import { LocalStorageService } from '../../services/localStorageService';

export class AppView {
    readonly sliderPrice: Slider;
    readonly sliderDate: Slider;
    private readonly cards: Cards;

    constructor() {
        this.cards = new Cards();
        const options = LocalStorageService.getItem<TOPtions>('options');
        this.sliderPrice = new Slider([0, 845], [0, 845], 'price', options?.sliderPrice);
        this.sliderDate = new Slider([2008, 2022], [2008, 2022], 'date', options?.sliderDate);
    }

    public drawCards(data: ICard[], cart: string[]) {
        this.cards.draw(data, cart);
    }
}
