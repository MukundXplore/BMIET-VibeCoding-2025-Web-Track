document.addEventListener('DOMContentLoaded', () => {
  // --- Global Setup ---
  const TEXT = {
    showDetails: "Show Details",
    hideDetails: "Hide Details",
    loading: "Loading...",
    noResults: "No items found matching your search.",
    loadError: "Sorry, content could not be loaded.",
    stats: (type, shown, total) => `Showing ${shown} of ${total} ${type}`
  };

  // This will store our fetched data to avoid re-fetching
  window.__DATA_CACHE__ = {};

  // --- Reusable List Filtering System ---

  /**
   * Creates a dynamic, filterable list from a JSON source.
   * @param {object} config - Configuration for the list.
   */
  function createFilterableList(config) {
    const listElement = document.getElementById(config.listId);
    const inputElement = document.getElementById(config.inputId);
    const statsElement = document.getElementById(config.statsId);
    
    // Exit if the essential elements for this section don't exist
    if (!listElement || !inputElement) return { load: () => {} };

    const render = (items) => {
      listElement.innerHTML = items.length === 0
        ? `<li class="card"><p>${TEXT.noResults}</p></li>`
        : items.map(config.templateFn).join('');
    };
    
    const updateStats = (shownCount) => {
      if (statsElement) {
        const total = (window.__DATA_CACHE__[config.dataKey] || []).length;
        statsElement.textContent = TEXT.stats(config.itemType, shownCount, total);
      }
    };
    
    inputElement.addEventListener('input', () => {
      const term = inputElement.value.trim().toLowerCase();
      const allItems = window.__DATA_CACHE__[config.dataKey] || [];
      const filteredItems = allItems.filter(item =>
        (item.title || '').toLowerCase().includes(term) ||
        (item.desc || '').toLowerCase().includes(term) ||
        (item.club || '').toLowerCase().includes(term) // Also check 'club' for events
      );
      render(filteredItems);
      updateStats(filteredItems.length);
    });

    async function load() {
      listElement.innerHTML = `<li class="card"><p>${TEXT.loading}</p></li>`;
      if (statsElement) statsElement.textContent = '';
      
      try {
        const res = await fetch(config.jsonFile);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const items = await res.json();
        
        window.__DATA_CACHE__[config.dataKey] = items;
        render(items);
        updateStats(items.length);
      } catch (error) {
        console.error("Fetch error:", error);
        listElement.innerHTML = `<li class="card"><p>${TEXT.loadError}</p></li>`;
      }
    }
    
    return { load };
  }

  // --- Template Functions for Rendering Cards ---

  function formatDate(dateString) {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date);
  }

  function eventCardTemplate(ev) {
    const formattedDate = formatDate(ev.date);
    return `<li class="card" data-title="${ev.title}" data-desc="${ev.desc}">
        <h3>${ev.title}</h3>
        <p>${formattedDate} • <span class="badge">${ev.club}</span></p>
        <div class="card-details" id="details-${ev.id}">
          <p>${ev.desc}</p>
        </div>
        <button class="btn-details" aria-expanded="false" aria-controls="details-${ev.id}">
          ${TEXT.showDetails}
        </button>
      </li>`;
  }
  
  function simpleCardTemplate(item) {
    return `<li class="card" data-title="${item.title}" data-desc="${item.desc}">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </li>`;
  }

  // --- Initialize All Filterable Lists ---
  
  createFilterableList({
    jsonFile: 'events.json',
    dataKey: 'events',
    listId: 'eventList',
    inputId: 'q',
    statsId: 'stats',
    itemType: 'events',
    templateFn: eventCardTemplate
  }).load();

  createFilterableList({
    jsonFile: 'clubs.json',
    dataKey: 'clubs',
    listId: 'clubList',
    inputId: 'q-clubs',
    statsId: 'stats-clubs',
    itemType: 'clubs',
    templateFn: simpleCardTemplate
  }).load();

  createFilterableList({
    jsonFile: 'labs.json',
    dataKey: 'labs',
    listId: 'labList',
    inputId: 'q-labs',
    statsId: 'stats-labs',
    itemType: 'labs',
    templateFn: simpleCardTemplate
  }).load();

  // --- Core Navigation and Detail Toggle Logic ---
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  
  if (navToggle && navList) {
    const toggleNavigation = () => {
      const isVisible = navList.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isVisible);
    };
    navToggle.addEventListener('click', toggleNavigation);

    document.addEventListener('click', (event) => {
      const isClickInsideNav = navList.contains(event.target);
      const isClickOnToggle = navToggle.contains(event.target);
      if (navList.classList.contains('open') && !isClickInsideNav && !isClickOnToggle) {
        toggleNavigation();
      }
    });
  }
  
  // Event delegation for all "Show Details" buttons
  const mainContainer = document.querySelector('.container');
  if(mainContainer) {
    mainContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('btn-details')) {
        const button = event.target;
        const card = button.closest('.card');
        const isOpen = card.classList.toggle('is-open');
        button.setAttribute('aria-expanded', isOpen);
        button.textContent = isOpen ? TEXT.hideDetails : TEXT.showDetails;
      }
    });
  }
});