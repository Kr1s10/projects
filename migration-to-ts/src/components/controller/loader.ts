import { IData, ISourses } from '../../types/interfaces';
type TOptions = { sources: string };

class Loader {
    baseLink: string;
    options: {
        apikey: string;
    };

    constructor(baseLink: string, options: { apikey: string }) {
        this.baseLink = baseLink;
        this.options = options;
        // this.errorHandler.bind(this);
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: TOptions | Record<string, never> },
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: TOptions | Record<string, never>, endpoint: string) {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: (data?: IData | ISourses) => void,
        options: TOptions | Record<string, never> = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: IData | ISourses) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
