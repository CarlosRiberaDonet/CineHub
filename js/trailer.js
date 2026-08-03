
// Pasa el id de la película al backend para obtener la url del trailer
const BASE_URL = `${window.location.protocol}//${window.location.hostname}/api`;

export function abrirTrailer(idPelicula) {
    fetch(`${BASE_URL}/trailer/${idPelicula}`)
        .then(response => response.text())
        .then(url => {
            window.open(url, "_blank");
        })
        .catch(error => console.error("Error obteniendo trailer:", error));
}
