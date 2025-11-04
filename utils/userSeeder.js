import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import connectDatabase from "../DB/db.js";   

dotenv.config(); 

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    name: "Test User",
    email: "test@gmail.com",
    password: "123456",
    role: "user",
  }
];

const seedUsers = async () => {
  try {
    await connectDatabase();  
    
    await User.deleteMany();


    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );

    await User.insertMany(hashedUsers);

    console.log("Users Added Successfully!");
    process.exit(0);
  } catch (error) {
    console.error(" Error seeding users:", error);
    process.exit(1);
  }
};

seedUsers();
