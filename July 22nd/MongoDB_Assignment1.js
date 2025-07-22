
use bookstoreDB

db.books.insertMany([
  { book_id:101, title:"The AI Revolution", author:"Ray Kurzweil", genre:"Technology", price:799, stock:20 },
  { book_id:102, title:"The Great Gatsby", author:"F. Scott Fitzgerald", genre:"Classic", price:299, stock:15 },
  { book_id:103, title:"Mystery of the Old House", author:"Agatha Christie", genre:"Mystery", price:450, stock:10 },
  { book_id:104, title:"Cooking 101", author:"Gordon Ramsay", genre:"Cooking", price:599, stock:5 },
  { book_id:105, title:"History of the World", author:"Yuval Noah Harari", genre:"History", price:850, stock:8 }]);

db.customers.insertMany([
  { customer_id:1, name:"Amit Sharma", email:"amit.sharma@example.com", city:"Hyderabad" },
  { customer_id:2, name:"Neha Reddy", email:"neha.reddy@example.com", city:"Bangalore" },
  { customer_id:3, name:"Rajesh Kumar", email:"rajesh.kumar@example.com", city:"Mumbai" },
  { customer_id:4, name:"Sneha Patel", email:"sneha.patel@example.com", city:"Delhi" },
  { customer_id:5, name:"Karan Singh", email:"karan.singh@example.com", city:"Chennai" }]);

db.orders.insertMany([
  { order_id:1001, customer_id:1, book_id:101, order_date:ISODate("2023-03-15"), quantity:1 },
  { order_id:1002, customer_id:2, book_id:102, order_date:ISODate("2022-11-10"), quantity:2 },
  { order_id:1003, customer_id:3, book_id:103, order_date:ISODate("2024-01-05"), quantity:1 },
  { order_id:1004, customer_id:1, book_id:104, order_date:ISODate("2021-06-23"), quantity:3 },
  { order_id:1005, customer_id:4, book_id:105, order_date:ISODate("2023-12-01"), quantity:1 },
  { order_id:1006, customer_id:5, book_id:101, order_date:ISODate("2023-07-07"), quantity:2 },
  { order_id:1007, customer_id:2, book_id:105, order_date:ISODate("2022-04-18"), quantity:1 }]);

//1. 
db.books.find({price:{$gt:500}})

//2. 
db.customers.find({city:'Hyderabad'})

//3. 
db.orders.find({order_date:{$gt:ISODate("2023-01-01")}})

//4. 
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $project: {
      order_id: 1,
      quantity: 1,
      order_date: 1,
      customer_name: { $arrayElemAt: ["$customer.name", 0] },
      book_title: { $arrayElemAt: ["$book.title", 0] }
    }
  }
]);


//5. 
db.orders.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_quantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $project: {
      book_title: { $arrayElemAt: ["$book.title", 0] },
      total_quantity: 1
    }
  }
]);


//6.
db.orders.aggregate([
  {
    $group: {
      _id: "$customer_id",
      total_orders: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  {
    $project: {
      customer_name: { $arrayElemAt: ["$customer.name", 0] },
      total_orders: 1
    }
  }
]);

//7. 
db.orders.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_quantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $project: {
      book_title: { $arrayElemAt: ["$book.title", 0] },
      total_revenue: { $multiply: [{ $arrayElemAt: ["$book.price", 0] }, "$total_quantity"] }
    }
  }
]);

//8. 
db.orders.aggregate([
  {
    $group: {
      _id: "$book_id",
      total_quantity: { $sum: "$quantity" }
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  {
    $project: {
      book_title: { $arrayElemAt: ["$book.title", 0] },
      total_revenue: { $multiply: [{ $arrayElemAt: ["$book.price", 0] }, "$total_quantity"] }
    }
  },
  { $sort: { total_revenue: -1 } },
  { $limit: 1 }
]);

//9. 
db.orders.aggregate([
  {
    $lookup: {
      from: "books",
      localField: "book_id",
      foreignField: "book_id",
      as: "book"
    }
  },
  { $unwind: "$book" },
  {
    $group: {
      _id: "$book.genre",
      total_sold: { $sum: "$quantity" }
    }
  }
]);


//10. 
db.orders.aggregate([
  {
    $group: {
      _id: { customer_id: "$customer_id", book_id: "$book_id" }
    }
  },
  {
    $group: {
      _id: "$_id.customer_id",
      distinct_books: { $sum: 1 }
    }
  },
  {
    $match: { distinct_books: { $gt: 2 } }
  },
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "customer_id",
      as: "customer"
    }
  },
  {
    $project: {
      customer_name: { $arrayElemAt: ["$customer.name", 0] },
      distinct_books: 1
    }
  }
]);
