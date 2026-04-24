/** СКРИПТЫ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ **/
import { onClick, iconElse } from "./popover.js";
import { loadTheme, toggleTheme, themeContainer } from "./theme.js";

const indexArr = [
  {
    iconName: 'rules',
    iconText: 'правила',
    href: 'rules.html'
  },
  {
    iconName: 'template',
    iconText: 'шаблон резюме',
    href: './files/resume.docx'
  },
  {
    iconName: 'staff',
    iconText: 'штат',
    href: 'staff.html'
  },
  {
    iconName: 'partners',
    iconText: 'партнерство',
    href: 'partners.html'
  },
  {
    iconName: 'benefits',
    iconText: 'премиум-услуги',
    href: 'benefits.html'
  }
];

iconElse?.addEventListener('click', (e) => onClick(e, indexArr));

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