import {
  BASE_URL, headers, Limit, Method, Page, totalCountHeader,
} from '../types/constants';
import { ICar } from '../types/interfaces';
import makeURLwithQuery from '../helpers/MakeURLwithQuery';

export default class CarsService {
  private static URL = new URL(Page.garage, BASE_URL);

  public static getCars = async (page: number, limit = Limit.garage) => {
    const url = makeURLwithQuery(this.URL, { _page: page, _limit: limit });
    const res = await fetch(url.href);
    const data: ICar[] = await res.json();

    return {
      data,
      totalCount: Number(res.headers.get(totalCountHeader)),
    };
  };

  public static getCar = async (id: number) => (await fetch(`${this.URL}/${id}`)).json();

  public static createCar = async (body: ICar) => (await fetch(this.URL, {
    method: Method.POST,
    body: JSON.stringify(body),
    headers,
  })).json();

  public static updateCar = async (id: number, body: ICar) => (await fetch(`${this.URL}/${id}`, {
    method: Method.PUT,
    body: JSON.stringify(body),
    headers,
  })).json();

  public static deleteCar = async (id: number) => (await fetch(`${this.URL}/${id}`, {
    method: Method.DELETE,
  })).json();
}
