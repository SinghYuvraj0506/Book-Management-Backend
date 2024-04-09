import { body, param } from "express-validator";

const bookCreationValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("genre").trim().notEmpty().withMessage("Genre is required"),
    body("author").trim().notEmpty().withMessage("Author is required")
  ];
};

const bookUpdationValidator = () => {
  return [
    body("name").optional().trim().notEmpty().withMessage("Name is required"),
    body("genre").optional().trim().notEmpty().withMessage("Genre is required"),
    body("author").optional().trim().notEmpty().withMessage("Author is required"),
    param("id")
      .isMongoId()
      .withMessage("Invalid Book id")
  ];
};

const bookReadValidator = () => {
  return [
    param("id")
    .isMongoId()
    .withMessage("Invalid Book id")
  ];
};

export { bookCreationValidator,bookReadValidator,bookUpdationValidator };
