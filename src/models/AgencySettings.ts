import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAgencyAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  coordinates: string;
}

export interface IAgencySocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
  discord: string;
}

export interface IAgencySettings extends Document {
  agencyName: string;
  email: string;
  phone: string;
  address: IAgencyAddress;
  siteTagline: string;
  socialLinks: IAgencySocialLinks;
  lighthouseTarget: number;
  slaResponseTimeHours: number;
  defaultCurrency: string;
  activeSprintSlots: number;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    street: { type: String, default: "Market Street, SoMa District" },
    city: { type: String, default: "San Francisco" },
    state: { type: String, default: "CA" },
    zip: { type: String, default: "94103" },
    country: { type: String, default: "United States" },
    coordinates: { type: String, default: "37.7749° N, 122.4194° W" },
  },
  { _id: false }
);

const SocialLinksSchema = new Schema(
  {
    github: { type: String, default: "https://github.com/codeclovers" },
    twitter: { type: String, default: "https://twitter.com/codeclovers" },
    linkedin: { type: String, default: "https://linkedin.com/company/codeclovers" },
    discord: { type: String, default: "https://discord.gg/codeclovers" },
  },
  { _id: false }
);

const AgencySettingsSchema = new Schema<IAgencySettings>(
  {
    agencyName: { type: String, required: true, default: "CodeClovers Studio" },
    email: { type: String, required: true, default: "hello@codeclovers.dev" },
    phone: { type: String, default: "+1 (415) 890-4221" },
    address: { type: AddressSchema, default: () => ({}) },
    siteTagline: {
      type: String,
      default:
        "High-Speed Web Engineering, Modern Design Systems & Zero-Bloat Next.js Architecture",
    },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
    lighthouseTarget: { type: Number, default: 100 },
    slaResponseTimeHours: { type: Number, default: 4 },
    defaultCurrency: { type: String, default: "USD" },
    activeSprintSlots: { type: Number, default: 2 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const AgencySettings: Model<IAgencySettings> =
  mongoose.models.AgencySettings ||
  mongoose.model<IAgencySettings>("AgencySettings", AgencySettingsSchema);

export default AgencySettings;
