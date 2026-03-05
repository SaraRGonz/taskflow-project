
const taskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#new-task');
const priorityInput = document.querySelector('#priority');
const taskList = document.querySelector('#task-container');
const navLinks = document.querySelectorAll('#navigation-elements li a');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'todas';

const syncUI = () => {
    const tasksToDisplay = currentFilter === 'todas' 
        ? tasks 
        : tasks.filter(t => t.priority === currentFilter);
    taskList.innerHTML = tasksToDisplay.map(task => `
        <li class="task-item priority-${task.priority}">
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        </li>
    `).join('');
    localStorage.setItem('tasks', JSON.stringify(tasks));
        updateActiveTab();
};

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const priority = priorityInput.value;
    
    if (text) {
        const newTask = { 
            id: Date.now(), 
            text: text, 
            priority: priority 
        };
        
        tasks.push(newTask);
        taskInput.value = ''; 
        syncUI();
    }
});

taskList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const idToDelete = Number(e.target.dataset.id);
        // Filtrar el array para eliminar la tarea
        tasks = tasks.filter(task => task.id !== idToDelete);
        syncUI();
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilter = e.target.textContent.toLowerCase();
        syncUI();
    });
});

const updateActiveTab = () => {
    navLinks.forEach(link => {
        if (link.textContent.toLowerCase() === currentFilter) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};


syncUI();