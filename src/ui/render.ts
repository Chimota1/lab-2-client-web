import { renderBookForm } from './components/BookForm';
import { renderUserForm } from './components/UserForm';
import { renderBookList } from './components/BookList';

export function renderApp(): void {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.innerHTML = '';
  appContainer.className = 'bg-light p-4 min-vh-100';

  const mainTitle = document.createElement('h2');
  mainTitle.className = 'text-center fw-bold mb-4';
  mainTitle.textContent = 'Система Управління Бібліотекою';
  appContainer.appendChild(mainTitle);

  // Монтуємо всі компоненти на сторінку по черзі
  appContainer.appendChild(renderBookForm());
  appContainer.appendChild(renderUserForm());
  appContainer.appendChild(renderBookList());
}