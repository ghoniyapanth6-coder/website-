import mongoose, { Schema, Document, Model } from "mongoose";

export type PlanStatus = "ACTIVE" | "FULL";

export interface IPlan extends Document {
  id: string;
  name: string;
  price: string;
  period: string;
  slotsAvailable: number;
  maxSlots: number;
  turnaround: string;
  features: string[];
  bestFor?: string;
  targetAudience?: string;
  popular?: boolean;
  badge?: string;
  status: PlanStatus;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true },
    period: { type: String, default: "one-time" },
    slotsAvailable: { type: Number, default: 2 },
    maxSlots: { type: Number, default: 5 },
    turnaround: { type: String, default: "2-4 WEEKS" },
    features: [{ type: String }],
    bestFor: {
      type: String,
      default: function (this: IPlan) {
        return this.targetAudience || "";
      },
    },
    targetAudience: {
      type: String,
      default: function (this: IPlan) {
        return this.bestFor || "";
      },
    },
    popular: { type: Boolean, default: false },
    badge: { type: String, default: "" },
    status: {
      type: String,
      enum: ["ACTIVE", "FULL"],
      default: "ACTIVE",
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Plan: Model<IPlan> =
  mongoose.models.Plan || mongoose.model<IPlan>("Plan", PlanSchema);

export default Plan;
