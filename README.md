# CineHub

Aplicación web full stack para explorar películas y series con datos en tiempo real.

El frontend consume un backend propio en Spring Boot que actúa de gateway hacia la API de TMDB, transformando las respuestas JSON en un modelo de dominio propio antes de exponerlas al cliente.

**Demo:** [carlosriberadonet.github.io/CineHub](https://carlosriberadonet.github.io/CineHub/)  
**Backend:** [github.com/CarlosRiberaDonet/CineHub-Backend](https://github.com/CarlosRiberaDonet/CineHub-Backend)

---

## Stack

| Capa | Tecnología |
|------|------------|
| Frontend | HTML · CSS · JavaScript |
| Backend | Java · Spring Boot |
| Base de datos | MySQL |
| API externa | TMDB |
| Despliegue | GitHub Pages (frontend) · Railway (backend) |

---

## Arquitectura

```
Cliente (GitHub Pages)
      │
      │  fetch
      ▼
Backend Spring Boot (Railway)
      │
      │  HTTP
      ▼
API TMDB
```

El backend aplica transformación y normalización de los datos antes de enviarlos al frontend, evitando que el cliente dependa directamente de la estructura de TMDB.

### Estructura del backend

```
src/
├── controllers/   # Endpoints REST
├── services/      # Lógica de negocio y construcción de URLs
├── dao/           # Acceso a la API de TMDB
├── dto/           # Objetos de transferencia de datos
└── entity/        # Modelo de dominio propio
```

---

## Endpoints

| Endpoint | Descripción |
|----------|-------------|
| `GET /peliculas/upcoming` | Próximos estrenos |
| `GET /peliculas/playing` | En cartelera |
| `GET /peliculas/trendingDayMovies` | Tendencias del día |
| `GET /peliculas/topMovies` | Top películas |
| `GET /peliculas/details?id={id}` | Detalle de película |
| `GET /famous/credits?id={id}` | Reparto |
| `GET /trailer?id={id}` | Trailer |

---

## Ejecutar en local

### Backend

```bash
git clone https://github.com/CarlosRiberaDonet/CineHub-Backend
cd CineHub-Backend
./mvnw spring-boot:run
```

Asegúrate de tener configurado en `application.properties`:

```properties
server.port=${PORT:8080}
```

### Frontend

```bash
git clone https://github.com/CarlosRiberaDonet/CineHub
cd CineHub
# Abre con Live Server (VS Code) o cualquier servidor local
```

En `js/api.js`, asegúrate de que `BASE_URL` apunta al backend local:

```javascript
const BASE_URL = "http://localhost:8080";
```

---

## Despliegue

| Componente | Plataforma | URL |
|------------|------------|-----|
| Frontend | GitHub Pages | [carlosriberadonet.github.io/CineHub](https://carlosriberadonet.github.io/CineHub/) |
| Backend | Railway | `https://peliculasonlinehd-production.up.railway.app` |

Para producción, cambia en `js/api.js`:

```javascript
const BASE_URL = "https://peliculasonlinehd-production.up.railway.app";
```

### CORS configurado para

- `http://localhost:5500` (desarrollo local)
- `https://carlosriberadonet.github.io` (GitHub Pages)

---

## Autor

**Carlos Ribera Donet**  
[github.com/CarlosRiberaDonet](https://github.com/CarlosRiberaDonet) · [linkedin.com/in/carlos-r-335390276](https://www.linkedin.com/in/carlos-r-335390276/)
