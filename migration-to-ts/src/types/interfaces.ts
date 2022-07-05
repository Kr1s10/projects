export interface ISourse {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISourses {
    status: string;
    sources: ISourse[];
}

export interface IArticle {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface IData {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export type TDraw<T> = (data: T) => void;
export type TCallback = (() => void) | TDraw<ISourses> | TDraw<IData>;

export enum Erorrs {
    unauthorized = 401,
    notFound = 404,
}
