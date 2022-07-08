import './news.css';
import { IArticle } from '../../../types/interfaces';

class News {
    public draw(data: IArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;
        const newsWrapper = document.querySelector('.news-wrapper') as HTMLDivElement;
        const newsDiv = document.querySelector('.news') as HTMLDivElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;
            const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement;
            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLHeadingElement;
            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLHeadingElement;
            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLParagraphElement;
            const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;

            if (idx % 2) newsItem.classList.add('alt');

            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            metaAuthor.textContent = item.author || item.source.name;
            metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            descriptionTitle.textContent = item.title;
            descriptionSource.textContent = item.source.name;
            descriptionContent.textContent = item.description;
            readMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        newsWrapper.classList.add('active');
        document.body.classList.add('lock');

        newsDiv.innerHTML = '';
        newsDiv.appendChild(fragment);
    }
}

export default News;
