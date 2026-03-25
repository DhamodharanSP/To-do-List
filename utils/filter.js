export let filterMode = localStorage.getItem('filterMode') || 'all';

function saveLocal()
{
    localStorage.setItem('filterMode', filterMode);
}

const filterModeDisplay = document.querySelector('.js-filter-mode');

export function setFilterMode(mode)
{
    filterMode = mode;
    filterModeDisplay.textContent = filterMode;
    saveLocal();
}

const filterOption = document.querySelector('.filter-option');

export function openFilterDropdown()
{    
    filterOption.classList.remove('disabled');
}

export function closeFilterDropdown()
{    
    filterOption.classList.add('disabled');
}

// initializing filter mode
setFilterMode(filterMode);