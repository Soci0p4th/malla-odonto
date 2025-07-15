// Requisitos por ramo: cada ramo con sus prerequisitos (array de ids)
const requisitos = {
  6: [1, 2, 3, 4, 5],        // Semestre 2: Fisiología requiere todo el Sem 1
  7: [3],                    // Bioquímica requiere Química
  8: [2, 3],                 // Microbiología requiere Biología y Química
  9: [4, 5],                 // Materiales Dentales I requiere Física e Introducción a Odontología
  10: [1, 5],                // Anatomía Dental requiere Anatomía e Introducción a Odontología
  11: [6, 7, 8, 9, 10],      // Sem 3 requiere todo Sem 2
  12: [7],                   // Farmacología requiere Bioquímica
  13: [8, 9],                // Radiología requiere Microbiología y Materiales Dentales I
  14: [9],                   // Materiales Dentales II requiere Materiales Dentales I
  15: [1, 2],                // Histología requiere Anatomía y Biología
  16: [11, 12, 13, 14, 15],  // Sem 4 requiere todo Sem 3
  17: [11],                  // Odontopediatría I requiere Patología
  18: [11],                  // Endodoncia I requiere Patología
  19: [11],                  // Cirugía Bucal I requiere Patología
  20: [4],                   // Biomecánica requiere Física
  21: [16, 17, 18, 19, 20],  // Sem 5 requiere todo Sem 4
  22: [17],                  // Odontopediatría II requiere Odontopediatría I
  23: [18],                  // Endodoncia II requiere Endodoncia I
  24: [19],                  // Cirugía Bucal II requiere Cirugía Bucal I
  25: [13],                  // Radiología Clínica requiere Radiología
  26: [21, 22, 23, 24, 25],  // Sem 6 requiere todo Sem 5
  27: [22],                  // Ortodoncia I requiere Odontopediatría II
  28: [24],                  // Cirugía Bucal III requiere Cirugía Bucal II
  29: [16],                  // Patología Oral requiere Patología
  30: [5],                   // Bioética requiere Introducción a Odontología
  31: [26, 27, 28, 29, 30],  // Sem 7 requiere todo Sem 6
  32: [27],                  // Ortodoncia II requiere Ortodoncia I
  33: [21],                  // Periodoncia Clínica requiere Periodoncia II
  34: [23],                  // Endodoncia Clínica requiere Endodoncia II
  35: [],                    // Investigación I no tiene prerequisitos
  36: [31, 32, 33, 34, 35],  // Sem 8 requiere todo Sem 7
  37: [32],                  // Ortodoncia Clínica requiere Ortodoncia II
  38: [28],                  // Cirugía Oral Avanzada requiere Cirugía Bucal III
  39: [],                    // Odontología Comunitaria no tiene prerequisitos
  40: [35],                  // Investigación II requiere Investigación I
  41: [36, 37, 38, 39, 40],  // Sem 9 requiere todo Sem 8
  42: [38],                  // Cirugía Maxilofacial I requiere Cirugía Oral Avanzada
  43: [],                    // Odontología Legal no tiene prerequisitos
  44: [],                    // Ética Profesional no tiene prerequisitos
  45: [],                    // Administración Clínica no tiene prerequisitos
  46: [41, 42, 43, 44, 45],  // Sem 10 requiere todo Sem 9
  47: [],                    // Odontología Preventiva no tiene prerequisitos
  48: [40],                  // Investigación III requiere Investigación II
  49: [],                    // Seminario de Titulación I no tiene prerequisitos
  50: [],                    // Educación para la Salud no tiene prerequisitos
  51: [46, 47, 48, 49, 50],  // Sem 11 requiere todo Sem 10
  52: [],                    // Práctica Profesional I no tiene prerequisitos
  53: [49],                  // Seminario de Titulación II requiere Seminario de Titulación I
  54: [],                    // Electivo I no tiene prerequisitos
  55: [],                    // Electivo II no tiene prerequisitos
  56: [51, 52, 53, 54, 55],  // Sem 12 requiere todo Sem 11
  57: [],                    // Práctica Profesional II no tiene prerequisitos
  58: [],                    // Electivo III no tiene prerequisitos
  59: [53],                  // Seminario de Titulación III requiere Seminario de Titulación II
  60: []                    // Trabajo de Titulación no tiene prerequisitos
};

document.addEventListener("DOMContentLoaded", () => {
  const ramos = document.querySelectorAll(".ramo");

  ramos.forEach(ramoEl => {
    ramoEl.addEventListener("click", () => {
      if (ramoEl.classList.contains("bloqueado")) return; // bloqueado no hace nada

      // Toggle aprobado
      if (ramoEl.classList.contains("aprobado")) {
        ramoEl.classList.remove("aprobado");
        ramoEl.classList.add("no-aprobado");
      } else {
        ramoEl.classList.remove("no-aprobado");
        ramoEl.classList.add("aprobado");
      }

      actualizarBloqueos();
    });
  });

  function actualizarBloqueos() {
    // Obtener ids de ramos aprobados
    const aprobados = new Set();
    document.querySelectorAll(".ramo.aprobado").forEach(el => {
      aprobados.add(parseInt(el.getAttribute("data-id")));
    });

    ramos.forEach(el => {
      const id = parseInt(el.getAttribute("data-id"));

      // Si ya está aprobado, nunca bloqueado
      if (el.classList.contains("aprobado")) {
        el.classList.remove("bloqueado");
        el.style.cursor = "pointer";
        return;
      }

      // Revisar requisitos
      if (requisitos[id] && requisitos[id].length > 0) {
        const cumple = requisitos[id].every(reqId => aprobados.has(reqId));
        if (cumple) {
          // Desbloquear
          el.classList.remove("bloqueado");
          el.classList.add("no-aprobado");
          el.style.cursor = "pointer";
        } else {
          // Bloquear
          el.classList.add("bloqueado");
          el.classList.remove("no-aprobado");
          el.style.cursor = "not-allowed";
        }
      } else {
        // Sin requisitos, desbloqueado
        el.classList.remove("bloqueado");
        el.classList.add("no-aprobado");
        el.style.cursor = "pointer";
      }
    });
  }

  // Inicializar bloqueos al cargar
  actualizarBloqueos();
});
