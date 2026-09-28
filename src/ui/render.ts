import { renderBookForm } from './components/BookForm';
import { renderUserForm } from './components/UserForm';
import { renderBookList } from './components/BookList';
import { renderUserList } from './components/UserList';

import { Library } from '../services/Library';
import { Book } from '../models/Book';
import { User } from '../models/User';
import { Storage } from '../services/Storage';
import type { IBook } from '../models/interfaces/IBook';
import type { IUser } from '../models/interfaces/IUser';

// 1. Створюємо глобальні екземпляри баз даних для книг та користувачів
const booksDb = new Library<Book>();
const usersDb = new Library<User>();

// 2. Відновлюємо дані з LocalStorage при старті
function initData() {
  const savedBooks = Storage.get<IBook[]>('books') || [];
  const savedUsers = Storage.get<IUser[]>('users') || [];

  // Важливо: JSON.parse повертає звичайні об'єкти. 
  // Нам треба перетворити їх назад у класи Book та User, щоб працювали геттери та методи.
  const books = savedBooks.map(b => new Book(b.id, b.title, b.author, b.year, b.isBorrowed));
  const users = savedUsers.map(u => new User(u.id, u.name, u.email, u.borrowedBooks));

  booksDb.setAll(books);
  usersDb.setAll(users);
}

// Запускаємо відновлення даних
initData();

export function renderApp(): void {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  // Очищаємо контейнер при кожному перемальовуванні
  appContainer.innerHTML = '';
  // Додав клас container, щоб інтерфейс не розтягувався на весь екран, як на макетах
  appContainer.className = 'bg-light p-4 min-vh-100 container'; 

  const mainTitle = document.createElement('h2');
  mainTitle.className = 'text-center fw-bold mb-4';
  mainTitle.textContent = 'Система Управління Бібліотекою';
  appContainer.appendChild(mainTitle);

  // 3. Створюємо колбек, який буде оновлювати весь UI після будь-якої зміни даних
  const onUpdate = () => {
    renderApp();
  };

  // 4. Монтуємо всі компоненти, передаючи їм доступ до бази і функцію оновлення
  appContainer.appendChild(renderBookForm(booksDb, onUpdate));
  appContainer.appendChild(renderUserForm(usersDb, onUpdate));
  appContainer.appendChild(renderBookList(booksDb, usersDb, onUpdate));
  
  // UserList приймає просто масив користувачів
  appContainer.appendChild(renderUserList(usersDb.getAll()));
}