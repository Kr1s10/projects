import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISources, IData } from '../../types/interfaces';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        const newsWrapper = document.querySelector('.news-wrapper') as HTMLDivElement;

        sources.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
        );

        newsWrapper.addEventListener('click', (e: Event) => {
            this.controller.removeNews(e, newsWrapper);
        });
        this.controller.getSources((data: ISources) => this.view.drawSources(data));
    }
}

export default App;
