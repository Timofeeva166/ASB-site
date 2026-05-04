import { loadThemeWithoutButtons } from "../other-pages/theme.js";
import { fetchData } from "../api.js";
import { classes, urls} from "./config.js";
import { goTocharacterPage } from "./navigation.js";
import { renderCards, showError, toggleLoader, changeStylesForCards } from "./render.js";

const list = document.querySelector(`.${classes.staffList}`);
//клик по карточке
const setupClickHandler = () => {
  document.addEventListener('click', (e) => {
    const character = e.target.closest(`.${classes.staffListItem}`);

    if(!character) return;

    const characterId = character.dataset.id;
    if(!characterId) return;

    goTocharacterPage(characterId);
  })
}

//инициализация карточек
const initBlog = async () => {
  if (!list) {
    console.error('Контейнер для карточек не найден');
    return;
  }

  toggleLoader('on');

  try {
    
    const rawData = await fetchData(urls.allPages);
    const data = rawData.data['all-pages'];
    renderCards(list, data);
    setupClickHandler();

  } catch (error) {

    console.error('Ошибка инициализации:', error);
    showError(() => initBlog());

  } finally {
    toggleLoader('off');
  }
}

//инициализация всей страницы
const init = async () => {
  await initBlog();
  changeStylesForCards(list);
}

loadThemeWithoutButtons(); //загружаем тему
init(); //загружаем страницу
window.addEventListener('resize', changeStylesForCards); //резайзим

