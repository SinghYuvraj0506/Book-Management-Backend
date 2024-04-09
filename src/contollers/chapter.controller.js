import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Books } from "../models/book.model.js";
import { Chapters } from "../models/chapter.model.js";

// create new CHapter controller --------------------------
export const createChapters = asyncHandler(async (req, res) => {
  try {
    const { bookId, name, pageStart, parentChapterId, content } = req.body;

    // checking book id --------------------
    let book = await Books.findById(bookId);

    if (!book) {
      throw new ApiError(400, "Book not exists");
    }

    // checking  if chapter exists --------------------
    let chapter = await Chapters.findOne({ bookId, pageStart });

    if (chapter) {
      throw new ApiError(400, "Chapter with same page already exists");
    }

    // checking parent chapter id --------------------
    if (parentChapterId) {
      let parentChapter = await Chapters.findById(parentChapterId);

      if (!parentChapter) {
        throw new ApiError(400, "Parent Chapter not exists");
      }

      // check if it is valid to enter a chapter in a chapter ---------
      let checkChapters = await Chapters.find({
        bookId,
        pageStart: { $lt: pageStart }
      }).sort({pageStart:1});

        if (checkChapters.slice(-1)[0]?._id?.toString() !== parentChapterId) {
          if (checkChapters.slice(-1)[0]?.parentChapter?.toString() !== parentChapterId){
            throw new ApiError(400, "Chapter pages collides with other chapter");
          }
        }
    }

    //  create chapter ----------------------------
    chapter = await Chapters.create({
      bookId,
      name,
      pageStart,
      content,
      parentChapter:parentChapterId
    });

    //  push chapter ----------------------------
    if (parentChapterId) {
      await Chapters.findByIdAndUpdate(parentChapterId, {
        $push: {
          subChapters: chapter?._id,
        },
      });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, chapter, "Chapter created successfully"));
  } catch (error) {
    throw new ApiError(
      400,
      error?.message || "Error occured in creating chapter"
    );
  }
});

// update CHapter controller -------------------
export const updateChapter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, content } = req.body;

  let chapter = await Chapters.findById(id);

  if (!chapter) {
    throw new ApiError(400, "Chapter not found!!!!");
  }

  chapter = await Chapters.findByIdAndUpdate(
    id,
    {
      $set: {
        name,content
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, chapter, "Chapter Updated successfully"));
});


// delete Chapter -----------------------------
export const deleteChapter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let chapter = await Chapters.findById(id);

  if (!chapter) {
    throw new ApiError(400, "Chapter not found!!!!");
  }

  for (let index = 0; index < chapter?.subChapters?.length; index++) {
    const element = chapter?.subChapters[index];
    await Chapters.findByIdAndDelete(element)
  }

  await Chapters.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Chapter and all its topic Deleted successfully"));
});
