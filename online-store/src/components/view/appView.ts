import { Slider } from './slider/slider';
import { Cards } from './cards/cards';
import { ICard } from '../../types/interface';

export class AppView {
    readonly sliderPrice: Slider;
    readonly sliderDate: Slider;
    private readonly cards: Cards;

    constructor() {
        this.cards = new Cards();
        this.sliderPrice = new Slider([0, 845], 'price');
        this.sliderDate = new Slider([2008, 2022], 'date');
    }

    public drawCards(data: ICard[]) {
        this.cards.draw(data);
    }
}
