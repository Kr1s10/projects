import './sources.css';
import { ISource } from '../../../types/interfaces';

class Sources {
    public draw(data: ISource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const sources = document.querySelector('.sources') as HTMLDivElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        sources.append(fragment);
    }
}

export default Sources;
