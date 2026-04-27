// header.js
import { getMoviesByName } from './api.js'; // Solo se usa si quieres previsualizar resultados; ahora redirige a filmList

export default class Header {
  constructor(containerId, fragmentUrl) {
    this.containerId = containerId;   // ID del contenedor donde se insertará el header
    this.fragmentUrl = fragmentUrl;   // URL del fragmento HTML del header
  }

  // Método principal para cargar el HTML del header
  async load() {
    try {
      const res = await fetch(this.fragmentUrl);
      if (!res.ok) throw new Error(`Error al cargar ${this.fragmentUrl}`);
      const html = await res.text();

      // Inserta el HTML en el contenedor
      document.getElementById(this.containerId).innerHTML = html;

      // Inicializa interactividad de hamburguesa, dropdown y buscador
      this.init();
    } catch (err) {
      console.error(err);
    }
  }

  // Inicializa funcionalidades del header
  init() {
    const header = document.querySelector('.main-header');
    if (!header) return;

    // ==========================
    // Toggle hamburguesa (menú móvil)
    // ==========================
    const hamburger = header.querySelector('.hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        header.classList.toggle('nav-open');
      });
    }

    // ==========================
    // Toggle dropdowns de categorías
    // ==========================
    header.querySelectorAll('.has-dropdown > a').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = trigger.parentElement;

        // Cierra otros dropdowns abiertos
        header.querySelectorAll('.has-dropdown.open').forEach(openItem => {
          if (openItem !== parent) openItem.classList.remove('open');
        });

        // Alterna el dropdown actual
        parent.classList.toggle('open');
      });
    });

    // ==========================
    // Buscador: redirige a filmList.html
    // ==========================
    const searchForm = header.querySelector('.search-bar form');
    const searchInput = header.querySelector('#search-input');

    if (searchForm && searchInput) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (!query) return;

        // Redirige a filmList.html pasando el término como query
        const encodedQuery = encodeURIComponent(query);
        window.location.href = `filmList.html?search=${encodedQuery}`;
      });

      // Oculta resultados si se limpia input (opcional, si hay dropdown)
      searchInput.addEventListener('input', () => {
        // Aquí podrías ocultar dropdown de resultados si lo tuvieras
      });
    }
  }
}
