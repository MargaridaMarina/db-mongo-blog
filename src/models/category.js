import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  subCategory:{
    type:String
  }
})

const categories = mongoose.model('categories', categorySchema)

export default categories