import { ISources, IData } from './interfaces';

export type TOptions = Partial<{
    apiKey: string;
    sources: string;
}>;

export type TgetRespObj = { endpoint: string; options?: TOptions };
export type TRecordString = Record<string, string>;
export type TDraw<T> = (data: T) => void;
export type TCallback = (() => void) | TDraw<ISources> | TDraw<IData>;
