# Informe Pericial de Investigación Forense · Caso 07-OMEGA

- **Estudiante / Analista:** Juan Carlos Cano Carrasco
- **Fecha de emisión:** 2026-11-10
- **Caso:** Sustracción de la Espada Omega en ÁgoraCraft
- **Fuente de auditoría:** Tabla EscapeRoomMinecraft (Amazon DynamoDB, región us-east-1)

---

## 1. Dictamen pericial

> El 2 de noviembre de 2026 a las 22:14:00 UTC, se produjo un pico de latencia de red (PICO_LATENCIA_SERVIDOR) en la zona Castillo que interrumpió la supervisión del administrador P011 (AdminSol). A las 22:15:02, la cuenta P007 (CreeperKing) abrió el cofre en CamaraTesoro y perpetró la sustracción material de la ESPADA_OMEGA a las 22:15:18. A las 22:17:40, P007 huyó al BosqueOscuro y transfirió el objeto a su cómplice P009 (ShadowPixel), quien lo recibió a las 22:17:44. Finalmente, a las 22:20:10, P009 ocultó la espada en la MinaAbandonada, donde permanece actualmente. La alarma oficial de las 22:25:00 ocurrió 9 minutos y 42 segundos después del robo real.

---

## 2. Cronología forense probada

| Hora exacta (ISO) | ID Cuenta | Alias | Acción / Evento | Zona | Objeto y detalles clave |
|---|---|---|---|---|---|
| 2026-11-02T22:09:00 | P011 | AdminSol | DEPOSITAR_OBJETO | CamaraTesoro | ESPADA_OMEGA (Custodia oficial inicial) |
| 2026-11-02T22:14:00 | P011 | AdminSol | INCIDENCIA_RED | Castillo | PICO_LATENCIA_SERVIDOR (Fallo de red) |
| 2026-11-02T22:15:02 | P007 | CreeperKing | ABRIR_COFRE | CamaraTesoro | ESPADA_OMEGA (Apertura no autorizada) |
| 2026-11-02T22:15:18 | P007 | CreeperKing | RETIRAR_OBJETO | CamaraTesoro | ESPADA_OMEGA (Robo físico material) |
| 2026-11-02T22:17:40 | P007 | CreeperKing | TRANSFERIR_OBJETO | BosqueOscuro | ESPADA_OMEGA (Destinatario: P009) |
| 2026-11-02T22:17:44 | P009 | ShadowPixel | RECIBIR_OBJETO | BosqueOscuro | ESPADA_OMEGA (Remitente: P007) |
| 2026-11-02T22:20:10 | P009 | ShadowPixel | OCULTAR_OBJETO | MinaAbandonada | ESPADA_OMEGA (Ubicación final ocultada) |
| 2026-11-02T22:25:00 | P011 | AdminSol | DENUNCIAR_ROBO | CamaraTesoro | ESPADA_OMEGA (Alarma de seguridad) |

---

## 3. Identificación de responsabilidades

- **Autor material del robo:** CreeperKing (P007)
- **Cómplice y receptador:** ShadowPixel (P009)
- **Momento exacto del robo físico:** 22:15:18 UTC (2026-11-02T22:15:18)
- **Momento oficial de denuncia y alarma:** 22:25:00 UTC (2026-11-02T22:25:00)
- **Última ubicación conocida del objeto:** MinaAbandonada (Cofre clandestino registrado por P009 a las 22:20:10)

---

## 4. Distinción forense: Hechos observados vs. Inferencias

- **Hecho probado (con evidencia en registros):**  
  P007 (CreeperKing) ejecutó RETIRAR_OBJETO sobre la ESPADA_OMEGA en CamaraTesoro a las 22:15:18 y la entregó en mano a P009 en BosqueOscuro a las 22:17:40. La transacción cruzada queda demostrada por los atributos destinatario: P009 y remitente: P007 en la base de datos.

- **Inferencia lógica razonable:**  
  La coincidencia temporal entre el pico de latencia del servidor a las 22:14:00 y la infiltración de P007 indica que el lag fue aprovechado como maniobra de distracción o provocado deliberadamente para inhabilitar la supervisión de P011.

- **Limitación técnica del dato:**  
  Que P007 y P009 compartan la dirección IP 198.51.100.77 no demuestra por sí solo que pertenezcan a la misma persona física. Una IP pública compartida puede deberse a redes CGNAT de operadores, Wi-Fi local compartida o salidas VPN. La verdadera prueba de conspiración son las transacciones cruzadas registradas en el juego.

---

## 5. Análisis de eficiencia y Big Data en DynamoDB

1. **Operación de tipo Scan:**
   - **Consulta PartiQL ejecutada:**  
     SELECT * FROM "EscapeRoomMinecraft" WHERE zona = 'Castillo' OR zona = 'CamaraTesoro'
   - **Explicación técnica e impacto:**  
     Como zona no es la clave de partición (PK), la clave de ordenación (SK) ni la clave de un Índice Secundario Global (GSI), DynamoDB debe realizar un Scan leyendo secuencialmente el 100% de las particiones físicas de la tabla y filtrando en memoria. En una tabla de producción con 500 millones de registros, esto agotaría masivamente las Unidades de Capacidad de Lectura (RCU), provocaría estrangulamiento (*throttling*) y dispararía los costes económicos.

2. **Operación sobre Global Secondary Index (GSI):**
   - **Consulta PartiQL ejecutada:**  
     SELECT * FROM "EscapeRoomMinecraft"."PorObjeto" WHERE objeto = 'ESPADA_OMEGA'
   - **Ventaja de la proyección ALL:**  
     El GSI PorObjeto utiliza objeto como clave de partición. Al estar configurado con proyección ALL, el índice almacena copias de todos los atributos del elemento original. Esto permite resolver la consulta como una Query directa de milisegundos sin necesidad de realizar lecturas adicionales (*fetch back*) a la tabla base para consultar campos como destinatario, remitente o zona.