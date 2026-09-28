export function renderUserForm(): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';
  
  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';
  
  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Додати Користувача';
  cardBody.appendChild(title);

  // Створюємо поле для імені
  const nameInput = document.createElement('input');
  nameInput.id = 'user-name';
  nameInput.className = 'form-control mb-3';
  nameInput.placeholder = 'Ім\'я';
  cardBody.appendChild(nameInput);

  // Створюємо поле для Email
  const emailInput = document.createElement('input');
  emailInput.id = 'user-email';
  emailInput.type = 'email';
  emailInput.className = 'form-control mb-3';
  emailInput.placeholder = 'Email';
  cardBody.appendChild(emailInput);
  
  const btnAddUser = document.createElement('button');
  btnAddUser.id = 'btn-add-user';
  btnAddUser.className = 'btn btn-success'; // Зелена кнопка за дизайном[cite: 5]
  btnAddUser.textContent = 'Додати Користувача';
  cardBody.appendChild(btnAddUser);

  card.appendChild(cardBody);
  return card;
}