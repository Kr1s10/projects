import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '58f816e3091e43bba37302feb39b9be3', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
