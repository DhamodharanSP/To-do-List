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
                <input type="text" class="task-edit js-task-edit-${task.id}" value="${task.todo.replace(/"/g, '&quot;')}">
                <div class="todo-time">${dateString}</div>
                <button class="save-task-btn js-save-task-btn" data-task-id=${task.id}>
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

    addNewTaskBtn();
    deleteTaskBtn();
    toggleCompletionStatus();
    editTaskBtn();
    saveTaskBtn();
    cancelEditBtn();
    focusEdit();
}

// Add a new task
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

// Adding a task to backend
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

// Deleting a task
function deleteTaskBtn()
{
    const deleteTaskButtons = document.querySelectorAll('.js-delete-task-btn');
    deleteTaskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const { taskId, isCompleted } = button.dataset;
            const taskCompleted = JSON.parse(isCompleted);
            if(!taskCompleted)
                deleteTask(taskId);
            renderTasks();
        });
    });
}

// Toggle task completion 
function toggleCompletionStatus()
{
    const toggleTask = document.querySelectorAll('.js-task-checkbox');
    toggleTask.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const { taskId } = checkbox.dataset;
            toggleTaskStatus(taskId);
            renderTasks();
        });
    });
}

// Enable editing on task
function editTaskBtn()
{
    const editTaskButtons = document.querySelectorAll('.js-edit-task-btn');
    editTaskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const { taskId, isCompleted } = button.dataset;
            const taskCompleted = JSON.parse(isCompleted);
            if(!taskCompleted)
                setEditing(taskId);
            renderTasks();
        });
    });
}

// Save and Update the task
function saveTaskBtn()
{
    const saveTaskButtons = document.querySelectorAll('.js-save-task-btn');
    saveTaskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const { taskId } = button.dataset;
            const editTaskInput = document.querySelector(`.js-task-edit-${taskId}`);
            const newTodo = editTaskInput.value;
            updateTask(taskId, newTodo);
            removeEditing();
            renderTasks();
        });
    });
}

// Cancel editing
function cancelEditBtn()
{
    const cancelEditButtons = document.querySelectorAll('.js-cancel-edit-btn');
    cancelEditButtons.forEach((button) => {
        button.addEventListener('click', () => {
            removeEditing();
            renderTasks();
        })
    })
}

// Focus on edit input
function focusEdit()
{
    const editInput = document.querySelector('.task-edit');
    if(editInput) editInput.focus();
}