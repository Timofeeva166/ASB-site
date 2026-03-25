import { onClick, iconElse } from "./index.js";

export const staffArr = [
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

iconElse?.addEventListener('click', (e) => onClick(e, staffArr));