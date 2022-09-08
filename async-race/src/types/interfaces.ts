import { Dispatch } from 'react';
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

export interface ICarProps {
  item: ICar;
  isFull: boolean;
  fetchCars: () => void;
  setWinners: React.Dispatch<React.SetStateAction<TWinner[]>>;
}

export interface IGarageProps {
  cars: ICar[];
  count: number;
  fetchCars: () => void;
}

export interface IPaginationProps {
  page: number,
  change: (value: number) => void,
  updateState: () => void,
  limit: number,
  length: number
}

export interface IProviderProps {
  children: React.ReactNode
}

export interface IWinnerProps {
  item: IWinnerWithCar;
  number: number;
}

export interface IWinnersTableProps {
  data: IWinnerWithCar[]
}

export interface IFormProps {
  updateState: () => void;
}

export interface IControlsProps {
  updateState: () => void;
}

export interface ICarSvgProps {
  color: string;
}

export interface IGarage {
  garagePage: number;
  setGaragePage: Dispatch<number>;
  winnersPage: number;
  setWinnersPage: Dispatch<number>;
  winners: TWinner[];
  setWinners: Dispatch<TWinner[]>
  currentCar: number;
  setCurrentCar: Dispatch<number>;
  nameInput: string;
  setNameInput: Dispatch<string>;
  colorInput: string;
  setColorInput: Dispatch<string>;
  isAllStarted: boolean;
  setIsAllStarted: Dispatch<boolean>;
}
