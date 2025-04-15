// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');

// Current filter and sort state
let currentFilter = 'all';
let currentSort = 'default';
let currentSearch = '';

// Wait for the page to load
document.addEventListener('DOMContentLoaded', function() {
  // Display gallery items initially
  renderGallery();
  
  // Set up all the button clicks and input changes
  setupSearchBox();
  setupFilterButtons();
  setupSortDropdown();
  setupNavbarLinks();
});

// Display gallery items based on current filters and sorting
function renderGallery() {
  // Clear the gallery
  galleryGrid.innerHTML = '';
  
  // Step 1: Filter items by search text and region
  let filteredItems = filterItems();
  
  // Step 2: Sort the filtered items
  filteredItems = sortItems(filteredItems);
  
  // Step 3: Create HTML elements for each item
  displayItems(filteredItems);
  
  // Step 4: Add click handlers to favorite buttons
  setupFavoriteButtons();
}

// Filter items based on search text and selected region
function filterItems() {
  return aquariumData.filter(function(item) {
    // Check if item matches search text
    const nameMatch = item.name.toLowerCase().includes(currentSearch.toLowerCase());
    const locationMatch = item.location.toLowerCase().includes(currentSearch.toLowerCase());
    const matchesSearch = nameMatch || locationMatch;
    
    // If a region filter is active, check that too
    if (currentFilter !== 'all') {
      return matchesSearch && item.region.includes(currentFilter);
    }
    
    return matchesSearch;
  });
}

// Sort the filtered items based on current sort selection
function sortItems(items) {
  if (currentSort === 'nearest') {
    // Sort by distance (closest first)
    return items.sort(function(a, b) {
      return a.distance - b.distance;
    });
  } 
  else if (currentSort === 'favorites') {
    // Sort by favorite status (favorites first)
    return items.sort(function(a, b) {
      return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
    });
  } 
  else if (currentSort === 'newest') {
    // Sort by year (newest first)
    return items.sort(function(a, b) {
      return b.year - a.year;
    });
  } 
  else if (currentSort === 'oldest') {
    // Sort by year (oldest first)
    return items.sort(function(a, b) {
      return a.year - b.year;
    });
  } 
  else {
    // Default sort by ID (original order)
    return items.sort(function(a, b) {
      return a.id - b.id;
    });
  }
}

// Create and display the HTML for each gallery item
// Create and display the HTML for each gallery item
function displayItems(items) {
    items.forEach(function(item) {
      // Create a new div for the gallery item
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      
      // Determine the correct HTML file link based on aquarium name
      let pageLink = "#";
      
      if (item.name === "Antalya Aquarium") {
        pageLink = "aboutAntalya.html";
      } else if (item.name === "Aquatis Aquarium") {
        pageLink = "aboutAquatis.html";
      } else if (item.name === "Blue Planet Aquarium") {
        pageLink = "aboutBlue.html";
      } else if (item.name === "Monterey Bay Aquarium") {
        pageLink = "aboutMonterey.html";
      } else if (item.name === "National Aquarium") {
        pageLink = "aboutNational.html";
      } else if (item.name === "New England Aquarium") {
        pageLink = "aboutNE.html";
      } else if (item.name === "Oceanogràfic") {
        pageLink = "aboutOceano.html";
      } else if (item.name === "Aquarium of the Pacific") {
        pageLink = "aboutPacific.html";
      }
      
      // Set the HTML content for the item with a link wrapper
      galleryItem.innerHTML = `
        <a href="${pageLink}" class="gallery-item-link">
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
      
      // Add the item to the gallery
      galleryGrid.appendChild(galleryItem);
    });
  }

// Set up the favorite button click handlers

function setupFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(function(button) {
      button.addEventListener('click', function(e) {
        // Prevent the click from triggering the parent link
        e.stopPropagation();
        e.preventDefault();
        
        // Rest of the favorite button code...
        const id = parseInt(this.getAttribute('data-id'));
        const item = aquariumData.find(function(aquarium) {
          return aquarium.id === id;
        });
        
        if (item) {
          item.isFavorite = !item.isFavorite;
          this.classList.toggle('active');
          
          if (currentSort === 'favorites') {
            renderGallery();
          }
        }
      });
    });
  }

// Set up the search box
function setupSearchBox() {
  searchInput.addEventListener('input', function() {
    currentSearch = this.value;
    renderGallery();
  });
}

// Set up the filter buttons
function setupFilterButtons() {
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Update filter and re-render
      currentFilter = this.dataset.filter;
      renderGallery();
    });
  });
}

// Set up the sort dropdown
function setupSortDropdown() {
  sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    renderGallery();
  });
}

// Set up navbar links
function setupNavbarLinks() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(function(navLink) {
        navLink.classList.remove('active');
      });
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // For now, just log which page we'd navigate to
      console.log('Navigating to ' + this.dataset.page + ' page');
    });
  });
}