import mongoose from "mongoose";

mongoose.connect(
  process.env.db
)

let db = mongoose.connection

export default db