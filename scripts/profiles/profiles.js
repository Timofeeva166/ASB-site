import { fetchData } from "../api.js";
import { urls, classes } from "../blog/config.js";
import { loadThemeWithoutButtons } from "../other-pages/theme.js";
import { getCurrentCharacterId } from "../blog/navigation.js";
import { renderProfile } from "./render.js";
import { showError, toggleLoader } from "../blog/render.js";
import { renderCards } from "../blog/render.js"

const main = document.querySelector('.main');

const initProfile = async () => {

  toggleLoader('on');

  try {
    const [rawProfileData, rawAllPagesData] = await Promise.all([
      fetchData(urls.profiles),
      fetchData(urls.allPages),
    ])

    const profileData = rawProfileData.data;
    const allPagesData = rawAllPagesData.data['all-pages'];

    const id = getCurrentCharacterId();
    const allPagesList = document.querySelector('.profiles__list');

    if (Object.keys(profileData).length === 0) {
      main.innerHTML = `
        <div class="${classes.errorState}">
          <h2 class="title">Нет данных для отображения</h2>
        </div>
      `;
      return;
    }
    
    if (!id || Object.keys(profileData.characters).includes(id) === false) {
      main.innerHTML = `
        <div class="${classes.errorState}">
          <h2 class="title">Пожалуйста, выберите персонажа на <a class="accent-text" href="blog.html">странице</a></h2>
        </div>
      `;
      return;
    }

    renderProfile(profileData, id);
    console.log(allPagesData);
    renderCards(allPagesList, allPagesData.filter(item => item.id !== id));
    
  } catch(error) {

    console.error("Ошибка инициализации:", error);
    showError(() => initProfile());

  } finally {

    toggleLoader('off');

  }
}

loadThemeWithoutButtons();
initProfile();
