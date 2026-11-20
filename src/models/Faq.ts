import mongoose, { Schema, Document, Model } from "mongoose";

export type FaqCategory = "GENERAL" | "PRICING" | "ENGINEERING" | "OWNERSHIP";
export type FaqTargetPage = "HOME" | "ABOUT" | "PLANS" | "ALL";
export type FaqStatus = "ACTIVE" | "HIDDEN";

export interface IFaq extends Document {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  targetPage: FaqTargetPage;
  highlightBadge: string;
  status: FaqStatus;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const FaqSchema = new Schema<IFaq>(
  {
    id: { type: String, required: true, unique: true, index: true },
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: {
      type: String,
      enum: ["GENERAL", "PRICING", "ENGINEERING", "OWNERSHIP"],
      default: "GENERAL",
      index: true,
    },
    targetPage: {
      type: String,
      enum: ["HOME", "ABOUT", "PLANS", "ALL"],
      default: "ALL",
      index: true,
    },
    highlightBadge: { type: String, default: "" },
    status: {
      type: String,
      enum: ["ACTIVE", "HIDDEN"],
      default: "ACTIVE",
      index: true,
    },
    order: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Faq: Model<IFaq> =
  mongoose.models.Faq || mongoose.model<IFaq>("Faq", FaqSchema);

export default Faq;
