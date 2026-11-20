import { Router } from "express";
import {
  getMemos,
  getMemo,
  postMemo,
  patchMemo,
  removeMemo,
} from "../controllers/memoController";

const router = Router();

router.get("/", getMemos);
router.post("/", postMemo);
router.get("/:id", getMemo);
router.patch("/:id", patchMemo);
router.delete("/:id", removeMemo);

export default router;
