export function showModal(message: string): void {
  const existingModal = document.getElementById('custom-modal');
  if (existingModal) {
    existingModal.remove();
  }

  const overlay = document.createElement('div');
  overlay.id = 'custom-modal';
  overlay.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center';
  overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  overlay.style.zIndex = '1050';

  const modalDialog = document.createElement('div');
  modalDialog.className = 'bg-white p-4 rounded shadow-lg w-50';

  const text = document.createElement('p');
  text.className = 'fs-5 mb-4';
  text.textContent = message;
  modalDialog.appendChild(text);

  const btnClose = document.createElement('button');
  btnClose.className = 'btn btn-primary float-end';
  btnClose.textContent = 'Зрозуміло!';
  btnClose.addEventListener('click', () => overlay.remove());
  
  modalDialog.appendChild(btnClose);
  overlay.appendChild(modalDialog);
  document.body.appendChild(overlay);
}