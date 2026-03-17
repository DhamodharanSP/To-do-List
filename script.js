import { tasks, addNewTask, deleteTask } from './tasks.js';

renderTasks();
function renderTasks()
{
    let content = '';
    tasks.forEach((task) => {
        content += `
            <div class="task">
                <input type="checkbox">
                <span class="todo-task">${task.todo}</span>
                <span class="todo-time">${task.time}</span>
                <button class="delete-task-btn js-delete-task-btn" data-task-id=${task.id}>
                    Delete
                </button>
            </div>
        `;
    });
    const taskContainer = document.querySelector('.tasks-container');
    taskContainer.innerHTML = content;

    addNewTaskBtn();
    deleteTaskBtn();
}

function addNewTaskBtn()
{
    const addNewTaskButton = document.querySelector('.js-add-new-task-btn');
    const addNewArea = document.querySelector('.js-add-new');
    addNewTaskButton.addEventListener('click', () => {
        addNewArea.innerHTML = `
            <div class="add-task">
                <input type="text" placeholder="add new task" class="task-input js-task-input">
                <input type="datetime-local" class="task-time js-task-time">
                <button class="add-task-btn js-add-task">
                    Add Task
                </button>
            </div>
        `;
        addTaskBtn();
    });
}

function addTaskBtn()
{
    const addTaskButton = document.querySelector('.js-add-task');
    addTaskButton.addEventListener('click', () => {
        const taskInput = document.querySelector('.js-task-input');
        const taskTime = document.querySelector('.js-task-time');
        
        const todoValue = taskInput.value, todoTime = taskTime.value;
        if(!todoValue || !todoTime) return;
        addNewTask(todoValue, todoTime);
        taskInput.value = '';
        taskTime.value = '';
        const addNewArea = document.querySelector('.js-add-new');
        addNewArea.innerHTML = `
            <button class="add-task-btn js-add-new-task-btn">
                Add New +
            </button>
        `;
        renderTasks();
    });
}

function deleteTaskBtn()
{
    const deleteTaskButtons = document.querySelectorAll('.js-delete-task-btn');
    deleteTaskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const { taskId } = button.dataset;
            deleteTask(taskId);
            renderTasks();
        });
    });
}