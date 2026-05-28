const GAMES_PER_PAGE = 10;
const TOTAL_PAGES = 3;
let allGames = [];
let currentPage = 1;

async function loadTop25Games() {
  try {
    const response = await fetch('https://www.freetogame.com/api/games');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    allGames = (await response.json()).slice(0, 30);
    displayPage(currentPage);
    updatePaginationControls();
  } catch (error) {
    console.error('Ошибка загрузки топ-25 игр:', error);
    document.getElementById('games-list').innerHTML =
      '<p class="error">Не удалось загрузить топ-25 игр. Проверьте подключение к интернету.</p>';
  }
}

function displayPage(pageNumber) {
  currentPage = pageNumber;
  const container = document.getElementById('games-list');
  container.innerHTML = '';

  const startIndex = (pageNumber - 1) * GAMES_PER_PAGE;
  const endIndex = startIndex + GAMES_PER_PAGE;
  const gamesToDisplay = allGames.slice(startIndex, endIndex);

  if (gamesToDisplay.length === 0) {
    container.innerHTML = '<p>Игры на этой странице не найдены.</p>';
    return;
  }

  gamesToDisplay.forEach((game, index) => {
    const globalRank = startIndex + index + 1; 
    const card = document.createElement('div');
    card.className = 'game-item';

    const rankClass = globalRank <= 3 ? `rank-${globalRank}` : '';

    card.innerHTML = `
      <div class="rank ${rankClass}">${globalRank}</div>
      <div class="game-content">
        <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail"
           onerror="this.style.display='none'">
        <h3 class="game-title">${game.title}</h3>
        <div class="game-info">
          <span class="game-genre">${game.genre}</span>
          <span class="game-platform">${game.platform}</span>
        </div>
        <p class="game-description">${game.short_description || 'Description not available'}</p>
        <a href="${game.game_url}" target="_blank" class="game-link">Play for free</a>
      </div>
    `;

    container.appendChild(card);
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  const prevBtn = document.getElementById('prev-page');
  const nextBtn = document.getElementById('next-page');
  const pageInfo = document.getElementById('current-page-info');

  pageInfo.textContent = `Page ${currentPage} of ${TOTAL_PAGES}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === TOTAL_PAGES;
}
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    displayPage(currentPage - 1);
  }
});

document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage < TOTAL_PAGES) {
    displayPage(currentPage + 1);
  }
});

document.addEventListener('DOMContentLoaded', loadTop25Games);
