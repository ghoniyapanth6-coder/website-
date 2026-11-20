import mongoose, { Schema, Document, Model } from "mongoose";

export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "MAINTENANCE";

export interface IPortfolioProject extends Document {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  metricHighlight: string;
  techStack: string[];
  liveUrl: string;
  description?: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    client: { type: String, required: true, trim: true },
    category: { type: String, default: "ENGINEERING", index: true },
    year: { type: String, default: () => new Date().getFullYear().toString() },
    metricHighlight: { type: String, default: "" },
    techStack: [{ type: String }],
    liveUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    status: {
      type: String,
      enum: ["COMPLETED", "IN_PROGRESS", "MAINTENANCE"],
      default: "COMPLETED",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const PortfolioProject: Model<IPortfolioProject> =
  mongoose.models.PortfolioProject ||
  mongoose.model<IPortfolioProject>("PortfolioProject", PortfolioProjectSchema);

export default PortfolioProject;
