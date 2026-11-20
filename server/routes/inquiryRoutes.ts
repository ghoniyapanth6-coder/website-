import { Router } from "express";
import {
  getInquiries,
  getInquiry,
  postInquiry,
  patchInquiry,
  removeInquiry,
} from "../controllers/inquiryController";

const router = Router();

router.get("/", getInquiries);
router.post("/", postInquiry);
router.get("/:id", getInquiry);
router.patch("/:id", patchInquiry);
router.delete("/:id", removeInquiry);

export default router;
