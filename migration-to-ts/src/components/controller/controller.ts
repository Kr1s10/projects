import AppLoader from './appLoader';
import { IData, ISources } from '../../types/interfaces';
import { TDraw } from '../../types/types';
import { Endpoints } from '../../types/constants';

class AppController extends AppLoader {
    public getSources(callback: TDraw<ISources>): void {
        super.getResp(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    public getNews(e: Event, callback: TDraw<IData>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const items = document.querySelectorAll('.source__item');
                items.forEach((el) => el.classList.remove('active'));
                target.classList.add('active');
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }

    public removeNews(e: Event, newsWrapper: HTMLDivElement): void {
        const target = e.target as HTMLElement;
        if (target.classList.contains('news-wrapper') || target.closest('.close-btn')) {
            const sourceItems = document.querySelectorAll('.source__item');
            newsWrapper.classList.remove('active');
            document.body.classList.remove('lock');
            sourceItems.forEach((el) => el.classList.remove('active'));
        }
    }
}

export default AppController;
