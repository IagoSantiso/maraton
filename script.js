// Se ejecuta cuando todo el contenido HTML ha sido cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // --- BASE DE DATOS DE ENTRENAMIENTOS ---
    // Un objeto que contiene todos los entrenamientos por fecha
    const workouts = {
        "2025-07-14": { type: "suave", title: "🏃‍♂️ Semana 0: Rodaje Suave", details: "Semana de Arranque.\nEntrenamiento: 30 min de rodaje suave (R1) + 6 rectas de 80m." },
        "2025-07-16": { type: "suave", title: "🏃‍♂️ Semana 0: Rodaje con Cambios", details: "Semana de Arranque.\nEntrenamiento: 35 min de rodaje suave (R1) con algunos cambios de ritmo suaves." },
        "2025-07-18": { type: "suave", title: "🏃‍♂️ Semana 0: Rodaje Muy Suave", details: "Semana de Arranque.\nEntrenamiento: 30 min de rodaje muy suave (R1)." },
        "2025-07-19": { type: "larga", title: "⛰️ Semana 0: Tirada Larga", details: "Semana de Arranque.\nEntrenamiento: 8 km a ritmo cómodo (R2)." },
        "2025-07-21": { type: "series", title: "⚡ Semana 1: Series", details: "Fase de Adaptación.\nEntrenamiento: 15' cal. + 6x400m a R4 (rec 90s) + 10' enf." },
        "2025-07-23": { type: "tempo", title: "💨 Semana 1: Tempo", details: "Fase de Adaptación.\nEntrenamiento: 10' cal. + 15' a R3 + 10' enf." },
        "2025-07-25": { type: "suave", title: "🏃‍♂️ Semana 1: Rodaje Suave", details: "Fase de Adaptación.\nEntrenamiento: 30 min a R1." },
        "2025-07-26": { type: "larga", title: "⛰️ Semana 1: Tirada Larga", details: "Fase de Adaptación.\nEntrenamiento: 10 km a R2." },
        "2025-07-28": { type: "series", title: "⚡ Semana 2: Series", details: "Fase de Adaptación.\nEntrenamiento: 15' cal. + 8x400m a R4 (rec 90s) + 10' enf." },
        "2025-07-30": { type: "tempo", title: "💨 Semana 2: Tempo", details: "Fase de Adaptación.\nEntrenamiento: 10' cal. + 20' a R3 + 10' enf." },
        "2025-08-01": { type: "suave", title: "🏃‍♂️ Semana 2: Rodaje Suave", details: "Fase de Adaptación.\nEntrenamiento: 35 min a R1." },
        "2025-08-02": { type: "larga", title: "⛰️ Semana 2: Tirada Larga", details: "Fase de Adaptación.\nEntrenamiento: 12 km a R2." },
        "2025-08-04": { type: "series", title: "⚡ Semana 3: Series", details: "Fase de Adaptación.\nEntrenamiento: 15' cal. + 4x1000m a R4 (rec 3') + 10' enf." },
        "2025-08-06": { type: "tempo", title: "💨 Semana 3: Tempo", details: "Fase de Adaptación.\nEntrenamiento: 10' cal. + 2x15' a R3 (rec 3') + 10' enf." },
        "2025-08-08": { type: "suave", title: "🏃‍♂️ Semana 3: Rodaje Suave", details: "Fase de Adaptación.\nEntrenamiento: 30 min a R1." },
        "2025-08-09": { type: "larga", title: "⛰️ Semana 3: Tirada Larga", details: "Fase de Adaptación.\nEntrenamiento: 14 km a R2." },
        "2025-08-11": { type: "series", title: "⚡ Semana 4: Series (Descarga)", details: "Fase de Adaptación.\nEntrenamiento: 15' cal. + 5x400m a R4 (rec 90s) + 10' enf." },
        "2025-08-13": { type: "tempo", title: "💨 Semana 4: Tempo (Descarga)", details: "Fase de Adaptación.\nEntrenamiento: 10' cal. + 15' a R3 + 10' enf." },
        "2025-08-15": { type: "suave", title: "🏃‍♂️ Semana 4: Rodaje Suave (Descarga)", details: "Fase de Adaptación.\nEntrenamiento: 25 min a R1." },
        "2025-08-16": { type: "larga", title: "⛰️ Semana 4: Tirada Larga (Descarga)", details: "Fase de Adaptación.\nEntrenamiento: 10 km a R2." },
        "2025-08-18": { type: "series", title: "⚡ Semana 5: Series", details: "Fase Específica.\nEntrenamiento: 15' cal. + 5x1000m a R4 (rec 3') + 10' enf." },
        "2025-08-20": { type: "tempo", title: "💨 Semana 5: Tempo", details: "Fase Específica.\nEntrenamiento: 10' cal. + 25' a R3 + 10' enf." },
        "2025-08-22": { type: "suave", title: "🏃‍♂️ Semana 5: Rodaje Suave", details: "Fase Específica.\nEntrenamiento: 40 min a R1." },
        "2025-08-23": { type: "larga", title: "⛰️ Semana 5: Tirada Larga", details: "Fase Específica.\nEntrenamiento: 16 km a R2." },
        "2025-08-25": { type: "series", title: "⚡ Semana 6: Series", details: "Fase Específica.\nEntrenamiento: 15' cal. + 6x1000m a R4 (rec 2'30s) + 10' enf." },
        "2025-08-27": { type: "tempo", title: "💨 Semana 6: Tempo", details: "Fase Específica.\nEntrenamiento: 10' cal. + 2x20' a R3 (rec 4') + 10' enf." },
        "2025-08-29": { type: "suave", title: "🏃‍♂️ Semana 6: Rodaje Suave", details: "Fase Específica.\nEntrenamiento: 35 min a R1." },
        "2025-08-30": { type: "larga", title: "⛰️ Semana 6: Tirada Larga", details: "Fase Específica.\nEntrenamiento: 15 km a R2 (últimos 3km a R3)." },
        "2025-09-01": { type: "series", title: "⚡ Semana 7: Series", details: "Fase Específica.\nEntrenamiento: 15' cal. + 3x1600m a R4 (rec 4') + 10' enf." },
        "2025-09-03": { type: "tempo", title: "💨 Semana 7: Tempo", details: "Fase Específica.\nEntrenamiento: 10' cal. + 30' a R3 + 10' enf." },
        "2025-09-05": { type: "suave", title: "🏃‍♂️ Semana 7: Rodaje Suave", details: "Fase Específica.\nEntrenamiento: 40 min a R1." },
        "2025-09-06": { type: "larga", title: "⛰️ Semana 7: Tirada Larga", details: "Fase Específica.\nEntrenamiento: 18 km a R2." },
        "2025-09-08": { type: "series", title: "⚡ Semana 8: Series (Descarga)", details: "Fase Específica.\nEntrenamiento: 15' cal. + 4x1000m a R4 (rec 3') + 10' enf." },
        "2025-09-10": { type: "tempo", title: "💨 Semana 8: Tempo (Descarga)", details: "Fase Específica.\nEntrenamiento: 10' cal. + 20' a R3 + 10' enf." },
        "2025-09-12": { type: "suave", title: "🏃‍♂️ Semana 8: Rodaje Suave (Descarga)", details: "Fase Específica.\nEntrenamiento: 30 min a R1." },
        "2025-09-13": { type: "larga", title: "⛰️ Semana 8: Tirada Larga (Descarga)", details: "Fase Específica.\nEntrenamiento: 12 km a R2." },
        "2025-09-15": { type: "series", title: "⚡ Semana 9: Series (Pico)", details: "Fase de Pico y Taper.\nEntrenamiento: 15' cal. + 4x1600m a R4 (rec 3'30s) + 10' enf." },
        "2025-09-17": { type: "tempo", title: "💨 Semana 9: Tempo (Pico)", details: "Fase de Pico y Taper.\nEntrenamiento: 10' cal. + 3x15' a R3 (rec 3') + 10' enf." },
        "2025-09-19": { type: "suave", title: "🏃‍♂️ Semana 9: Rodaje Suave (Pico)", details: "Fase de Pico y Taper.\nEntrenamiento: 30 min a R1." },
        "2025-09-20": { type: "larga", title: "⛰️ Semana 9: Tirada Larga (PICO)", details: "Fase de Pico y Taper.\nEntrenamiento: 20 km a R2. ¡LA MÁS LARGA!" },
        "2025-09-22": { type: "series", title: "⚡ Semana 10: Series (Pre-Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 15' cal. + 3x1000m a R3-R4 + 10' enf." },
        "2025-09-24": { type: "tempo", title: "💨 Semana 10: Tempo (Pre-Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 10' cal. + 15' a R3 + 10' enf." },
        "2025-09-26": { type: "suave", title: "🏃‍♂️ Semana 10: Rodaje Suave (Pre-Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 30 min a R1." },
        "2025-09-27": { type: "larga", title: "⛰️ Semana 10: Tirada Larga (Pre-Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 14 km a R2." },
        "2025-09-29": { type: "series", title: "⚡ Semana 11: Series (Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 10' cal. + 4x400m a R3 + 10' enf." },
        "2025-10-01": { type: "tempo", title: "💨 Semana 11: Tempo (Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 10' cal. + 2 km a R3 + 10' enf." },
        "2025-10-03": { type: "suave", title: "🏃‍♂️ Semana 11: Rodaje Suave (Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 25 min a R1." },
        "2025-10-04": { type: "larga", title: "⛰️ Semana 11: Tirada Larga (Taper)", details: "Fase de Pico y Taper.\nEntrenamiento: 8 km suaves (R1-R2)." },
        "2025-10-06": { type: "descanso", title: "🏃‍♂️ Semana 12: Activación", details: "Semana de Carrera.\nEntrenamiento: 20 min muy suaves a R1 + 4 rectas de 100m." },
        "2025-10-08": { type: "descanso", title: "🏃‍♂️ Semana 12: Activación final", details: "Semana de Carrera.\nEntrenamiento: 15 min muy suaves + 2-3 rectas cortas." },
        "2025-10-09": { type: "descanso", title: "🧘‍♂️ Semana 12: DESCANSO", details: "Semana de Carrera.\nDescanso total. Hidrátate y come bien." },
        "2025-10-10": { type: "descanso", title: "🧘‍♂️ Semana 12: DESCANSO", details: "Semana de Carrera.\nDescanso total. Prepara todo para el gran día." },
        "2025-10-11": { type: "carrera", title: "🏁🏁🏁 ¡MEDIA MARATÓN DE GIJÓN! 🏁🏁🏁", details: "¡A disfrutar! Sal con cabeza y confía en tu entrenamiento. ¡Mucho éxito!" },
    };

    // --- ELEMENTOS DEL DOM ---
    // Se obtienen las referencias a los elementos del HTML con los que vamos a interactuar
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
        modalTitle.textContent = `${workout.title} - ${date.getDate()} de ${monthName}`;
        modalDetails.textContent = workout.details;
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
