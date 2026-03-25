/* const iconElse = document.querySelector(".icon-else");
const template = document.getElementById("template__navigation-icons");
const popover = template.content.cloneNode(true).firstElementChild;
let activePopover = null;
let popoverElement = null;
let isInitialized = false;
let resizeObserver = null;
let scrollListener = null;
let animationFrameId = null;

const benefitsArr = [
  {
    iconName: 'rules',
    iconText: 'правила',
    href: 'rules.html'
  },
  {
    iconName: 'partners',
    iconText: 'партнерство',
    href: 'partners.html'
  },
  {
    iconName: 'staff',
    iconText: 'штат',
    href: 'staff.html'
  },
  {
    iconName: 'template',
    iconText: 'шаблон резюме',
    href: './files/resume.docx.html'
  }
];

//создаем иконку
const createIcon = (iconName) => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '35');
  svg.setAttribute('height', '35');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');

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

const appendLink = (arr) => {
  const listItems = popover.querySelectorAll(".navigation-icons__list-item");
  
  listItems.forEach((listItem, index) => {
    listItem.innerHTML = '';
    const { iconName, iconText, href } = arr[index];
    listItem.appendChild(createLink(iconName, iconText, href));
  });
};

// ✅ Функция обновления позиции с использованием requestAnimationFrame
const updatePopoverPosition = () => {
  if (popoverElement && activePopover === 'exist' && popoverElement.style.display === 'flex') {
    const buttonRect = iconElse.getBoundingClientRect();
    
    // Позиция по вертикали
    popoverElement.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
    popover.style.left = `${buttonRect.right + window.scrollX - popoverRect.width}px`;
  }
};



// ✅ Создаем наблюдатель за изменениями DOM (на случай, если меняется структура страницы)
const setupMutationObserver = () => {
  const mutationObserver = new MutationObserver(() => {
    updatePopoverPosition();
  });
  
  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });
  
  return mutationObserver;
};

const createPopover = () => {
  popover.classList.add('popover-menu');
  
  if (!isInitialized) {
    appendLink(benefitsArr);
    isInitialized = true;
  }
  
  // Начальное позиционирование
  const buttonRect = iconElse.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  
  popover.style.top = `${buttonRect.bottom + window.scrollY + 10}px`;
  popover.style.left = `${buttonRect.right + window.scrollX - popoverRect.width}px`;
  
  document.body.appendChild(popover);
  popoverElement = popover;
  
  // ✅ Настраиваем все наблюдатели для динамического обновления
  scrollListener = () => updatePopoverPosition();
  window.addEventListener('scroll', scrollListener, { passive: true });
  window.addEventListener('resize', updatePopoverPosition);
  
  // Наблюдаем за изменениями DOM (опционально)
  const mutationObserver = setupMutationObserver();
  
  // Сохраняем mutationObserver для очистки
  popoverElement._mutationObserver = mutationObserver;
};

// ✅ Функция очистки всех наблюдателей
const cleanupObservers = () => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
    scrollListener = null;
  }
  window.removeEventListener('resize', updatePopoverPosition);
  
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
  
  if (popoverElement?._mutationObserver) {
    popoverElement._mutationObserver.disconnect();
    delete popoverElement._mutationObserver;
  }
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

//функция при клике
const onClick = (e) => {
  e.stopPropagation();
  
  if (activePopover === null) {
    if (!popoverElement) {
      createPopover();
    } else {
      popoverElement.style.display = 'flex';
      updatePopoverPosition();
    }
    activePopover = 'exist';
  } else {
    if (popoverElement) {
      popoverElement.style.display = 'none';
    }
    activePopover = null;
  }
};

// Закрытие при клике вне поповера
document.addEventListener('click', (e) => {
  if (activePopover && !popoverElement?.contains(e.target) && e.target !== iconElse) {
    popoverElement.style.display = 'none';
    activePopover = null;
  }
});

iconElse?.addEventListener('click', onClick); */