import { app } from "./app.js";
import mongoose from "mongoose";
import 'dotenv/config';


const connection = mongoose.connect(process.env.DB_HOST).catch(error => {
  console.log(process.error);
  process.exit(1)
}).finally(() => {
  console.log("Database connection successful")
})


app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})
