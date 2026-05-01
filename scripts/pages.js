import { loadThemeWithoutButtons } from "./other-pages/theme.js";
import { fetchData } from "./api.js";

// Вернет элемент из шаблона
const getElFromTemplate = (id) => {
  const template = document.getElementById(id);
  const element = template.content.cloneNode(true).firstElementChild;
  return element;
}

const form = document.querySelector('.settings-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const rawFormData = new FormData(form);
  const formData = Object.fromEntries(rawFormData.entries());
  console.log(formData);
})

const renderOtherProfiles = (result) => {
  const container = getElFromTemplate('template__profiles-container')
  const list = container.querySelector('.profiles__list');
  const section = document.querySelector('.profiles');
  
  result.data['other-pages'].forEach((item) => {
    const liEl = document.createElement('li');
    const aEl = document.createElement('a');
    const imgEl = document.createElement('img');
    const pEl = document.createElement('p');

    liEl.classList.add('choice__list-item');

    aEl.classList.add('profiles__list-link');
    aEl.setAttribute('href', '#0');

    imgEl.classList.add('link-img');
    imgEl.setAttribute('src', item.img);

    pEl.classList.add('profiles__link-text');
    pEl.textContent = item.name;

    aEl.appendChild(imgEl);
    aEl.appendChild(pEl);
    liEl.appendChild(aEl);

    list.appendChild(liEl);
  });
  section.appendChild(list);
}

loadThemeWithoutButtons();
const otherProfilesContainer = 
renderOtherProfiles(await fetchData('/public/all-pages.json'));

//console.log(cloneTemplate('template__interests'))

// TODO: сделать по запросу на каждого. Про выборе персонажа слать этот запрос чтобы не грузить все разом
// TODO: Все запросы реализвоть через PromiseAll

