import '../style.css';
const taskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#new-task');
const priorityInput = document.querySelector('#priority');
const taskList = document.querySelector('#task-container');
const navLinks = document.querySelectorAll('#navigation-elements li a');
const btn = document.querySelector('#theme-toggle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'todas';

// --- Lógica para gestionar el tema ---
// 1. Al cargar, comprueba el tema guardado o la preferencia del sistema.
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// 2. El botón ahora guarda la preferencia del usuario.
btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    console.log("Cambiando modo a:", isDark ? 'dark' : 'light');
});

const syncUI = () => {
    const tasksToDisplay = currentFilter === 'todas' 
        ? tasks 
        : tasks.filter(t => t.priority === currentFilter);

    taskList.innerHTML = tasksToDisplay.map(task => {
        // 1. Definimos el color del borde según la prioridad (Lógica antes del HTML)
        const priorityColor = task.priority === 'alta' ? 'border-red-500' : 
          task.priority === 'media' ? 'border-yellow-500' : 
          'border-green-500';

        return `
            <li class="flex justify-between items-center p-4 mb-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm border-l-4 ${priorityColor} transition-all">
                <span class="text-gray-700 dark:text-gray-200 font-medium">${task.text}</span>
                <button 
                    class="delete-btn bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200 text-sm font-bold"
                    data-id="${task.id}">
                    Eliminar
                </button>
            </li>
        `;
    }).join('');

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
        const isActive = link.textContent.toLowerCase() === currentFilter;

        // Clases para estado inactivo (por defecto)
        link.classList.toggle('text-gray-600', !isActive);
        link.classList.toggle('dark:text-gray-300', !isActive);
        link.classList.toggle('hover:bg-teal-100', !isActive);
        link.classList.toggle('dark:hover:bg-teal-800', !isActive);

        // Clases para estado activo
        link.classList.toggle('bg-teal-500', isActive);
        link.classList.toggle('text-white', isActive);
        link.classList.toggle('dark:bg-teal-600', isActive);
    });
};


syncUI();