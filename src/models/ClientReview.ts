import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClientReview extends Document {
  id: string;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  date: string;
  verified: boolean;
  avatarInitials?: string;
  avatarBg?: string;
  contractId: string;
  metricBadge: string;
  metricDetail?: string;
  location?: string;
  category?: string;
  techStack?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ClientReviewSchema = new Schema<IClientReview>(
  {
    id: { type: String, required: true, unique: true, index: true },
    clientName: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    company: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    date: { type: String, default: "" },
    verified: { type: Boolean, default: true },
    avatarInitials: {
      type: String,
      default: function (this: IClientReview) {
        if (!this.clientName) return "CC";
        return this.clientName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);
      },
    },
    avatarBg: { type: String, default: "bg-accent-yellow text-ink-black" },
    contractId: { type: String, default: "" },
    metricBadge: { type: String, default: "" },
    metricDetail: { type: String, default: "" },
    location: { type: String, default: "" },
    category: { type: String, default: "" },
    techStack: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const ClientReview: Model<IClientReview> =
  mongoose.models.ClientReview ||
  mongoose.model<IClientReview>("ClientReview", ClientReviewSchema);

export default ClientReview;
