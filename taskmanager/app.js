/**
 * TASK MANAGER - Lógica de la Aplicación
 * 1. Selección de elementos del DOM
 */
const taskForm = document.querySelector('#add-task-form');
const taskInput = document.querySelector('#new-task');
const priorityInput = document.querySelector('#priority');
const taskList = document.querySelector('#task-container');
const navLinks = document.querySelectorAll('#navigation-elements li a');
const searchInput = document.querySelector('#search-task'); // Para el Bonus

/**
 * 2. Estado de la Aplicación
 * Carga las tareas de LocalStorage al iniciar
 */
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'todas';

/**
 * 3. Función Principal: Sincronizar Interfaz (syncUI)
 * Filtra, genera el HTML y guarda en LocalStorage
 */
const syncUI = () => {
    // Filtrar tareas según la pestaña seleccionada
    const tasksToDisplay = currentFilter === 'todas' 
        ? tasks 
        : tasks.filter(t => t.priority === currentFilter);

    // Generar el HTML dinámico
    taskList.innerHTML = tasksToDisplay.map(task => `
        <li class="task-item priority-${task.priority}">
            <span>${task.text}</span>
            <button class="delete-btn" data-id="${task.id}">Delete</button>
        </li>
    `).join('');

    // Persistencia: Guardar el array completo
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Actualizar visualmente la pestaña activa
    updateActiveTab();
};

/**
 * 4. Manejador: Añadir Tarea
 * Captura texto, prioridad y limpia el input
 */
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const priority = priorityInput.value;
    
    if (text) {
        // Crear objeto de tarea con ID único
        const newTask = { 
            id: Date.now(), 
            text: text, 
            priority: priority 
        };
        
        tasks.push(newTask);
        taskInput.value = ''; // Limpiar input
        syncUI();
    }
});

/**
 * 5. Manejador: Eliminar Tarea (Event Delegation)
 * Borra el nodo correspondiente al pulsar el botón
 */
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


if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const items = taskList.querySelectorAll('li');

        items.forEach(item => {
            const text = item.querySelector('span').textContent.toLowerCase();
            // Mostrar u ocultar según coincidencia
            item.style.display = text.includes(term) ? 'flex' : 'none';
        });
    });
}


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