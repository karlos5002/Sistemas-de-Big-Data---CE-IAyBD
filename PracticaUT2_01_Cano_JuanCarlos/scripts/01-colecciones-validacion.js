// Conectarnos a la base de datos (si no existe, la crea)
use ecommerce_db;

// Borrar colecciones previas por si ejecutamos el script varias veces (para que sea reproducible)
db.categories.drop();
db.products.drop();
db.reviews.drop();

// 1. Colección CATEGORÍAS
db.createCollection("categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["_id", "name", "path", "status"],
      properties: {
        _id: { bsonType: "string", description: "Debe ser un ID de texto, ej: cat_laptops" },
        name: { bsonType: "string" },
        path: { bsonType: "string", pattern: "^,.*,$", description: "Formato de ruta, ej: ,tech,laptops," },
        status: { enum: ["activo", "inactivo"], description: "Solo permite activo o inactivo" }
      }
    }
  }
});

// 2. Colección PRODUCTOS
db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "category_path", "base_price", "status"],
      properties: {
        name: { bsonType: "string" },
        category_path: { bsonType: "string" },
        // Restricción de rango: El precio debe ser un número mayor o igual a cero
        base_price: { bsonType: "double", minimum: 0, description: "El precio no puede ser negativo" },
        // Enumeración: Solo 3 estados posibles
        status: { enum: ["activo", "inactivo", "descatalogado"] },
        variants: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["sku", "stock"],
            properties: {
              sku: { bsonType: "string" },
              // Restricción: El stock nunca puede ser menor a 0
              stock: { bsonType: "int", minimum: 0 }
            }
          }
        }
      }
    }
  }
});

// 3. Colección RESEÑAS
db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["product_id", "rating", "comment"],
      properties: {
        product_id: { bsonType: "objectId" },
        // Restricción de rango: Las estrellas de la reseña van del 1 al 5
        rating: { bsonType: "int", minimum: 1, maximum: 5, description: "Nota entre 1 y 5 estrellas" },
        comment: { bsonType: "string" },
        verified_purchase: { bsonType: "bool" }
      }
    }
  }
});

print("✅ Colecciones creadas con éxito y reglas de validación aplicadas.");