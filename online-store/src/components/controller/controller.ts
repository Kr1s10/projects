import { LocalStorageService } from '../../services/localStorageService';
import { ICard, TOPtions } from '../../types/interface';

export class Controller {
    public sort(data: ICard[]): ICard[] {
        let sortData: ICard[] = data;
        const type = LocalStorageService.getItem<TOPtions>('options')?.sort || 'nameAZ';
        if (type.includes('name')) {
            sortData = data.sort((a, b) => a.name.localeCompare(b.name));
            return type === 'nameAZ' ? sortData : sortData.reverse();
        }

        if (type === 'priceLowFirst') sortData = data.sort((a, b) => a.price - b.price);
        if (type === 'priceHighFirst') sortData = data.sort((a, b) => b.price - a.price);

        return sortData;
    }

    public filter(data: ICard[], options: TOPtions): ICard[] {
        let filterData = options.search ? data.filter((card) => this.filterSearch(card, options.search)) : data;
        filterData = filterData.filter((card) => this.filterPriceSlider(card, options.sliderPrice));
        filterData = filterData.filter((card) => this.filterDateSlider(card, options.sliderDate));
        const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.filters input[type="checkbox"]');
        const checkboxesChecked = options.checkboxes;
        if (checkboxesChecked) {
            checkboxes.forEach((el, idx) => {
                el.checked = checkboxesChecked[idx];
            });
        }
        filterData = this.filterCheckboxGenre(filterData);
        filterData = this.filterCheckboxLang(filterData);
        filterData = this.filterCheckboxBinding(filterData);
        return filterData;
    }

    private filterPriceSlider(card: ICard, values: number[]): boolean {
        return card.price >= values[0] && card.price <= values[1];
    }

    private filterDateSlider(card: ICard, values: number[]): boolean {
        return card.year >= values[0] && card.year <= values[1];
    }

    private filterSearch(card: ICard, value: string): boolean {
        return (
            card.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            card.author.toLowerCase().indexOf(value.toLowerCase()) !== -1
        );
    }

    private filterCheckboxGenre(data: ICard[]): ICard[] {
        const res: string[] = [];
        const list = (document.querySelectorAll('.genre-list__input') as unknown) as HTMLInputElement[];
        list.forEach((el) => {
            if (el.checked) res.push(el.value);
        });
        if (!res.length) return data;

        return data.filter((card) => res.indexOf(card.genre.toLowerCase()) !== -1);
    }

    private filterCheckboxLang(data: ICard[]): ICard[] {
        const res: string[] = [];
        const list = (document.querySelectorAll('.lang-list__input') as unknown) as HTMLInputElement[];
        list.forEach((el) => {
            if (el.checked) res.push(el.value);
        });
        if (!res.length) return data;

        return data.filter((card) => res.indexOf(card.lang.toLowerCase()) !== -1);
    }

    private filterCheckboxBinding(data: ICard[]): ICard[] {
        const res: string[] = [];
        const list = (document.querySelectorAll('.binding-list__input') as unknown) as HTMLInputElement[];
        list.forEach((el) => {
            if (el.checked) res.push(el.value);
        });
        if (!res.length) return data;

        return data.filter((card) => res.indexOf(card.binding.toLowerCase()) !== -1);
    }
}
