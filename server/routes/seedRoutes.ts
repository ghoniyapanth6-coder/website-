import { Router } from "express";
import { postSeed } from "../controllers/seedController";

const router = Router();

router.post("/", postSeed);

export default router;
