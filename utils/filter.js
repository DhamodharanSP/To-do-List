export let filterMode = localStorage.getItem('filterMode') || 'all';

function saveLocal()
{
    localStorage.setItem('filterMode', filterMode);
}

export function setFilterMode(mode)
{
    filterMode = mode;
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