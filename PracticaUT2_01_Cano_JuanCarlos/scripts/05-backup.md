5. Copias de Seguridad, Seguridad y Límites

5.1. Procedimiento de copia y restauración

Para realizar copias de seguridad de esta base de datos, utilizaríamos las herramientas oficiales desde la terminal del sistema operativo n(o desde la consola de Mongo):

1. Backup completo de la base de datos (mongodump):

# Exporta toda la base de datos a una carpeta llamada "dump/"
mongodump --uri="mongodb+srv://<usuario>:<password>@cluster0.md2sty3.mongodb.net/" --db="ecommerce_db"


2. Restauración en caso de desastre (mongorestore):

# Restaura la base de datos desde la carpeta generada
mongorestore --uri="mongodb+srv://<usuario>:<password>@cluster0.md2sty3.mongodb.net/" --db="ecommerce_db" dump/ecommerce_db/


5.2. Usuarios, roles y permisos mínimos

Aplicación Web (Cliente): Necesita un rol de read sobre las colecciones products y categories para pintar el catálogo, y un rol readWrite (o inserción específica) sobre reviews.

Backoffice / Vendedores: Necesitan un rol readWrite acotado a la base de datos ecommerce_db para poder modificar el inventario de products.

Administradores de BBDD: Rol dbAdmin o dbOwner para poder crear índices o cambiar las reglas de validación que hemos definido en los esquemas.

5.3. Privacidad y Anonimización

Cifrado: Las contraseñas de los usuarios no existen en esta base de datos, pero si hubiera, tendrían que estar cifradas (bcrypt) desde el backend.

Anonimización: En entornos de prueba (preproducción), la colección de reviews debería tener sus nombres reales ocultos o sustituidos por datos ficticios para evitar fugas de información, y cualquier rastro de PII (Información Personal Identificable) debe eliminarse.

5.4. ¿Cuándo MongoDB no sería la mejor opción?

Sistemas Financieros/Contables muy estrictos: Si el ecommerce creciera y necesitáramos gestionar pagos, devoluciones complejas y libros mayores contables donde se exija consistencia transaccional absoluta en múltiples tablas (Transacciones ACID distribuidas), una base de datos SQL como PostgreSQL sería mucho más segura.

Si el esquema fuera totalmente rígido e inamovible: Si solo vendiéramos un único tipo de producto (ej: solo libros digitales) donde todos tienen exactamente los mismos 5 atributos fijos, la flexibilidad documental de Mongo perdería su sentido.

5.5. Conservación e Histórico

Conservación: El catálogo y el stock en vivo deben estar siempre disponibles en memoria rápida.

Archivado: Las reviews que tengan más de 2 años y no estén en el top_reviews de ningún producto, podrían extraerse de la colección principal y moverse a otro sistema de almacenamiento frío (Data Lake o S3) para aliviar la base de datos transaccional, ya que los usuarios rara vez leen la página 50 de reseñas.