import { fetchData } from "../api.js";
import { urls, classes } from "../blog/config.js";
import { loadThemeWithoutButtons } from "../other-pages/theme.js";
import { getCurrentCharacterId } from "../blog/navigation.js";
import { renderProfile } from "./render.js";
import { showError, toggleLoader } from "../blog/render.js";
import { renderCards } from "../blog/render.js"
import { renderPosts } from "./renderPosts.js";
import { 
  form, 
  filterPosts, 
  setupEventListeners, 
  sortPosts,
  setCurrentPostsState,
  getCurrentSortOrder
} from "./utils.js";
import { onClick, iconElse } from "../other-pages/popover.js";

const profilesArr = [
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

export const main = document.querySelector('.main');
const list = document.querySelector('.posts-list');
const allPagesList = document.querySelector('.profiles__list');

//валидирует данные
const validateData = (profileData, id) => {
  if (Object.keys(profileData).length === 0) {
    main.style.display = 'flex';
    main.innerHTML = `
      <div class="${classes.errorState}">
        <h2 class="title">Нет данных для отображения</h2>
      </div>
    `;
    return false;
  }

  if (!id || !Object.keys(profileData.characters).includes(id)) {
    main.style.display = 'flex';
    main.innerHTML = `
      <div class="${classes.errorState}">
        <h2 class="title">Пожалуйста, выберите персонажа на <a class="accent-text" href="blog.html">странице</a></h2>
      </div>
    `;
    return false;
  }

  return true;
}

//проверяет есть ли посты
const handlePosts = (postsData) => {
  if (!postsData || postsData.posts?.length === 0) {
    if(list) {
      list.innerHTML = `
        <div class="${classes.errorState}">
          <h2 class="title">У этого персонажа пока что нет постов</h2>
        </div>
      `;
    }
    return false;
  }

  // Получаем текущий порядок сортировки
  const sortOrder = getCurrentSortOrder();
  
  // Сортируем посты
  const sortedPosts = sortPosts(postsData.posts, sortOrder);
  
  // Сохраняем состояние для дальнейшей сортировки/фильтрации
  setCurrentPostsState(sortedPosts);
  
  // Рендерим
  renderPosts(sortedPosts);
  return true;
}

//инициализирует профиль
const initProfile = async () => {

  toggleLoader('on');

  try {
    //ЖДЕМ ЗАПРОСЫ
    const [rawProfileData, rawAllPagesData, rawPostsData] = await Promise.all([
      fetchData(urls.profiles),
      fetchData(urls.allPages),
      fetchData(urls.posts)
    ])

    //ДОБИРАЕМСЯ К НЕОБХОДИМЫМ ДАННЫМ
    const id = getCurrentCharacterId();
    const profileData = rawProfileData.data;
    const allPagesData = rawAllPagesData.data['all-pages'];
    const postsData = rawPostsData.data.characters?.[`${id}`];

    //ВАЛИДИРУЕМ
    if (!validateData(profileData, id)) return;

    //РЕНДЕРИМ КАРТОЧКИ ДРУГИХ ПЕРСОНАЖЕЙ
    if (allPagesList && allPagesData) {
      renderCards(allPagesList, allPagesData.filter(item => item.id !== id));
    }

    //РЕНДЕРИМ ОСНОВНУЮ ИНФОРМАЦИЮ
    renderProfile(profileData, id);

    //РЕНДЕРИМ ПОСТЫ (с учетом сортировки)
    handlePosts(postsData);

    //НАВЕШИВАЕМ ОБРАБОТЧИК ФИЛЬТРА
    if (form) {
      filterPosts(postsData);
    }

  } catch(error) {
    console.error("Ошибка инициализации:", error);
    showError(() => initProfile());
    
  } finally {
    toggleLoader('off');
  }
}

loadThemeWithoutButtons();
initProfile();
setupEventListeners();
iconElse?.addEventListener('click', (e) => onClick(e, profilesArr));