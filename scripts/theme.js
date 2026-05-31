/** СКРИПТ ТЕМЫ **/

export const themeContainer = document.querySelector(".theme");
export const buttons = document.querySelectorAll(".theme-button");
export const html = document.querySelector('html');
export const themes = {
  'light-theme': 'светлая',
  'pink-theme': 'розовая',
  'summer-theme': 'летняя',
  'dark-theme': 'темная',
};

// установка темы по обЪекту
export const setTheme = (active) => {
  html.className = '';
  const text = active.textContent.trim();

  let themeClass = Object.keys(themes).find(key => themes[key] === text);
  console.log(Object.keys(themes));
  if (themeClass) {
    html.className = themeClass;
    localStorage.setItem('selectedTheme', text);
  }
};

// переключение темы
export const toggleTheme = (e) => {
  e.stopPropagation();

  const target = e.target;

  if (target.tagName !== 'BUTTON') return;
  let active = themeContainer.querySelector('.active');
  if (!target.classList.contains('active')) {
    target.classList.add('active');
    active.classList.remove('active');
  } else {
    return;
  }
  active = target;
  setTheme(active);
};

// загрузка темы для других страниц
export const loadThemeWithoutButtons = () => {
  const savedTheme = localStorage.getItem('selectedTheme');

  if (savedTheme && savedTheme !== 'майская') {
    const themeClass = Object.keys(themes).find(key => themes[key] === savedTheme);
    html.className = themeClass;
  } else if (savedTheme && savedTheme === 'майская') {
    html.className = 'summer-theme';
    localStorage.setItem('selectedTheme', 'летняя');
  }
  else {
    html.className = 'light-theme';
  }
};

// загрузка темы для основной страницы
export const loadTheme = () => {
  const savedTheme = localStorage.getItem('selectedTheme');

  if (savedTheme && savedTheme !== 'майская') {
    const themeButton = Array.from(buttons).find(button => button.textContent.trim() == savedTheme);
    if (themeButton) {
      themeButton.classList.add('active');
      setTheme(themeButton);
    }
  } else if (savedTheme && savedTheme === 'майская') {
    buttons[2].classList.add('active');
      setTheme(buttons[2]);
  }
  else {
    if (buttons.length > 0) {
      buttons[0].classList.add('active');
      setTheme(buttons[0]);
    }
  }
};

