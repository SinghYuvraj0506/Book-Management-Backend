import { Router } from "express";
import { validate } from "../validators/validate.js";
import { createChapters,updateChapter,deleteChapter } from "../contollers/chapter.controller.js";
import { chapterCreationValidator,chapterUpdationValidator,chapterDeletionValidator } from "../validators/chapters.validator.js";

const router = Router()

router.route("/").post(chapterCreationValidator(),validate,createChapters)
router.route("/:id").put(chapterUpdationValidator(),validate,updateChapter)
router.route("/:id").delete(chapterDeletionValidator(),validate,deleteChapter)

export default router;