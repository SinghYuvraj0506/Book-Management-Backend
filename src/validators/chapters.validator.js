import { body, param } from "express-validator";

const chapterCreationValidator = () => {
  return [
    body("bookId")
      .notEmpty()
      .withMessage("Book id is required")
      .isMongoId()
      .withMessage("Invalid book id"),
    body("name").trim().notEmpty().withMessage("Chapter Name is required"),
    body("pageStart")
    .notEmpty()
    .withMessage("pageStart is required")
    .isInt({ min: 1 })
    .withMessage("Invalid pageStart value"),
    body("content").trim().notEmpty().withMessage("Content is required"),
    body("parentChapterId")
      .optional()
      .isMongoId()
      .withMessage("Invalid parent Chapter id"),
  ];
};

const chapterUpdationValidator = () => {
  return [
    body("name").optional().trim().notEmpty().withMessage("Chapter Name is required"),
    body("content").optional().trim().notEmpty().withMessage("Content is required"),
    param("id")
      .isMongoId()
      .withMessage("Invalid Chapter id"),
  ];
};

const chapterDeletionValidator = () => {
  return [
    param("id")
      .isMongoId()
      .withMessage("Invalid Chapter id"),
  ];
};


const chapterReadValidator = () => {
  return [
    param("id")
      .isMongoId()
      .withMessage("Invalid Chapter id"),
  ];
};



export {chapterCreationValidator,chapterUpdationValidator,chapterDeletionValidator,chapterReadValidator};
