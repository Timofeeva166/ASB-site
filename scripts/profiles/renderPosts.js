const lightbox = {
  imagesLinks: [],
  currentPhotoIndex: 0,
  
  open(imagesLinks, photoToClickIndex) {
    this.imagesLinks = imagesLinks; //список ссылок на фотки конкретного контейнера
    this.currentPhotoIndex = photoToClickIndex; //текущее отображаемое фото, по которому кликнули
    
    const modalTemplate = document.getElementById("template__lightbox");
    const modal = modalTemplate.content.cloneNode("true").firstElementChild;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const modalImg = document.querySelector('.lightbox-img');
    modalImg.src = `${imagesLinks[photoToClickIndex]}`;

    const counter = document.querySelector('.lightbox-counter');
    counter.textContent = `${photoToClickIndex + 1} / ${imagesLinks.length}`;

    const chat = document.querySelector('.chat');
    chat.style.display = 'none';
    
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');

    if (this.currentPhotoIndex === 0) {
      prevBtn.style.opacity = '0.3';
      prevBtn.style.cursor = 'not-allowed';
    }

    if (this.currentPhotoIndex === this.imagesLinks.length - 1) {
      nextBtn.style.opacity = '0.3';
      nextBtn.style.cursor = 'not-allowed';
    }
    
    const updateImage = () => {
      modalImg.src = this.imagesLinks[this.currentPhotoIndex];
      counter.textContent = `${this.currentPhotoIndex + 1} / ${this.imagesLinks.length}`; //обновить счетчик
      prevBtn.style.opacity = this.currentPhotoIndex === 0 ? '0.3' : '1';
      prevBtn.style.cursor = this.currentPhotoIndex === 0 ? 'not-allowed' : 'pointer';
      nextBtn.style.opacity = this.currentPhotoIndex === this.imagesLinks.length - 1 ? '0.3' : '1';
      nextBtn.style.cursor = this.currentPhotoIndex === this.imagesLinks.length - 1 ? 'not-allowed' : 'pointer';
    };
    
    const close = () => {
      modal.remove();
      document.body.style.overflow = '';
      chat.style.display = 'flex'
    };
    
    modal.querySelector('.lightbox-close').addEventListener('click', close);
    
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