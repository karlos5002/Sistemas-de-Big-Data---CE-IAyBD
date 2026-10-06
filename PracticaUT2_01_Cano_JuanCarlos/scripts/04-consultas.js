// Conectarnos a la base de datos
db = db.getSiblingDB('ecommerce_db');

print("\n=== 1. INSERCIÓN, ACTUALIZACIÓN PARCIAL Y BORRADO LÓGICO ===");
db.products.insertOne({
    name: "Ratón Gaming Logitech G502",
    category_path: ",tech,computers,peripherals,",
    base_price: Double(60.00),
    status: "activo",
    variants: [{ sku: "LOG-G502", stock: NumberInt(30) }]
});
print("- Producto insertado con éxito.");

db.products.updateOne(
    { name: "Ratón Gaming Logitech G502" },
    { $set: { base_price: Double(49.99) } }
);
print("- Producto actualizado (cambio de precio).");

db.products.updateOne(
    { name: "Ratón Gaming Logitech G502" },
    { $set: { status: "inactivo" } }
);
print("- Producto desactivado (borrado lógico).");


print("\n=== 2. FILTROS, ORDENACIÓN Y PAGINACIÓN ESTABLE ===");
var pagina1 = db.products.find(
    { category_path: ",tech,computers,components,", status: "activo" }
).sort({ base_price: 1 }).skip(0).limit(2).toArray();
print("- Productos encontrados en la página 1:");
printjson(pagina1.map(p => p.name + " - " + p.base_price + "€"));


print("\n=== 3 y 4. AGREGACIÓN COMPLEJA (El equivalente a un JOIN y GROUP BY) ===");

var pipeline = [
    { $match: { status: "activo" } },
    
    { $lookup: {
        from: "reviews",
        localField: "_id",
        foreignField: "product_id",
        as: "product_reviews"
    }},
    
    { $unwind: { path: "$product_reviews", preserveNullAndEmptyArrays: false } },
    
    { $group: {
        _id: "$name",
        nota_media_calculada: { $avg: "$product_reviews.rating" },
        total_reseñas: { $sum: 1 }
    }},
    
    { $sort: { nota_media_calculada: -1 } }
];

var resultadosAgregacion = db.products.aggregate(pipeline).toArray();
print("- Resultados de la agregación:");
printjson(resultadosAgregacion);

print("\n Script de consultas y agregaciones finalizado con éxito.");