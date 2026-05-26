// перейти на страницу перса
export const goTocharacterPage = (characterId) => {
  if (!characterId) return;
  window.location.href = `profile.html?id=${characterId}`
}

//взять айдишник перса из урла
export const getCurrentCharacterId = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

//перейти на страницу блога
export const goToBlogPage = () => {
  window.location.href = 'blog.html';
}