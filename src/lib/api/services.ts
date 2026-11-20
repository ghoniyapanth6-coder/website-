import { tryConnectToDatabase, isConnected } from "../db";
import {
  Inquiry,
  JournalMemo,
  Service,
  Plan,
  PortfolioProject,
  ClientReview,
  Faq,
  AgencySettings,
} from "../../models";
import { memoryStore } from "./store";
import { INITIAL_ADMIN_FULL_STATE } from "../../data/adminMockData";

/**
 * Universal Result Interface
 */
export interface ServiceResult<T> {
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    pages?: number;
    [key: string]: unknown;
  };
  source: "mongodb" | "mock-fallback";
  error?: {
    status: number;
    title: string;
    detail: string;
    invalidParams?: Array<{ name: string; reason: string }>;
  };
}

// =============================================================================
// 1. HEALTH SERVICE
// =============================================================================
export async function getHealthStatus(): Promise<{
  status: "ok" | "degraded";
  uptime: number;
  timestamp: string;
  nodeVersion: string;
  memory: NodeJS.MemoryUsage;
  database: {
    status: "connected" | "disconnected";
    mode: "mongodb" | "mock-fallback";
    uri: string;
  };
}> {
  const dbConnected = await tryConnectToDatabase();
  return {
    status: "ok",
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memory: process.memoryUsage(),
    database: {
      status: dbConnected ? "connected" : "disconnected",
      mode: dbConnected ? "mongodb" : "mock-fallback",
      uri: process.env.MONGODB_URI ? "configured" : "default (localhost:27017/codeclovers)",
    },
  };
}

// =============================================================================
// 2. INQUIRIES SERVICE
// =============================================================================
export interface InquiryFilterParams {
  search?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export async function listInquiries(
  params: InquiryFilterParams = {}
): Promise<ServiceResult<any[]>> {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(params.limit) || 20));
  const skip = (page - 1) * limit;

  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.status && params.status !== "ALL") {
        filter.status = params.status.toUpperCase();
      }
      if (params.priority && params.priority !== "ALL") {
        filter.priority = params.priority.toUpperCase();
      }
      if (params.search) {
        const regex = new RegExp(params.search, "i");
        filter.$or = [
          { name: regex },
          { email: regex },
          { company: regex },
          { message: regex },
          { id: regex },
        ];
      }

      const [total, items] = await Promise.all([
        Inquiry.countDocuments(filter),
        Inquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ]);

      return {
        data: items,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
        source: "mongodb",
      };
    } catch (e) {
      console.warn("[InquiryService] MongoDB query failed, falling back to mock:", e);
    }
  }

  // Memory fallback
  let list = [...memoryStore.inquiries];
  if (params.status && params.status !== "ALL") {
    list = list.filter((i) => i.status.toUpperCase() === params.status?.toUpperCase());
  }
  if (params.priority && params.priority !== "ALL") {
    list = list.filter((i) => i.priority.toUpperCase() === params.priority?.toUpperCase());
  }
  if (params.search) {
    const s = params.search.toLowerCase();
    list = list.filter(
      (i) =>
        i.name.toLowerCase().includes(s) ||
        i.email.toLowerCase().includes(s) ||
        i.company?.toLowerCase().includes(s) ||
        i.message.toLowerCase().includes(s) ||
        i.id.toLowerCase().includes(s)
    );
  }

  const total = list.length;
  const paged = list.slice(skip, skip + limit);

  return {
    data: paged,
    meta: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
    source: "mock-fallback",
  };
}

export async function getInquiryById(id: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await Inquiry.findOne({ $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] }).lean();
      if (item) {
        return { data: item, source: "mongodb" };
      }
    } catch (e) {
      console.warn("[InquiryService] MongoDB find failed:", e);
    }
  }

  const found = memoryStore.inquiries.find((i) => i.id === id);
  if (found) {
    return { data: found, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: {
      status: 404,
      title: "Inquiry Not Found",
      detail: `No client inquiry found matching identifier '${id}'.`,
    },
  };
}

