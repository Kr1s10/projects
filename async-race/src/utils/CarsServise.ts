import BASE_URL from '../types/constants';
import { ICar } from '../types/interfaces';
import makeURLwithQuery from './MakeURLwithQuery';

class CarsServise {
  private static URL = new URL('garage', BASE_URL);

  public static getCars = async (page: number, limit = 7) => {
    const url = makeURLwithQuery(CarsServise.URL, { _page: page, _limit: limit });
    const res = await fetch(url.href);
    const data: ICar[] = await res.json();

    return {
      data,
      count: Number(res.headers.get('X-Total-Count')),
    };
  };

  public static getCar = async (id: number) => (await fetch(`${CarsServise.URL}/${id}`)).json();

  public static createCar = async (body: ICar) => (await fetch(CarsServise.URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

  public static updateCar = async (id: number, body: ICar) => (await fetch(`${CarsServise.URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

  public static deleteCar = async (id: number) => (await fetch(`${CarsServise.URL}/${id}`, {
    method: 'DELETE',
  })).json();
}

export default CarsServise;
