import { Router } from "express";
import {
  getFaqs,
  getFaq,
  postFaq,
  patchFaq,
  removeFaq,
} from "../controllers/faqController";

const router = Router();

router.get("/", getFaqs);
router.post("/", postFaq);
router.get("/:id", getFaq);
router.patch("/:id", patchFaq);
router.delete("/:id", removeFaq);

export default router;
