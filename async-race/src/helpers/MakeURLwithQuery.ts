import { IQuery } from '../types/interfaces';

export default function makeURLwithQuery(url: URL, query: IQuery) {
  const res = new URL(url);
  const keys = Object.keys(query) as Array<keyof typeof query>;
  keys.forEach((key) => res.searchParams.append(key, `${query[key]}`));
  return res;
}
