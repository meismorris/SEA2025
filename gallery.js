const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');

let currentFilter = 'all';
let currentSort = 'default';
let searchTerm = '';

document.addEventListener('DOMContentLoaded', () => {
  searchInput.addEventListener('input', () => {
    searchTerm = searchInput.value.toLowerCase();
    renderGallery();
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      currentFilter = button.dataset.filter;
      renderGallery();
    });
  });

  sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    renderGallery();
  });

  renderGallery();
});

function renderGallery() {
  galleryGrid.innerHTML = '';

  let items = aquariumData.filter(item => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm);
    const locationMatch = item.location.toLowerCase().includes(searchTerm);
    const matchesSearch = nameMatch || locationMatch;

    const matchesRegion = currentFilter === 'all' || item.region.includes(currentFilter);
    const isIncludedByFavorites = currentSort !== 'favorites' || item.isFavorite;

    return matchesSearch && matchesRegion && isIncludedByFavorites;
  });

  if (currentSort === 'nearest') {
    items.sort((a, b) => a.distance - b.distance);
  } else if (currentSort === 'newest') {
    items.sort((a, b) => b.year - a.year);
  } else if (currentSort === 'oldest') {
    items.sort((a, b) => a.year - b.year);
  } else {
    items.sort((a, b) => a.id - b.id);
  }

  const links = {
    "Antalya Aquarium": "aboutAntalya.html",
    "Aquatis Aquarium": "aboutAquatis.html",
    "Blue Planet Aquarium": "aboutBlue.html",
    "Monterey Bay Aquarium": "aboutMonterey.html",
    "National Aquarium": "aboutNational.html",
    "New England Aquarium": "aboutNE.html",
    "Oceanogràfic": "aboutOceano.html",
    "Aquarium of the Pacific": "aboutPacific.html"
  };

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-item';

    const page = links[item.name] || '#';

    card.innerHTML = `
      <a href="${page}" class="gallery-item-link">
        <img src="${item.image}" alt="${item.name}">
        <div class="gallery-item-info">
          <div class="gallery-item-title">${item.name}</div>
          <div class="gallery-item-location">${item.location}</div>
        </div>
      </a>
      <button class="favorite-btn ${item.isFavorite ? 'active' : ''}" data-id="${item.id}">
        <i class="fas fa-heart"></i>
      </button>
    `;

    galleryGrid.appendChild(card);
  });

  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();

      const id = parseInt(button.dataset.id);
      const selected = aquariumData.find(a => a.id === id);

      if (selected) {
        selected.isFavorite = !selected.isFavorite;
        button.classList.toggle('active');
        if (currentSort === 'favorites') renderGallery();
      }
    });
  });
}
