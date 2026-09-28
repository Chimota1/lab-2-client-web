import type { Book } from '../../models/Book';
import type { User } from '../../models/User';
import type { Library } from '../../services/Library';
import { BorrowService } from '../../services/BorrowService';
import { Modal } from './Modal';
import { Storage } from '../../services/Storage';

export function renderBookList(
  booksDb: Library<Book>, 
  usersDb: Library<User>, 
  onUpdate: () => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';
  
  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Список Книг';

  // ПУНКТ 19: Створюємо поле пошуку
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'form-control mb-3';
  searchInput.placeholder = 'Пошук книг за назвою чи автором...';

  const ul = document.createElement('ul');
  ul.className = 'list-group list-group-flush'; 

  booksDb.getAll().forEach(book => {
    const li = document.createElement('li');
    // Клас d-flex важливий для кнопок, тому при пошуку ми маємо його зберігати
    li.className = 'list-group-item d-flex justify-content-between align-items-center py-3';
    
    const span = document.createElement('span');
    span.textContent = `${book.title} by ${book.author} (${book.year})`;
    
    const btnGroup = document.createElement('div');

    const actionBtn = document.createElement('button');
    if (book.isBorrowed) {
      actionBtn.className = 'btn btn-warning btn-sm me-2';
      actionBtn.textContent = 'Повернути';
      actionBtn.onclick = () => {
        const userWithBook = usersDb.getAll().find(u => u.borrowedBooks.includes(book.id));
        if (userWithBook) {
          const result = BorrowService.returnBook(book.id, userWithBook.id, booksDb, usersDb);
          if (result.success) {
            Modal.showAlert(`${book.title} has been returned.`, true);
            Storage.save('books', booksDb.getAll());
            Storage.save('users', usersDb.getAll());
            onUpdate();
          } else {
            Modal.showAlert(result.message, false);
          }
        }
      };
    } else {
      actionBtn.className = 'btn btn-primary btn-sm me-2';
      actionBtn.textContent = 'Позичити';
      actionBtn.onclick = () => {
        Modal.showPrompt('Введіть ID користувача для позичення книги:', (userId) => {
          const result = BorrowService.borrowBook(book.id, userId, booksDb, usersDb);
          if (result.success) {
            const user = usersDb.findById(userId);
            Modal.showAlert(`${book.title} has been borrowed by ${user?.id} ${user?.name} (${user?.email}).`, true);
            Storage.save('books', booksDb.getAll());
            Storage.save('users', usersDb.getAll());
            onUpdate();
          } else {
            Modal.showAlert(result.message, false);
          }
        });
      };
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Видалити';
    deleteBtn.onclick = () => {
      if (book.isBorrowed) {
         const userWithBook = usersDb.getAll().find(u => u.borrowedBooks.includes(book.id));
         if (userWithBook) {
             userWithBook.returnBook(book.id);
             Storage.save('users', usersDb.getAll());
         }
      }
      booksDb.remove(book.id);
      Storage.save('books', booksDb.getAll());
      onUpdate();
    };

    btnGroup.append(actionBtn, deleteBtn);
    li.appendChild(span);
    li.appendChild(btnGroup);
    ul.appendChild(li);
  });
  
  // ПУНКТ 19: Логіка фільтрації
  searchInput.oninput = (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    Array.from(ul.children).forEach((li) => {
      // Шукаємо текст саме в тегу <span>, щоб не враховувати текст кнопок
      const text = li.querySelector('span')?.textContent?.toLowerCase() || '';
      
      if (text.includes(query)) {
        // setProperty потрібен через те, що d-flex від Bootstrap використовує !important
        (li as HTMLElement).style.setProperty('display', 'flex', 'important');
      } else {
        (li as HTMLElement).style.setProperty('display', 'none', 'important');
      }
    });
  };
  
  cardBody.append(title, searchInput, ul);
  card.appendChild(cardBody);
  
  return card;
}