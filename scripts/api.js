// ПОЛУЧИТЬ ДАННЫЕ ИЗ ФАЙЛА

async function fetchCardsData() {
  const response = await fetch("/public/data.json");

  if (!response.ok) {
    throw new Error('Ошибка загрузки информации о карточках');
  }

  const result = await response.json();
  return result;
}

fetchCardsData();