import './cards.scss';
import { ICard } from '../../../types/interface';

export class Cards {
    public draw(data: ICard[], cart: string[]): void {
        const fragment = document.createDocumentFragment();
        const cardTemp = document.querySelector('#cardTemp') as HTMLTemplateElement;
        const cardsWrapper = document.querySelector('.book-cards') as HTMLDivElement;

        data.forEach((item) => {
            const cardClone = cardTemp.content.cloneNode(true) as HTMLElement;
            const author = cardClone.querySelector('.book-card__author') as HTMLHeadingElement;
            const title = cardClone.querySelector('.book-card__title') as HTMLHeadingElement;
            const image = cardClone.querySelector('.book-card__photo') as HTMLImageElement;
            const genre = cardClone.querySelector('#genre') as HTMLSpanElement;
            const lang = cardClone.querySelector('#lang') as HTMLSpanElement;
            const year = cardClone.querySelector('#year') as HTMLSpanElement;
            const pages = cardClone.querySelector('#pages') as HTMLSpanElement;
            const binding = cardClone.querySelector('#binding') as HTMLSpanElement;
            const price = cardClone.querySelector('.price') as HTMLSpanElement;
            const buyBtn = cardClone.querySelector('.buy-btn') as HTMLButtonElement;

            author.textContent = item.author;
            title.textContent = item.name;
            image.src = item.img;
            image.alt = item.name;
            genre.textContent = item.genre;
            lang.textContent = item.lang;
            year.textContent = `${item.year}`;
            pages.textContent = `${item.pages}`;
            binding.textContent = item.binding;
            price.textContent = `${item.price} грн`;
            buyBtn.dataset.id = `${item.id}`;

            if (cart.some((id) => id === item.id.toString())) {
                buyBtn.innerText = 'Добавлено!';
                buyBtn.classList.add('active');
            }

            fragment.append(cardClone);
        });

        cardsWrapper.innerHTML = '';
        cardsWrapper.appendChild(fragment);
    }
}
