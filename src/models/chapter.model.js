import mongoose, { Schema } from "mongoose";

const chapterSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  pageStart:{
    type:Number,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  bookId:{
    type:mongoose.Types.ObjectId,
    ref:"book"
  },
  subChapters:[{
    type:mongoose.Types.ObjectId,
    ref:"chapter"
  }],
  parentChapter:{
    type:mongoose.Types.ObjectId,
    ref:"chapter"
  }
},{
  timestamps:true
})

export const Chapters = mongoose.model("chapter", chapterSchema);
