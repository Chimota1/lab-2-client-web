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

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'form-control mb-3';
  searchInput.placeholder = 'Пошук книг за назвою чи автором...';

  const listContainer = document.createElement('div');

  // Змінні для пагінації та пошуку
  let currentPage = 1;
  const itemsPerPage = 3; // Показувати по 3 книги на сторінку
  let searchQuery = '';

  // Функція для малювання списку та кнопок сторінок
  function renderContent() {
    listContainer.innerHTML = ''; 

    // 1. Фільтрація
    const allBooks = booksDb.getAll();
    const filteredBooks = allBooks.filter(book => 
      `${book.title} ${book.author}`.toLowerCase().includes(searchQuery)
    );

    // 2. Пагінація
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

    // 3. Малювання списку
    const ul = document.createElement('ul');
    ul.className = 'list-group list-group-flush mb-4'; 

    paginatedBooks.forEach(book => {
      const li = document.createElement('li');
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
            BorrowService.returnBook(book.id, userWithBook.id, booksDb, usersDb);
            Storage.save('books', booksDb.getAll());
            Storage.save('users', usersDb.getAll());
            onUpdate();
          }
        };
      } else {
        actionBtn.className = 'btn btn-primary btn-sm me-2';
        actionBtn.textContent = 'Позичити';
        actionBtn.onclick = () => {
          Modal.showPrompt('Введіть ID користувача:', (userId) => {
            const result = BorrowService.borrowBook(book.id, userId, booksDb, usersDb);
            if (result.success) {
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

    listContainer.appendChild(ul);

    // 4. Малювання кнопок пагінації (навігації)
    if (totalPages > 1) {
      const nav = document.createElement('nav');
      const ulPagination = document.createElement('ul');
      ulPagination.className = 'pagination justify-content-center';

      for (let i = 1; i <= totalPages; i++) {
         const liPage = document.createElement('li');
         liPage.className = `page-item ${currentPage === i ? 'active' : ''}`;
         const btnPage = document.createElement('button');
         btnPage.className = 'page-link';
         btnPage.textContent = i.toString();
         btnPage.onclick = () => { 
           currentPage = i; 
           renderContent(); // Перемальовуємо тільки список, не всю сторінку
         };
         liPage.appendChild(btnPage);
         ulPagination.appendChild(liPage);
      }
      nav.appendChild(ulPagination);
      listContainer.appendChild(nav);
    }
  }

  // Обробник пошуку
  searchInput.oninput = (e) => {
    searchQuery = (e.target as HTMLInputElement).value.toLowerCase();
    currentPage = 1; // При новому пошуку завжди повертаємось на 1 сторінку
    renderContent();
  };

  renderContent(); // Перший запуск

  cardBody.append(title, searchInput, listContainer);
  card.appendChild(cardBody);
  
  return card;
}