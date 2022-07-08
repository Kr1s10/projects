export interface ISource {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISources {
    status: string;
    sources: ISource[];
}

export interface IArticle {
    source: Tsource;
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

type Tsource = {
    id: string;
    name: string;
};
