import '../style.css';

// DOM Elements
const taskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#new-task');
const priorityInput = document.querySelector('#priority');
const taskList = document.querySelector('#task-container');
const navLinks = document.querySelectorAll('#navigation-elements li a');
const btn = document.querySelector('#theme-toggle');

// Application State
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'todas';

// Initialize Theme from LocalStorage or System Preference
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

// Toggle Dark/Light Mode
btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/**
 * Synchronize Data State with the User Interface
 */
const syncUI = () => {
    // Filter tasks based on the active tab
    const tasksToDisplay = currentFilter === 'todas'
        ? tasks
        : tasks.filter(t => t.priority === currentFilter);

    // Generate HTML for the task list
    taskList.innerHTML = tasksToDisplay.map(task => {
        const completedClass = task.completed ? 'line-through opacity-50' : '';

        const priorityColor = task.priority === 'alta' ? 'text-red-500' :
            task.priority === 'media' ? 'text-orange-500' :
                'text-blue-500';

        return `
            <li class="flex justify-between items-center py-1 group transition-all">
                <div class="flex items-center gap-3">
                    <input type="checkbox" 
                        class="task-checkbox w-4 h-4 cursor-pointer accent-teal-500" 
                        data-id="${task.id}" 
                        ${task.completed ? 'checked' : ''}>
                    
                    <span class="task-font text-xl text-gray-800 dark:text-gray-200 ${completedClass}">
                        ${task.text}
                    </span>

                    <span class="text-[10px] font-bold uppercase ${priorityColor} opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                        (${task.priority})
                    </span>
                </div>

                <button class="delete-btn opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-xs font-bold transition-all px-2" data-id="${task.id}">
                    Eliminar
                </button>
            </li>
        `;
    }).join('');

    // Persistence
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateActiveTab();
};

/**
 * Highlight the current active priority filter tab
 */
const updateActiveTab = () => {
    navLinks.forEach(link => {
        const isActive = link.textContent.trim().toLowerCase() === currentFilter;
        isActive ? link.classList.add('active') : link.classList.remove('active');
    });
};

// Handle Task Creation
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({
            id: Date.now(),
            text,
            priority: priorityInput.value,
            completed: false
        });
        taskInput.value = '';
        syncUI();
    }
});

// Event Delegation for Delete and Toggle Completion
taskList.addEventListener('click', (e) => {
    const id = Number(e.target.dataset.id);

    // Delete task
    if (e.target.classList.contains('delete-btn')) {
        tasks = tasks.filter(task => task.id !== id);
        syncUI();
    }

    // Toggle checkbox status
    if (e.target.classList.contains('task-checkbox')) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = e.target.checked;
            syncUI();
        }
    }
});

// Handle Priority Filtering
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentFilter = e.target.textContent.trim().toLowerCase();
        syncUI();
    });
});

// Initial Render
syncUI();