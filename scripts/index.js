const iconElse = document.querySelector(".icon-else");
const template = document.getElementById("template__navigation-icons");
const popover = template.content.cloneNode(true).firstElementChild;
let activePopover = null;
let popoverElement = null;
let isInitialized = false;

//создаем иконку
const createIcon = (iconName) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '35');
  svg.setAttribute('height', '35');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');

  svg.classList.add('sidebar-icon');

  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', `./svg/icons.svg#${iconName}`);

  svg.appendChild(use);
  return svg;
};

//создаем текст для иконки
const createIconText = (iconText) => {
  const text = document.createElement('p');
  text.classList.add('sidebar-icon-text');
  text.style.textWrap = 'wrap';
  text.textContent = iconText;
  return text;
};

//создаем ссылку
const createLink = (iconName, text, href) => {
  const link = document.createElement('a');
  link.setAttribute('href', href);
  link.classList.add('sidebar__list-link');
  link.appendChild(createIcon(iconName));
  link.appendChild(createIconText(text));
  return link;
};

//добавляем ссылку
const appendLink = (arr) => {
  const listItems = popover.querySelectorAll(".navigation-icons__list-item");
  
  listItems.forEach((listItem, index) => {
    listItem.innerHTML = '';
    const { iconName, iconText, href } = arr[index];
    listItem.appendChild(createLink(iconName, iconText, href));
  });
};

//изменить позицию поповера
const updatePosition = () => {
  const buttonRect = iconElse.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  
  popover.style.top = `${buttonRect.bottom + window.scrollY + 20}px`;
  popover.style.left = `${buttonRect.right + window.scrollX - popoverRect.width}px`;
};

//создать поповер
const createPopover = (arr) => {
  popover.classList.add('popover-menu');
  
  if (!isInitialized) {
    appendLink(arr);
    isInitialized = true;
  }

  document.body.appendChild(popover);

  popoverElement = popover;
};

//функция при клике
const onClick = (e, arr) => {
  e.stopPropagation();
  
  if (activePopover === null) {
    if (!popoverElement) {
      createPopover(arr);
    } else {
      popoverElement.style.display = 'flex';
    }
    activePopover = 'exist';
    updatePosition();
    window.addEventListener('resize', updatePosition);
  } else {
    if (popoverElement) {
      popoverElement.style.display = 'none';
    }
    activePopover = null;
  }
};

// Закрытие при клике вне поповера
const clickAwayFromPopover = document.addEventListener('click', (e) => {
  if (activePopover && !popoverElement?.contains(e.target) && e.target !== iconElse) {
    popoverElement.style.display = 'none';
    activePopover = null;
  }
});

export { 
  onClick,
  iconElse
};