import { fetchData } from "../api.js";
import { urls, classes } from "../blog/config.js";
import { loadThemeWithoutButtons } from "../other-pages/theme.js";
import { getCurrentCharacterId } from "../blog/navigation.js";
import { renderProfile } from "./render.js";
import { showError, toggleLoader } from "../blog/render.js";
import { renderCards } from "../blog/render.js"
import { renderPosts } from "./renderPosts.js";

const main = document.querySelector('.main');
const filterBtn = document.querySelector('.filter-button');
const popover = document.querySelector('.settings-container');
const form = document.querySelector('.settings-container');
const list = document.querySelector('.posts-list');
const allPagesList = document.querySelector('.profiles__list');
const removeIcon = document.querySelectorAll('.remove-icon');
const submitBtn = document.querySelector('.btn-submit');

let isPopoverOpen = false;
let lastFormData = null;

//двигает поповер
const updatePosition = () => {
  const buttonRect = filterBtn.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  
  popover.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
  popover.style.left = `${buttonRect.right + window.scrollX - popoverRect.width}px`;
};

//включает и выключает поповер
const togglePopover = (e) => {
  e.stopPropagation();

  if (!popover) return;

  if (!isPopoverOpen) {
    popover.style.display = 'flex';
    updatePosition();
    isPopoverOpen = true;
  } else {
    popover.style.display = 'none';
    isPopoverOpen = false;
  }
}

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
const handlePosts = (postsData, profileData) => {
  if (!postsData || postsData.length === 0) {
    if(list) {
      list.innerHTML = `
        <div class="${classes.errorState}">
          <h2 class="title">Посты не найдены</h2>
        </div>
      `;
    }

    return;
  }

  renderPosts(postsData.posts, profileData);
  return true;
}


//инициализирует профиль
const initProfile = async () => {

  toggleLoader('on');

  try {
    const [rawProfileData, rawAllPagesData, rawPostsData] = await Promise.all([
      fetchData(urls.profiles),
      fetchData(urls.allPages),
      fetchData(urls.posts)
    ])

    const id = getCurrentCharacterId();
    const profileData = rawProfileData.data;
    const allPagesData = rawAllPagesData.data['all-pages'];
    let postsData = rawPostsData.data.characters?.[`${id}`];

    if (!validateData(profileData, id)) return;

    renderProfile(profileData, id);

    if (allPagesList && allPagesData) {
      renderCards(allPagesList, allPagesData.filter(item => item.id !== id));
    }

    handlePosts(postsData, profileData);

    if (form) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (!postsData.posts || !Array.isArray(postsData.posts)) {
          console.error('Нет данных для фильтрации');
          return;
        }

        // данные по фильтрам
        const rawFilterData = new FormData(form);
        const formData = Object.fromEntries(rawFilterData.entries());

        //копируем исходники
        let filteredPosts = [...postsData.posts];

        //для каждого ключа и значения по данным из фильтра
        Object.entries(formData).forEach(([key, value]) => {
          if (!value || value.trim() === '') {
            return;
          };

          const searchValue = value.trim().toLowerCase(); //искомое значение

          filteredPosts = filteredPosts.filter(post => {
            const postValue = post[key]; //данные поста по ключу

            if (postValue === undefined || postValue === null) return false;

            if(Array.isArray(postValue)) { //для массивов
              return postValue.some(item => String(item).toLowerCase().includes(searchValue));
            }

            return String(postValue).toLowerCase().includes(searchValue); //для остальных значений
          });
        });

        const list = document.querySelector('.posts-list');
        if (list) {
          list.innerHTML = '';
        }
    
        if (filteredPosts.length === 0) {
          list.innerHTML = `
            <div class="${classes.errorState}">
              <h2 class="title">По вашему запросу ничего не найдено</h2>
            </div>
          `;
        } else {
          renderPosts(filteredPosts, profileData);
        }

        if (popover) {
          popover.style.display = 'none';
          isPopoverOpen = false;
        };
      })
    }

  } catch(error) {
    console.error("Ошибка инициализации:", error);
    showError(() => initProfile());
    
  } finally {
    toggleLoader('off');
  }
}

//включает обработчики
const setupEventListeners = () => {
  if(filterBtn) {
    filterBtn.addEventListener('click', togglePopover);
  }

  if(form) {
    form.addEventListener('click', (e) => {
      e.stopPropagation();
      const removeIcon = e.target.closest('.remove-icon');

      if (removeIcon) {
        const inputContainer = e.target.closest('.input-container');
        const input = inputContainer?.querySelector('.input');

        if (input) {
          input.value = '';
        }
      }
    })
  }

  window.addEventListener('resize', () => {
    if (isPopoverOpen && filterBtn && popover) {
      updatePosition();
    }
  });
}


loadThemeWithoutButtons();
initProfile();
setupEventListeners();
