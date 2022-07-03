import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '7f1121b9e0a24bb9b63c22d2a2c00d4d', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
