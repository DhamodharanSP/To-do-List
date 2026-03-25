export function empty_animation(filterMode)
{
    return `
        <div class="place">
            <img src="../assets/images/rolling-bush.png" alt="bush" class="bush">
            <div class="empty-filter-container">
                <div class="empty-filter">No ${(filterMode === 'all') ? '' : filterMode} tasks left</div>
            </div>
        </div>
    `;
}