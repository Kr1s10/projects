import News from './news/news';
import Sources from './sources/sources';
import { ISources, IData } from '../../types/interfaces';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IData): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISources): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
