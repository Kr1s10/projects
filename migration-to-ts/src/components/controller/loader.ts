import { HTTPStatusCodes } from '../../types/constants';
import { IData, ISources } from '../../types/interfaces';
import { TOptions, TgetRespObj, TRecordString, TCallback } from '../../types/types';

class Loader {
    private readonly baseLink: string;
    private readonly options: TOptions;

    constructor(baseLink: string, options: TOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: TgetRespObj,
        callback: TCallback = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === HTTPStatusCodes.unauthorized || res.status === HTTPStatusCodes.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: TOptions, endpoint: string): string {
        const urlOptions: TRecordString = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: TCallback, options: TOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data: IData | ISources) => callback(data as IData & ISources))
            .catch((err) => console.error(err));
    }
}

export default Loader;
