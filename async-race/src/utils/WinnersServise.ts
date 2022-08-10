import {
  BASE_URL, headers, HTTPStatusCodes, Limit, Method, Order, Page, Sort, totalCountHeader,
} from '../types/constants';
import {
  IWinner, ICar, TOrder, TSort,
} from '../types/interfaces';
import CarsServise from './CarsServise';
import makeURLwithQuery from '../components/helpers/MakeURLwithQuery';

class WinnersServise {
  private static URL = new URL(Page.winners, BASE_URL);

  public static getWinners = async (
    page: number,
    limit = Limit.winners,
    sort: TSort = Sort.id,
    order: TOrder = Order.ASC,
  ) => {
    const url = makeURLwithQuery(
      this.URL,
      {
        _page: page, _limit: limit, _sort: sort, _order: order,
      },
    );
    const res = await fetch(url.href);
    const data: IWinner[] = await res.json();

    return {
      data: await Promise.all(data.map(async (winner) => ({
        ...winner,
        car: await CarsServise.getCar(winner.id as number) as ICar,
      }))),
      totalCount: Number(res.headers.get(totalCountHeader)),
    };
  };

  public static getWinner = async (id: number) => (await fetch(`${this.URL}/${id}`)).json();

  public static getWinnerStatus = async (id: number) => (await fetch(`${this.URL}/${id}`)).status;

  public static createWinner = async (body: IWinner) => (await fetch(this.URL, {
    method: Method.POST,
    body: JSON.stringify(body),
    headers,
  })).json();

  public static updateWinner = async (id: number, body: IWinner) => (await fetch(`${this.URL}/${id}`, {
    method: Method.PUT,
    body: JSON.stringify(body),
    headers,
  })).json();

  public static deleteWinner = async (id: number) => (await fetch(`${this.URL}/${id}`, {
    method: Method.DELETE,
  })).json();

  public static saveWinner = async (id: number, time: number) => {
    const winnerStatus = await this.getWinnerStatus(id);

    if (winnerStatus === HTTPStatusCodes.notFound) {
      await this.createWinner({
        id,
        wins: 1,
        time,
      });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  };
}

export default WinnersServise;
