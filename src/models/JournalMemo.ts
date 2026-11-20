import mongoose, { Schema, Document, Model } from "mongoose";

export type MemoStatus = "PUBLISHED" | "DRAFT";

export interface JournalArticleCallout {
  type: "note" | "warning" | "pro-tip";
  title: string;
  body: string;
}

export interface JournalArticleCodeBlock {
  filename: string;
  language: string;
  code: string;
}

export interface JournalArticleComparisonTable {
  dimension: string;
  legacy: string;
  codeclovers: string;
  impact: string;
}

export interface JournalArticleSection {
  id: string;
  heading: string;
  content: string[];
  callout?: JournalArticleCallout;
  codeBlock?: JournalArticleCodeBlock;
  comparisonTable?: JournalArticleComparisonTable[];
  checklist?: string[];
}

export interface JournalArticleAuthor {
  name: string;
  role: string;
  handle: string;
}

export interface JournalArticleMetric {
  label: string;
  value: string;
}

export interface IJournalMemo extends Document {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categoryColor?: string;
  readTime: string;
  date: string;
  excerpt: string;
  tags: string[];
  status: MemoStatus;
  views: number;
  featured: boolean;
  author?: JournalArticleAuthor;
  authorName?: string;
  executiveSummary?: string;
  keyTakeaways?: string[];
  metrics?: JournalArticleMetric[];
  tableOfContents?: { id: string; label: string }[];
  sections?: JournalArticleSection[];
  createdAt: Date;
  updatedAt: Date;
}

const CalloutSchema = new Schema(
  {
    type: { type: String, enum: ["note", "warning", "pro-tip"], default: "note" },
    title: { type: String, default: "" },
    body: { type: String, default: "" },
  },
  { _id: false }
);

const CodeBlockSchema = new Schema(
  {
    filename: { type: String, default: "" },
    language: { type: String, default: "" },
    code: { type: String, default: "" },
  },
  { _id: false }
);

const ComparisonTableSchema = new Schema(
  {
    dimension: { type: String, default: "" },
    legacy: { type: String, default: "" },
    codeclovers: { type: String, default: "" },
    impact: { type: String, default: "" },
  },
  { _id: false }
);

const SectionSchema = new Schema(
  {
    id: { type: String, default: "" },
    heading: { type: String, default: "" },
    content: [{ type: String }],
    callout: { type: CalloutSchema, default: undefined },
    codeBlock: { type: CodeBlockSchema, default: undefined },
    comparisonTable: [ComparisonTableSchema],
    checklist: [{ type: String }],
  },
  { _id: false }
);

const AuthorSchema = new Schema(
  {
    name: { type: String, default: "" },
    role: { type: String, default: "" },
    handle: { type: String, default: "" },
  },
  { _id: false }
);

const MetricSchema = new Schema(
  {
    label: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { _id: false }
);

const TocSchema = new Schema(
  {
    id: { type: String, default: "" },
    label: { type: String, default: "" },
  },
  { _id: false }
);

const JournalMemoSchema = new Schema<IJournalMemo>(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    category: { type: String, required: true, index: true },
    categoryColor: { type: String, default: "bg-accent-yellow text-ink-black" },
    readTime: { type: String, default: "5 MIN READ" },
    date: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: ["PUBLISHED", "DRAFT"],
      default: "DRAFT",
      index: true,
    },
    views: { type: Number, default: 0 },
    featured: { type: Boolean, default: false, index: true },
    author: { type: AuthorSchema, default: undefined },
    authorName: { type: String, default: "" },
    executiveSummary: { type: String, default: "" },
    keyTakeaways: [{ type: String }],
    metrics: [MetricSchema],
    tableOfContents: [TocSchema],
    sections: [SectionSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const JournalMemo: Model<IJournalMemo> =
  mongoose.models.JournalMemo ||
  mongoose.model<IJournalMemo>("JournalMemo", JournalMemoSchema);

export default JournalMemo;
