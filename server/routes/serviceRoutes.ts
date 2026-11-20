import { Router } from "express";
import {
  getServices,
  getService,
  postService,
  patchService,
  removeService,
} from "../controllers/serviceController";

const router = Router();

router.get("/", getServices);
router.post("/", postService);
router.get("/:id", getService);
router.patch("/:id", patchService);
router.delete("/:id", removeService);

export default router;
