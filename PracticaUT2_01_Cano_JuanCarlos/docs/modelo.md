# Práctica 01: Diseña una base de datos documental con MongoDB

## Contexto

Una organización necesita una base de datos documental para gestionar información con estructura variable. Debes elegir uno de los siguientes escenarios y diseñar una solución justificando las decisiones de modelado:

**Catálogo de comercio electrónico variable**: productos, categorías, variantes, stock y reseñas. Justifica incrustación, referencias, índices y agregaciones.

**Historia clínica**: pacientes, episodios, pruebas, tratamientos y profesionales. Incluye roles, auditoría, validación y anonimización.

**Plataforma multimedia**: películas, series, episodios, géneros, usuarios y valoraciones. Resuelve filtros, recomendaciones y paginación.

**Sistema de incidencias**: clientes, equipos, incidencias, mensajes, técnicos y estados. Obtén indicadores y mantén la trazabilidad.

**Sensores urbanos**: estaciones, sensores, calibraciones, alertas y geolocalización. Decide qué histórico conservar en MongoDB y qué enviar a otro sistema.

La solución debe ejecutarse en MongoDB Community, MongoDB Atlas o un contenedor local. No se valorará únicamente que las consultas funcionen: cada decisión debe relacionarse con una necesidad del escenario.


# Actividad
## 1. Definir el problema y los accesos (40 minutos)

Antes de crear colecciones, documenta:

El escenario elegido y sus usuarios.

Al menos seis preguntas de negocio que la base de datos debe responder.

Los datos que se leen y escriben con mayor frecuencia.

Una tabla que relacione cada pregunta con las colecciones, filtros, ordenación y paginación necesarios.

Los requisitos de seguridad, privacidad, disponibilidad y crecimiento.

### Escenario elegido y sus usuarios

**Escenario 1:** Catálogo de comercio electrónico variable.
El sistema gestiona una tienda online de productos tecnológicos donde cada artículo tiene especificaciones distintas (un portátil tiene RAM y gráfica; un monitor tiene resolución y hercios). No existe un esquema rígido válido para todo el catálogo.

Usuarios del sistema:

**Clientes** (Lectura intensiva): Navegan por el árbol de categorías, filtran por atributos variables, leen descripciones, revisan el stock en tiempo real y publican reseñas.

**Administradores / Vendedores** (Escritura): Añaden y modifican productos, gestionan las variantes (SKUs), actualizan el inventario y moderan las reseñas.

### 6 Preguntas del negocio


¿Cuáles son los productos activos dentro de una categoría específica, ordenados de menor a mayor precio?

¿Cuál es el detalle de un producto específico, incluyendo sus variantes disponibles (con stock) y las 3 reseñas más útiles o recientes?

¿Qué variantes de productos de todo el catálogo tienen un stock inferior a 5 unidades (para alertas de reabastecimiento)?

¿Cuál es la valoración media de un producto y cuántas reseñas totales tiene precalculadas?

¿Cuáles son los productos que coinciden con un atributo dinámico específico (ej. "Memoria RAM: 32GB") y están activos?

¿Cuáles son las reseñas de 1 o 2 estrellas de un producto específico, ordenadas de la más reciente a la más antigua para atención al cliente?

# 2. Diseñar las colecciones (70 minutos)

Entrega un diagrama o esquema y define el modelo físico. Debes incluir:

Las colecciones y el propósito de cada una.

Documentos de ejemplo en JSON o BSON para todas las colecciones principales.

Al menos una decisión de incrustación y una de referencia, justificando tamaño, frecuencia de lectura, cardinalidad y posibilidad de actualización.

La estrategia para identificadores, fechas, estados y campos opcionales.

Los límites del modelo: tamaño máximo del documento, crecimiento de arrays, duplicación, consistencia y operaciones que resultarían incómodas.