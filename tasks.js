export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveLocal()
{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addNewTask(todo, time)
{
    tasks.push({ 
        id: crypto.randomUUID(), // modern way of creating unique Ids
        todo, 
        time, 
        completed: false
    });
    saveLocal();
}

export function deleteTask(taskId)
{
    tasks = tasks.filter(task => task.id !== taskId);
    saveLocal();
}