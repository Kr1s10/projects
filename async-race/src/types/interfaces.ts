import { Order, Sort, StatusEngine } from './constants';

export interface IQuery {
  _page?: number;
  _limit?: number;
  _sort?: TSort;
  _order?: TOrder;
  id?: number;
  status?: TStatus;
}

export type TSort = Sort.id | Sort.wins | Sort.time;
export type TOrder = Order.ASC | Order.DESC;
export type TStatus = StatusEngine.started | StatusEngine.stopped | StatusEngine.drive;
export type TWinner = { id: number, winsTime: number };
export type TCallbackWins = ({ id, winsTime }: TWinner) => void;

export interface ICar {
  id?: number;
  name: string;
  color: string;
}

export interface IWinner {
  id?: number;
  wins: number;
  time: number;
}

export interface IWinnerWithCar {
  id?: number;
  car: ICar;
  wins: number;
  time: number;
}
