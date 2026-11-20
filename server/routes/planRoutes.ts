import { Router } from "express";
import {
  getPlans,
  getPlan,
  postPlan,
  patchPlan,
  removePlan,
} from "../controllers/planController";

const router = Router();

router.get("/", getPlans);
router.post("/", postPlan);
router.get("/:id", getPlan);
router.patch("/:id", patchPlan);
router.delete("/:id", removePlan);

export default router;
