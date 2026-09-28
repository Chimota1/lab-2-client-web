import type { IUser } from './interfaces/IUser';

export class User implements IUser {
  private _id: string;
  private _name: string;
  private _email: string;
  private _borrowedBooks: string[];

  constructor(id: string, name: string, email: string, borrowedBooks: string[] = []) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._borrowedBooks = borrowedBooks;
  }

  get id(): string { return this._id; }
  get name(): string { return this._name; }
  get email(): string { return this._email; }
  get borrowedBooks(): string[] { return this._borrowedBooks; }

  // Допоміжні методи для зміни стану позичених книг
  borrowBook(bookId: string): void {
    if (this._borrowedBooks.length < 3) {
      this._borrowedBooks.push(bookId);
    }
  }

  returnBook(bookId: string): void {
    this._borrowedBooks = this._borrowedBooks.filter(id => id !== bookId);
  }
}