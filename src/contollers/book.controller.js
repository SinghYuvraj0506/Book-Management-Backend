import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Books } from "../models/book.model.js";
import { Chapters } from "../models/chapter.model.js";
import { getChapters } from "../utils/chapters.js";


// create new Book controller --------------------------
export const createBook = asyncHandler(async (req, res) => {
  try {
    const { name, author, genre } = req.body;

    let book = await Books.findOne({ name });

    if (book) {
      throw new ApiError(400, "Book already exists with similar name");
    }

    book = await Books.create({
      name,
      author,
      genre,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, book, "Book created successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Error occured in creating book");
  }
});


// update Book controller -------------------
export const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, author, genre } = req.body;

  let book = await Books.findById(id);

  if (!book) {
    throw new ApiError(400, "Book not found!!!!");
  }

  book = await Books.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        author,
        genre,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, book, "Book Updated successfully"));
});


// read book -----------------------------
export const readBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let book = await Books.findById(id);

  if (!book) {
    throw new ApiError(400, "Book not found!!!!");
  }

  // find chapters ---------------
  const chapters = await getChapters(book?._id)

  return res
    .status(200)
    .json(new ApiResponse(200, chapters, "Book Updated successfully"));
});


// delete book -----------------------------
export const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let book = await Books.findById(id);

  if (!book) {
    throw new ApiError(400, "Book not found!!!!");
  }

  await Books.findByIdAndDelete(id);

  // delete chapters too
  const chapters = await Chapters.find({bookId:id})

  for (let index = 0; index < chapters.length; index++) {
    const element = chapters[index];
    await Chapters.findByIdAndDelete(element?._id);
  }



  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Book Deleted successfully"));
});