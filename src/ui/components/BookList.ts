export function renderBookList(): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';
  
  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Список Книг';
  cardBody.appendChild(title);

  // Контейнер для майбутнього списку книг
  const ul = document.createElement('ul');
  ul.id = 'book-list-container';
  ul.className = 'list-group list-group-flush'; 
  
  cardBody.appendChild(ul);
  card.appendChild(cardBody);
  
  return card;
}