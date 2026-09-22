# Práctica 01: Análisis de una red de sensores de calidad del aire

## Contexto

*El ayuntamiento quiere utilizar 24 sensores para controlar la calidad del aire, generar alertas y planificar medidas de movilidad. La red registra contaminantes, temperatura, humedad, ubicación y hora. Durante una prueba de 48 horas se han detectado problemas de cobertura y de calidad de los datos.*

# Actividad 

**1-¿Quién utilizará estos datos? **

**2-¿Qué decisiones se pueden tomar con ellos?**

**3-¿Qué diferencia hay entre una alerta inmediata y un informe histórico?**

*Los utilizara el ayuntamiento*

*Se puede utilizar para mediante alertas ver donde hay posibles incendios ya que al cambiar la temperatura y calidad de aire se puede llevar a cabo tambien podria utilizarse para medir la contaminacion de una zona*

*Las alertas inmediatas registran lo que pasa al momento y se basan en la rapidez mientras que el informe historico se registra para poder hacer registros a futuros mediante el analisis de los anteriores*

# Analizar

**Identifica dos problemas de calidad y explica sus consecuencias.**

Un problema seria por ejemplo que en el D1 hay menos población que en D4 pero hay mas sensores entonces deberia ser al reves para poder cubrir a toda la población de la zona D4 y otro problema es que en el D6 no hay ningun sensor para medir esa zona

**Indica qué distrito necesita mayor atención y justifica tu respuesta.**

El distrito D4 por la cantidad de personas que hay en el o en el D5 debido que se llevan a cabo actividades de logistica y movimiento de trafico pesado


**Elige una anomalía y explica si la corregirías, la marcarías como dudosa o la excluirías.**

*La anomalia de los duplicados que habria que corregirla porque tener datos repetidos que se van acumulando y ocupando espacio son un problema a parte que tambien si se quieren hacer estudios con dichos datos al estar repetidos pueden influir en el resultado*


# 3 Comparar arquitecturas 


| Criterio      | Batch          | Streaming     |
| ------------- | :------------: | ------------: |
|Rapidez para generar alertas      |   minutos u horas   |  segundos o pocos minutos   |
|Coste y complejidad      |  menores     |  mayores   |
|Informes históricos     |  muy adecuado    | adecuado con mas complejidad     |
|Picos de datos     |  se tratan en el siguiente lote    | requieren marcas de agua    |

# 4. Elaborar una recomendación

**Redacta una recomendación para el ayuntamiento que incluya:**

**1 El riesgo más urgente.**

*El sector  D4 que es el que tiene mas población y mas contaminación de los sectores y no tiene los suficientes sensores*

**2 La actuación que propones.**

*reducir el movimiento de vehiculos contaminantes a horas de mas transito por las calles e intentar reducir la contaminación *

**3 Dos razones basadas en el dossier.**

*El d4 que tiene mucha poblacion y D5 que tiene tambien bastante poblacion y movimiento de maquina pesada *

**4 Un problema que seguiría pendiente.**

*La contaminación siempre sera un problema ya que reducirla a 0 es casi imposible o muy complicado por eso considero que sera un problema pendiente*

**5 Una medida de privacidad.**

*limitar el accceso a quien puede ver los datos y que se intente mantener privados dentro de lo posible *