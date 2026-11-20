import mongoose, { Schema, Document, Model } from "mongoose";

export type InquiryStatus = "NEW" | "REVIEW" | "SCHEDULED" | "WON" | "ARCHIVED";
export type InquiryPriority = "HIGH" | "MEDIUM" | "LOW";

export interface IInquiry extends Document {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  date?: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  unread: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true, default: "" },
    service: { type: String, trim: true, default: "Full-Stack Web App" },
    budget: { type: String, trim: true, default: "" },
    timeline: { type: String, trim: true, default: "" },
    message: { type: String, required: true },
    date: { type: String, default: () => new Date().toISOString() },
    status: {
      type: String,
      enum: ["NEW", "REVIEW", "SCHEDULED", "WON", "ARCHIVED"],
      default: "NEW",
      index: true,
    },
    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "MEDIUM",
      index: true,
    },
    unread: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
