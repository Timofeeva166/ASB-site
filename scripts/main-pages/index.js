/** СКРИПТЫ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ **/
import { fetchData } from "../api.js";
import { renderCards, toggleLoader, showError } from "../blog/render.js";
import { urls } from "../blog/config.js";
import { onClick, iconElse } from "../popover.js";
import { loadTheme, toggleTheme, themeContainer } from "../theme.js";

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
const list = document.querySelector('.staff__card-list');

const initCards = async () => {
  if (!list) {
    console.error('Контейнер для карточек не найден!');
    return;
  }

  toggleLoader('on');

  try {
    const rawData = await fetchData(urls.characters);
    const data = rawData.data['characters'];
    renderCards(list, data)
  } catch(error) {
    console.error('Ошибка инициализации:', error);
    showError(list, () => initCards());
  } finally {
    toggleLoader('off');
  }
}

const setupEventListeners = () => {
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.staff__card-list-item');
    
    if (!card) return;

    const id = card.dataset.modal;
    if (!id) return;

    const dialog = document.getElementById(id);
    if (dialog) {
      dialog.showModal();
    }
  });

  document.addEventListener('click', (e) => {
    const closeIcon = e.target.closest('.close-icon');

    if (!closeIcon) return;

    const dialog = closeIcon.closest('dialog');
    if (dialog) {
      dialog.close();
    }
  })
}

const init = async () => {
  await initCards();
  setupEventListeners();
}

loadTheme();
init();
themeContainer.addEventListener('click', toggleTheme);