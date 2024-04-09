import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  genre:{
    type:String,
    required:true
  }
},{
  timestamps:true
})

export const Books = mongoose.model("book", bookSchema);
