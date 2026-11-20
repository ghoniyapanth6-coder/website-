import { Router } from "express";
import healthRoutes from "./healthRoutes";
import inquiryRoutes from "./inquiryRoutes";
import memoRoutes from "./memoRoutes";
import serviceRoutes from "./serviceRoutes";
import planRoutes from "./planRoutes";
import projectRoutes from "./projectRoutes";
import testimonialRoutes from "./testimonialRoutes";
import faqRoutes from "./faqRoutes";
import settingsRoutes from "./settingsRoutes";
import seedRoutes from "./seedRoutes";

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/inquiries", inquiryRoutes);
apiRouter.use("/memos", memoRoutes);
apiRouter.use("/services", serviceRoutes);
apiRouter.use("/plans", planRoutes);
apiRouter.use("/projects", projectRoutes);
apiRouter.use("/testimonials", testimonialRoutes);
apiRouter.use("/faqs", faqRoutes);
apiRouter.use("/settings", settingsRoutes);
apiRouter.use("/seed", seedRoutes);

export default apiRouter;
