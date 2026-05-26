import { createKeyValuePair } from "./keyValueFabric.js";
import { main } from "./profiles.js";

//заполняет основную информацию
const fillMainInfo = (data) => {
  const mainInfoContainer = document.querySelector('.main-info-container');
  if (!mainInfoContainer) return;

  const mainInfoTitle = mainInfoContainer.querySelector('.main-info__name');
  mainInfoTitle.textContent = data.mainInfo.name;

  const {createKey, createValue} = createKeyValuePair();

  const list = mainInfoContainer.querySelector('.main-info__list');
  if (!list) return;

  list.innerHTML = '';

  Object.entries(data.mainInfo)
    .filter(([key]) => key !== 'name')
    .forEach(([key, value]) => {
      const listItem = document.createElement('li');
      listItem.className = `main-info__list-item ${key}`;
      listItem.append(createKey(key, `main-info__parameter-key`), createValue(value, `main-info__parameter-value`));
      list.appendChild(listItem);
    });
}

// Установить аву
const setAvatarImg = (data) => {
  const imgContainer = document.querySelector(".avatar-img");
  if (imgContainer) imgContainer.src = data.avatar;
}


//Заполняет "обо мне"
const fillAboutMe = (data) => {
  const list = document.querySelector('.about-me__list');
  if (!list) return;

  list.innerHTML = '';

  data.aboutMe?.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('about-me__list-item');
    listItem.textContent = item;
    list.appendChild(listItem);
  });
}

//заполняет друзей
const fillFriends = (data) => {
  const list = document.querySelector('.friends__list');
  if (!list) return;

  data.friends?.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('friends__list-item');

    const link = document.createElement('a');
    link.classList.add('friends__list-link');
    link.setAttribute('href', `pages.html?id=${item}`)

    const img = document.createElement('div');
    img.classList.add('link-img');
    img.style.backgroundImage = `url(./images/${item}.png)`;

    link.appendChild(img);
    listItem.appendChild(link);
    list.appendChild(listItem);
  })
}

//заполняет интересы
const fillInterests = (data) => {
  const list = document.querySelector('.interests__list');
  if (!list) return;
    
  list.innerHTML = '';
    
  data.interests?.forEach(interest => {
    const listItem = document.createElement('li');
    listItem.className = 'interests__list-item';
      
    const img = document.createElement('div');
    img.className = 'link-img';
    img.style.backgroundImage = `url(${interest.img})`;
      
    const name = document.createElement('p');
    name.className = 'profiles__link-text';
    name.textContent = interest.name;
      
    listItem.append(img, name);
    list.appendChild(listItem);
  });
};

export const adaptive = () => {
  const middle = document.querySelector('.middle-side');

  if (window.innerWidth < 975) {
    const profiles = document.querySelector('.profiles');
    const profilesCopy = profiles.cloneNode(true);

    profiles.remove();
    main.style.gridTemplateColumns = 'min-content 1fr';
    middle.insertBefore(profilesCopy, middle.children[2]);
  }

  if (window.innerWidth < 600) {
    const avatarContainer = document.querySelector('.avatar-container')
    const avatarContainerCopy = avatarContainer.cloneNode(true);
    avatarContainer.remove();
    document.querySelector('.main-info-name-container').prepend(avatarContainerCopy);

    const aboutMeContainer = document.querySelector('.about-me-container');
    const aboutMeContainerCopy = aboutMeContainer.cloneNode(true);

    const friendsContainer = document.querySelector('.friends-container');
    const friendsContainerCopy = friendsContainer.cloneNode(true);

    const moreInfo = document.querySelector('.more-info-body');
    aboutMeContainer.remove();
    friendsContainer.remove();

    moreInfo.prepend(aboutMeContainerCopy, friendsContainerCopy);
  }
}

export const renderProfile = (data, id) => {
  if (!data || !id ) return;

  adaptive();

  data = data.characters[`${id}`];
  setAvatarImg(data);
  fillMainInfo(data);
  fillAboutMe(data);
  fillFriends(data);
  fillInterests(data);
}