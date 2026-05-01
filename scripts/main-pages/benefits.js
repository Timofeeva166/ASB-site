/** СКРИПТЫ ДЛЯ СТРАНИЦЫ ПРЕМИУМ УСЛУГ **/

import { onClick, iconElse } from "../popover.js";
import { loadThemeWithoutButtons } from "../theme.js";

const benefitsArr = [
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
  }
];

loadThemeWithoutButtons();
iconElse?.addEventListener('click', (e) => onClick(e, benefitsArr));