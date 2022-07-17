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
    search: string;
    sliderPrice: number[];
    sliderDate: number[];
    genre: HTMLInputElement[];
    lang: HTMLInputElement[];
    binding: HTMLInputElement[];
};
