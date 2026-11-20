import mongoose, { Schema, Document, Model } from "mongoose";

export type ServiceStatus = "ACTIVE" | "PAUSED";

export interface IServiceMetricsHighlight {
  value: string;
  label: string;
}

export interface IService extends Document {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  price: string;
  turnaround: string;
  deliverables: string[];
  techStack: string[];
  category?: string;
  metricsHighlight?: IServiceMetricsHighlight;
  status: ServiceStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      default: function (this: IService) {
        return (this.title || this.id || "")
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");
      },
      index: true,
    },
    tagline: { type: String, default: "" },
    price: { type: String, required: true },
    turnaround: { type: String, default: "2 - 4 Weeks" },
    deliverables: [{ type: String }],
    techStack: [{ type: String }],
    category: { type: String, default: "ENGINEERING" },
    metricsHighlight: {
      value: { type: String, default: "" },
      label: { type: String, default: "" },
    },
    status: {
      type: String,
      enum: ["ACTIVE", "PAUSED"],
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

export const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
