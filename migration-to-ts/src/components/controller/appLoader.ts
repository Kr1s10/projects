import Loader from './loader';
import { API } from '../../types/constants';

class AppLoader extends Loader {
    constructor() {
        super(API.url, {
            apiKey: API.key, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
