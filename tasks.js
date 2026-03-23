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
        completed: false,
        editing: false
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

export function setEditing(taskId)
{
    removeEditing();
    const task = findTask(taskId);
    if(!task || task.completed) return;
    task.editing = true;
    saveLocal();
}

export function removeEditing()
{
    tasks.forEach(task => {
        task.editing = false;
    });
    saveLocal();
}

export function updateTask(taskId, newTodo)
{
    const task = findTask(taskId);
    if(!task) return;
    task.todo = newTodo;
    saveLocal();
}