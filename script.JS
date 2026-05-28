const COL = 20;
const STR = 5;
let allGames = [];
let currentPage = 1;

async function loadGames() {
  try {
    const response = await fetch('https://www.freetogame.com/api/games');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    allGames = await response.json();
    displayPage(currentPage);
    createPagination();
  } catch (error) {
    console.error('Ошибка загрузки игр:', error);
    document.getElementById('game-cards').innerHTML =
      '<p class="error">Не удалось загрузить список игр. Проверьте подключение к интернету.</p>';
  }
}

function displayPage(pageNumber) {
  currentPage = pageNumber;
  const container = document.getElementById('game-cards');
  container.innerHTML = '';

  const startIndex = (pageNumber - 1) * COL;
  const endIndex = startIndex + COL;
  const gamesToDisplay = allGames.slice(startIndex, endIndex);

  if (gamesToDisplay.length === 0) {
    container.innerHTML = '<p>Игры на этой странице не найдены.</p>';
    return;
  }

  gamesToDisplay.forEach(game => {
    const card = document.createElement('div');
    card.className = 'game-card';

    card.innerHTML = `
      <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail"
           onerror="this.style.display='none'">
      <h3 class="game-title">${game.title}</h3>
      <p class="game-genre">Жанр: ${game.genre}</p>
      <p class="game-genre">Платформа: ${game.platform}</p>
      <p class=".game-genre">${game.short_description || 'Описание отсутствует'}</p>
      <a href="${game.game_url}" target="_blank" class="game-link">Играть бесплатно</a>
    `;

    container.appendChild(card);
  });

  updatePaginationButtons();
}

function createPagination() {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= STR; i++) {
    const button = document.createElement('button');
    button.className = 'page-btn';
    button.textContent = i;
    button.addEventListener('click', () => displayPage(i));
    paginationContainer.appendChild(button);
  }
}

function updatePaginationButtons() {
  const buttons = document.querySelectorAll('.page-btn');
  buttons.forEach(button => {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', loadGames);