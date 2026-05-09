import { createKeyValuePair } from "./keyValueFabric.js";

//создать автора
const createAuthor = (data, profileData) => {
  const authorContainer = document.createElement('div');
  authorContainer.classList.add('author-container');

  const authorAvatar = document.createElement('div');
  authorAvatar.classList.add('link-img');
  authorAvatar.style.backgroundImage = `url(./images/${data.author}.png)`;

  const authorName = document.createElement('span');
  authorName.classList.add('author-name');
  authorName.textContent = profileData.characters[`${data.author}`].mainInfo.name;

  authorContainer.append(authorAvatar, authorName);
  return authorContainer;
}

// создать текст поста
const createPostText = (data) => {
  if (!data.text) return;

  const postText = document.createElement('p');
  postText.classList.add('post-text');
  postText.textContent = data.text;

  return postText;
}

// создать картинки
const createPostImages = (data) => {
  if (!data.images) return;

  const postImagesContainer = document.createElement('div');
  postImagesContainer.classList.add('post-images-container');
  data.images.forEach((image) => {
    const postImage = document.createElement('img');
    postImage.classList.add('post-img');
    postImage.src = image;

    postImagesContainer.appendChild(postImage);
  });

  return postImagesContainer;
}

//создать теги
const createPostTags = (data) => {
  const postTagsContainer = document.createElement('div');
  postTagsContainer.classList.add('post-tags-container');

  data.tags.forEach((tag) => {
    const postTag = document.createElement('span');
    postTag.classList.add('post-tag');
    postTag.textContent = `# ${tag}`;

    postTagsContainer.appendChild(postTag);
  });

  return postTagsContainer;
}

//создать дату
const createPostDate = (data) => {
  const postDate = document.createElement('span');
  postDate.classList.add('post-date');
  postDate.textContent = data.date;

  return postDate;
}

export const renderPosts = (postsData, profileData) => {
  const list = document.querySelector('.posts-list');
  list.innerHTML = '';

  postsData.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('posts-list-item');

    listItem.append(
      createAuthor(item, profileData),
      createPostText(item),
      createPostImages(item),
      createPostTags(item),
      createPostDate(item)
    );

    list.appendChild(listItem);
  })
}