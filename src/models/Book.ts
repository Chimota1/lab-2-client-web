import type { IBook } from './interfaces/IBook';

export class Book implements IBook {
  private _id: string;
  private _title: string;
  private _author: string;
  private _year: number;
  private _isBorrowed: boolean;

  constructor(id: string, title: string, author: string, year: number, isBorrowed: boolean = false) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._year = year;
    this._isBorrowed = isBorrowed;
  }

  get id(): string { return this._id; }
  get title(): string { return this._title; }
  get author(): string { return this._author; }
  get year(): number { return this._year; }
  get isBorrowed(): boolean { return this._isBorrowed; }

  set isBorrowed(status: boolean) { this._isBorrowed = status; }
}