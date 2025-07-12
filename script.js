// Se ejecuta cuando todo el contenido HTML ha sido cargado
import { db, doc, setDoc, getDoc, onSnapshot } from "./firebase-init.js";
document.addEventListener('DOMContentLoaded', function() {
    
    // --- BASE DE DATOS DE ENTRENAMIENTOS ---
    // Un objeto que contiene todos los entrenamientos por fecha
    const workouts = {};


    // --- ELEMENTOS DEL DOM ---
    // Se obtienen las referencias a los elementos del HTML con los que vamos a interactuar
    document.addEventListener('DOMContentLoaded', async function() {
		await loadWorkouts();
		refreshCalendar();
	});

	const dayNames = ["L", "M", "X", "J", "V", "S", "D"];
    const modal = document.getElementById("workout-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDetails = document.getElementById("modal-details");
    const closeButton = document.querySelector(".close-button");

    // --- FUNCIONES ---

    /**
     * Abre la ventana emergente (modal) con los detalles de un entrenamiento.
     * @param {Date} date - El objeto de fecha del día seleccionado.
     * @param {object} workout - El objeto de entrenamiento para esa fecha.
     */
    function openModal(date, workout) {
		const monthName = date.toLocaleString('es-ES', { month: 'long' });

		modalTitle.textContent = `${date.getDate()} de ${monthName}`;

		document.getElementById("modal-title-input").value = workout.title || "";
		document.getElementById("modal-details-input").value = workout.details || "";

		modal.dataset.date = date.toISOString().split('T')[0];

		modal.style.display = "block";
	}

    /**
     * Genera la estructura HTML para un mes completo del calendario.
     * @param {number} year - El año a generar.
     * @param {number} month - El mes a generar (0 = Enero, 1 = Febrero, etc.).
     * @returns {HTMLElement} - El elemento div que contiene el calendario del mes.
     */
    function generateCalendar(year, month) {
        const monthContainer = document.createElement('div');
        monthContainer.className = 'month';

        const monthName = new Date(year, month).toLocaleString('es-ES', { month: 'long', year: 'numeric' });
        monthContainer.innerHTML = `<div class="month-header">${monthName.charAt(0).toUpperCase() + monthName.slice(1)}</div>`;
        
        const grid = document.createElement('div');
        grid.className = 'days-grid';
        
        dayNames.forEach(name => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.className = 'day-name';
            dayNameDiv.innerText = name;
            grid.appendChild(dayNameDiv);
        });

        const firstDay = (new Date(year, month).getDay() + 6) % 7; // Lunes = 0
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDay; i++) {
            grid.insertAdjacentHTML('beforeend', '<div class="day empty"></div>');
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.innerText = i;
            const currentDate = new Date(year, month, i);
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            
            const workout = workouts[dateStr];
            if (workout) {
                dayDiv.classList.add(workout.type);
                dayDiv.addEventListener('click', () => openModal(currentDate, workout));
            } else {
                dayDiv.classList.add('no-workout');
            }
            grid.appendChild(dayDiv);
        }
        monthContainer.appendChild(grid);
        return monthContainer;
    }
	function refreshCalendar() {
		calendarGrid.innerHTML = "";
		monthsToDisplay.forEach(month => {
			calendarGrid.appendChild(generateCalendar(2025, month));
		});
	}

   
    // --- LÓGICA PRINCIPAL ---

    // Asignar eventos para cerrar el modal
    closeButton.onclick = () => modal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Generar y mostrar los calendarios en la página
    const calendarGrid = document.getElementById('calendar-grid');
    const monthsToDisplay = [6, 7, 8, 9]; // Julio, Agosto, Septiembre, Octubre
    monthsToDisplay.forEach(month => {
        calendarGrid.appendChild(generateCalendar(2025, month));
    });
});
	// loadWorkouts
	async function loadWorkouts() {
    const docRef = doc(db, "workouts", "plan-maraton");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        Object.assign(workouts, data);
        console.log("Datos cargados de Firestore:", workouts);
    } else {
        console.log("No hay plan guardado todavía.");
    }

    // Suscribirse en tiempo real
    onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            Object.assign(workouts, docSnap.data());
            refreshCalendar();
            console.log("Actualización en tiempo real recibida.");
        }
    });
}

	// SaveWorkouts
	async function saveWorkouts() {
    const docRef = doc(db, "workouts", "plan-maraton");
    await setDoc(docRef, workouts);
    alert("¡Cambios guardados en Firestore!");
}
	// Evento boton de guardar
	document.getElementById("save-button").addEventListener("click", () => {
		const dateStr = modal.dataset.date;
		const newTitle = document.getElementById("modal-title-input").value;
		const newDetails = document.getElementById("modal-details-input").value;

		workouts[dateStr] = workouts[dateStr] || {};
		workouts[dateStr].title = newTitle;
		workouts[dateStr].details = newDetails;

		// Asigna un tipo genérico si no tiene uno
		if (!workouts[dateStr].type) {
			workouts[dateStr].type = "suave";
		}

		saveWorkouts();
		modal.style.display = "none";
	});
