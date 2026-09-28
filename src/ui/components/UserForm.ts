import { User } from '../../models/User';
import type { Library } from '../../services/Library';
import { Validation } from '../../utils/validator';
import { IdGenerator } from '../../utils/idGenerator';
import { Storage } from '../../services/Storage';

export function renderUserForm(usersDb: Library<User>, onUpdate: () => void): HTMLElement {
  const card = document.createElement('div');
  card.className = 'card mb-4 shadow-sm border-0';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body p-4';

  const title = document.createElement('h4');
  title.className = 'fw-bold mb-4';
  title.textContent = 'Додати Користувача';

  const form = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.className = 'form-control mb-3';
  nameInput.placeholder = 'Ім\'я';

  const emailInput = document.createElement('input');
  emailInput.className = 'form-control mb-3';
  emailInput.placeholder = 'Email';

  const errorText = document.createElement('div');
  errorText.className = 'text-danger mb-3 d-none';
  errorText.style.fontSize = '0.875em';

  const submitBtn = document.createElement('button');
  submitBtn.className = 'btn btn-success';
  submitBtn.textContent = 'Додати Користувача';
  submitBtn.type = 'submit';

  form.onsubmit = (e) => {
    e.preventDefault();
    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();

    if (!Validation.isRequired(nameVal) || !Validation.isRequired(emailVal)) {
      errorText.textContent = 'Всі поля є обов\'язковими';
      errorText.classList.remove('d-none');
      return;
    }

    errorText.classList.add('d-none');
    
    const newUser = new User(IdGenerator.generate(), nameVal, emailVal);
    usersDb.add(newUser);
    Storage.save('users', usersDb.getAll());
    
    onUpdate();
  };

  form.append(nameInput, emailInput, errorText, submitBtn);
  cardBody.append(title, form);
  card.append(cardBody);

  return card;
}