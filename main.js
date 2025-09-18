console.log("Go");

// Elementos del DOM
const containerList = document.querySelector(".container-list");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const backButton = document.getElementById("backButton"); // Botón "Volver al inicio"

// Lista de objetos vintage (si no hay en localStorage, usa estos por defecto)
let antique = JSON.parse(localStorage.getItem("antique")) || [
    {
        desc: "Broche tembladera del siglo XVIII, oro esmalte y esmeraldas. Madrid, museo arqueológico",
        image: "img/broche-tembladera-oro-esmalte-esmeraldas-siglo-xviii.jpg"
    },
    {
        desc: "Colgante en girandolé de esmeraldas y diamantes con engaste embutido en oro  y plata, probablemente realizado en España hacia mediados del siglo XVIII.",
        image: "img/colgante-girandole-esmeraldas-diamantes-siglo-xviii.jpg"
    },
    {
        desc: "Anverso y reverso siglo XVIII. Es muy importante ver la parte de atrás de una joya, siempre hay que darle la vuelta.",
        image: "img/anverso-y-reverso-siglo-xviii.jpg"
    },
    {
        desc: "Sevigné española, 1 ª mitad siglo XVIII en oro y esmeraldas",
        image: "img/sevigne-espanola-en-oro-y-esmeraldas-siglo-xviii.jpg"
    }
];

// Guardar la lista en localStorage (por si se actualiza en el futuro)
function saveToLocalStorage() {
    localStorage.setItem("antique", JSON.stringify(antique));
}

// Índice de la tarjeta abierta (si hay alguna)
let openedIndex = JSON.parse(localStorage.getItem("openedIndex"));

// Guardar índice abierto
function saveOpenedIndex() {
    localStorage.setItem("openedIndex", JSON.stringify(openedIndex));
}

// Renderizar las tarjetas (una o todas según estado)
function renderAntiques(list = antique) {
    containerList.innerHTML = "";

    // Mostrar u ocultar el botón "Volver al inicio"
    if (openedIndex !== null && list[openedIndex]) {
        backButton.style.display = "inline-block";
    } else {
        backButton.style.display = "none";
    }

    // Si no hay elementos, mostrar mensaje
    if (list.length === 0) {
        containerList.innerHTML = "<p>No se encontraron objetos que coincidan con la búsqueda.</p>";
        return;
    }

    // Si hay una tarjeta abierta, mostrar solo esa
    if (openedIndex !== null && list[openedIndex]) {
        const item = list[openedIndex];
        const card = createCard(item, openedIndex, true);
        containerList.appendChild(card);
        return;
    }

    // Mostrar todas las tarjetas
    list.forEach((item, index) => {
        const card = createCard(item, index, false);
        containerList.appendChild(card);
    });
}

// Crear una tarjeta (item: objeto, index: posición, isOpen: si está abierta)
function createCard(item, index, isOpen) {
    const card = document.createElement("div");
    card.classList.add("antique-card");
    if (isOpen) card.classList.add("opened");

    card.innerHTML = `
        <img src="${item.image}" alt="Objeto vintage" />
        <p>${item.desc}</p>
    `;

    // Evento click para abrir/cerrar tarjeta
    card.addEventListener("click", () => {
        if (openedIndex === index) {
            // Si ya está abierta, se cierra
            openedIndex = null;
        } else {
            // Abrir esta tarjeta
            openedIndex = index;
        }
        saveOpenedIndex();
        searchAntiques(); // Actualiza la vista
    });

    return card;
}

// Buscar objetos según texto en input
function searchAntiques() {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
        renderAntiques();
        return;
    }

    const filtered = antique.filter(item => item.desc.toLowerCase().includes(query));

    // Si la tarjeta abierta no está en los resultados, se cierra
    if (openedIndex !== null && !filtered[openedIndex]) {
        openedIndex = null;
        saveOpenedIndex();
    }

    renderAntiques(filtered);
}

// Evento: buscar al hacer clic en el botón
searchButton.addEventListener("click", searchAntiques);

// Evento: buscar al pulsar Enter
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchAntiques();
    }
});

// Evento: volver al inicio (mostrar todas las tarjetas)
backButton.addEventListener("click", () => {
    openedIndex = null;
    saveOpenedIndex();
    searchAntiques(); // Vuelve a mostrar todas o la búsqueda actual
});

// Renderizar al cargar
renderAntiques();
