import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourses, IData } from '../../types/interfaces';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
        );
        const newsWrapper = document.querySelector('.news-wrapper') as HTMLDivElement;
        newsWrapper.addEventListener('click', (e: Event) => {
            this.controller.removeNews(e, newsWrapper);
        });
        this.controller.getSources((data: ISourses) => this.view.drawSources(data));
    }
}

export default App;
