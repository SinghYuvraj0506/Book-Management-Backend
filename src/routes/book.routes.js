import { Router } from "express";
import { validate } from "../validators/validate.js";
import { createBook,updateBook,readBook,deleteBook } from "../contollers/book.controller.js";
import { bookCreationValidator,bookUpdationValidator,bookReadValidator } from "../validators/books.validator.js";

const router = Router()

router.route("/").post(bookCreationValidator(),validate,createBook)
router.route("/:id").put(bookUpdationValidator(),validate,updateBook)
router.route("/:id").get(bookReadValidator(),validate,readBook)
router.route("/:id").delete(bookReadValidator(),validate,deleteBook)

export default router;
