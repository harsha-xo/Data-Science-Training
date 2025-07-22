use movieApp

db.users.insertMany([
  { user_id: 1, name: "Amit Sharma", email: "amit@example.com", country: "India" },
  { user_id: 2, name: "Sophia Brown", email: "sophia@example.com", country: "USA" },
  { user_id: 3, name: "Carlos Diaz", email: "carlos@example.com", country: "Mexico" },
  { user_id: 4, name: "Fatima Khan", email: "fatima@example.com", country: "UAE" },
  { user_id: 5, name: "Li Wei", email: "liwei@example.com", country: "China" }]);


db.movies.insertMany([
  { movie_id: 201, title: "Dream Beyond Code", genre: "Sci-Fi", release_year: 2021, duration: 120 },
  { movie_id: 202, title: "Love Unplugged", genre: "Romance", release_year: 2019, duration: 95 },
  { movie_id: 203, title: "Secrets of the Sea", genre: "Documentary", release_year: 2022, duration: 110 },
  { movie_id: 204, title: "Mystery Lane", genre: "Thriller", release_year: 2023, duration: 105 },
  { movie_id: 205, title: "Laugh Out Loud", genre: "Comedy", release_year: 2020, duration: 90 },
  { movie_id: 206, title: "Code of Honor", genre: "Action", release_year: 2024, duration: 130 }]);


db.watch_history.insertMany([
  { watch_id: 301, user_id: 1, movie_id: 201, watched_on: ISODate("2023-01-10"), watch_time: 110 },
  { watch_id: 302, user_id: 2, movie_id: 202, watched_on: ISODate("2022-05-12"), watch_time: 90 },
  { watch_id: 303, user_id: 3, movie_id: 203, watched_on: ISODate("2024-02-20"), watch_time: 100 },
  { watch_id: 304, user_id: 1, movie_id: 204, watched_on: ISODate("2025-07-01"), watch_time: 105 },
  { watch_id: 305, user_id: 4, movie_id: 205, watched_on: ISODate("2021-09-18"), watch_time: 80 },
  { watch_id: 306, user_id: 2, movie_id: 206, watched_on: ISODate("2023-03-05"), watch_time: 125 },
  { watch_id: 307, user_id: 1, movie_id: 201, watched_on: ISODate("2024-08-09"), watch_time: 100 }, 
  { watch_id: 308, user_id: 5, movie_id: 204, watched_on: ISODate("2022-10-25"), watch_time: 95 }]);


//1. 
db.movies.find({ duration: { $gt: 100 } });

//2. 
db.users.find({ country: "India" });

//3. 
db.movies.find({ release_year: { $gt: 2020 } });
 
//4. 
db.watch_history.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  {
    $project: {
      watch_id: 1,
      watched_on: 1,
      watch_time: 1,
      user_name: { $arrayElemAt: ["$user.name", 0] },
      movie_title: { $arrayElemAt: ["$movie.title", 0] }
    }
  }
]);


//5. 
db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $group: {
      _id: "$movie.genre",
      watch_count: { $sum: 1 }
    }
  }
]);


//6. 
db.watch_history.aggregate([
  {
    $group: {
      _id: "$user_id",
      total_watch_time: { $sum: "$watch_time" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  {
    $project: {
      user_name: { $arrayElemAt: ["$user.name", 0] },
      total_watch_time: 1
    }
  }
]);


//7. 
db.watch_history.aggregate([
  {
    $group: {
      _id: "$movie_id",
      watch_count: { $sum: 1 }
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  {
    $project: {
      movie_title: { $arrayElemAt: ["$movie.title", 0] },
      watch_count: 1
    }
  },
  { $sort: { watch_count: -1 } },
  { $limit: 1 }
]);


//8. 
db.watch_history.aggregate([
  {
    $group: {
      _id: { user_id: "$user_id", movie_id: "$movie_id" }
    }
  },
  {
    $group: {
      _id: "$_id.user_id",
      unique_movies: { $sum: 1 }
    }
  },
  {
    $match: {
      unique_movies: { $gt: 2 }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  {
    $project: {
      user_name: { $arrayElemAt: ["$user.name", 0] },
      unique_movies: 1
    }
  }
]);


//9. 
db.watch_history.aggregate([
  {
    $group: {
      _id: { user_id: "$user_id", movie_id: "$movie_id" },
      watch_count: { $sum: 1 }
    }
  },
  {
    $match: { watch_count: { $gt: 1 } }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id.user_id",
      foreignField: "user_id",
      as: "user"
    }
  },
  {
    $lookup: {
      from: "movies",
      localField: "_id.movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  {
    $project: {
      user_name: { $arrayElemAt: ["$user.name", 0] },
      movie_title: { $arrayElemAt: ["$movie.title", 0] },
      watch_count: 1
    }
  }
]);


//10. 
db.watch_history.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movie_id",
      foreignField: "movie_id",
      as: "movie"
    }
  },
  { $unwind: "$movie" },
  {
    $project: {
      user_id: 1,
      movie_id: 1,
      watch_time: 1,
      duration: "$movie.duration",
      percentage_watched: {
        $round: [
          { $multiply: [{ $divide: ["$watch_time", "$movie.duration"] }, 100] },
          2
        ]
      }}}]);




























