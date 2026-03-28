/** СКРИПТЫ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ **/

import { loadTheme, toggleTheme, themeContainer } from "./theme.js";

const cards = document.querySelectorAll('.staff__card-list-item');
const closeButtons = document.querySelectorAll('.close-icon');

cards.forEach(card => {
  card.addEventListener('click', function() {
    const modalId = this.dataset.modal;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = this.closest('dialog');
    if (modal) {
      modal.close();
    }
  });
});

loadTheme();
themeContainer.addEventListener('click', toggleTheme);