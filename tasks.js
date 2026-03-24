let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

export function findTask(taskId)
{
    const task = tasks.find(task => task.id === taskId);
    return task;
}

export function deleteTask(taskId)
{
    const task = findTask(taskId);
    if(!task || task.completed) return;
    tasks = tasks.filter(task => task.id !== taskId);
    saveLocal();
}

export function toggleTaskStatus(taskId)
{
    const task = findTask(taskId);
    if(!task) return;
    task.completed = !task.completed;
    saveLocal();
}

export let editTaskId = localStorage.getItem('editTask') || '';

function saveEditTaskId()
{
    localStorage.setItem('editTask', editTaskId);
}

export function setEditing(taskId)
{
    const task = findTask(taskId);
    if(!task || task.completed) return;
    editTaskId = taskId;
    saveEditTaskId();
}

export function removeEditing()
{
    editTaskId = '';
    saveEditTaskId();
}

export function updateTask(taskId, newTodo)
{
    const task = findTask(taskId);
    if(!task) return;
    task.todo = newTodo;
    saveLocal();
}

export function getFilteredTasks(filterMode)
{
    return tasks.filter(task => {
        const isCompleted = task.completed;
        const isValidTask = (filterMode === 'all') || (filterMode === 'completed' && isCompleted) || (filterMode === 'active' && !isCompleted);
        return isValidTask;
    });
}