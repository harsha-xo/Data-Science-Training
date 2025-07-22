use AssignmentDB22

db.members.insertMany([
  { member_id: 1, name: "Anjali Rao", age: 28, gender: "Female", city: "Mumbai", membership_type: "Gold" },
  { member_id: 2, name: "Rohan Mehta", age: 35, gender: "Male", city: "Delhi", membership_type: "Silver" },
  { member_id: 3, name: "Fatima Shaikh", age: 22, gender: "Female", city: "Hyderabad", membership_type: "Platinum" },
  { member_id: 4, name: "Vikram Das", age: 41, gender: "Male", city: "Bangalore", membership_type: "Gold" },
  { member_id: 5, name: "Neha Kapoor", age: 31, gender: "Female", city: "Pune", membership_type: "Silver" }
]);

db.trainers.insertMany([
  { trainer_id: 101, name: "Ajay Kumar", specialty: "Weight Training", experience: 7 },
  { trainer_id: 102, name: "Swati Nair", specialty: "Cardio", experience: 5 },
  { trainer_id: 103, name: "Imran Qureshi", specialty: "Yoga", experience: 8 }
]);

db.sessions.insertMany([
  { session_id: 201, member_id: 1, trainer_id: 101, session_type: "Strength", duration: 60, date: new Date("2024-08-01") },
  { session_id: 202, member_id: 2, trainer_id: 102, session_type: "Cardio", duration: 45, date: new Date("2024-08-02") },
  { session_id: 203, member_id: 3, trainer_id: 103, session_type: "Yoga", duration: 90, date: new Date("2024-08-03") },
  { session_id: 204, member_id: 1, trainer_id: 102, session_type: "Cardio", duration: 30, date: new Date("2024-08-04") },
  { session_id: 205, member_id: 4, trainer_id: 101, session_type: "Strength", duration: 75, date: new Date("2024-08-05") },
  { session_id: 206, member_id: 5, trainer_id: 103, session_type: "Yoga", duration: 60, date: new Date("2024-08-05") }
]);



// 1.
db.members.find({ city: "Mumbai" });

// 2.
db.trainers.find({ experience: { $gt: 6 } });

// 3.
db.sessions.find({ session_type: "Yoga" });

// 4.
db.trainers.aggregate([
  { $match: { name: "Swati Nair" }},
  { $lookup: {
      from: "sessions",
      localField: "trainer_id",
      foreignField: "trainer_id",
      as: "sessions"
  }},
  { $unwind: "$sessions" },
  { $replaceRoot: { newRoot: "$sessions" }}
]);

// 5.
db.sessions.aggregate([
  { $match: { date: new Date("2024-08-05") }},
  { $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
  }},
  { $unwind: "$member" },
  { $project: { _id: 0, name: "$member.name" }}
]);

// Intermediate Queries
// 6.
db.sessions.aggregate([
  { $group: { _id: "$member_id", session_count: { $sum: 1 }}}
]);

// 7.
db.sessions.aggregate([
  { $group: { _id: "$session_type", avg_duration: { $avg: "$duration" }}}
]);

// 8.
db.members.aggregate([
  { $match: { gender: "Female" }},
  { $lookup: {
      from: "sessions",
      localField: "member_id",
      foreignField: "member_id",
      as: "sessions"
  }},
  { $unwind: "$sessions" },
  { $match: { "sessions.duration": { $gt: 60 }}},
  { $project: { name: 1, "sessions.duration": 1 }}
]);

// 9.
db.sessions.find().sort({ duration: -1 });

// 10.
db.sessions.aggregate([
  { $group: { _id: "$member_id", trainers: { $addToSet: "$trainer_id" }}},
  { $match: { "trainers.1": { $exists: true }}}
]);

// Advanced query 

// 11.
db.sessions.aggregate([
  { $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
  }},
  { $lookup: {
      from: "trainers",
      localField: "trainer_id",
      foreignField: "trainer_id",
      as: "trainer"
  }},
  { $unwind: "$member" },
  { $unwind: "$trainer" },
  { $project: {
    _id: 0,
    session_id: 1,
    member_name: "$member.name",
    trainer_name: "$trainer.name",
    duration: 1,
    session_type: 1
  }}
]);

// 12.
db.sessions.aggregate([
  { $group: { _id: "$trainer_id", total_time: { $sum: "$duration" }}}
]);

// 13.
db.sessions.aggregate([
  { $group: { _id: "$member_id", total_time: { $sum: "$duration" }}}
]);

// 14.
db.sessions.aggregate([
  { $group: { _id: "$trainer_id", session_count: { $sum: 1 }}}
]);

// 15.
db.sessions.aggregate([
  { $group: { _id: "$trainer_id", avg_duration: { $avg: "$duration" }}},
  { $sort: { avg_duration: -1 }},
  { $limit: 1 }
]);

// 16.
db.sessions.aggregate([
  { $group: { _id: "$trainer_id", unique_members: { $addToSet: "$member_id" }}},
  { $project: { trainer_id: "$_id", unique_count: { $size: "$unique_members" }}}
]);

// 17.
db.sessions.aggregate([
  { $group: { _id: "$member_id", total_time: { $sum: "$duration" }}},
  { $sort: { total_time: -1 }},
  { $limit: 1 }
]);

// 18.
db.members.aggregate([
  { $match: { membership_type: "Gold" }},
  { $lookup: {
      from: "sessions",
      localField: "member_id",
      foreignField: "member_id",
      as: "sessions"
  }},
  { $unwind: "$sessions" },
  { $match: { "sessions.session_type": "Strength" }},
  { $project: { name: 1 }}
]);

// 19.
db.sessions.aggregate([
  { $lookup: {
      from: "members",
      localField: "member_id",
      foreignField: "member_id",
      as: "member"
  }},
  { $unwind: "$member" },
  { $group: {
    _id: "$member.membership_type",
    session_count: { $sum: 1 }
  }}
]);

// 20.
db.members.aggregate([
  { $lookup: {
      from: "sessions",
      localField: "member_id",
      foreignField: "member_id",
      as: "sessions"
  }},
  { $match: { sessions: { $eq: [] }}}
]);