# Práctica 02: Modelo de Grafos - Red de Rutas de Senderismo

## 1. Definición del problema y los actores

### 1.1. Escenario y contexto
El escenario elegido es una **Red de rutas deportivas y senderismo** (estilo Strava o Wikiloc). La base de datos no solo almacena puntos aislados, sino la topología exacta del terreno: cómo se conectan los puntos de interés (cimas, fuentes, refugios y cruces) a través de tramos físicos de camino. 

**Actores principales:**
*   **Deportista/Senderista:** Explora el mapa, busca rutas circulares, planifica ascensos a cimas evaluando el esfuerzo y la disponibilidad de fuentes de agua.
*   **Servicios de Rescate (Emergencias):** En caso de accidente, necesitan consultar de forma crítica la vía de evacuación más rápida o el punto de acceso para vehículos más cercano.
*   **Mantenimiento (Administradores):** Registran nuevos tramos, actualizan el estado de los caminos  y añaden puntos de interés.

### 1.2. Preguntas de negocio a resolver por el grafo
Nuestra base de datos en Neo4j debe ser capaz de responder en milisegundos a las siguientes consultas:
1.  **Ruta óptima:** ¿Cuál es el camino más corto (en distancia o tiempo) entre un punto de inicio y un refugio concreto?
2.  **Planificación segura:** ¿Qué cimas son accesibles desde un refugio pasando *únicamente* por tramos clasificados con dificultad "Fácil" o "Media"?
3.  **Supervivencia:** Dado un punto en la montaña, ¿dónde está la fuente de agua potable más cercana (a menor número de saltos/tramos)?
4.  **Alternativas de rescate:** Si el tramo principal está cortado por nieve, ¿cuál es el siguiente camino más corto para llegar al destino?
5.  **Rutas circulares:** ¿Qué trayectos empiezan y terminan en el mismo aparcamiento cruzando al menos 3 puntos de interés distintos?
6.  **Análisis de cuellos de botella:** ¿Qué puntos de cruce (nodos) son paso obligatorio para conectar la cara norte y la cara sur de la montaña?

### 1.3. Patrones de Lectura y Escritura
*   **Lecturas masivas (Tiempo real):** El 95% del tráfico son lecturas complejas. Los senderistas consultan constantemente el mapa buscando caminos (`shortestPath`), filtrando tramos por dificultad y calculando distancias sobre la marcha.
*   **Escrituras puntuales (Batch/Manual):** La orografía no cambia todos los días. Las escrituras representan el 5% de las operaciones: un administrador que registra un nuevo sendero, la creación de un nuevo refugio o el cambio de estado de un camino temporalmente cortado.

### 1.4. Seguridad, Disponibilidad y Crecimiento
*   **Disponibilidad:** Debe ser **Alta (HA)**. Los servicios de rescate y los montañeros dependen del sistema en ruta; una caída del sistema puede tener consecuencias físicas críticas.
*   **Seguridad y Roles:** Se requiere un control de acceso estricto basado en roles (RBAC). Los usuarios finales solo tienen permisos de lectura (`READ`), mientras que solo administradores verificados pueden ejecutar inserciones o modificaciones (`WRITE`).
*   **Privacidad (RGPD):** Este modelo central documenta la red física. Si posteriormente se acopla el rastreo GPS en vivo de los usuarios para recomendaciones, esos nodos de sesión deberán anonimizarse rigurosamente para evitar la exposición de patrones de vida privados.
*   **Crecimiento:** La red crecerá de forma orgánica incorporando nuevas regiones geográficas. El principal riesgo de modelado a evitar son los *supernodos*.