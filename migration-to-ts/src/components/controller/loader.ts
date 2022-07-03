import { IData, ISourses, TCallback, Erorrs } from '../../types/interfaces';
type TOptions = Partial<{
    apiKey: string;
    sources: string;
}>;

class Loader {
    private readonly baseLink: string;
    private readonly options: TOptions;

    constructor(baseLink: string, options: TOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: TOptions },
        callback: TCallback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === Erorrs.unauthorized || res.status === Erorrs.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: TOptions, endpoint: string) {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: TCallback, options: TOptions = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: IData | ISourses) => callback(data as IData & ISourses))
            .catch((err) => console.error(err));
    }
}

export default Loader;
