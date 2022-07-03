import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ISourses, IData } from '../../types/interfaces';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLDivElement).addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: IData) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISourses) => this.view.drawSources(data));
    }
}

export default App;
