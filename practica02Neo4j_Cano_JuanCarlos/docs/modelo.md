# Práctica 02: Modelado de Grafos - Red de Rutas de Senderismo

## 1. Definir el Problema y los Accesos

### 1.1 Escenario Elegido y Usuarios (Caso Wikiloc / Strava)
*   **Escenario:** Plataforma de rutas deportivas y senderismo que almacena la topología exacta del terreno (caminos, refugios, fuentes, cimas) y la actividad de los usuarios que exploran y guardan rutas.
*   **Usuarios y sistemas que interactúan:**
    *   **Senderista:** Explora el mapa, guarda rutas para hacerlas el fin de semana y registra qué caminos ha completado.
    *   **Administrador:** Da de alta nuevos tramos, actualiza el estado de los caminos (ej. cierres por nieve) y añade puntos de interés (fuentes, refugios).
    *   **Servicios de Rescate:** En caso de accidente, consultan la vía de evacuación más rápida o el acceso para vehículos más cercano calculando saltos en el grafo.

### 1.2 Seis Preguntas de Negocio que la Base de Datos Debe Responder
1.  ¿A qué puntos (destinos) puedo ir directamente desde un punto de inicio concreto (ej. Parking Base) y qué dificultad tienen los tramos?
2.  ¿Qué refugios son accesibles a un máximo de 2 saltos desde un punto de inicio para planificar pernoctas?
3.  ¿Cómo puedo llegar de un collado a una fuente si el camino directo está cortado, garantizando que todos los tramos de la alternativa estén "Abiertos"?
4.  En caso de emergencia en la cima, ¿cuál es el camino más corto de evacuación (shortestPath) hacia el parking base?
5.  ¿Cómo el equipo de mantenimiento puede reabrir un tramo cerrado y registrar transaccionalmente la fecha de revisión?
6.  Cuando un usuario completa una ruta que ya había hecho antes, ¿cómo se incrementa su contador de veces completadas usando parámetros y la cláusula ON MATCH?

### 1.3 Datos con Mayor Frecuencia de Lectura y Escritura
*   **Lecturas masivas en caliente:**
    *   Cálculo de rutas óptimas (Shortest Path) por parte de los senderistas en tiempo real desde la app móvil.
    *   Consultas de exploración del mapa .
*   **Escrituras y actualizaciones:**
    *   Usuarios guardando o completando rutas al terminar su jornada.
    *   Guardas forestales actualizando el estado de un camino tras un desprendimiento.

### 1.4 Requisitos de Seguridad, Privacidad, Disponibilidad y Crecimiento
*   **Seguridad:** Conexiones cifradas. Separación de roles: la API de la app móvil solo tiene permisos de lectura, mientras que los guardas forestales tienen rol de edición.
*   **Privacidad:** Los datos personales reales de los usuarios están protegidos. El historial de rutas completadas se anonimiza en caso de baja del usuario, preservando la topología de la montaña.
*   **Disponibilidad:** Clúster de Neo4j en alta disponibilidad para asegurar que los servicios de rescate siempre tengan acceso al mapa topológico, incluso si cae un nodo servidor.
*   **Crecimiento escalable:** Prevención de supernodos. No se crea un nodo genérico "España" al que se conecten todos los tramos, ya que ralentizaría las búsquedas topológicas.

---

## 2. Diseñar el Grafo de Nodos y Relaciones

### 2.1 Etiquetas de Nodos y Tipos de Relaciones
**1. Etiquetas de Nodos:**
*   :Usuario: Cuentas de deportistas (id, nombre, nivel_experiencia).
*   :Punto: Lugar físico del terreno (id, nombre, elevacion).
*   :Refugio: Punto donde pernoctar (id, nombre, plazas, elevacion).
*   :Fuente: Punto de agua potable (id, nombre, potable).
*   :RutaGuardada: Colección de tramos guardada (id, titulo, publica).

**2. Tipos de Relaciones:**
*   (:Punto)-[:TRAMO_HACIA {distancia_km: 3.0, desnivel_m: 600, dificultad: "Media", estado: "Abierto"}]->(:Punto)
*   (:Usuario)-[:HA_COMPLETADO {veces_completada: 1, ultima_vez: date()}]->(:RutaGuardada)
*   (:RutaGuardada)-[:INCLUYE_TRAMO {orden: 1}]->(:Punto)

### 2.2 Nodos y Relaciones de Ejemplo en Cypher
```cypher
CREATE (p1:Punto {id: "PUN-01", nombre: "Parking Base", elevacion: 1200})
CREATE (p2:Punto {id: "PUN-02", nombre: "Collado Este", elevacion: 1800})
CREATE (r1:Refugio {id: "REF-01", nombre: "Alto Campoo", plazas: 40})
CREATE (p1)-[:TRAMO_HACIA {distancia_km: 3.0, dificultad: "Media", estado: "Abierto"}]->(p2)
CREATE (p2)-[:TRAMO_HACIA {distancia_km: 1.5, dificultad: "Facil", estado: "Abierto"}]->(r1);