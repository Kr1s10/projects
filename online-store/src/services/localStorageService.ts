export class LocalStorageService {
    public static getItem = <Type>(key: string): Type | null => {
        const localStorageValue = localStorage.getItem(key) || '';

        return localStorageValue ? (JSON.parse(localStorageValue) as Type) : null;
    };

    public static setItem = <Type>(key: string, value: Type): void => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    public static removeItem = (key: string): void => {
        localStorage.removeItem(key);
    };

    public static clear = (): void => {
        localStorage.clear();
    };
}
