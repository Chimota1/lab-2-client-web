import type { Book } from '../../models/Book';
import type { User } from '../../models/User';
import type { Library } from '../../services/Library';
import { BorrowService } from '../../services/BorrowService';
import { Modal } from './Modal';
import { Storage } from '../../services/Storage';

export function renderBookList(
  booksDb: Library<Book>, 
  usersDb: Library<User>, 
  onUpdate: () => void // Колбек для оновлення UI
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';
  
  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Список Книг';
  cardBody.appendChild(title);

  const ul = document.createElement('ul');
  ul.className = 'list-group list-group-flush'; 

  booksDb.getAll().forEach(book => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center py-3';
    
    const span = document.createElement('span');
    span.textContent = `${book.title} by ${book.author} (${book.year})`; // Формат з макету[cite: 1]
    
    const btn = document.createElement('button');
    
    if (book.isBorrowed) {
      btn.className = 'btn btn-warning btn-sm';
      btn.textContent = 'Повернути';
      btn.onclick = () => {
        // Шукаємо, який саме юзер позичив цю книгу
        const userWithBook = usersDb.getAll().find(u => u.borrowedBooks.includes(book.id));
        if (userWithBook) {
          const result = BorrowService.returnBook(book.id, userWithBook.id, booksDb, usersDb);
          if (result.success) {
            Modal.showAlert(`${book.title} has been returned.`, true); // Текст з макету[cite: 1]
            Storage.save('books', booksDb.getAll());
            Storage.save('users', usersDb.getAll());
            onUpdate(); // Перемальовуємо інтерфейс
          } else {
            Modal.showAlert(result.message, false);
          }
        }
      };
    } else {
      btn.className = 'btn btn-primary btn-sm';
      btn.textContent = 'Позичити';
      btn.onclick = () => {
        // Викликаємо модалку для вводу ID користувача[cite: 1]
        Modal.showPrompt('Введіть ID користувача для позичення книги:', (userId) => {
          const result = BorrowService.borrowBook(book.id, userId, booksDb, usersDb);
          if (result.success) {
            const user = usersDb.findById(userId);
            Modal.showAlert(`${book.title} has been borrowed by ${user?.id} ${user?.name} (${user?.email}).`, true); // Текст з макету[cite: 1]
            Storage.save('books', booksDb.getAll());
            Storage.save('users', usersDb.getAll());
            onUpdate();
          } else {
            Modal.showAlert(result.message, false);
          }
        });
      };
    }

    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
  });
  
  cardBody.appendChild(ul);
  card.appendChild(cardBody);
  
  return card;
}