import { INITIAL_ADMIN_FULL_STATE } from "../../data/adminMockData";
import {
  AdminInquiry,
  AdminJournalMemo,
  AdminService,
  AdminPlan,
  AdminPortfolioProject,
  AdminClientReview,
  AdminFaqItem,
  AdminAgencySettings,
} from "../../data/adminMockData";

/**
 * In-memory state store used as a seamless fallback whenever MongoDB is not reachable.
 * Enables zero-downtime, fully functional preview and offline testing.
 */
class MemoryFallbackStore {
  public inquiries: AdminInquiry[];
  public memos: AdminJournalMemo[];
  public services: AdminService[];
  public plans: AdminPlan[];
  public projects: AdminPortfolioProject[];
  public reviews: AdminClientReview[];
  public faqs: AdminFaqItem[];
  public settings: AdminAgencySettings;

  constructor() {
    this.inquiries = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.inquiries));
    this.memos = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.memos));
    this.services = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.services));
    this.plans = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.plans));
    this.projects = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.projects));
    this.reviews = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.reviews));
    this.faqs = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.faqs));
    this.settings = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.settings));
  }

  public reset(): void {
    this.inquiries = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.inquiries));
    this.memos = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.memos));
    this.services = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.services));
    this.plans = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.plans));
    this.projects = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.projects));
    this.reviews = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.reviews));
    this.faqs = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.faqs));
    this.settings = JSON.parse(JSON.stringify(INITIAL_ADMIN_FULL_STATE.settings));
  }
}

// Global singleton instance
declare global {
  // eslint-disable-next-line no-var
  var memoryFallbackStore: MemoryFallbackStore | undefined;
}

if (!global.memoryFallbackStore) {
  global.memoryFallbackStore = new MemoryFallbackStore();
}

export const memoryStore = global.memoryFallbackStore;
export default memoryStore;
