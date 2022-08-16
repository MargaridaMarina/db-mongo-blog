import mongoose from "mongoose";
import { marked } from "marked";
import slugify from "slugify";

// const createDomPurify = require('dompurify')
// const { JSDOM } = require('jsdom')
// const dompurify = createDomPurify(new JSDOM().window)

const postSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  metadescription:{
    type:String
  },
  category:{
    type:String
  },
  markdown:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default: Date.now
  },
  slug:{
    type:String,
    // required:true,
    unique:true
  },
  sanitizedHtml:{
    type:String
  }
})

postSchema.pre('validate', function(next){
  if (this.title) {
    this.slug = slugify(this.title, {lower:true, strict:true})
  }
  // if (this.markdown) {
  //   this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
  // }
  next()
})

const posts = mongoose.model('posts', postSchema)

export default posts