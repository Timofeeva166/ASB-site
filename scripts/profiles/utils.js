import { classes } from "../blog/config.js";
import { renderPosts } from "./renderPosts.js";

const filterBtn = document.querySelector('.filter-button');
const popover = document.querySelector('.settings-container');
export const form = document.querySelector('.settings-container');
const submitBtn = document.querySelector('.btn-submit');
const checkbox = document.querySelector('.checkbox');
export const sortingContainer = document.querySelector('.sorting__svgs');
const radios = document.querySelectorAll('.radio');
const questionIcon = document.querySelector('.question');
const tooltip = document.querySelector('.tooltip');

let isPopoverOpen = false;
let isTooltipShown = false;

function toggleCheckboxClass(event) {
  const checkbox = event.target;
  if (checkbox.checked) {
    checkbox.classList.add('checked');
  } else {
    checkbox.classList.remove('checked');
  }
};

// Текущее состояние постов для сортировки
let currentFilteredPosts = null;

// Парсинг даты
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('.');
  return new Date(year, month - 1, day);
};

// Функция сортировки постов
export const sortPosts = (posts, sortOrder = 'down') => {
  if (!posts || !posts.length) return [];
  
  const sorted = [...posts];
  
  if (sortOrder === 'down') {
    // Новые сверху (убывание)
    return sorted.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  } else {
    // Старые сверху (возрастание)
    return sorted.sort((a, b) => parseDate(a.date) - parseDate(b.date));
  }
};

// Получить текущий порядок сортировки
export const getCurrentSortOrder = () => {
  const activeRadio = document.querySelector('.radio.active');
  if (activeRadio) return activeRadio.value;
  
  const checkedRadio = document.querySelector('input[name="sort"]:checked');
  return checkedRadio ? checkedRadio.value : 'down';
};

// Установить текущее состояние постов
export const setCurrentPostsState = (posts) => {
  currentFilteredPosts = posts;
};

// Получить текущее состояние постов
export const getCurrentPostsState = () => {
  return { posts: currentFilteredPosts};
};

// Применить сортировку к текущим постам
export const applySorting = () => {
  if (!currentFilteredPosts || !currentFilteredPosts.length) return;
  
  const sortOrder = getCurrentSortOrder();
  const sortedPosts = sortPosts(currentFilteredPosts, sortOrder);
  renderPosts(sortedPosts);
};

// ПРИБИВАЕТ ПОПОВЕР К КНОПКЕ И ОБНОВЛЯЕТ ЕГО ПОЗИЦИЮ
const updatePosition = () => {
  const buttonRect = filterBtn.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  
  popover.style.top = `${buttonRect.bottom + window.scrollY}px`;
  popover.style.left = `${buttonRect.right + window.scrollX - popoverRect.width}px`;
};

//МЕНЯЕТ ПОЗИЦИЮ ТУЛТИПА
const updateTooltipPosition = () => {
  if (!questionIcon || !tooltip) return;
  
  const iconRect = questionIcon.getBoundingClientRect();
  const parentRect = popover.getBoundingClientRect();
  tooltip.style.left = `${iconRect.left - parentRect.left}px`;
  tooltip.style.bottom = `${parentRect.bottom - iconRect.top + 5}px`;
};

// ПОКАЗЫВАЕТ И СКРЫВАЕТ ПОПОВЕР
const togglePopover = (e) => {
  e.stopPropagation();

  if (!popover) return;

  if (!isPopoverOpen) {
    popover.style.display = 'flex';
    updatePosition();
    isPopoverOpen = true;
    filterBtn.classList.add('filter-active');
  } else {
    popover.style.display = 'none';
    isPopoverOpen = false;
    filterBtn.classList.remove('filter-active');
    if (isTooltipShown) {
      isTooltipShown = false;
      tooltip.style.display = 'none';
    }
  }
};

//ПЕРЕКЛЮЧЕНИЕ СОРТИРОВКИ
export const toggleRadioClass = (e) => {
  const radio = e.target;

  if (radio.classList.contains('radio')) {
    if (radio.checked) {
      radio.classList.add('active');
    }
    radios.forEach((rad) => {
      if (rad !== radio) {
        rad.classList.remove('active');
      }
    });
  }
  
  applySorting();
};

//ПОКАЗАТЬ ПОДСКАЗКУ
const showTooltip = (e) => {
  e.stopPropagation();

  if (!tooltip) return;

  if (!isTooltipShown) {
    tooltip.style.display = 'block';
    updateTooltipPosition();
    isTooltipShown = true;
  } else {
    tooltip.style.display = 'none';
    isTooltipShown = false;
  }
};

//ЛОГИКА ФИЛЬТРАЦИИ
export const filterPosts = (postsData) => {
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
      }

      const searchValue = value.trim().toLowerCase(); //искомое значение из formData

      filteredPosts = filteredPosts.filter(post => {
        const postValue = post[key]; //данные поста по ключу

        if (postValue === undefined || postValue === null) return false;

        if (Array.isArray(postValue)) { //для массивов
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
      currentFilteredPosts = [];
    } else {
      // Сохраняем отфильтрованные посты
      currentFilteredPosts = filteredPosts;
      
      // Применяем текущую сортировку
      const sortOrder = getCurrentSortOrder();
      const sortedPosts = sortPosts(filteredPosts, sortOrder);
      renderPosts(sortedPosts);
    }

    if (popover && tooltip) {
      popover.style.display = 'none';
      isPopoverOpen = false;
      filterBtn.classList.remove('filter-active');
      tooltip.style.display = 'none';
      isTooltipShown = false;
    }
  });
};

// НАВЕШИВАЕМ ОБРАБОТЧИКИ БЕЗ ДАННЫХ
export const setupEventListeners = () => {

  //ПОДКЛЮЧАЕМ СКРЫТИЕ-РАСКРЫТИЕ ПОПОВЕРА
  if(filterBtn) {
    filterBtn.addEventListener('click', togglePopover);
  }

  //ПОДКЛЮЧАЕМ ОЧИСТКУ ПОЛЯ ПО КРЕСТУ
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

  // ПОДКЛЮЧАЕМ РАСКРЫТИЕ "УЗНАТЬ БОЛЬШЕ"
  if(checkbox) {
    checkbox.addEventListener('change', toggleCheckboxClass);
  }

  //ПОДКЛЮЧАЕМ СТРЕЛКИ СОРТИРОВКИ
  if(sortingContainer) {
    sortingContainer.addEventListener('change', (e) => {
      toggleRadioClass(e);
    });
  }

  if(questionIcon) {
    questionIcon.addEventListener('click', showTooltip);
  }

  //ПОДКЛЮЧАЕМ ИЗМЕНЕНИЕ ПОЗИЦИИ ФИЛЬТРА
  window.addEventListener('resize', () => {
    if (isPopoverOpen && filterBtn && popover) {
      updatePosition();
      updateTooltipPosition();
    }
  });

  //ЗАКРЫТЬ ПОПОВЕР ПО КЛИКУ ВНЕ
  document.addEventListener('click', (e) => {
    if (isPopoverOpen && !popover?.contains(e.target) && e.target !== filterBtn) {
      popover.style.display = 'none';
      isPopoverOpen = false;
      filterBtn.classList.remove('filter-active');
      if (isTooltipShown) {
        isTooltipShown = false;
        tooltip.style.display = 'none';
      }
    }
  });
};