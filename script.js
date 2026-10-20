/* =========================================
   CONTENIDO DE LAS VENTANAS
   ========================================= */

const details = {
  blog: [
    "Traducción",
    "Adaptación del contenido del artículo fuente a la audiencia de LATAM.",
  ],

  updates: [
    "Planificación",
    "Sesiones para discutir los temas del blog para el siguiente mes y definir el calendario de publicación.",
  ],

  links: [
    "Keywords",
    "Búsqueda de palabras clave para SEO en los artículos seleccionados y a partir de ahí se generan propuestas de temas para traducir o actualizar.",
  ],

  wordpress: [
    "Publicación",
    "Preparación del contenido en HTML para su programación y publicación en WordPress",
  ],

  kb: [
    "Base de conocimientos",
    "Traduzco, actualizo y preparo artículos de ayuda en Joomla.",
  ],

  joomla: [
    "Gestión de contenido en Joomla",
    "Publicación y gestión del contenido en Joomla.",
  ],

  crowdin: [
    "Textos de la plataforma",
    "Trabajo las traducciones de cadenas de texto en Crowdin: botones, etiquetas y mensajes de las herramientas.",
  ],

  new: [
    "Artículos nuevos",
    "Traduzco el contenido y preparo su estructura y formato para publicarlo en español.",
  ],

  kbUpdates: [
    "Actualizaciones",
    "Actualización de los artículos de la base de conocimientos.",
  ],

  brokenLinks: [
    "Enlaces rotos",
    "Revisión y corrección de enlaces rotos.",
  ],

  categories: [
    "Categorías",
    "Trabajo la organización del contenido dentro de las categorías de la base de conocimientos.",
  ],

  structure: [
    "Reestructuración de información",
    "Ajusto la organización del contenido cuando una actualización requiere cambiar secciones o la manera de presentar las instrucciones.",
  ],

  title: [
    "1 · Título",
    "El título presenta la acción o el tema que el usuario encontrará en la guía.",
  ],

  alias: [
    "2 · Alias",
    "Este campo corresponde al identificador utilizado en la URL del artículo. Forma parte de su configuración en Joomla.",
  ],

  body: [
    "3 · Contenido y formato",
    "Aquí trabajo el texto, los encabezados, los destacados y los enlaces del artículo.",
  ],

  settings: [
    "4 · Configuración",
    "Reviso los ajustes del artículo, como categoría, idioma y estado de publicación.",
  ],

  technical: [
    "5 · Estructura del artículo",
    "El contenido también contiene HTML y elementos técnicos que deben conservarse al preparar la publicación.",
  ],

  difference: [
    "Crowdin y Joomla en mi trabajo",
    `
      <div class="callout">
        <strong>
          En SendPulse, uso Crowdin para los textos de las herramientas
          dentro de la plataforma.
        </strong>

        <p>
          Las páginas y la base de conocimientos se trabajan en Joomla;
          el blog, en WordPress.
        </p>
      </div>
    `,
  ],

   docs: [
    "Documentos recibidos por Mattermost",
    `
      <p>
        Documentos enviados por el equipo de Ucrania
        u otros miembros del equipo.
      </p>
    `,
  ],

  editorImg: [
    "Artículo en Joomla",
    `
      <img
        src="images/joomla.png"
        alt="Captura completa del editor de Joomla"
      />
    `,
  ],

  joomlaOverview: [
    "Publicación y gestión del contenido en Joomla",
    `
      <img
        src="images/joomla-inicio.png"
        alt="Listado de artículos en el administrador de Joomla"
      />
    `,
  ],

  aliasExample: [
    "ALIAS",
    `
      <div style="display: grid; gap: 24px;">
        <img
          src="images/alias.png"
          alt="Primer ejemplo de alias en una URL"
        />

        <img
          src="images/alias2.png"
          alt="Segundo ejemplo de alias en una URL"
        />
      </div>
    `,
  ],

  idsExample: [
    "ID's",
    `
      <img
        src="images/ids.png"
        alt="Listado de artículos en Joomla con la columna de ID resaltada"
      />
    `,
  ],

  menuEditorImg: [
    "Menús en Joomla",
    `
      <img
        src="images/joomla-menu.png"
        alt="Captura del editor de menú en Joomla"
      />
    `,
  ],

  crowdinImg: [
    "Mi espacio de trabajo en Crowdin",
    `
      <img
        src="images/crowdin.png"
        alt="Captura de Crowdin facilitada por Nohely"
      />
    `,
  ],
};

