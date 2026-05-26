import { classes } from "./config.js";

const main = document.querySelector(`.${classes.main}`);

//создать карточку конкретному персонажу
//TODO: переделать через клонирование шаблона
export const createCardForCharacter = (character) => {
  const listItem = document.createElement('li');

  if (window.location.href.toString().includes('profile')) {
    listItem.classList.add('all-pages-list-item');
  } else {
    listItem.classList.add('staff__card-list-item');
  }

  listItem.setAttribute('data-modal', `modal-${character.id}`);
  listItem.dataset.id = character.id;

  const link = document.createElement('a');
  if (window.location.href.toString().includes('profile')) {
    link.classList.add('all-pages-card');
    link.href = `profile.html?id=${character.id}`;
  } else {
    link.classList.add('staff__card');
    link.href = '#0';
  }
  
  const img = document.createElement('img');
  if (window.location.href.toString().includes('profile')) {
    img.classList.add('link-img');
  } else {
    img.classList.add('card-img');
  }
  img.src = `./images/${character.id}.png`;
  
  const name = document.createElement('p');
  name.classList.add('card-text');
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

  main.style.display = 'flex';
  main.style.justifyContent = 'center';

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