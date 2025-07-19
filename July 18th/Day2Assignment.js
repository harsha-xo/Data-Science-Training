use companyDB

db.products.insertMany([
  { product_id: 101, name: "Laptop", category: "Electronics", price: 55000, stock: 10 },
  { product_id: 102, name: "Mouse", category: "Electronics", price: 700, stock: 50 },
  { product_id: 103, name: "Office Chair", category: "Furniture", price: 4500, stock: 5 },
  { product_id: 104, name: "Notebook", category: "Stationery", price: 50, stock: 300 },
  { product_id: 105, name: "Water Bottle", category: "Kitchen", price: 250, stock: 100 }])

db.products.find({ category: { $ne: "Electronics" } })

db.products.find({ price: { $gt: 1000 } })

db.products.find({stock: {$lt: 50 } })

db.products.find({category: { $in: ["Furniture", "Kitchen"] }})

db.products.find({ stock: { $gte: 10, $lte: 100 }})

db.products.find({ price: { $ne: 700 }})

db.products.find({name: {$regex: "^N"} })

db.products.find({ stock: {$lte: 5 }})

db.products.find({ category: {$nin: ["Stationery", "Kitchen"] }})
  
db.products.findOne({ category: {$ne: "Furniture"} })
