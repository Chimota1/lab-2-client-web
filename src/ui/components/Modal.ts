export namespace Modal {
  // Вікно для вводу ID користувача при позичанні[cite: 1]
  export function showPrompt(title: string, onConfirm: (value: string) => void): void {
    const overlay = document.createElement('div');
    overlay.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '1050';

    const modal = document.createElement('div');
    modal.className = 'bg-white p-4 rounded shadow-lg w-50';

    const header = document.createElement('h5');
    header.className = 'mb-3 d-flex justify-content-between align-items-center';
    header.innerHTML = `<span>${title}</span> <button class="btn-close" style="cursor:pointer"></button>`;
    
    const closeBtn = header.querySelector('.btn-close') as HTMLElement;
    closeBtn.onclick = () => document.body.removeChild(overlay);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'form-control mb-3';
    input.placeholder = 'ID';

    const footer = document.createElement('div');
    footer.className = 'text-end';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary me-2';
    cancelBtn.textContent = 'Скасувати';
    cancelBtn.onclick = () => document.body.removeChild(overlay);

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.textContent = 'Зберегти';
    confirmBtn.onclick = () => {
      const val = input.value.trim();
      if (val) {
        onConfirm(val);
        document.body.removeChild(overlay);
      }
    };

    footer.append(cancelBtn, confirmBtn);
    modal.append(header, input, footer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  // Інформаційне вікно для сповіщень (успіх/помилка)[cite: 1]
  export function showAlert(message: string, isSuccess: boolean = true): void {
    const overlay = document.createElement('div');
    overlay.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '1050';

    const modal = document.createElement('div');
    modal.className = 'bg-white p-4 rounded shadow-lg w-50 text-center';

    const text = document.createElement('p');
    text.className = 'mb-4 fs-5';
    text.textContent = message;

    const btn = document.createElement('button');
    btn.className = isSuccess ? 'btn btn-primary' : 'btn btn-danger';
    btn.textContent = isSuccess ? 'Зрозуміло!' : 'Закрити';
    btn.onclick = () => document.body.removeChild(overlay);

    modal.append(text, btn);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }
}