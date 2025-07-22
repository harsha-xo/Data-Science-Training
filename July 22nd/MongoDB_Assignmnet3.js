use AssignmnentDB;

// Part A
 db.products.insertMany([ 
{ product_id: 101, name: "Laptop", category: "Electronics", price: 55000, stock: 30 
}, 
{ product_id: 102, name: "Mobile", category: "Electronics", price: 25000, stock: 50 
}, 
{ product_id: 103, name: "Chair", category: "Furniture", price: 3000, stock: 100 }, 
{ product_id: 104, name: "Desk", category: "Furniture", price: 7000, stock: 40 }, 
{ product_id: 105, name: "Book", category: "Stationery", price: 250, stock: 200 } 
])

 db.sales.insertMany([ 
{ sale_id: 1, product_id: 101, quantity: 2, date: new Date("2024-08-10"), customer: 
"Ravi" }, 
{ sale_id: 2, product_id: 102, quantity: 3, date: new Date("2024-08-12"), customer: 
"Ayesha" }, 
{ sale_id: 3, product_id: 103, quantity: 5, date: new Date("2024-08-14"), customer: 
"Ravi" }, 
{ sale_id: 4, product_id: 104, quantity: 1, date: new Date("2024-08-14"), customer: 
"John" }, 
{ sale_id: 5, product_id: 105, quantity: 10, date: new Date("2024-08-15"), customer: 
"Meena" } 
])


 // Part B
 // Basic Queries
 // 1.
 db.products.find({category: "Electronics"})

 // 2. 
db.sales.find({customer : "Ravi"})

 // 3. 
db.products.find({price :{$gt : 5000}})

 // 4. 
db.products.find({stock :{$lt : 50}})

 // 5. 
db.sales.find({ date: new Date("2024-08-14") })

 // Aggregation & Join-style Operations
 // 6. 
db.sales.aggregate([
  {
    $group: {
      _id: "$product_id",
      totalQuantitySold: {$sum : "$quantity" }
    }
  }
  ])

 // 7. 
db.sales.aggregate([
  {
    $lookup: {
      from: "products",
      localField: "product_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $group: {
      _id: "$product_id",
      productName: { $first: "$product_info.name" },
      totalRevenue: {
        $sum: { $multiply: ["$quantity", "$product_info.price"] }
      }
    }
  }
])

  
 // 8. 
db.sales.find({ quantity: { $gt: 3 }})

 // 9. 
db.products.find().sort({ stock: -1 })

 // 10. 
db.sales.aggregate([
  {
    $group: {
      _id: "$product_id",
      totalQuantitySold: { $sum: "$quantity" }
    }
  },
  { $sort: { totalQuantitySold: -1 } },
  { $limit: 2 },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "product_id",
      as: "product_info"
    }
  },
  { $unwind: "$product_info" },
  {
    $project: {
      _id: 0,
      product_id: "$_id",
      product_name: "$product_info.name",
      totalQuantitySold: 1
    }
  }
])