/* =========================================
   ELEMENTOS Y ESTADO
   ========================================= */

const slides = [...document.querySelectorAll(".slide")];

const titles = slides.map((slide, index) => {
  return slide.dataset.title || `Diapositiva ${index + 1}`;
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeButton = modal.querySelector(".close");

const nav = document.getElementById("nav");
const barTitle = document.getElementById("barTitle");
const count = document.getElementById("count");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const outlineButton = document.getElementById("outline");
const resetButton = document.getElementById("reset");

const revealButtons = [
  ...document.querySelectorAll("[data-reveal]"),
];

let current = 0;

const answered = new Set();

/* =========================================
   NAVEGACIÓN ENTRE DIAPOSITIVAS
   ========================================= */

nav.replaceChildren();

titles.forEach((title, index) => {
  const button = document.createElement("button");

  button.type = "button";
  button.title = title;
  button.setAttribute("aria-label", `Ir a ${title}`);

  button.addEventListener("click", () => {
    go(index);
  });

  nav.append(button);
});

function go(index) {
  if (!Number.isInteger(index) || slides.length === 0) return;

  current = Math.max(0, Math.min(slides.length - 1, index));

  closeAllPopups();

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === current);
  });

  [...nav.children].forEach((button, buttonIndex) => {
    const isCurrent = buttonIndex === current;

    button.classList.toggle("active", isCurrent);
    button.setAttribute(
      "aria-current",
      isCurrent ? "step" : "false",
    );
  });

  barTitle.textContent = titles[current].toUpperCase();
  count.textContent = `${current + 1} / ${slides.length}`;

  prevButton.disabled = current === 0;
  nextButton.disabled = current === slides.length - 1;

  window.scrollTo(0, 0);
}

prevButton.addEventListener("click", () => {
  go(current - 1);
});

nextButton.addEventListener("click", () => {
  go(current + 1);
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    go(Number(button.dataset.go));
  });
});

/* =========================================
   VENTANAS DE EXPLICACIONES E IMÁGENES
   ========================================= */

function openDetail(key) {
  const detail = details[key];

  if (!detail) {
    console.warn(`No existe contenido para data-detail="${key}".`);
    return;
  }

  modalTitle.textContent = detail[0];
  modalBody.innerHTML = detail.slice(1).join("");

  showModal();
}

function showModal() {
  if (!modal.open) {
    modal.showModal();
  }

  modal.scrollTop = 0;
}

function closeModal() {
  modal.close();
}

/* =========================================
   PALOMITAS Y BOTONES CON DETALLES

   .check sin data-detail:
   Solo marca la palomita en azul.

   .check con data-detail:
   Marca la palomita y abre su ventana.

   Otros botones con data-detail:
   Abren su ventana.
   ========================================= */

document
  .querySelectorAll(".check, [data-detail]")
  .forEach((button) => {
    const isCheck = button.classList.contains("check");

    if (isCheck) {
      button.setAttribute(
        "aria-pressed",
        button.classList.contains("done") ? "true" : "false",
      );
    }

    button.addEventListener("click", () => {
      if (isCheck) {
        button.classList.add("done");
        button.setAttribute("aria-pressed", "true");
      }

      const key = button.dataset.detail;

      // Sin data-detail, la acción termina al marcar el tick.
      if (!key) return;

      openDetail(key);
    });
  });

closeButton.addEventListener("click", closeModal);

/* Cerrar al pulsar fuera de la ventana. */
modal.addEventListener("click", (event) => {
  if (event.target !== modal) return;

  const rect = modal.getBoundingClientRect();

  const isOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (isOutside) {
    closeModal();
  }
});

/* =========================================
   ÍNDICE DEL ENCABEZADO
   ========================================= */

outlineButton.addEventListener("click", () => {
  modalTitle.textContent = "Índice";
  modalBody.replaceChildren();

  titles.forEach((title, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "menu-item";
    button.textContent = `${index + 1}. ${title}`;

    if (index === current) {
      button.setAttribute("aria-current", "step");
    }

    button.addEventListener("click", () => {
      closeModal();
      go(index);
    });

    modalBody.append(button);
  });

  showModal();
});

