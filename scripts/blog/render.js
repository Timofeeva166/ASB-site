import { classes } from "./config.js";

const main = document.querySelector(`.${classes.main}`);

//создать карточку конкретному персонажу
//TODO: переделать через клонирование шаблона
const createCardForCharacter = (character) => {
  const listItem = document.createElement('li');
  listItem.classList.add(classes.staffListItem);
  listItem.dataset.id = character.id;

  const link = document.createElement('a');
  link.classList.add(classes.staffCard);
  link.href = `pages.html?id=${character.id}`;

  const img = document.createElement('img');
  img.classList.add(classes.cardImg);
  img.src = character.img;
  img.alt = character.name;

  const name = document.createElement('p');
  name.classList.add(classes.cardText);
  name.textContent = character.name;

  link.append(img, name);
  listItem.append(link);

  return listItem;
}

//создать все карточки
export const renderCards = (container, characters) => {
  if (!container) return;

  container.innerHTML = '';

  if (!characters || characters.length === 0) {
  main.innerHTML = `
    <div class="${classes.errorState}">
      <h2 class="title">Нет данных для отображения</h2>
    </div>
  `;
    return;
  }

  const fragment = document.createDocumentFragment();
  characters.forEach((character) => {
    fragment.appendChild(createCardForCharacter(character));
  });

  container.appendChild(fragment);
}

//показать ошибку
export const showError = (retryCallback) => {

  main.innerHTML = `
    <div class="${classes.errorState}">
      <h2 class="title">⚠️ Ошибка загрузки данных</h2>
      <button class="${classes.retryButton} btn">Повторить</button>
    </div>
  `;

  const retryButton = document.querySelector(`.${classes.retryButton}`);
  if (retryButton && retryCallback) {
    retryButton.addEventListener('click', retryCallback);
  }
}

//показать лоадер
export const toggleLoader = (action) => {
  const loader = document.querySelector(`.${classes.loader}`);

  if (action === 'on') {
    loader.style.display = 'flex';
  } else if (action === 'off'){
    loader.style.display = 'none';
  }
}

export const changeStylesForCards = () => {
  const list = document.querySelector(`.${classes.staffList}`);
  if (!list) return;

  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.staff__card-list-item');
    if (cards.length < 5) {
      list.style.gridTemplateColumns = 'repeat(auto-fit, 250px)';
    } else {
      list.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
    }
  } else {
    list.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
  }
}