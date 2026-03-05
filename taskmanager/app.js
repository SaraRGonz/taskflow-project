// DOM Elements
const taskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#new-task');
const priorityInput = document.querySelector('#priority');
const taskList = document.querySelector('#task-container');
const navLinks = document.querySelectorAll('#navigation-elements li a');

// App State: Initialize from LocalStorage or empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'todas';

/**
 * Main function to synchronize UI with the current state
 */
const syncUI = () => {
    // Filter tasks based on current category
    const tasksToDisplay = currentFilter === 'todas' 
        ? tasks 
        : tasks.filter(t => t.priority === currentFilter);

    // Render task list
    taskList.innerHTML = tasksToDisplay.map(task => `
        <li class="task-item priority-${task.priority}">
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        </li>
    `).join('');

    // Persistence and tab styling
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateActiveTab();
};

// Handle new task submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const priority = priorityInput.value;
    
    if (text) {
        const newTask = { 
            id: Date.now(), // Unique identifier
            text: text, 
            priority: priority 
        };
        
        tasks.push(newTask);
        taskInput.value = ''; 
        syncUI();
    }
});

// Task deletion using event delegation
taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idToDelete = Number(e.target.dataset.id);
        tasks = tasks.filter(task => task.id !== idToDelete);
        syncUI();
    }
});

// Category filter navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilter = e.target.textContent.toLowerCase();
        syncUI();
    });
});

/**
 * Updates the visual state of the navigation tabs
 */
const updateActiveTab = () => {
    navLinks.forEach(link => {
        if (link.textContent.toLowerCase() === currentFilter) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Initial render
syncUI();