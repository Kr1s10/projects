export interface ICard {
    id: number;
    name: string;
    author: string;
    genre: string;
    img: string;
    year: number;
    price: number;
    binding: string;
    pages: number;
    lang: string;
}

export type TOPtions = {
    sort: string;
    search: string;
    sliderPrice: number[];
    sliderDate: number[];
    checkboxes: boolean[];
};
