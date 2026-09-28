import type { User } from '../../models/User';
import type { Book } from '../../models/Book';
import type { Library } from '../../services/Library';
import { Storage } from '../../services/Storage';

export function renderUserList(
  usersDb: Library<User>,
  booksDb: Library<Book>,
  onUpdate: () => void
): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';
  
  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Список Користувачів';

  // Поле пошуку (Пункт 19)
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'form-control mb-3';
  searchInput.placeholder = 'Пошук користувачів...';
  
  const ul = document.createElement('ul');
  ul.className = 'list-group list-group-flush'; 

  usersDb.getAll().forEach(user => {
    const li = document.createElement('li');
    // Додаємо d-flex, щоб текст і кнопка стояли на одному рядку з боків
    li.className = 'list-group-item d-flex justify-content-between align-items-center py-3 text-secondary';
    
    const span = document.createElement('span');
    span.textContent = `${user.id} ${user.name} (${user.email})`;
    
    // Кнопка видалення (Пункт 20)
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Видалити';
    deleteBtn.onclick = () => {
      // 1. Знаходимо всі книги, які позичив цей юзер, і повертаємо їх у бібліотеку
      user.borrowedBooks.forEach(bookId => {
        const book = booksDb.findById(bookId);
        if (book) {
            book.isBorrowed = false;
        }
      });
      
      // 2. Видаляємо самого користувача
      usersDb.remove(user.id);
      
      // 3. Зберігаємо оновлені бази (і книг, і юзерів) та перемальовуємо UI
      Storage.save('books', booksDb.getAll());
      Storage.save('users', usersDb.getAll());
      onUpdate();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
  
  // Логіка фільтрації
  searchInput.oninput = (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    Array.from(ul.children).forEach((li) => {
      const text = li.querySelector('span')?.textContent?.toLowerCase() || '';
      if (text.includes(query)) {
        // Оскільки ми додали d-flex для кнопки, повертаємо саме його
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