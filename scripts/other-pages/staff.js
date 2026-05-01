/** СКРИПТЫ ДЛЯ СТРАНИЦЫ ШТАТА **/

import { onClick, iconElse } from "./popover.js";
import { loadThemeWithoutButtons } from "./theme.js";

const staffArr = [
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

function toggleCheckboxClass(event) {
  const checkbox = event.target;
  if (checkbox.checked) {
    checkbox.classList.add('checked');
  } else {
    checkbox.classList.remove('checked');
  }
};

const checkboxes = document.querySelectorAll('.checkbox');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', toggleCheckboxClass);
    if (checkbox.checked) {
      checkbox.classList.add('checked');
    }
});

loadThemeWithoutButtons();
iconElse?.addEventListener('click', (e) => onClick(e, staffArr));