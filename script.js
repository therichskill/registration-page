const registrationForm = document.getElementById('registrationForm');
const welcomeOverlay = document.getElementById('welcomeOverlay');

// Welcome glass appears briefly, then fades away to reveal the form.
window.addEventListener('DOMContentLoaded', () => {
  window.setTimeout(() => {
    if (welcomeOverlay) welcomeOverlay.classList.add('welcome-hide');
    document.body.classList.add('form-ready');
  }, 1900);
  window.setTimeout(() => { if (welcomeOverlay) welcomeOverlay.remove(); }, 2700);
});

const formCard = document.querySelector('.registration-glass');
if (formCard) {
  formCard.addEventListener('pointerdown', () => formCard.classList.add('is-engaged'));
}

document.querySelectorAll('#registrationForm .field input, #registrationForm .field select').forEach((input) => {
  const field = input.closest('.field');
  input.addEventListener('focus', () => {
    document.querySelectorAll('#registrationForm .field').forEach((other) => other.classList.toggle('field-muted', other !== field));
    field.classList.add('field-active');
  });
  input.addEventListener('blur', () => {
    field.classList.remove('field-active');
    if (!document.querySelector('#registrationForm .field input:focus, #registrationForm .field select:focus')) {
      document.querySelectorAll('#registrationForm .field').forEach((other) => other.classList.remove('field-muted'));
    }
  });
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!registrationForm.reportValidity()) return;
  const registration = Object.fromEntries(new FormData(registrationForm).entries());
  sessionStorage.setItem('webinarRegistration', JSON.stringify(registration));
  try {
    const key = 'webinarRegistrations';
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    const normalizedPhone = String(registration.phone || '').replace(/\D/g, '');
    const exists = saved.some(item => String(item.phone || '').replace(/\D/g, '') === normalizedPhone);
    if (!exists) saved.push({ name: String(registration.name || '').trim(), phone: registration.phone, city: registration.city, profession: registration.profession, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(saved.slice(-100)));
  } catch (error) { console.warn('Could not save registration in this browser.', error); }
  window.location.href = 'video.html';
});