/* =========================================
   VENTANITAS DE ARTÍCULOS, MENÚS Y CATEGORÍAS
   ========================================= */

function closePopup(id, restoreFocus = false) {
  const popup = document.getElementById(id);

  const trigger = revealButtons.find((button) => {
    return button.dataset.reveal === id;
  });

  if (!popup) return;

  popup.classList.add("hidden");

  if (trigger) {
    trigger.setAttribute("aria-expanded", "false");

    if (restoreFocus) {
      trigger.focus();
    }
  }
}

function closeAllPopups() {
  revealButtons.forEach((button) => {
    closePopup(button.dataset.reveal);
  });
}

revealButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = document.getElementById(button.dataset.reveal);

    if (!popup) return;

    const wasOpen =
      button.getAttribute("aria-expanded") === "true";

    closeAllPopups();

    if (!wasOpen) {
      popup.classList.remove("hidden");
      button.setAttribute("aria-expanded", "true");

      popup.querySelector("[data-hide]")?.focus();
    }
  });
});

document.querySelectorAll("[data-hide]").forEach((button) => {
  button.addEventListener("click", () => {
    closePopup(button.dataset.hide, true);
  });
});

/* Cerrar al pulsar fuera de las tarjetas. */
document.addEventListener("click", (event) => {
  if (!event.target.closest(".concept-card")) {
    closeAllPopups();
  }
});

/* =========================================
   ACTIVIDAD: ¿CROWDIN O JOOMLA?
   ========================================= */

const quizAnswers = {
  0: {
    correct: "crowdin",
    explanation:
      "Crowdin: el texto pertenece a la interfaz de la herramienta.",
  },

  1: {
    correct: "joomla",
    explanation:
      "Joomla: el artículo pertenece a la base de conocimientos.",
  },
};

document.querySelectorAll("[data-q]").forEach((button) => {
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", () => {
    const question = button.dataset.q;
    const answer = quizAnswers[question];

    if (!answer) return;

    const isCorrect = button.dataset.a === answer.correct;

    document.querySelectorAll("[data-q]").forEach((option) => {
      if (option.dataset.q !== question) return;

      const isSelected = option === button;

      option.classList.toggle("selected", isSelected);
      option.setAttribute(
        "aria-pressed",
        isSelected ? "true" : "false",
      );
    });

    const result = document.getElementById(`a${question}`);

    result.classList.remove("hidden");
    result.textContent =
      (isCorrect ? "¡Exacto! " : "En este caso, ") +
      answer.explanation;

    answered.add(question);

    if (answered.size === Object.keys(quizAnswers).length) {
      document.getElementById("lesson").classList.remove("hidden");
    }
  });
});

/* =========================================
   REINICIAR RECORRIDO
   ========================================= */

resetButton.addEventListener("click", () => {
  document.querySelectorAll(".check").forEach((button) => {
    button.classList.remove("done");
    button.setAttribute("aria-pressed", "false");
  });

  document.querySelectorAll(".choice").forEach((button) => {
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  });

  document.querySelectorAll(".answer").forEach((answer) => {
    answer.classList.add("hidden");
    answer.textContent = "";
  });

  document.getElementById("lesson").classList.add("hidden");

  answered.clear();
  closeAllPopups();

  if (modal.open) {
    closeModal();
  }

  go(0);
});

/* =========================================
   TECLADO
   ========================================= */

document.addEventListener("keydown", (event) => {
  // El diálogo general se cierra con Escape de forma nativa.
  if (modal.open) return;

  if (event.key === "Escape") {
    const openTrigger = revealButtons.find((button) => {
      return button.getAttribute("aria-expanded") === "true";
    });

    if (openTrigger) {
      closePopup(openTrigger.dataset.reveal, true);
      event.preventDefault();
    }

    return;
  }

  if (
    event.target.closest(
      "input, textarea, select, [contenteditable='true']",
    )
  ) {
    return;
  }

  if (event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    go(current + 1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    go(current - 1);
  }
});

/* =========================================
   INICIAR PRESENTACIÓN
   ========================================= */

go(0);
