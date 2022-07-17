import { ICard, TOPtions } from '../../types/interface';

export class Controller {
    sort(data: ICard[], type = 'nameAZ'): ICard[] {
        let sortData: ICard[] = data;
        if (type.includes('name')) {
            sortData = data.sort((a, b) => a.name.localeCompare(b.name));
            return type === 'nameAZ' ? sortData : sortData.reverse();
        }

        if (type === 'priceLowFirst') sortData = data.sort((a, b) => a.price - b.price);
        if (type === 'priceHighFirst') sortData = data.sort((a, b) => b.price - a.price);

        return sortData;
    }

    filter(data: ICard[], options: TOPtions) {
        let filterData = options.search ? data.filter((card) => this.filterSearch(card, options.search)) : data;
        filterData = filterData.filter((card) => this.filterPriceSlider(card, options.sliderPrice));
        filterData = filterData.filter((card) => this.filterDateSlider(card, options.sliderDate));
        filterData = filterData.filter((card) => this.filterCheckboxGenre(card, options.genre));
        filterData = filterData.filter((card) => this.filterCheckboxLang(card, options.lang));
        filterData = filterData.filter((card) => this.filterCheckboxBinding(card, options.binding));
        return filterData;
    }

    filterPriceSlider(card: ICard, values: number[]) {
        return card.price >= values[0] && card.price <= values[1];
    }

    filterDateSlider(card: ICard, values: number[]) {
        return card.year >= values[0] && card.year <= values[1];
    }

    filterSearch(card: ICard, value: string) {
        return (
            card.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            card.author.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }

    filterCheckboxGenre(card: ICard, list: HTMLInputElement[]) {
        const res: string[] = [];
        list.forEach((el) => {
            if (el.checked) res.push(el.value);
        });
        if (!res.length) return true;
        return res.indexOf(card.genre.toLowerCase()) !== -1;
    }

    filterCheckboxLang(card: ICard, list: HTMLInputElement[]) {
        const res: string[] = [];
        list.forEach((el) => {
            if (el.checked) res.push(el.value);
        });
        if (!res.length) return true;
        return res.indexOf(card.lang.toLowerCase()) !== -1;
    }

    filterCheckboxBinding(card: ICard, list: HTMLInputElement[]) {
        const res: string[] = [];
        list.forEach((el) => {
            if (el.checked) res.push(el.value);
        });
        if (!res.length) return true;
        return res.indexOf(card.binding.toLowerCase()) !== -1;
    }
}
