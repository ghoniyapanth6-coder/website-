import { Router } from "express";
import {
  getTestimonials,
  getTestimonial,
  postTestimonial,
  patchTestimonial,
  removeTestimonial,
} from "../controllers/testimonialController";

const router = Router();

router.get("/", getTestimonials);
router.post("/", postTestimonial);
router.get("/:id", getTestimonial);
router.patch("/:id", patchTestimonial);
router.delete("/:id", removeTestimonial);

export default router;
