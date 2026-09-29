// Conectarnos a la base de datos
db = db.getSiblingDB('ecommerce_db');

// Vaciamos colecciones para que no haya duplicados
db.categories.deleteMany({});
db.products.deleteMany({});
db.reviews.deleteMany({});

// 1. Insertar Categorías
db.categories.insertMany([
  {
    _id: "cat_laptops_gaming",
    name: "Portátiles Gaming",
    path: ",tech,computers,laptops,gaming,",
    status: "activo"
  },
  {
    _id: "cat_components",
    name: "Componentes PC",
    path: ",tech,computers,components,",
    status: "activo"
  }
]);

// 2. Insertar Productos
db.products.insertMany([
  {
    _id: ObjectId("60d5ec49f1b2c86724a1b2c1"),
    name: "Asus ROG Strix G15",
    category_path: ",tech,computers,laptops,gaming,",
    // Obligamos a que sea formato decimal (Double)
    base_price: Double(1299.99),
    status: "activo",
    attributes: [ { k: "RAM", v: "32GB" }, { k: "CPU", v: "AMD Ryzen 7" } ],
    variants: [
      { sku: "ASUS-ROG-512", stock: NumberInt(15) },
      { sku: "ASUS-ROG-1TB", stock: NumberInt(2) }
    ],
    stats: { rating_average: 3.5, review_count: NumberInt(2), total_stock: NumberInt(17) },
    createdAt: new Date("2023-01-10T10:00:00Z")
  },
  {
    _id: ObjectId("60d5ec49f1b2c86724a1b2c2"),
    name: "Tarjeta Gráfica RTX 4070",
    category_path: ",tech,computers,components,",
    // Obligamos a que sea formato decimal (Double)
    base_price: Double(650.00),
    status: "activo",
    attributes: [ { k: "VRAM", v: "12GB" } ],
    variants: [
      { sku: "RTX4070-MSI", stock: NumberInt(8) }
    ],
    stats: { rating_average: 5.0, review_count: NumberInt(1), total_stock: NumberInt(8) },
    createdAt: new Date("2023-05-20T10:00:00Z")
  },
  {
    _id: ObjectId("60d5ec49f1b2c86724a1b2c3"),
    name: "Memoria RAM Corsair Vengeance 32GB",
    category_path: ",tech,computers,components,",
    // Obligamos a que sea formato decimal (Double)
    base_price: Double(115.50),
    status: "activo",
    attributes: [ { k: "Tipo", v: "DDR5" }, { k: "Frecuencia", v: "6000MHz" } ],
    variants: [
      { sku: "COR-32-BLK", stock: NumberInt(4) }
    ],
    stats: { rating_average: 0, review_count: NumberInt(0), total_stock: NumberInt(4) },
    createdAt: new Date("2023-08-11T10:00:00Z")
  }
]);

// 3. Insertar Reseñas
db.reviews.insertMany([
  {
    product_id: ObjectId("60d5ec49f1b2c86724a1b2c1"),
    rating: NumberInt(5),
    comment: "Una bestia de portátil. El Cyberpunk 2077 y Elden Ring van perfectos en ultra a 60fps.",
    verified_purchase: true,
    createdAt: new Date("2023-10-15T09:30:00Z")
  },
  {
    product_id: ObjectId("60d5ec49f1b2c86724a1b2c1"),
    rating: NumberInt(2),
    comment: "Se calienta un poco más de lo que esperaba y los ventiladores suenan mucho.",
    verified_purchase: false,
    createdAt: new Date("2023-11-01T10:00:00Z")
  },
  {
    product_id: ObjectId("60d5ec49f1b2c86724a1b2c2"),
    rating: NumberInt(5),
    comment: "Rendimiento espectacular para jugar a 1440p, muy silenciosa.",
    verified_purchase: true,
    createdAt: new Date("2023-06-15T12:00:00Z")
  }
]);

print("✅ Datos de prueba insertados correctamente.");