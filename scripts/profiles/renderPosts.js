const lightbox = {
  imagesLinks: [],
  currentPhotoIndex: 0,
  
  open(imagesLinks, photoToClickIndex) {
    this.imagesLinks = imagesLinks; //список ссылок на фотки конкретного контейнера
    this.currentPhotoIndex = photoToClickIndex; //текущее отображаемое фото, по которому кликнули
    
    // Создаем лайтбокс
    const modal = document.createElement('div');
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
          </svg>
        </button>
        <button class="lightbox-prev">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 6L9 12L15 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <img class="lightbox-img" src="${imagesLinks[photoToClickIndex]}">
        <button class="lightbox-next">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="lightbox-counter">${photoToClickIndex + 1} / ${imagesLinks.length}</div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const imgElement = modal.querySelector('.lightbox-img');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');
    const counter = modal.querySelector('.lightbox-counter');
    
    const updateImage = () => {
      imgElement.src = this.imagesLinks[this.currentPhotoIndex];
      counter.textContent = `${this.currentPhotoIndex + 1} / ${this.imagesLinks.length}`; //обновить счетчик
      prevBtn.style.opacity = this.currentPhotoIndex === 0 ? '0.3' : '1';
      nextBtn.style.opacity = this.currentPhotoIndex === this.imagesLinks.length - 1 ? '0.3' : '1';
    };
    
    const close = () => {
      modal.remove();
      document.body.style.overflow = '';
    };
    
    // Обработчик
    modal.querySelector('.lightbox-close').addEventListener('click', close);
    
    //клики по кнопкам перемещения
    prevBtn.addEventListener('click', () => {
      if (this.currentPhotoIndex > 0) {
        this.currentPhotoIndex--;
        updateImage();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (this.currentPhotoIndex < this.imagesLinks.length - 1) {
        this.currentPhotoIndex++;
        updateImage();
      }
    });
  }
};

//создать автора
const createAuthor = (data) => {
  const authorContainer = document.createElement('div');
  authorContainer.classList.add('author-container');

  const authorAvatar = document.createElement('div');
  authorAvatar.classList.add('link-img');
  authorAvatar.style.backgroundImage = `url(./images/${data.author}.png)`;

  const authorName = document.createElement('span');
  authorName.classList.add('author-name');
  authorName.textContent = data.authorRu;

  authorContainer.append(authorAvatar, authorName);
  return authorContainer;
}

// создать текст поста
const createPostText = (data) => {
  if (!data.text) return;

  const postText = document.createElement('p');
  postText.classList.add('post-text');
  postText.textContent = data.text;

  postText.innerHTML = data.text.replace(/\n/g, '<br>');

  return postText;
}

// создать картинки (с лайтбоксом)
const createPostImages = (data) => {
  if (data.images || !data.images.length === 0) {

  const postImagesContainer = document.createElement('div');
  postImagesContainer.classList.add('post-images-container');
  
  data.images.forEach((image, index) => {
    //создать элемент фотки
    const postImage = document.createElement('img');
    postImage.classList.add('post-img');
    postImage.src = image;
    postImage.loading = 'lazy';
    
    // Добавляем обработчик клика
    postImage.addEventListener('click', (e) => {
      e.stopPropagation();
      lightbox.open(data.images, index);
    });
    
    //добавить фотку в контейнер
    postImagesContainer.appendChild(postImage);
  });

  return postImagesContainer;
  }
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

export const renderPosts = (postsData) => {
  const list = document.querySelector('.posts-list');
  list.innerHTML = '';

  postsData.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('posts-list-item');

    listItem.append(
      createAuthor(item),
      createPostText(item),
      (createPostImages(item)),
      createPostTags(item),
      createPostDate(item)
    );

    list.appendChild(listItem);
  });
}