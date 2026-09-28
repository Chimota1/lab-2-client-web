import { Book } from '../../models/Book';
import type { Library } from '../../services/Library';
import { Validation } from '../../utils/validator';
import { IdGenerator } from '../../utils/idGenerator';
import { Storage } from '../../services/Storage';

export function renderBookForm(booksDb: Library<Book>, onUpdate: () => void): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';

  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Додати Книгу';

  const form = document.createElement('form');

  const titleInput = document.createElement('input');
  titleInput.className = 'form-control mb-3';
  titleInput.placeholder = 'Назва книги';

  const authorInput = document.createElement('input');
  authorInput.className = 'form-control mb-3';
  authorInput.placeholder = 'Автор';

  const yearInput = document.createElement('input');
  yearInput.className = 'form-control mb-3';
  yearInput.placeholder = 'Рік видання';

  const errorText = document.createElement('div');
  errorText.className = 'text-danger mb-3 d-none';
  errorText.style.fontSize = '0.875em';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-success';
  submitBtn.textContent = 'Додати Книгу';
  submitBtn.type = 'submit';

  form.onsubmit = (e) => {
    e.preventDefault();
    const titleVal = titleInput.value.trim();
    const authorVal = authorInput.value.trim();
    const yearVal = yearInput.value.trim();

    if (!Validation.isRequired(titleVal) || !Validation.isRequired(authorVal) || !Validation.isRequired(yearVal)) {
      errorText.textContent = 'Всі поля є обов\'язковими';
      errorText.classList.remove('d-none');
      return;
    }

    if (!Validation.isYearValid(yearVal)) {
      errorText.textContent = 'Некоректний рік видання (очікується 4 цифри)';
      errorText.classList.remove('d-none');
      return;
    }

    errorText.classList.add('d-none');
    
    const newBook = new Book(IdGenerator.generate(), titleVal, authorVal, parseInt(yearVal, 10));
    booksDb.add(newBook);
    Storage.save('books', booksDb.getAll());
    
    onUpdate(); // Перемальовуємо UI
  };

  form.append(titleInput, authorInput, yearInput, errorText, submitBtn);
  cardBody.append(title, form);
  card.append(cardBody);

  return card;
}