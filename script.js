import { tasks, addNewTask, deleteTask, toggleTaskStatus, setEditing, removeEditing, updateTask } from './tasks.js';
import { formatDate } from './day.js';

renderTasks();

// rendering Task manager
function renderTasks()
{
    let content = '';
    tasks.forEach((task) => {
        const isCompleted = task.completed;
        const isEditing = task.editing;
        const dateString = formatDate(task.time);
        content += (isEditing) ? `
            <div class="task">
                <input type="text" class="task-edit js-task-edit" value="${task.todo.replace(/"/g, '&quot;')}">
                <div class="todo-time">${dateString}</div>
                <button class="save-task-btn js-save-task-btn" data-task-id="${task.id}" onmousedown="event.preventDefault()">
                    Save
                </button>
                <button class="cancel-edit-btn js-cancel-edit-btn" data-task-id=${task.id}>
                    Cancel
                </button>
            </div>
        ` : `
            <div class="task  ${isCompleted ? 'completed' : ''}">
                <input type="checkbox" class="js-task-checkbox" data-task-id=${task.id} ${isCompleted ? 'checked' : ''}>
                <div class="todo-task js-todo-task">${task.todo}</div>
                <div class="todo-time">${dateString}</div>
                <button class="delete-task-btn js-delete-task-btn" data-task-id=${task.id} data-is-completed="${isCompleted}">
                    Delete
                </button>
                <button class="edit-task-btn js-edit-task-btn" data-task-id=${task.id} data-is-completed="${isCompleted}">
                    Edit
                </button>
            </div>
        `;
    });
    const taskContainer = document.querySelector('.tasks-container');
    taskContainer.innerHTML = content;

    focusInput('.js-task-edit');
}

// Event delegation
const todoContainer = document.querySelector('.js-todo-container');

// on click
todoContainer.addEventListener('click', (event) => {
    const targetElement = event.target;
    
    const addNewTaskButton = targetElement.closest('.js-add-new-task-btn');
    const addTaskButton = targetElement.closest('.js-add-task');
    const deleteTaskButton = targetElement.closest('.js-delete-task-btn');
    const editTaskButton = targetElement.closest('.js-edit-task-btn');
    const saveTaskButton = targetElement.closest('.js-save-task-btn');
    const cancelEditButton = targetElement.closest('.js-cancel-edit-btn');

    if(addNewTaskButton) {
        addNewTaskBtn();
    }
    else if(addTaskButton) {
        addTaskBtn();
        renderTasks();
    }
    else if(deleteTaskButton) {
        deleteTaskBtn(deleteTaskButton);
        renderTasks();
    }
    else if(editTaskButton) {
        editTaskBtn(editTaskButton);
        renderTasks();
    }
    else if(saveTaskButton) {
        saveTaskBtn(saveTaskButton);
        renderTasks();
    }
    else if(cancelEditButton) {
        cancelEditBtn();
        renderTasks();
    }
});

function addNewTaskBtn()
{
    const addNewArea = document.querySelector('.js-add-new');
    addNewArea.innerHTML = `
        <div class="add-task">
            <input type="text" placeholder="add new task" class="task-input js-task-input">
            <input type="datetime-local" class="task-time js-task-time">
            <button class="add-task-btn js-add-task">
                Add Task
            </button>
        </div>
    `;
    focusInput('.js-task-input');
}

function addTaskBtn()
{
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
}

function deleteTaskBtn(deleteTaskButton)
{
    const { taskId } = deleteTaskButton.dataset;
    deleteTask(taskId);
}

function editTaskBtn(editTaskButton)
{
    const { taskId } = editTaskButton.dataset;
    setEditing(taskId);
}

function saveTaskBtn(saveTaskButton)
{
    const { taskId } = saveTaskButton.dataset;
    const task = saveTaskButton.closest('.task');
    const editTaskInput = task.querySelector(`.js-task-edit`);
    const newTodo = editTaskInput.value;
    updateTask(taskId, newTodo);
    removeEditing();
}

function cancelEditBtn()
{
    removeEditing();
}

// on change
todoContainer.addEventListener('change', (event) => {
    const targetElement = event.target;
    const toggleTask = targetElement.closest('.js-task-checkbox');
    if(toggleTask) toggleCompletionStatus(toggleTask);
    renderTasks();
})

function toggleCompletionStatus(toggleTask)
{
    const { taskId } = toggleTask.dataset;
    toggleTaskStatus(taskId);
}


// Focus on input
function focusInput(selector)
{
    const input = document.querySelector(selector);
    if(input) input.focus();
}