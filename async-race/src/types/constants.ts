export const BASE_URL = 'http://localhost:3000';
export const models = ['Tesla', 'Mercedes', 'BMW', 'Toyota', 'Audi', 'Mitsubishi', 'Honda', 'Hyundai', 'Volkswagen', 'Porshe', 'Lamborghini', 'Jaguar'];
export const names = ['Model S', 'AMG GT', 'M3', 'Camry', 'RS 5', 'ASX', 'CR-V', 'Tucson', 'Polo', '911 Turbo', 'Urus', 'XFR'];
export const colorAlph = '0123456789ABCDEF';
export const totalCountHeader = 'X-Total-Count';
export const carStartPosition = 'translateX(0)';
export const inputDefaultColor = '#ffffff';
export const selectedClass = 'selected';
export const milliseconds = 1000;
export const indentOfFlag = 80;
export const numberOfRandomCars = 100;
export const lengthOfColor = 6;

export enum FormText {
  create = 'create',
  update = 'update',
}

export enum Limit {
  garage = 7,
  winners = 10,
}

export enum Method {
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum Page {
  garage = 'garage',
  winners = 'winners',
  engine = 'engine',
}

export enum Sort {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum StatusEngine {
  started = 'started',
  drive = 'drive',
  stopped = 'stopped',
}

export enum HTTPStatusCodes {
  OK = 200,
  notFound = 404,
}

export const headers = {
  'Content-Type': 'application/json',
};
