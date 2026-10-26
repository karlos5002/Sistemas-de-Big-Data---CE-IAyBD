# 5. Comparación Técnica, Seguridad y Administración

## 5.1. Comparativa Técnica 
Para resolver la pregunta de evacuación (el camino más corto entre la cima y el parking):
*   **En SQL:** Requeriría crear consultas recursivas muy complejas cruzando continuamente la tabla Puntos con la tabla intermedia de Tramos. En tiempo real, si el usuario está a 10 saltos de distancia, el coste de cómputo (CPU) y memoria crece exponencialmente porque SQL evalúa un producto cartesiano masivo.
*   **En Neo4j:** Usando shortestPath, el motor utiliza la **Adyacencia libre de índices**. Esto significa que salta físicamente por los punteros en memoria RAM desde la cima hacia sus vecinos sin tener que buscar en ningún índice global, encontrando la salida en apenas 2 milisegundos.

## 5.2. Copias de Seguridad y Restauración
Las copias se realizan desde la terminal del sistema  con el servicio detenido:

**Backup**
```bash
neo4j-admin database dump neo4j --to-path=/var/backups/neo4j/rutas_$(date +%F).dump