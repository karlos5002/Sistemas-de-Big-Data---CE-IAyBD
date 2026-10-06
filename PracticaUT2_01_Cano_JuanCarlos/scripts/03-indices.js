// Conectarnos a la base de datos
db = db.getSiblingDB('ecommerce_db');

print("=== 1. COSTE ANTES DE LOS ÍNDICES ===");
var statsAntes = db.products.find({ category_path: ",tech,computers,laptops,gaming," }).explain("executionStats");
print("Fase de ejecución (Debería ser COLLSCAN):", statsAntes.executionStats.executionStages.stage);
print("Documentos examinados para encontrar el resultado:", statsAntes.executionStats.totalDocsExamined);

print("\n=== 2. CREANDO ÍNDICES ===");
db.products.createIndex({ category_path: 1, base_price: 1 });
print("- Índice compuesto (category_path + base_price) creado.");

db.products.createIndex({ "attributes.k": 1, "attributes.v": 1 });
print("- Índice multikey (atributos dinámicos) creado.");

db.products.createIndex({ name: "text" });
print("- Índice de texto (name) creado.");

print("\n=== 3. COSTE DESPUÉS DE LOS ÍNDICES ===");
var statsDespues = db.products.find({ category_path: ",tech,computers,laptops,gaming," }).explain("executionStats");
print("Fase de ejecución principal:", statsDespues.executionStats.executionStages.stage);
if(statsDespues.executionStats.executionStages.inputStage) {
    print("Fase de índice usada:", statsDespues.executionStats.executionStages.inputStage.stage);
}
print("Documentos examinados para encontrar el resultado:", statsDespues.executionStats.totalDocsExamined);

print("\n Script de índices finalizado con éxito.");