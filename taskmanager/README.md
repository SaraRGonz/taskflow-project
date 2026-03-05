# Task Manager - Estética de Libreta Física

Una aplicación web interactiva diseñada para gestionar tareas diarias con una interfaz visual inspirada en un cuaderno de espiral real. Uso de **JavaScript Vanilla** para la manipulación del DOM y la persistencia de datos en el navegador.

---

## Características Principales

* **Persistencia Local (LocalStorage):** Las tareas se guardan automáticamente en el navegador. No perderás tus datos al refrescar o cerrar la pestaña.
* **Categorización por Prioridades:** Sistema de pestañas dinámicas para filtrar tareas en **Alta**, **Media** o **Baja** prioridad.
* **Interfaz Realista:** * Diseño de papel rayado mediante `linear-gradients` en CSS.
    * Anillas de espiral realistas y lomo reforzado.
    * Pestañas de navegación con forma de flecha usando `clip-path`.

## Tecnologías Utilizadas

* **HTML5 Semántico:** Uso de etiquetas como `main`, `aside`, `article` y `section` para una estructura clara.
* **CSS3 Avanzado:** * **Layouts:** Grid y Flexbox para la organización del cuaderno y el footer.
    * **Efectos:** `clip-path` para las pestañas, `gradients` para las líneas del papel y `drop-shadow` para profundidad.
* **JavaScript (ES6+):** * Manipulación dinámica del DOM (añadir/borrar nodos).
    * Gestión de eventos (`addEventListener` y delegación de eventos).
    * Uso de métodos de array como `.filter()` y `.map()` para el renderizado.