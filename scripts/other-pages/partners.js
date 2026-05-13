/** СКРИПТЫ ДЛЯ СТРАНИЦЫ ПАРТНЕРОВ **/

import { onClick, iconElse } from "./popover.js";
import { loadThemeWithoutButtons } from "./theme.js";

const partnersArr = [
    {
    iconName: 'pages',
    iconText: 'блог',
    href: 'blog.html'
  },
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
    iconName: 'benefits',
    iconText: 'премиум-услуги',
    href: 'benefits.html'
  }
];

loadThemeWithoutButtons();
iconElse?.addEventListener('click', (e) => onClick(e, partnersArr));