const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');

let filter = 'all';
let sort = 'default';
let search = '';

document.addEventListener('DOMContentLoaded', () => {
  searchInput.addEventListener('input', () => {
    search = searchInput.value.toLowerCase();
    renderGallery();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      renderGallery();
    });
  });

  sortSelect.addEventListener('change', () => {
    sort = sortSelect.value;
    renderGallery();
  });

  renderGallery();
});

function renderGallery() {
  galleryGrid.innerHTML = '';

  let items = aquariumData.filter(item => {
    const name = item.name.toLowerCase();
    const location = item.location.toLowerCase();
    const matchesSearch = name.includes(search) || location.includes(search);
    const matchesFilter = filter === 'all' || item.region.includes(filter);
    const isFavOK = sort !== 'favorites' || item.isFavorite;
    return matchesSearch && matchesFilter && isFavOK;
  });

  if (sort === 'nearest') items.sort((a, b) => a.distance - b.distance);
  if (sort === 'newest') items.sort((a, b) => b.year - a.year);
  if (sort === 'oldest') items.sort((a, b) => a.year - b.year);
  if (sort === 'default') items.sort((a, b) => a.id - b.id);

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
    const div = document.createElement('div');
    div.className = 'gallery-item';

    const link = links[item.name] || '#';

    div.innerHTML = `
      <a href="${link}" class="gallery-item-link">
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

    galleryGrid.appendChild(div);
  });

  document.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const aquarium = aquariumData.find(a => a.id === id);
      if (aquarium) {
        aquarium.isFavorite = !aquarium.isFavorite;
        btn.classList.toggle('active');
        if (sort === 'favorites') renderGallery();
      }
    });
  });
}
