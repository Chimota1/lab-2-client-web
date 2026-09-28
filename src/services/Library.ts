export class Library<T extends { id: string }> {
  private _items: T[];

  constructor(initialItems: T[] = []) {
    this._items = initialItems;
  }

  getAll(): T[] {
    return this._items;
  }

  setAll(items: T[]): void {
    this._items = items;
  }

  add(item: T): void {
    this._items.push(item);
  }

  remove(id: string): void {
    this._items = this._items.filter(item => item.id !== id);
  }

  findById(id: string): T | undefined {
    return this._items.find(item => item.id === id);
  }

  find(predicate: (item: T) => boolean): T[] {
    return this._items.filter(predicate);
  }
}