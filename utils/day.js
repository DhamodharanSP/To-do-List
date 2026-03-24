import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function formatDate(day)
{
    return dayjs(day).format('MMMM D, hh:mm');
}

export function sortTaskOnTime(tasksToRender)
{
    tasksToRender.sort((a,b) => dayjs(a.time).valueOf() - dayjs(b.time).valueOf());
}