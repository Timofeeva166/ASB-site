// ПОЛУЧИТЬ ДАННЫЕ ПО АДРЕСУ

export async function fetchData(adress) {
  const response = await fetch(adress);

  if (!response.ok) {
    throw new Error('Ошибка загрузки информации');
  }

  const result = await response.json();
  return result;
}