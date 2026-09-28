export function renderBookForm(): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';

  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Додати Книгу';
  cardBody.appendChild(title);

  const titleInput = document.createElement('input');
  titleInput.id = 'book-title';
  titleInput.className = 'form-control mb-3';
  titleInput.placeholder = 'Назва книги';
  cardBody.appendChild(titleInput);

  const authorInput = document.createElement('input');
  authorInput.id = 'book-author';
  authorInput.className = 'form-control mb-3';
  authorInput.placeholder = 'Автор';
  cardBody.appendChild(authorInput);

  const yearInput = document.createElement('input');
  yearInput.id = 'book-year';
  yearInput.type = 'number';
  yearInput.className = 'form-control mb-3';
  yearInput.placeholder = 'Рік видання';
  cardBody.appendChild(yearInput);

  const btnAdd = document.createElement('button');
  btnAdd.id = 'btn-add-book';
  btnAdd.className = 'btn btn-success';
  btnAdd.textContent = 'Додати Книгу';
  cardBody.appendChild(btnAdd);

  card.appendChild(cardBody);
  return card;
}