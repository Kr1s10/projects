import BASE_URL from '../types/constants';
import { IWinner, TOrder, TSort } from '../types/interfaces';
import CarsServise from './CarsServise';
import makeURLwithQuery from './MakeURLwithQuery';

class WinnersServise {
  private static URL = new URL('winners', BASE_URL);

  public static getWinners = async (page: number, limit = 10, sort: TSort = 'id', order: TOrder = 'ASC') => {
    const url = makeURLwithQuery(
      WinnersServise.URL,
      {
        _page: page, _limit: limit, _sort: sort, _order: order,
      },
    );
    const res = await fetch(url.href);
    const data: IWinner[] = await res.json();

    return {
      data: await Promise.all(data.map(async (winner) => ({
        ...winner,
        car: await CarsServise.getCar(winner.id as number),
      }))),
      count: Number(res.headers.get('X-Total-Count')),
    };
  };

  public static getWinner = async (id: number) => (await fetch(`${WinnersServise.URL}/${id}`)).json();

  public static getWinnerStatus = async (id: number) => (await fetch(`${WinnersServise.URL}/${id}`)).status;

  public static createWinner = async (body: IWinner) => (await fetch(WinnersServise.URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

  public static updateWinner = async (id: number, body: IWinner) => (await fetch(`${WinnersServise.URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

  public static deleteWinner = async (id: number) => (await fetch(`${WinnersServise.URL}/${id}`, {
    method: 'DELETE',
  })).json();

  public static saveWinner = async (id: number, time: number) => {
    const winnerStatus = await this.getWinnerStatus(id);

    if (winnerStatus === 404) {
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
