import type { User } from '../../models/User';

export function renderUserList(users: User[]): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';
  
  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Список Користувачів';
  cardBody.appendChild(title);

  const ul = document.createElement('ul');
  ul.className = 'list-group list-group-flush'; 

  // Проходимось по масиву і створюємо елемент для кожного юзера
  users.forEach(user => {
    const li = document.createElement('li');
    li.className = 'list-group-item py-3 text-secondary';
    // Вивід у форматі з макету: 1725533394038 Артем (email@gmail.com)
    li.textContent = `${user.id} ${user.name} (${user.email})`;
    ul.appendChild(li);
  });
  
  cardBody.appendChild(ul);
  card.appendChild(cardBody);
  
  return card;
}