export async function createInquiry(payload: any): Promise<ServiceResult<any>> {
  const invalidParams: Array<{ name: string; reason: string }> = [];

  if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
    invalidParams.push({ name: "name", reason: "Client full name is required." });
  }
  if (!payload.email || typeof payload.email !== "string" || !payload.email.includes("@")) {
    invalidParams.push({ name: "email", reason: "Valid business email address is required." });
  }
  if (!payload.message || typeof payload.message !== "string" || !payload.message.trim()) {
    invalidParams.push({ name: "message", reason: "Project description/message is required." });
  }

  if (invalidParams.length > 0) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "One or more required inquiry fields are missing or invalid.",
        invalidParams,
      },
    };
  }

  const id = payload.id || `INQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const date = payload.date || new Date().toISOString();

  const newDoc = {
    id,
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone?.trim() || "",
    company: payload.company?.trim() || "",
    service: payload.service?.trim() || "Full-Stack Web App",
    budget: payload.budget?.trim() || "",
    timeline: payload.timeline?.trim() || "",
    message: payload.message.trim(),
    date,
    status: payload.status || "NEW",
    priority: payload.priority || "MEDIUM",
    unread: payload.unread !== undefined ? payload.unread : true,
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await Inquiry.create(newDoc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[InquiryService] MongoDB create failed, writing to memory store:", e);
    }
  }

  // Always keep in memory store as fallback
  memoryStore.inquiries.unshift(newDoc as any);
  return { data: newDoc, source: "mock-fallback" };
}

export async function updateInquiry(id: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await Inquiry.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();

      if (updated) {
        return { data: updated, source: "mongodb" };
      }
    } catch (e) {
      console.warn("[InquiryService] MongoDB update failed:", e);
    }
  }

  const idx = memoryStore.inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryStore.inquiries[idx] = { ...memoryStore.inquiries[idx], ...updates };
    return { data: memoryStore.inquiries[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: {
      status: 404,
      title: "Inquiry Not Found",
      detail: `Cannot update. No inquiry found with identifier '${id}'.`,
    },
  };
}

export async function deleteInquiry(id: string): Promise<ServiceResult<{ deleted: boolean; id: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await Inquiry.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (res) {
        return { data: { deleted: true, id }, source: "mongodb" };
      }
    } catch (e) {
      console.warn("[InquiryService] MongoDB delete failed:", e);
    }
  }

  const idx = memoryStore.inquiries.findIndex((i) => i.id === id);
  if (idx !== -1) {
    memoryStore.inquiries.splice(idx, 1);
    return { data: { deleted: true, id }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: {
      status: 404,
      title: "Inquiry Not Found",
      detail: `Cannot delete. No inquiry found with identifier '${id}'.`,
    },
  };
}

// =============================================================================
// 3. MEMOS / ARTICLES SERVICE
// =============================================================================
export interface MemoFilterParams {
  category?: string;
  search?: string;
  status?: string;
  publishedOnly?: boolean;
  page?: number;
  limit?: number;
}

export async function listMemos(params: MemoFilterParams = {}): Promise<ServiceResult<any[]>> {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(params.limit) || 20));
  const skip = (page - 1) * limit;

  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.category && params.category !== "ALL") {
        filter.category = new RegExp(`^${params.category}$`, "i");
      }
      if (params.status && params.status !== "ALL") {
        filter.status = params.status.toUpperCase();
      } else if (params.publishedOnly) {
        filter.status = "PUBLISHED";
      }
      if (params.search) {
        const regex = new RegExp(params.search, "i");
        filter.$or = [{ title: regex }, { subtitle: regex }, { excerpt: regex }, { tags: regex }];
      }

      const [total, items] = await Promise.all([
        JournalMemo.countDocuments(filter),
        JournalMemo.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ]);

      return {
        data: items,
        meta: { total, page, limit, pages: Math.ceil(total / limit) },
        source: "mongodb",
      };
    } catch (e) {
      console.warn("[MemoService] MongoDB query failed, falling back to mock:", e);
    }
  }

  let list = [...memoryStore.memos];
  if (params.category && params.category !== "ALL") {
    list = list.filter((m) => m.category.toLowerCase() === params.category?.toLowerCase());
  }
  if (params.status && params.status !== "ALL") {
    list = list.filter((m) => m.status.toUpperCase() === params.status?.toUpperCase());
  } else if (params.publishedOnly) {
    list = list.filter((m) => m.status === "PUBLISHED");
  }
  if (params.search) {
    const s = params.search.toLowerCase();
    list = list.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.subtitle?.toLowerCase().includes(s) ||
        m.excerpt.toLowerCase().includes(s) ||
        m.tags.some((t) => t.toLowerCase().includes(s))
    );
  }

  const total = list.length;
  const paged = list.slice(skip, skip + limit);

  return {
    data: paged,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
    source: "mock-fallback",
  };
}

export async function getMemoByIdOrSlug(idOrSlug: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await JournalMemo.findOne({
        $or: [
          { slug: idOrSlug },
          { id: idOrSlug },
          { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
        ],
      }).lean();

      if (item) {
        return { data: item, source: "mongodb" };
      }
    } catch (e) {
      console.warn("[MemoService] MongoDB find failed:", e);
    }
  }

  const found = memoryStore.memos.find((m) => m.slug === idOrSlug || m.id === idOrSlug);
  if (found) {
    return { data: found, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: {
      status: 404,
      title: "Journal Memo Not Found",
      detail: `No journal article or memo found with slug or ID '${idOrSlug}'.`,
    },
  };
}

export async function createMemo(payload: any): Promise<ServiceResult<any>> {
  const invalidParams: Array<{ name: string; reason: string }> = [];

  if (!payload.title || typeof payload.title !== "string" || !payload.title.trim()) {
    invalidParams.push({ name: "title", reason: "Article title is required." });
  }
  if (!payload.category || typeof payload.category !== "string" || !payload.category.trim()) {
    invalidParams.push({ name: "category", reason: "Category is required." });
  }

  if (invalidParams.length > 0) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "Required memo fields are missing or invalid.",
        invalidParams,
      },
    };
  }

  const slug =
    payload.slug ||
    payload.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  const id = payload.id || `MEMO-${Date.now()}`;

  const doc = {
    ...payload,
    id,
    slug,
    readTime: payload.readTime || "5 MIN READ",
    date: payload.date || new Date().toISOString().split("T")[0],
    excerpt: payload.excerpt || payload.title,
    tags: Array.isArray(payload.tags) ? payload.tags : ["Engineering"],
    status: payload.status || "DRAFT",
    views: payload.views || 0,
    featured: Boolean(payload.featured),
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await JournalMemo.create(doc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[MemoService] MongoDB create failed, writing to memory store:", e);
    }
  }

  memoryStore.memos.unshift(doc as any);
  return { data: doc, source: "mock-fallback" };
}

export async function updateMemo(idOrSlug: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await JournalMemo.findOneAndUpdate(
        {
          $or: [
            { slug: idOrSlug },
            { id: idOrSlug },
            { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
          ],
        },
        { $set: updates },
        { new: true }
      ).lean();

      if (updated) {
        return { data: updated, source: "mongodb" };
      }
    } catch (e) {
      console.warn("[MemoService] MongoDB update failed:", e);
    }
  }

  const idx = memoryStore.memos.findIndex((m) => m.slug === idOrSlug || m.id === idOrSlug);
  if (idx !== -1) {
    memoryStore.memos[idx] = { ...memoryStore.memos[idx], ...updates };
    return { data: memoryStore.memos[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: {
      status: 404,
      title: "Journal Memo Not Found",
      detail: `Cannot update. No memo found with identifier '${idOrSlug}'.`,
    },
  };
}

export async function deleteMemo(idOrSlug: string): Promise<ServiceResult<{ deleted: boolean; idOrSlug: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await JournalMemo.findOneAndDelete({
        $or: [
          { slug: idOrSlug },
          { id: idOrSlug },
          { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
        ],
      });
      if (res) {
        return { data: { deleted: true, idOrSlug }, source: "mongodb" };
      }
    } catch (e) {
      console.warn("[MemoService] MongoDB delete failed:", e);
    }
  }

  const idx = memoryStore.memos.findIndex((m) => m.slug === idOrSlug || m.id === idOrSlug);
  if (idx !== -1) {
    memoryStore.memos.splice(idx, 1);
    return { data: { deleted: true, idOrSlug }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: {
      status: 404,
      title: "Journal Memo Not Found",
      detail: `Cannot delete. No memo found with identifier '${idOrSlug}'.`,
    },
  };
}

// =============================================================================
// 4. SERVICES
// =============================================================================
export async function listServices(params: { category?: string; status?: string } = {}): Promise<ServiceResult<any[]>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.status && params.status !== "ALL") filter.status = params.status.toUpperCase();
      if (params.category && params.category !== "ALL") filter.category = params.category;
      const items = await Service.find(filter).lean();
      return { data: items, meta: { total: items.length }, source: "mongodb" };
    } catch (e) {
      console.warn("[ServiceService] DB query failed:", e);
    }
  }

  let list = [...memoryStore.services];
  if (params.status && params.status !== "ALL") {
    list = list.filter((s) => s.status.toUpperCase() === params.status?.toUpperCase());
  }
  if (params.category && params.category !== "ALL") {
    list = list.filter((s) => s.category?.toUpperCase() === params.category?.toUpperCase());
  }
  return { data: list, meta: { total: list.length }, source: "mock-fallback" };
}

export async function getServiceById(idOrSlug: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await Service.findOne({
        $or: [
          { id: idOrSlug },
          { slug: idOrSlug },
          { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
        ],
      }).lean();
      if (item) return { data: item, source: "mongodb" };
    } catch (e) {
      console.warn("[ServiceService] DB find failed:", e);
    }
  }

  const found = memoryStore.services.find((s) => s.id === idOrSlug || (s as any).slug === idOrSlug);
  if (found) return { data: found, source: "mock-fallback" };

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Service Not Found", detail: `Service '${idOrSlug}' not found.` },
  };
}

export async function createService(payload: any): Promise<ServiceResult<any>> {
  if (!payload.title || !payload.price) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "Title and price are required for services.",
        invalidParams: [
          ...(!payload.title ? [{ name: "title", reason: "Title is required" }] : []),
          ...(!payload.price ? [{ name: "price", reason: "Price is required" }] : []),
        ],
      },
    };
  }

  const id = payload.id || `srv-${Date.now()}`;
  const doc = {
    ...payload,
    id,
    slug: payload.slug || payload.title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
    status: payload.status || "ACTIVE",
    deliverables: payload.deliverables || [],
    techStack: payload.techStack || [],
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await Service.create(doc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[ServiceService] DB create failed:", e);
    }
  }

  memoryStore.services.push(doc as any);
  return { data: doc, source: "mock-fallback" };
}

export async function updateService(idOrSlug: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await Service.findOneAndUpdate(
        {
          $or: [
            { id: idOrSlug },
            { slug: idOrSlug },
            { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
          ],
        },
        { $set: updates },
        { new: true }
      ).lean();
      if (updated) return { data: updated, source: "mongodb" };
    } catch (e) {
      console.warn("[ServiceService] DB update failed:", e);
    }
  }

  const idx = memoryStore.services.findIndex((s) => s.id === idOrSlug || (s as any).slug === idOrSlug);
  if (idx !== -1) {
    memoryStore.services[idx] = { ...memoryStore.services[idx], ...updates };
    return { data: memoryStore.services[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Service Not Found", detail: `Service '${idOrSlug}' not found.` },
  };
}

export async function deleteService(idOrSlug: string): Promise<ServiceResult<{ deleted: boolean; id: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await Service.findOneAndDelete({
        $or: [
          { id: idOrSlug },
          { slug: idOrSlug },
          { _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null },
        ],
      });
      if (res) return { data: { deleted: true, id: idOrSlug }, source: "mongodb" };
    } catch (e) {
      console.warn("[ServiceService] DB delete failed:", e);
    }
  }

  const idx = memoryStore.services.findIndex((s) => s.id === idOrSlug || (s as any).slug === idOrSlug);
  if (idx !== -1) {
    memoryStore.services.splice(idx, 1);
    return { data: { deleted: true, id: idOrSlug }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Service Not Found", detail: `Service '${idOrSlug}' not found.` },
  };
}

// =============================================================================
// 5. PLANS
// =============================================================================
export async function listPlans(params: { status?: string } = {}): Promise<ServiceResult<any[]>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.status && params.status !== "ALL") filter.status = params.status.toUpperCase();
      const items = await Plan.find(filter).lean();
      return { data: items, meta: { total: items.length }, source: "mongodb" };
    } catch (e) {
      console.warn("[PlanService] DB list failed:", e);
    }
  }

  let list = [...memoryStore.plans];
  if (params.status && params.status !== "ALL") {
    list = list.filter((p) => p.status.toUpperCase() === params.status?.toUpperCase());
  }
  return { data: list, meta: { total: list.length }, source: "mock-fallback" };
}

export async function getPlanById(id: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await Plan.findOne({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      }).lean();
      if (item) return { data: item, source: "mongodb" };
    } catch (e) {
      console.warn("[PlanService] DB find failed:", e);
    }
  }

  const found = memoryStore.plans.find((p) => p.id === id);
  if (found) return { data: found, source: "mock-fallback" };

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Plan Not Found", detail: `Plan '${id}' not found.` },
  };
}

export async function createPlan(payload: any): Promise<ServiceResult<any>> {
  if (!payload.name || !payload.price) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "Name and price are required for plans.",
        invalidParams: [
          ...(!payload.name ? [{ name: "name", reason: "Plan name is required" }] : []),
          ...(!payload.price ? [{ name: "price", reason: "Plan price is required" }] : []),
        ],
      },
    };
  }

  const id = payload.id || `plan-${Date.now()}`;
  const doc = {
    ...payload,
    id,
    period: payload.period || "one-time",
    slotsAvailable: Number(payload.slotsAvailable ?? 2),
    maxSlots: Number(payload.maxSlots ?? 5),
    turnaround: payload.turnaround || "2-4 WEEKS",
    features: payload.features || [],
    status: payload.status || "ACTIVE",
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await Plan.create(doc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[PlanService] DB create failed:", e);
    }
  }

  memoryStore.plans.push(doc as any);
  return { data: doc, source: "mock-fallback" };
}

export async function updatePlan(id: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await Plan.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
      if (updated) return { data: updated, source: "mongodb" };
    } catch (e) {
      console.warn("[PlanService] DB update failed:", e);
    }
  }

  const idx = memoryStore.plans.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryStore.plans[idx] = { ...memoryStore.plans[idx], ...updates };
    return { data: memoryStore.plans[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Plan Not Found", detail: `Plan '${id}' not found.` },
  };
}

export async function deletePlan(id: string): Promise<ServiceResult<{ deleted: boolean; id: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await Plan.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (res) return { data: { deleted: true, id }, source: "mongodb" };
    } catch (e) {
      console.warn("[PlanService] DB delete failed:", e);
    }
  }

  const idx = memoryStore.plans.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryStore.plans.splice(idx, 1);
    return { data: { deleted: true, id }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Plan Not Found", detail: `Plan '${id}' not found.` },
  };
}

// =============================================================================
// 6. PROJECTS (PORTFOLIO)
// =============================================================================
export async function listProjects(params: { category?: string; status?: string } = {}): Promise<ServiceResult<any[]>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.category && params.category !== "ALL") filter.category = params.category;
      if (params.status && params.status !== "ALL") filter.status = params.status;
      const items = await PortfolioProject.find(filter).lean();
      return { data: items, meta: { total: items.length }, source: "mongodb" };
    } catch (e) {
      console.warn("[ProjectService] DB list failed:", e);
    }
  }

  let list = [...memoryStore.projects];
  if (params.category && params.category !== "ALL") {
    list = list.filter((p) => p.category?.toUpperCase() === params.category?.toUpperCase());
  }
  return { data: list, meta: { total: list.length }, source: "mock-fallback" };
}

export async function getProjectById(id: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await PortfolioProject.findOne({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      }).lean();
      if (item) return { data: item, source: "mongodb" };
    } catch (e) {
      console.warn("[ProjectService] DB find failed:", e);
    }
  }

  const found = memoryStore.projects.find((p) => p.id === id);
  if (found) return { data: found, source: "mock-fallback" };

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Project Not Found", detail: `Project '${id}' not found.` },
  };
}

export async function createProject(payload: any): Promise<ServiceResult<any>> {
  if (!payload.title || !payload.client) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "Title and client are required for portfolio projects.",
        invalidParams: [
          ...(!payload.title ? [{ name: "title", reason: "Title is required" }] : []),
          ...(!payload.client ? [{ name: "client", reason: "Client is required" }] : []),
        ],
      },
    };
  }

  const id = payload.id || `proj-${Date.now()}`;
  const doc = {
    ...payload,
    id,
    techStack: payload.techStack || [],
    status: payload.status || "COMPLETED",
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await PortfolioProject.create(doc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[ProjectService] DB create failed:", e);
    }
  }

  memoryStore.projects.push(doc as any);
  return { data: doc, source: "mock-fallback" };
}

export async function updateProject(id: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await PortfolioProject.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
      if (updated) return { data: updated, source: "mongodb" };
    } catch (e) {
      console.warn("[ProjectService] DB update failed:", e);
    }
  }

  const idx = memoryStore.projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryStore.projects[idx] = { ...memoryStore.projects[idx], ...updates };
    return { data: memoryStore.projects[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Project Not Found", detail: `Project '${id}' not found.` },
  };
}

export async function deleteProject(id: string): Promise<ServiceResult<{ deleted: boolean; id: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await PortfolioProject.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (res) return { data: { deleted: true, id }, source: "mongodb" };
    } catch (e) {
      console.warn("[ProjectService] DB delete failed:", e);
    }
  }

  const idx = memoryStore.projects.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryStore.projects.splice(idx, 1);
    return { data: { deleted: true, id }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Project Not Found", detail: `Project '${id}' not found.` },
  };
}

// =============================================================================
// 7. TESTIMONIALS / CLIENT REVIEWS
// =============================================================================
export async function listTestimonials(params: { verified?: boolean; rating?: number } = {}): Promise<ServiceResult<any[]>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.verified !== undefined) filter.verified = params.verified;
      if (params.rating) filter.rating = Number(params.rating);
      const items = await ClientReview.find(filter).lean();
      return { data: items, meta: { total: items.length }, source: "mongodb" };
    } catch (e) {
      console.warn("[ReviewService] DB list failed:", e);
    }
  }

  let list = [...memoryStore.reviews];
  if (params.verified !== undefined) {
    list = list.filter((r) => r.verified === params.verified);
  }
  if (params.rating) {
    list = list.filter((r) => r.rating === Number(params.rating));
  }
  return { data: list, meta: { total: list.length }, source: "mock-fallback" };
}

export async function getTestimonialById(id: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await ClientReview.findOne({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      }).lean();
      if (item) return { data: item, source: "mongodb" };
    } catch (e) {
      console.warn("[ReviewService] DB find failed:", e);
    }
  }

  const found = memoryStore.reviews.find((r) => r.id === id);
  if (found) return { data: found, source: "mock-fallback" };

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Testimonial Not Found", detail: `Testimonial '${id}' not found.` },
  };
}

export async function createTestimonial(payload: any): Promise<ServiceResult<any>> {
  if (!payload.clientName || !payload.quote) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "Client name and quote are required.",
        invalidParams: [
          ...(!payload.clientName ? [{ name: "clientName", reason: "Client name is required" }] : []),
          ...(!payload.quote ? [{ name: "quote", reason: "Quote is required" }] : []),
        ],
      },
    };
  }

  const id = payload.id || `REV-${Date.now()}`;
  const doc = {
    ...payload,
    id,
    rating: Number(payload.rating || 5),
    verified: payload.verified !== undefined ? Boolean(payload.verified) : true,
    contractId: payload.contractId || `CTR-${Math.floor(1000 + Math.random() * 9000)}`,
    metricBadge: payload.metricBadge || "+100% Impact",
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await ClientReview.create(doc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[ReviewService] DB create failed:", e);
    }
  }

  memoryStore.reviews.push(doc as any);
  return { data: doc, source: "mock-fallback" };
}

export async function updateTestimonial(id: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await ClientReview.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
      if (updated) return { data: updated, source: "mongodb" };
    } catch (e) {
      console.warn("[ReviewService] DB update failed:", e);
    }
  }

  const idx = memoryStore.reviews.findIndex((r) => r.id === id);
  if (idx !== -1) {
    memoryStore.reviews[idx] = { ...memoryStore.reviews[idx], ...updates };
    return { data: memoryStore.reviews[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Testimonial Not Found", detail: `Testimonial '${id}' not found.` },
  };
}

export async function deleteTestimonial(id: string): Promise<ServiceResult<{ deleted: boolean; id: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await ClientReview.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (res) return { data: { deleted: true, id }, source: "mongodb" };
    } catch (e) {
      console.warn("[ReviewService] DB delete failed:", e);
    }
  }

  const idx = memoryStore.reviews.findIndex((r) => r.id === id);
  if (idx !== -1) {
    memoryStore.reviews.splice(idx, 1);
    return { data: { deleted: true, id }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "Testimonial Not Found", detail: `Testimonial '${id}' not found.` },
  };
}

// =============================================================================
// 8. FAQS SERVICE
// =============================================================================
export interface FaqFilterParams {
  targetPage?: string;
  category?: string;
  search?: string;
}

export async function listFaqs(params: FaqFilterParams = {}): Promise<ServiceResult<any[]>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const filter: Record<string, any> = {};
      if (params.targetPage && params.targetPage !== "ALL") {
        filter.$or = [{ targetPage: params.targetPage.toUpperCase() }, { targetPage: "ALL" }];
      }
      if (params.category && params.category !== "ALL") {
        filter.category = params.category.toUpperCase();
      }
      if (params.search) {
        const regex = new RegExp(params.search, "i");
        filter.$or = [{ question: regex }, { answer: regex }];
      }

      const items = await Faq.find(filter).sort({ order: 1, createdAt: 1 }).lean();
      return { data: items, meta: { total: items.length }, source: "mongodb" };
    } catch (e) {
      console.warn("[FaqService] DB list failed:", e);
    }
  }

  let list = [...memoryStore.faqs];
  if (params.targetPage && params.targetPage !== "ALL") {
    const p = params.targetPage.toUpperCase();
    list = list.filter((f) => f.targetPage.toUpperCase() === p || f.targetPage === "ALL");
  }
  if (params.category && params.category !== "ALL") {
    list = list.filter((f) => f.category.toUpperCase() === params.category?.toUpperCase());
  }
  if (params.search) {
    const s = params.search.toLowerCase();
    list = list.filter((f) => f.question.toLowerCase().includes(s) || f.answer.toLowerCase().includes(s));
  }

  return { data: list, meta: { total: list.length }, source: "mock-fallback" };
}

export async function getFaqById(id: string): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const item = await Faq.findOne({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      }).lean();
      if (item) return { data: item, source: "mongodb" };
    } catch (e) {
      console.warn("[FaqService] DB find failed:", e);
    }
  }

  const found = memoryStore.faqs.find((f) => f.id === id);
  if (found) return { data: found, source: "mock-fallback" };

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "FAQ Not Found", detail: `FAQ '${id}' not found.` },
  };
}

export async function createFaq(payload: any): Promise<ServiceResult<any>> {
  if (!payload.question || !payload.answer) {
    return {
      source: "mock-fallback",
      error: {
        status: 400,
        title: "Validation Failed",
        detail: "Question and answer are required.",
        invalidParams: [
          ...(!payload.question ? [{ name: "question", reason: "Question is required" }] : []),
          ...(!payload.answer ? [{ name: "answer", reason: "Answer is required" }] : []),
        ],
      },
    };
  }

  const id = payload.id || `faq-${Date.now()}`;
  const doc = {
    ...payload,
    id,
    category: payload.category || "GENERAL",
    targetPage: payload.targetPage || "ALL",
    highlightBadge: payload.highlightBadge || "",
    status: payload.status || "ACTIVE",
    order: Number(payload.order ?? memoryStore.faqs.length + 1),
  };

  const dbConnected = await tryConnectToDatabase();
  if (dbConnected) {
    try {
      const created = await Faq.create(doc);
      return { data: created.toJSON(), source: "mongodb" };
    } catch (e) {
      console.warn("[FaqService] DB create failed:", e);
    }
  }

  memoryStore.faqs.push(doc as any);
  return { data: doc, source: "mock-fallback" };
}

export async function updateFaq(id: string, updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await Faq.findOneAndUpdate(
        { $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }] },
        { $set: updates },
        { new: true }
      ).lean();
      if (updated) return { data: updated, source: "mongodb" };
    } catch (e) {
      console.warn("[FaqService] DB update failed:", e);
    }
  }

  const idx = memoryStore.faqs.findIndex((f) => f.id === id);
  if (idx !== -1) {
    memoryStore.faqs[idx] = { ...memoryStore.faqs[idx], ...updates };
    return { data: memoryStore.faqs[idx], source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "FAQ Not Found", detail: `FAQ '${id}' not found.` },
  };
}

export async function deleteFaq(id: string): Promise<ServiceResult<{ deleted: boolean; id: string }>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const res = await Faq.findOneAndDelete({
        $or: [{ id }, { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null }],
      });
      if (res) return { data: { deleted: true, id }, source: "mongodb" };
    } catch (e) {
      console.warn("[FaqService] DB delete failed:", e);
    }
  }

  const idx = memoryStore.faqs.findIndex((f) => f.id === id);
  if (idx !== -1) {
    memoryStore.faqs.splice(idx, 1);
    return { data: { deleted: true, id }, source: "mock-fallback" };
  }

  return {
    source: dbConnected ? "mongodb" : "mock-fallback",
    error: { status: 404, title: "FAQ Not Found", detail: `FAQ '${id}' not found.` },
  };
}

// =============================================================================
// 9. SETTINGS SERVICE
// =============================================================================
export async function getAgencySettings(): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const doc = await AgencySettings.findOne().lean();
      if (doc) return { data: doc, source: "mongodb" };
    } catch (e) {
      console.warn("[SettingsService] DB get failed:", e);
    }
  }

  return { data: memoryStore.settings, source: "mock-fallback" };
}

export async function updateAgencySettings(updates: any): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  if (dbConnected) {
    try {
      const updated = await AgencySettings.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true }).lean();
      if (updated) return { data: updated, source: "mongodb" };
    } catch (e) {
      console.warn("[SettingsService] DB update failed:", e);
    }
  }

  memoryStore.settings = { ...memoryStore.settings, ...updates };
  return { data: memoryStore.settings, source: "mock-fallback" };
}

// =============================================================================
// 10. SEED SERVICE
// =============================================================================
export async function seedAllCollections(): Promise<ServiceResult<any>> {
  const dbConnected = await tryConnectToDatabase();

  memoryStore.reset();

  if (dbConnected) {
    try {
      await Promise.all([
        Inquiry.deleteMany({}),
        JournalMemo.deleteMany({}),
        Service.deleteMany({}),
        Plan.deleteMany({}),
        PortfolioProject.deleteMany({}),
        ClientReview.deleteMany({}),
        Faq.deleteMany({}),
        AgencySettings.deleteMany({}),
      ]);

      const [inquiries, memos, services, plans, projects, reviews, faqs] = await Promise.all([
        Inquiry.insertMany(INITIAL_ADMIN_FULL_STATE.inquiries),
        JournalMemo.insertMany(INITIAL_ADMIN_FULL_STATE.memos),
        Service.insertMany(INITIAL_ADMIN_FULL_STATE.services),
        Plan.insertMany(INITIAL_ADMIN_FULL_STATE.plans),
        PortfolioProject.insertMany(INITIAL_ADMIN_FULL_STATE.projects),
        ClientReview.insertMany(INITIAL_ADMIN_FULL_STATE.reviews),
        Faq.insertMany(INITIAL_ADMIN_FULL_STATE.faqs),
        AgencySettings.create(INITIAL_ADMIN_FULL_STATE.settings),
      ]);

      return {
        data: {
          message: "Database successfully seeded from master mock state.",
          counts: {
            inquiries: inquiries.length,
            memos: memos.length,
            services: services.length,
            plans: plans.length,
            projects: projects.length,
            reviews: reviews.length,
            faqs: faqs.length,
            settings: 1,
          },
        },
        source: "mongodb",
      };
    } catch (e: any) {
      console.warn("[SeedService] MongoDB seed error, falling back to memory store reset:", e);
    }
  }

  return {
    data: {
      message: "MongoDB unavailable. In-memory fallback dataset reset successfully from master state.",
      counts: {
        inquiries: memoryStore.inquiries.length,
        memos: memoryStore.memos.length,
        services: memoryStore.services.length,
        plans: memoryStore.plans.length,
        projects: memoryStore.projects.length,
        reviews: memoryStore.reviews.length,
        faqs: memoryStore.faqs.length,
        settings: 1,
      },
      instructions: "To persist data to MongoDB, ensure mongod is running on mongodb://localhost:27017 or set MONGODB_URI in .env.",
    },
    source: "mock-fallback",
  };
}
