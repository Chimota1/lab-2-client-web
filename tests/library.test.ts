import { expect } from 'chai';
import { Library } from '../src/services/Library';

interface MockItem {
  id: string;
  name: string;
}

describe('Library Generic Class Tests', () => {
  let db: Library<MockItem>;

  beforeEach(() => {
    db = new Library<MockItem>();
  });

  it('має успішно додавати новий елемент', () => {
    db.add({ id: '1', name: 'Тестова книга' });
    
    expect(db.getAll().length).to.equal(1);
    expect(db.getAll()[0]!.id).to.equal('1');
  });

  it('має знаходити елемент за його ID', () => {
    db.add({ id: '99', name: 'Секретний запис' });
    
    const foundItem = db.findById('99');
    
    expect(foundItem).to.not.be.undefined;
    expect(foundItem?.name).to.equal('Секретний запис');
  });

  it('має видаляти елемент за його ID', () => {
    db.add({ id: '1', name: 'Видали мене' });
    db.add({ id: '2', name: 'Залиш мене' });
    
    db.remove('1');
    
    expect(db.getAll().length).to.equal(1);
    expect(db.findById('1')).to.be.undefined; // Першого елемента більше немає
    expect(db.findById('2')).to.not.be.undefined; // Другий залишився
  });
});