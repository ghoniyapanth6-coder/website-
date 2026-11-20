"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Zap,
  Briefcase,
  Award,
  MessageSquare,
  HelpCircle,
  Settings,
  Search,
  Plus,
  Check,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Filter,
  Eye,
  Trash2,
  Edit3,
  Star,
  ShieldCheck,
  Globe,
  RefreshCw,
  Copy,
  Send,
  X,
  Menu,
  TrendingUp,
  Activity,
  User,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  DollarSign,
  Gauge,
  Sparkles,
  ChevronLeft,
  Code,
  AlertTriangle,
  Lightbulb,
  Info,
  CheckSquare,
  BookOpen,
} from "lucide-react";

import {
  INITIAL_INQUIRIES,
  INITIAL_JOURNAL_MEMOS,
  INITIAL_SERVICES,
  INITIAL_PLANS,
  INITIAL_PROJECTS,
  INITIAL_CLIENT_REVIEWS,
  INITIAL_FAQS,
  INITIAL_AGENCY_SETTINGS,
  INITIAL_KPI_STATS,
  INQUIRY_STATUS_CONFIG,
  MEMO_STATUS_CONFIG,
  PLAN_STATUS_CONFIG,
  SERVICE_STATUS_CONFIG,
  FAQ_CATEGORY_CONFIG,
  FAQ_PAGE_CONFIG,
  FAQ_STATUS_CONFIG,
  AdminInquiry,
  AdminJournalMemo,
  AdminService,
  AdminPlan,
  AdminPortfolioProject,
  AdminClientReview,
  AdminFaqItem,
  AdminAgencySettings,
  AdminKpiStats,
  InquiryStatus,
  MemoStatus,
  PlanStatus,
  ServiceStatus,
  FaqCategory,
  FaqTargetPage,
  FaqStatus,
  JournalArticleSection,
  JournalArticleCallout,
  JournalArticleCodeBlock,
  JournalArticleMetric,
} from "@/data/adminMockData";

type AdminTab =
  | "overview"
  | "inquiries"
  | "memos"
  | "faqs"
  | "services"
  | "plans"
  | "projects"
  | "testimonials"
  | "settings";

interface ToastMessage {
  id: string;
  type: "success" | "info" | "warning";
  title: string;
  description?: string;
}

export default function AdminPage() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Live Clock State
  const [currentTime, setCurrentTime] = useState<string>("");

  // Data States
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(INITIAL_INQUIRIES);
  const [memos, setMemos] = useState<AdminJournalMemo[]>(INITIAL_JOURNAL_MEMOS);
  const [faqs, setFaqs] = useState<AdminFaqItem[]>(INITIAL_FAQS);
  const [services, setServices] = useState<AdminService[]>(INITIAL_SERVICES);
  const [plans, setPlans] = useState<AdminPlan[]>(INITIAL_PLANS);
  const [projects, setProjects] = useState<AdminPortfolioProject[]>(INITIAL_PROJECTS);
  const [reviews, setReviews] = useState<AdminClientReview[]>(INITIAL_CLIENT_REVIEWS);
  const [agencySettings, setAgencySettings] = useState<AdminAgencySettings>(INITIAL_AGENCY_SETTINGS);
  const [kpiStats, setKpiStats] = useState<AdminKpiStats>(INITIAL_KPI_STATS);

  // Inquiries Filters & Modals
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isNewInquiryModalOpen, setIsNewInquiryModalOpen] = useState(false);

  // Journal Memos Filters & Studio Modal
  const [memoSearch, setMemoSearch] = useState("");
  const [memoCategoryFilter, setMemoCategoryFilter] = useState<string>("ALL");
  const [memoStatusFilter, setMemoStatusFilter] = useState<string>("ALL");
  const [isMemoStudioOpen, setIsMemoStudioOpen] = useState(false);
  const [memoComposerTab, setMemoComposerTab] = useState<"meta" | "author" | "content" | "seo" | "preview">("meta");
  const [memoFormId, setMemoFormId] = useState<string | null>(null); // null = new, string = editing

  // Memo Studio Form State
  const [memoForm, setMemoForm] = useState({
    title: "",
    subtitle: "",
    category: "ARCHITECTURE",
    readTime: "7 MIN READ",
    slug: "",
    tags: "Next.js 14, Architecture, React 19",
    status: "PUBLISHED" as MemoStatus,
    authorName: "Marcus Vance",
    authorRole: "Lead System Architect",
    authorHandle: "@marcusvance",
    executiveSummary: "",
    takeaway1: "Zero client-side hydration tax with React Server Components.",
    takeaway2: "Sub-400ms Largest Contentful Paint (LCP) globally via edge caching.",
    takeaway3: "100% intellectual property and TypeScript source handover.",
    metricLabel1: "LCP SPEED",
    metricValue1: "-78%",
    metricLabel2: "LIGHTHOUSE SLA",
    metricValue2: "100/100",
    sectionHeading: "1. ARCHITECTURAL FOUNDATION & PARADIGM SHIFT",
    sectionContent:
      "When scaling mission-critical commercial web applications, reliance on monolithic dynamic servers introduces cascading latency bottlenecks. By migrating to Next.js 14 Streaming Server Components, we eliminate client-side JavaScript execution overhead.",
    codeFilename: "src/app/api/route.ts",
    codeLanguage: "typescript",
    codeSnippet: `export const runtime = 'edge';\n\nexport async function GET(req: Request) {\n  return Response.json({ status: 'ok', latencyMs: 8 });\n}`,
    calloutType: "pro-tip" as "note" | "warning" | "pro-tip",
    calloutTitle: "EDGE COMPLIANCE DIRECTIVE",
    calloutBody: "Ensure all database queries pass through PgBouncer connection multiplexers to prevent pool exhaustion.",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    focusKeywords: "Next.js 14, High Performance, Architecture",
    ogImage: "",
  });

  // FAQ Manager Filters & Modal
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>("ALL");
  const [faqPageFilter, setFaqPageFilter] = useState<string>("ALL");
  const [faqStatusFilter, setFaqStatusFilter] = useState<string>("ALL");
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState<{
    question: string;
    answer: string;
    category: FaqCategory;
    targetPage: FaqTargetPage;
    highlightBadge: string;
    status: FaqStatus;
  }>({
    question: "",
    answer: "",
    category: "GENERAL",
    targetPage: "HOME",
    highlightBadge: "2-4 WEEK SPRINTS",
    status: "ACTIVE",
  });

  // Services View Mode
  const [servicesViewMode, setServicesViewMode] = useState<"cards" | "table">("cards");

  // Plans Slots & Price Edit Modal
  const [isPriceEditModalOpen, setIsPriceEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AdminPlan | null>(null);
  const [tempPriceInput, setTempPriceInput] = useState("");

  // Projects Modal
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: "",
    client: "",
    category: "WEB ENGINEERING",
    year: "2026",
    metricHighlight: "100/100 Lighthouse",
    techStack: "Next.js 14, TypeScript, Tailwind CSS",
    liveUrl: "https://codeclovers.dev",
    description: "",
    status: "COMPLETED" as "COMPLETED" | "IN_PROGRESS",
  });

  // Testimonials Modal & Edit State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<{
    clientName: string;
    role: string;
    company: string;
    rating: number;
    quote: string;
    contractId: string;
    metricBadge: string;
    verified: boolean;
  }>({
    clientName: "",
    role: "VP of Engineering",
    company: "",
    rating: 5,
    quote: "",
    contractId: "CLV-2026",
    metricBadge: "+340% CONVERSION",
    verified: true,
  });

  // New Inquiry Form State
  const [newInquiryForm, setNewInquiryForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "Next.js 14 Web App",
    budget: "$10K - $25K",
    timeline: "Standard 3-4 Weeks",
    message: "",
    priority: "MEDIUM" as "HIGH" | "MEDIUM" | "LOW",
  });

  // Toast Stack
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    title: string,
    description?: string,
    type: "success" | "info" | "warning" = "success"
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Clock Ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live API Synchronization with MongoDB Backend
  useEffect(() => {
    async function syncBackendData() {
      try {
        const [inqRes, faqRes, memoRes, serviceRes] = await Promise.all([
          fetch("/api/inquiries?limit=100").then((r) => r.json()).catch(() => null),
          fetch("/api/faqs?limit=100").then((r) => r.json()).catch(() => null),
          fetch("/api/memos?limit=100").then((r) => r.json()).catch(() => null),
          fetch("/api/services?limit=100").then((r) => r.json()).catch(() => null),
        ]);

        if (inqRes?.data && Array.isArray(inqRes.data) && inqRes.data.length > 0) {
          setInquiries(inqRes.data);
        }
        if (faqRes?.data && Array.isArray(faqRes.data) && faqRes.data.length > 0) {
          setFaqs(faqRes.data);
        }
        if (memoRes?.data && Array.isArray(memoRes.data) && memoRes.data.length > 0) {
          setMemos(memoRes.data);
        }
        if (serviceRes?.data && Array.isArray(serviceRes.data) && serviceRes.data.length > 0) {
          setServices(serviceRes.data);
        }
      } catch {
        // Fallback to static initial data gracefully
      }
    }
    syncBackendData();
  }, []);

  // Filtered Inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesSearch =
        inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.company.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.message.toLowerCase().includes(inquirySearch.toLowerCase()) ||
        inq.service.toLowerCase().includes(inquirySearch.toLowerCase());

      const matchesStatus =
        inquiryStatusFilter === "ALL" || inq.status === inquiryStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inquiries, inquirySearch, inquiryStatusFilter]);

  // Filtered Memos
  const filteredMemos = useMemo(() => {
    return memos.filter((memo) => {
      const matchesSearch =
        memo.title.toLowerCase().includes(memoSearch.toLowerCase()) ||
        memo.excerpt.toLowerCase().includes(memoSearch.toLowerCase()) ||
        (memo.subtitle && memo.subtitle.toLowerCase().includes(memoSearch.toLowerCase())) ||
        memo.tags.some((t) => t.toLowerCase().includes(memoSearch.toLowerCase()));

      const matchesCategory =
        memoCategoryFilter === "ALL" || memo.category === memoCategoryFilter;
      const matchesStatus =
        memoStatusFilter === "ALL" || memo.status === memoStatusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [memos, memoSearch, memoCategoryFilter, memoStatusFilter]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesSearch =
        faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.highlightBadge.toLowerCase().includes(faqSearch.toLowerCase());

      const matchesCategory =
        faqCategoryFilter === "ALL" || faq.category === faqCategoryFilter;
      const matchesPage =
        faqPageFilter === "ALL" || faq.targetPage === faqPageFilter;
      const matchesStatus =
        faqStatusFilter === "ALL" || faq.status === faqStatusFilter;

      return matchesSearch && matchesCategory && matchesPage && matchesStatus;
    });
  }, [faqs, faqSearch, faqCategoryFilter, faqPageFilter, faqStatusFilter]);

  // Unread Inquiries Count
  const unreadCount = useMemo(() => {
    return inquiries.filter((i) => i.unread || i.status === "NEW").length;
  }, [inquiries]);

  // Handlers for Inquiries
  const updateInquiryStatus = (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, unread: false } : item
      )
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // Background sync to MongoDB API
    fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch(() => {});

    showToast(
      `Inquiry status updated to ${newStatus}`,
      `Lead #${id} moved to ${newStatus} state.`
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);

    // Background sync to MongoDB API
    fetch(`/api/inquiries/${id}`, {
      method: "DELETE",
    }).catch(() => {});

    showToast(`Inquiry #${id} Deleted`, "The lead record has been removed.", "info");
  };

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryForm.name || !newInquiryForm.email) {
      showToast("Validation Error", "Please provide client name and email.", "warning");
      return;
    }
    const id = `INQ-2026-0${100 + inquiries.length}`;
    const newEntry: AdminInquiry = {
      id,
      name: newInquiryForm.name,
      email: newInquiryForm.email,
      company: newInquiryForm.company || "Independent",
      service: newInquiryForm.service,
      budget: newInquiryForm.budget,
      timeline: newInquiryForm.timeline,
      message: newInquiryForm.message || "Direct client sprint brief submitted via admin desk.",
      date: new Date().toISOString(),
      status: "NEW",
      priority: newInquiryForm.priority,
      unread: true,
    };
    setInquiries([newEntry, ...inquiries]);
    setIsNewInquiryModalOpen(false);

    // Background sync to MongoDB API
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    }).catch(() => {});

    setNewInquiryForm({
      name: "",
      email: "",
      company: "",
      service: "Next.js 14 Web App",
      budget: "$10K - $25K",
      timeline: "Standard 3-4 Weeks",
      message: "",
      priority: "MEDIUM",
    });
    showToast("New Lead Created", `Registered inquiry #${id} for ${newEntry.name}.`);
  };

  // Handlers for Memo Studio (Full In-depth Composer)
  const openMemoStudioForNew = () => {
    setMemoFormId(null);
    setMemoComposerTab("meta");
    setMemoForm({
      title: "",
      subtitle: "",
      category: "ARCHITECTURE",
      readTime: "7 MIN READ",
      slug: "",
      tags: "Next.js 14, Architecture, React 19",
      status: "PUBLISHED",
      authorName: "Marcus Vance",
      authorRole: "Lead System Architect",
      authorHandle: "@marcusvance",
      executiveSummary: "",
      takeaway1: "Zero client-side hydration tax with React Server Components.",
      takeaway2: "Sub-400ms Largest Contentful Paint (LCP) globally via edge caching.",
      takeaway3: "100% intellectual property and TypeScript source handover.",
      metricLabel1: "LCP SPEED",
      metricValue1: "-78%",
      metricLabel2: "LIGHTHOUSE SLA",
      metricValue2: "100/100",
      sectionHeading: "1. ARCHITECTURAL FOUNDATION & PARADIGM SHIFT",
      sectionContent:
        "When scaling mission-critical commercial web applications, reliance on monolithic dynamic servers introduces cascading latency bottlenecks. By migrating to Next.js 14 Streaming Server Components, we eliminate client-side JavaScript execution overhead.",
      codeFilename: "src/app/api/route.ts",
      codeLanguage: "typescript",
      codeSnippet: `export const runtime = 'edge';\n\nexport async function GET(req: Request) {\n  return Response.json({ status: 'ok', latencyMs: 8 });\n}`,
      calloutType: "pro-tip",
      calloutTitle: "EDGE COMPLIANCE DIRECTIVE",
      calloutBody: "Ensure all database queries pass through PgBouncer connection multiplexers to prevent pool exhaustion.",
      metaTitle: "",
      metaDescription: "",
      canonicalUrl: "",
      focusKeywords: "",
      ogImage: "",
    });
    setIsMemoStudioOpen(true);
  };

  const openMemoStudioForEdit = (memo: AdminJournalMemo) => {
    setMemoFormId(memo.id);
    setMemoComposerTab("meta");
    const firstSection = memo.sections?.[0];
    setMemoForm({
      title: memo.title,
      subtitle: memo.subtitle || memo.excerpt,
      category: memo.category,
      readTime: memo.readTime,
      slug: memo.slug,
      tags: memo.tags.join(", "),
      status: memo.status,
      authorName: memo.author?.name || memo.authorName || "Marcus Vance",
      authorRole: memo.author?.role || "Lead System Architect",
      authorHandle: memo.author?.handle || "@marcusvance",
      executiveSummary: memo.executiveSummary || memo.excerpt,
      takeaway1: memo.keyTakeaways?.[0] || "Zero client-side hydration tax.",
      takeaway2: memo.keyTakeaways?.[1] || "Sub-400ms Largest Contentful Paint (LCP).",
      takeaway3: memo.keyTakeaways?.[2] || "100% source code ownership.",
      metricLabel1: memo.metrics?.[0]?.label || "PERFORMANCE",
      metricValue1: memo.metrics?.[0]?.value || "100/100",
      metricLabel2: memo.metrics?.[1]?.label || "METRIC",
      metricValue2: memo.metrics?.[1]?.value || "+280%",
      sectionHeading: firstSection?.heading || "1. ARCHITECTURAL DEEP DIVE",
      sectionContent: firstSection?.content?.[0] || memo.excerpt,
      codeFilename: firstSection?.codeBlock?.filename || "src/lib/cache.ts",
      codeLanguage: firstSection?.codeBlock?.language || "typescript",
      codeSnippet:
        firstSection?.codeBlock?.code ||
        `export const cacheConfig = {\n  revalidate: 3600,\n  tags: ['articles'],\n};`,
      calloutType: firstSection?.callout?.type || "note",
      calloutTitle: firstSection?.callout?.title || "SYSTEM NOTICE",
      calloutBody: firstSection?.callout?.body || "Performance is verified under strict SLA.",
      metaTitle: memo.metaTitle || "",
      metaDescription: memo.metaDescription || "",
      canonicalUrl: memo.canonicalUrl || "",
      focusKeywords: memo.focusKeywords?.join(", ") || "",
      ogImage: memo.ogImage || "",
    });
    setIsMemoStudioOpen(true);
  };

  const handleSaveMemoStudio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoForm.title.trim()) {
      showToast("Validation Error", "Article title is required.", "warning");
      return;
    }

    const tagsArray = memoForm.tags.split(",").map((t) => t.trim()).filter(Boolean);
    const keywordsArray = memoForm.focusKeywords.split(",").map((k) => k.trim()).filter(Boolean);
    const slug =
      memoForm.slug.trim() ||
      memoForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const metrics: JournalArticleMetric[] = [
      { label: memoForm.metricLabel1 || "SPEED SLA", value: memoForm.metricValue1 || "100/100" },
      { label: memoForm.metricLabel2 || "OUTCOME", value: memoForm.metricValue2 || "+100%" },
    ];

    const takeaways = [memoForm.takeaway1, memoForm.takeaway2, memoForm.takeaway3].filter(
      Boolean
    );

    const section: JournalArticleSection = {
      id: "sec-01",
      heading: memoForm.sectionHeading,
      content: [memoForm.sectionContent],
      callout: {
        type: memoForm.calloutType,
        title: memoForm.calloutTitle,
        body: memoForm.calloutBody,
      },
      codeBlock: {
        filename: memoForm.codeFilename,
        language: memoForm.codeLanguage,
        code: memoForm.codeSnippet,
      },
    };

    if (memoFormId) {
      // Update existing
      setMemos((prev) =>
        prev.map((m) => {
          if (m.id === memoFormId) {
            const updated = {
              ...m,
              title: memoForm.title.toUpperCase(),
              subtitle: memoForm.subtitle,
              category: memoForm.category,
              readTime: memoForm.readTime,
              slug,
              tags: tagsArray,
              status: memoForm.status,
              author: {
                name: memoForm.authorName,
                role: memoForm.authorRole,
                handle: memoForm.authorHandle,
              },
              authorName: memoForm.authorName,
              executiveSummary: memoForm.executiveSummary,
              keyTakeaways: takeaways,
              metrics,
              sections: [section, ...(m.sections?.slice(1) || [])],
              metaTitle: memoForm.metaTitle.trim() || undefined,
              metaDescription: memoForm.metaDescription.trim() || undefined,
              canonicalUrl: memoForm.canonicalUrl.trim() || undefined,
              focusKeywords: keywordsArray.length ? keywordsArray : undefined,
              ogImage: memoForm.ogImage.trim() || undefined,
            };

            // Background API sync
            fetch(`/api/memos/${memoFormId}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updated),
            }).catch(() => {});

            return updated;
          }
          return m;
        })
      );
      showToast("Article Updated", `"${memoForm.title}" saved to Journal CMS with SEO metadata.`);
    } else {
      // Create new
      const newId = `MEMO-00${memos.length + 1}`;
      const newMemo: AdminJournalMemo = {
        id: newId,
        title: memoForm.title.toUpperCase(),
        subtitle: memoForm.subtitle,
        category: memoForm.category,
        readTime: memoForm.readTime,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).toUpperCase(),
        excerpt: memoForm.executiveSummary || memoForm.subtitle || memoForm.title,
        slug,
        tags: tagsArray.length > 0 ? tagsArray : ["Next.js 14", "Architecture"],
        status: memoForm.status,
        views: 0,
        featured: false,
        author: {
          name: memoForm.authorName,
          role: memoForm.authorRole,
          handle: memoForm.authorHandle,
        },
        authorName: memoForm.authorName,
        executiveSummary: memoForm.executiveSummary,
        keyTakeaways: takeaways,
        metrics,
        sections: [section],
        metaTitle: memoForm.metaTitle.trim() || undefined,
        metaDescription: memoForm.metaDescription.trim() || undefined,
        canonicalUrl: memoForm.canonicalUrl.trim() || undefined,
        focusKeywords: keywordsArray.length ? keywordsArray : undefined,
        ogImage: memoForm.ogImage.trim() || undefined,
      };
      setMemos([newMemo, ...memos]);

      // Background API sync
      fetch("/api/memos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMemo),
      }).catch(() => {});

      showToast("Journal Memo Created", `"${newMemo.title}" published with full SEO metadata.`);
    }

    setIsMemoStudioOpen(false);
  };

  const toggleMemoStatus = (id: string) => {
    setMemos((prev) =>
      prev.map((memo) => {
        if (memo.id === id) {
          const nextStatus: MemoStatus =
            memo.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
          showToast(
            `Memo ${nextStatus === "PUBLISHED" ? "Published" : "Set to Draft"}`,
            `"${memo.title.substring(0, 30)}..." is now ${nextStatus}.`
          );
          return { ...memo, status: nextStatus };
        }
        return memo;
      })
    );
  };

  const deleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((m) => m.id !== id));
    showToast("Memo Removed", `Journal entry #${id} deleted.`, "info");
  };

  // Handlers for FAQ Manager
  const openFaqModalForNew = () => {
    setEditingFaqId(null);
    setFaqForm({
      question: "",
      answer: "",
      category: "GENERAL",
      targetPage: "HOME",
      highlightBadge: "2-4 WEEK SPRINTS",
      status: "ACTIVE",
    });
    setIsFaqModalOpen(true);
  };

  const openFaqModalForEdit = (item: AdminFaqItem) => {
    setEditingFaqId(item.id);
    setFaqForm({
      question: item.question,
      answer: item.answer,
      category: item.category,
      targetPage: item.targetPage,
      highlightBadge: item.highlightBadge,
      status: item.status,
    });
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      showToast("Validation Error", "Question and answer are required.", "warning");
      return;
    }

    if (editingFaqId) {
      setFaqs((prev) =>
        prev.map((f) =>
          f.id === editingFaqId
            ? {
                ...f,
                question: faqForm.question,
                answer: faqForm.answer,
                category: faqForm.category,
                targetPage: faqForm.targetPage,
                highlightBadge: faqForm.highlightBadge,
                status: faqForm.status,
              }
            : f
        )
      );
      showToast("FAQ Updated", `Item #${editingFaqId} synchronized.`);
    } else {
      const pagePrefix = faqForm.targetPage.substring(0, 3);
      const newId = `FAQ-${pagePrefix}-${(faqs.length + 1).toString().padStart(2, "0")}`;
      const newFaq: AdminFaqItem = {
        id: newId,
        question: faqForm.question,
        answer: faqForm.answer,
        category: faqForm.category,
        targetPage: faqForm.targetPage,
        highlightBadge: faqForm.highlightBadge,
        status: faqForm.status,
        order: faqs.length + 1,
      };
      setFaqs([newFaq, ...faqs]);
      showToast("New FAQ Created", `Registered FAQ #${newId} for ${newFaq.targetPage} page.`);
    }
    setIsFaqModalOpen(false);
  };

  const toggleFaqStatus = (id: string) => {
    setFaqs((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus: FaqStatus =
            item.status === "ACTIVE" ? "HIDDEN" : "ACTIVE";
          showToast(
            `FAQ ${nextStatus === "ACTIVE" ? "Activated" : "Hidden"}`,
            `FAQ #${id} is now ${nextStatus}.`
          );
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast("FAQ Removed", `FAQ #${id} deleted from studio repository.`, "info");
  };

  // Handlers for Services
  const toggleServiceStatus = (id: string) => {
    setServices((prev) =>
      prev.map((srv) => {
        if (srv.id === id) {
          const nextStatus: ServiceStatus =
            srv.status === "ACTIVE" ? "PAUSED" : "ACTIVE";
          showToast(
            `Service ${nextStatus === "ACTIVE" ? "Activated" : "Paused"}`,
            `${srv.title} status toggled to ${nextStatus}.`
          );
          return { ...srv, status: nextStatus };
        }
        return srv;
      })
    );
  };

  // Handlers for Plans
  const adjustPlanSlots = (planId: string, delta: number) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const newSlots = Math.max(0, plan.slotsAvailable + delta);
          const nextStatus: PlanStatus = newSlots === 0 ? "FULL" : "ACTIVE";
          showToast(
            `Slots Updated for ${plan.name}`,
            `Available slots adjusted to ${newSlots} (${nextStatus}).`
          );
          return {
            ...plan,
            slotsAvailable: newSlots,
            status: nextStatus,
          };
        }
        return plan;
      })
    );
  };

  const handleEditPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan || !tempPriceInput.trim()) return;
    setPlans((prev) =>
      prev.map((p) =>
        p.id === editingPlan.id ? { ...p, price: tempPriceInput.trim() } : p
      )
    );
    showToast("Plan Pricing Updated", `${editingPlan.name} price updated to ${tempPriceInput}.`);
    setIsPriceEditModalOpen(false);
    setEditingPlan(null);
  };

  // Handlers for Projects
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.title || !newProjectForm.client) {
      showToast("Validation Error", "Title and client are required.", "warning");
      return;
    }
    const id = `PRJ-0${projects.length + 1}`;
    const techStack = newProjectForm.techStack.split(",").map((s) => s.trim()).filter(Boolean);
    const newPrj: AdminPortfolioProject = {
      id,
      title: newProjectForm.title,
      client: newProjectForm.client,
      category: newProjectForm.category,
      year: newProjectForm.year,
      metricHighlight: newProjectForm.metricHighlight,
      techStack: techStack.length > 0 ? techStack : ["Next.js 14", "Tailwind CSS"],
      liveUrl: newProjectForm.liveUrl,
      description: newProjectForm.description,
      status: newProjectForm.status,
    };
    setProjects([newPrj, ...projects]);
    setIsNewProjectModalOpen(false);
    setNewProjectForm({
      title: "",
      client: "",
      category: "WEB ENGINEERING",
      year: "2026",
      metricHighlight: "100/100 Lighthouse",
      techStack: "Next.js 14, TypeScript, Tailwind CSS",
      liveUrl: "https://codeclovers.dev",
      description: "",
      status: "COMPLETED",
    });
    showToast("Portfolio Project Added", `"${newPrj.title}" is now showcased.`);
  };

  // Handlers for Testimonials
  const openReviewModalForNew = () => {
    setEditingReviewId(null);
    setReviewForm({
      clientName: "",
      role: "VP of Engineering",
      company: "",
      rating: 5,
      quote: "",
      contractId: `CLV-${Math.floor(1000 + Math.random() * 9000)}`,
      metricBadge: "+340% CONVERSION",
      verified: true,
    });
    setIsReviewModalOpen(true);
  };

  const openReviewModalForEdit = (rev: AdminClientReview) => {
    setEditingReviewId(rev.id);
    setReviewForm({
      clientName: rev.clientName,
      role: rev.role,
      company: rev.company,
      rating: rev.rating,
      quote: rev.quote,
      contractId: rev.contractId,
      metricBadge: rev.metricBadge,
      verified: rev.verified,
    });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.clientName.trim() || !reviewForm.quote.trim()) {
      showToast("Validation Error", "Client name and quote are required.", "warning");
      return;
    }

    const initials = reviewForm.clientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    if (editingReviewId) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingReviewId
            ? {
                ...r,
                clientName: reviewForm.clientName,
                role: reviewForm.role,
                company: reviewForm.company,
                rating: reviewForm.rating,
                quote: reviewForm.quote,
                contractId: reviewForm.contractId,
                metricBadge: reviewForm.metricBadge,
                verified: reviewForm.verified,
                avatarInitials: initials,
              }
            : r
        )
      );
      showToast("Testimonial Updated", `Review from ${reviewForm.clientName} updated.`);
    } else {
      const newRev: AdminClientReview = {
        id: `REV-0${reviews.length + 1}`,
        clientName: reviewForm.clientName,
        role: reviewForm.role,
        company: reviewForm.company,
        rating: reviewForm.rating,
        quote: reviewForm.quote,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }).toUpperCase(),
        verified: reviewForm.verified,
        avatarInitials: initials,
        avatarBg: "bg-accent-yellow text-ink-black",
        contractId: reviewForm.contractId,
        metricBadge: reviewForm.metricBadge,
      };
      setReviews([newRev, ...reviews]);
      showToast("Testimonial Added", `Added 5-star review from ${newRev.clientName}.`);
    }

    setIsReviewModalOpen(false);
  };

  const toggleReviewVerified = (id: string) => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === id) {
          const nextVerified = !rev.verified;
          showToast(
            `Review ${nextVerified ? "Verified" : "Unverified"}`,
            `Testimonial from ${rev.clientName} updated.`
          );
          return { ...rev, verified: nextVerified };
        }
        return rev;
      })
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    showToast("Testimonial Removed", "Review deleted.", "info");
  };

  // Handlers for Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(
      "Agency Settings Synchronized",
      "Studio configuration and SLA parameters have been saved to memory.",
      "success"
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F5EE] text-ink-black flex flex-col font-sans select-none antialiased">
      {/* ===================================================================== */}
      {/* 1. TOP HEADER BAR                                                     */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-ink-black px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-[0_2px_0_0_#000000]">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 border-2 border-ink-black bg-accent-yellow shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5 text-ink-black" />
          </button>

          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-accent-yellow border-2 border-ink-black flex items-center justify-center font-headline font-black text-xl shadow-[2px_2px_0px_#000000] group-hover:bg-accent-teal transition-colors">
              C
            </div>
            <div>
              <div className="font-headline font-black tracking-tight text-lg leading-tight flex items-center gap-1.5">
                CODECLOVERS
                <span className="text-[10px] bg-accent-red text-white px-1.5 py-0.2 border border-ink-black font-mono font-bold">
                  ADMIN
                </span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:block">
                Architect Operations Desk
              </div>
            </div>
          </Link>
        </div>

        {/* Center: Live Date/Time & Telemetry Pill */}
        <div className="hidden md:flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 bg-[#F7F5EE] border-2 border-ink-black px-3 py-1 shadow-[2px_2px_0px_#000000]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-neutral-800 tracking-wider">
              {currentTime || "2026-11-19 18:10:00 UTC"}
            </span>
          </div>

          <div className="hidden xl:flex items-center gap-2 bg-white border-2 border-ink-black px-2.5 py-1 text-[11px] font-bold">
            <span className="text-accent-red font-black">NODE:</span> SF-EDGE-01
            <span className="text-neutral-400">|</span>
            <span className="text-accent-teal font-black">RTT:</span> 8ms
          </div>
        </div>

        {/* Right: Quick Action, Global Search & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Create Button */}
          <div className="relative group">
            <button
              onClick={() => setIsNewInquiryModalOpen(true)}
              className="flex items-center gap-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black px-3 py-1.5 text-xs font-mono font-black uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">New Entry</span>
            </button>
          </div>

          {/* Return to Live Site */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-neutral-100 border-2 border-ink-black px-3 py-1.5 text-xs font-mono font-bold shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Open Public Website in new tab"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </Link>

          {/* Admin User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l-2 border-ink-black">
            <div className="w-8 h-8 rounded-none bg-accent-teal border-2 border-ink-black flex items-center justify-center font-mono font-black text-xs shadow-[2px_2px_0px_#000000]">
              MV
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-black font-sans leading-none flex items-center gap-1">
                Marcus Vance
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 font-bold uppercase mt-0.5">
                Lead Architect
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MAIN WORKSPACE: SIDEBAR + CONTENT CONTAINER                        */}
      {/* ===================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* =================================================================== */}
        {/* LEFT SIDEBAR (DESKTOP & MOBILE DRAWER)                              */}
        {/* =================================================================== */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-30 bg-white border-r-2 border-ink-black flex flex-col justify-between transition-all duration-200 ease-in-out
            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}
            w-64 shadow-[4px_0_0_0_#000000] lg:shadow-none top-[57px] lg:top-0 h-[calc(100vh-57px)]
          `}
        >
          {/* Navigation Links */}
          <div className="p-3 space-y-1.5 overflow-y-auto flex-1">
            {/* Sidebar Collapse Toggle Button (Desktop only) */}
            <div className="hidden lg:flex justify-end pb-2 mb-2 border-b-2 border-neutral-200">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1 border border-ink-black hover:bg-neutral-100 text-neutral-700 transition-colors"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold px-1">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>COLLAPSE</span>
                  </div>
                )}
              </button>
            </div>

            {/* Sidebar Navigation Items */}
            {[
              {
                id: "overview",
                label: "Dashboard Overview",
                icon: LayoutDashboard,
                badge: null,
                color: "bg-accent-yellow",
              },
              {
                id: "inquiries",
                label: "Inquiries & Leads",
                icon: Inbox,
                badge: unreadCount > 0 ? `${unreadCount} NEW` : null,
                badgeColor: "bg-accent-red text-white",
              },
              {
                id: "memos",
                label: "Journal & Memos",
                icon: FileText,
                badge: `${memos.length}`,
                badgeColor: "bg-accent-teal text-ink-black",
              },
              {
                id: "faqs",
                label: "FAQ Manager",
                icon: HelpCircle,
                badge: `${faqs.length}`,
                badgeColor: "bg-accent-yellow text-ink-black",
              },
              {
                id: "services",
                label: "Services Matrix",
                icon: Zap,
                badge: `${services.filter((s) => s.status === "ACTIVE").length} ACT`,
                badgeColor: "bg-paper-ruled text-ink-black",
              },
              {
                id: "plans",
                label: "Pricing Plans",
                icon: Briefcase,
                badge: `${plans.filter((p) => p.status === "ACTIVE").length} OPEN`,
                badgeColor: "bg-emerald-300 text-emerald-950",
              },
              {
                id: "projects",
                label: "Projects Portfolio",
                icon: Award,
                badge: `${projects.length}`,
                badgeColor: "bg-neutral-100 text-neutral-800",
              },
              {
                id: "testimonials",
                label: "Client Reviews",
                icon: MessageSquare,
                badge: `${reviews.length}`,
                badgeColor: "bg-neutral-100 text-neutral-800",
              },
              {
                id: "settings",
                label: "Agency Settings",
                icon: Settings,
                badge: null,
                badgeColor: "",
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as AdminTab);
                    setMobileSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono font-black uppercase transition-all border-2
                    ${
                      isActive
                        ? "bg-accent-yellow border-ink-black shadow-[3px_3px_0px_#000000] translate-x-1"
                        : "bg-white hover:bg-neutral-100 border-transparent text-neutral-700 hover:text-ink-black"
                    }
                  `}
                  title={tab.label}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-ink-black stroke-[2.5]" : "text-neutral-600"
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between overflow-hidden">
                      <span className="truncate text-left">{tab.label}</span>
                      {tab.badge && (
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border border-ink-black ml-1.5 ${
                            tab.badgeColor || "bg-accent-yellow text-ink-black"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer System Status */}
          <div className="p-3 border-t-2 border-ink-black bg-[#F7F5EE]">
            {!sidebarCollapsed ? (
              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-neutral-600 flex items-center justify-between">
                  <span>TELEMETRY STATUS</span>
                  <span className="text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                    ONLINE
                  </span>
                </div>
                <div className="p-2 bg-white border border-ink-black text-[10px] font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ENGINE:</span>
                    <span className="font-bold">Next.js 14.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">ROUTER:</span>
                    <span className="font-bold text-accent-red">EDGE WORKERS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">LIGHTHOUSE:</span>
                    <span className="font-black text-emerald-600">100/100 SLA</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center" title="All Systems Operational">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-ink-black"></span>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-ink-black/40 z-20 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* =================================================================== */}
        {/* MAIN WORKSTATION CONTENT AREA                                       */}
        {/* =================================================================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* ================================================================= */}
          {/* TAB 1: 📊 DASHBOARD OVERVIEW                                      */}
          {/* ================================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-white border-2 border-ink-black p-5 sm:p-6 shadow-[5px_5px_0px_#000000] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-36 h-36 bg-accent-yellow -mr-16 -mt-16 rotate-45 border-b-2 border-ink-black pointer-events-none hidden sm:block" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-[#F7F5EE] border border-ink-black px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase mb-2">
                      <span className="w-2 h-2 rounded-full bg-accent-red"></span>
                      Studio Mission Control
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-headline font-black uppercase tracking-tight">
                      WELCOME BACK, CHIEF ARCHITECT.
                    </h1>
                    <p className="text-neutral-600 text-sm max-w-2xl mt-1">
                      System status is optimal. All 6 active customer sprints are executing within SLA. 
                      You have{" "}
                      <span className="font-bold text-accent-red">
                        {unreadCount} unreviewed enterprise inquiries
                      </span>{" "}
                      waiting in the triage queue.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        setActiveTab("inquiries");
                        setInquiryStatusFilter("NEW");
                      }}
                      className="px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                    >
                      <Inbox className="w-4 h-4" />
                      Triage Leads ({unreadCount})
                    </button>
                    <button
                      onClick={openMemoStudioForNew}
                      className="px-4 py-2 bg-white hover:bg-neutral-100 border-2 border-ink-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Journal Studio
                    </button>
                  </div>
                </div>
              </div>

              {/* 5 Core Neo-Brutalist KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* 1. Total Inquiries */}
                <div className="bg-white border-2 border-ink-black p-4 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                      Total Inquiries
                    </span>
                    <div className="w-7 h-7 bg-accent-yellow border-2 border-ink-black flex items-center justify-center">
                      <Inbox className="w-4 h-4 text-ink-black" />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="text-3xl font-headline font-black">{inquiries.length}</div>
                    <div className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      {kpiStats.inquiriesDelta}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("inquiries")}
                    className="text-[11px] font-mono font-bold text-neutral-700 hover:text-ink-black flex items-center justify-between pt-2 border-t border-neutral-200"
                  >
                    <span>View Lead Board</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. Active Sprints */}
                <div className="bg-white border-2 border-ink-black p-4 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                      Active Sprints
                    </span>
                    <div className="w-7 h-7 bg-accent-teal border-2 border-ink-black flex items-center justify-center">
                      <Zap className="w-4 h-4 text-ink-black" />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="text-3xl font-headline font-black">
                      {kpiStats.activeSprints}{" "}
                      <span className="text-sm font-normal text-neutral-500">/ 8</span>
                    </div>
                    <div className="text-[10px] font-mono text-neutral-600 font-bold mt-1">
                      {kpiStats.sprintsCapacity}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("plans")}
                    className="text-[11px] font-mono font-bold text-neutral-700 hover:text-ink-black flex items-center justify-between pt-2 border-t border-neutral-200"
                  >
                    <span>Manage Slots</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. Published Memos */}
                <div className="bg-white border-2 border-ink-black p-4 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                      Live Journal Memos
                    </span>
                    <div className="w-7 h-7 bg-[#F7F5EE] border-2 border-ink-black flex items-center justify-center">
                      <FileText className="w-4 h-4 text-ink-black" />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="text-3xl font-headline font-black">
                      {memos.filter((m) => m.status === "PUBLISHED").length}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-600 font-bold mt-1">
                      {kpiStats.totalMemoViews}
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("memos")}
                    className="text-[11px] font-mono font-bold text-neutral-700 hover:text-ink-black flex items-center justify-between pt-2 border-t border-neutral-200"
                  >
                    <span>Inspect Articles</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4. Revenue MTD */}
                <div className="bg-white border-2 border-ink-black p-4 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                      Revenue MTD
                    </span>
                    <div className="w-7 h-7 bg-emerald-300 border-2 border-ink-black flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-emerald-950 stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="text-3xl font-headline font-black">
                      {kpiStats.revenueMtd}
                    </div>
                    <div className="text-[10px] font-mono text-emerald-700 font-bold mt-1">
                      {kpiStats.revenueDelta}
                    </div>
                  </div>
                  <button
                    onClick={() => showToast("Financial Export Ready", "Stripe payout statements synchronized.", "info")}
                    className="text-[11px] font-mono font-bold text-neutral-700 hover:text-ink-black flex items-center justify-between pt-2 border-t border-neutral-200"
                  >
                    <span>Payout Logs</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 5. Lighthouse SLA */}
                <div className="bg-white border-2 border-ink-black p-4 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold uppercase text-neutral-500">
                      Lighthouse SLA
                    </span>
                    <div className="w-7 h-7 bg-accent-red border-2 border-ink-black flex items-center justify-center">
                      <Gauge className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="my-3">
                    <div className="text-3xl font-headline font-black text-emerald-600">
                      100<span className="text-sm text-neutral-500">/100</span>
                    </div>
                    <div className="text-[10px] font-mono text-neutral-600 font-bold mt-1">
                      0.00 CLS • 0.19s LCP
                    </div>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-emerald-800 flex items-center justify-between pt-2 border-t border-neutral-200">
                    <span>100% Core Vitals</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Two-Column Grid: Recent Inquiries + Studio Ops */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Inquiries Spotlight */}
                <div className="lg:col-span-2 bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
                      <div className="flex items-center gap-2">
                        <Inbox className="w-4 h-4" />
                        <h2 className="font-headline font-black text-base uppercase">
                          Latest Enterprise Inbound Leads
                        </h2>
                      </div>
                      <button
                        onClick={() => setActiveTab("inquiries")}
                        className="text-xs font-mono font-bold text-neutral-700 hover:text-ink-black underline decoration-2"
                      >
                        View All ({inquiries.length}) &rarr;
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-200 mt-2">
                      {inquiries.slice(0, 4).map((inq) => {
                        const statusConfig = INQUIRY_STATUS_CONFIG[inq.status];
                        return (
                          <div
                            key={inq.id}
                            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F7F5EE] px-2 transition-colors cursor-pointer"
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-black">
                                  {inq.id}
                                </span>
                                <span className="font-bold text-sm">{inq.name}</span>
                                <span className="text-xs text-neutral-500 font-mono">
                                  @{inq.company}
                                </span>
                                {inq.unread && (
                                  <span className="w-2 h-2 rounded-full bg-accent-red"></span>
                                )}
                              </div>
                              <div className="text-xs text-neutral-600 line-clamp-1">
                                {inq.message}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-xs font-mono font-bold bg-neutral-100 px-2 py-0.5 border border-neutral-300">
                                {inq.budget}
                              </span>
                              <span
                                className={`text-[10px] font-mono font-black px-2 py-0.5 border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.text}`}
                              >
                                {statusConfig.label}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500">
                      Next dispatch triage window in: 2h 15m
                    </span>
                    <button
                      onClick={() => setIsNewInquiryModalOpen(true)}
                      className="font-bold hover:text-accent-red underline"
                    >
                      + Register Manual Lead
                    </button>
                  </div>
                </div>

                {/* Right 1 Col: Production Infrastructure Status */}
                <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 pb-3 border-b-2 border-ink-black">
                      <Activity className="w-4 h-4 text-accent-red" />
                      <h2 className="font-headline font-black text-base uppercase">
                        Studio Edge Infrastructure
                      </h2>
                    </div>

                    <div className="mt-4 space-y-3 font-mono text-xs">
                      <div className="p-3 bg-[#F7F5EE] border border-ink-black space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold">GLOBAL EDGE NODES</span>
                          <span className="text-emerald-700 font-black">ALL GREEN</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-neutral-600">
                          <div className="flex justify-between">
                            <span>SF PRIMARY (US-WEST)</span>
                            <span className="font-bold text-ink-black">12ms // 100% OK</span>
                          </div>
                          <div className="flex justify-between">
                            <span>LONDON NODE (EU-WEST)</span>
                            <span className="font-bold text-ink-black">18ms // 100% OK</span>
                          </div>
                          <div className="flex justify-between">
                            <span>TOKYO EDGE (AP-EAST)</span>
                            <span className="font-bold text-ink-black">26ms // 100% OK</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-white border border-ink-black space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-bold">UPCOMING CLIENT MILESTONE</span>
                          <span className="text-accent-red font-black">48 HOURS</span>
                        </div>
                        <div className="font-sans font-bold text-sm">
                          GridFlow Systems AG Cutover
                        </div>
                        <div className="text-[11px] text-neutral-500 font-mono">
                          Sprint 4: Next.js 14 App Router migration + full schema graph.
                        </div>
                      </div>

                      <div className="p-3 bg-accent-yellow/30 border border-ink-black text-[11px] space-y-1">
                        <div className="font-bold text-ink-black">DIRECTIVE 100/100 AUDIT</div>
                        <p className="text-neutral-700 leading-tight">
                          Zero JavaScript hydration regressions detected on the production cluster.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast("Diagnostic Sweep Passed", "All cluster endpoints responded < 20ms.", "success")}
                    className="mt-4 w-full py-2 bg-neutral-100 hover:bg-neutral-200 border border-ink-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Run Diagnostic Sweep
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: 📬 INQUIRIES & LEADS                                       */}
          {/* ================================================================= */}
          {activeTab === "inquiries" && (
            <div className="space-y-6">
              {/* Header & Controls */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-headline font-black uppercase">
                        Inquiries & Client Dispatch Queue
                      </h1>
                      <span className="font-mono text-xs bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                        {inquiries.length} TOTAL
                      </span>
                    </div>
                    <p className="text-neutral-600 text-xs mt-1">
                      Real-time client inbound leads. Inspect requests, transition sprint statuses, and dispatch engineering proposals.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsNewInquiryModalOpen(true)}
                    className="self-start md:self-auto px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Register Lead
                  </button>
                </div>

                {/* Search & Filter Pills */}
                <div className="mt-5 pt-4 border-t-2 border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Search Bar */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search by client name, email, company, service..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[#F7F5EE] border-2 border-ink-black text-xs font-mono focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    <span className="text-neutral-500 font-bold mr-1 text-[11px]">STATUS:</span>
                    {(["ALL", "NEW", "REVIEW", "SCHEDULED", "WON", "ARCHIVED"] as const).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setInquiryStatusFilter(status)}
                          className={`
                            px-2.5 py-1 border border-ink-black font-bold uppercase transition-all
                            ${
                              inquiryStatusFilter === status
                                ? "bg-ink-black text-white shadow-[2px_2px_0px_#000000]"
                                : "bg-white hover:bg-neutral-100 text-neutral-700"
                            }
                          `}
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Inquiries List Table */}
              <div className="bg-white border-2 border-ink-black shadow-[4px_4px_0px_#000000] overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F7F5EE] border-b-2 border-ink-black font-mono font-black uppercase text-neutral-700">
                      <th className="py-3 px-4 border-r border-neutral-300">ID / Date</th>
                      <th className="py-3 px-4 border-r border-neutral-300">Client / Company</th>
                      <th className="py-3 px-4 border-r border-neutral-300">Service Target</th>
                      <th className="py-3 px-4 border-r border-neutral-300">Budget / Timeline</th>
                      <th className="py-3 px-4 border-r border-neutral-300 text-center">Priority</th>
                      <th className="py-3 px-4 border-r border-neutral-300">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredInquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center font-mono text-neutral-500">
                          No inquiries found matching current filters.
                        </td>
                      </tr>
                    ) : (
                      filteredInquiries.map((inq) => {
                        const statusConfig = INQUIRY_STATUS_CONFIG[inq.status];
                        return (
                          <tr
                            key={inq.id}
                            className={`hover:bg-[#FFFDF5] transition-colors ${
                              inq.unread ? "bg-amber-50/50 font-medium" : ""
                            }`}
                          >
                            <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                              <div className="flex items-center gap-1.5 font-bold">
                                {inq.id}
                                {inq.unread && (
                                  <span className="w-2 h-2 rounded-full bg-accent-red"></span>
                                )}
                              </div>
                              <div className="text-[10px] text-neutral-500">
                                {inq.date.substring(0, 10)}
                              </div>
                            </td>

                            <td className="py-3 px-4 border-r border-neutral-200">
                              <div className="font-bold text-sm">{inq.name}</div>
                              <div className="text-neutral-500 font-mono text-[11px]">
                                {inq.company} • {inq.email}
                              </div>
                            </td>

                            <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                              <span className="bg-neutral-100 px-2 py-0.5 border border-neutral-300 font-bold">
                                {inq.service}
                              </span>
                            </td>

                            <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                              <div className="font-black text-ink-black">{inq.budget}</div>
                              <div className="text-[10px] text-neutral-500">{inq.timeline}</div>
                            </td>

                            <td className="py-3 px-4 border-r border-neutral-200 text-center font-mono">
                              <span
                                className={`text-[10px] font-black px-2 py-0.5 border border-ink-black ${
                                  inq.priority === "HIGH"
                                    ? "bg-accent-red text-white"
                                    : inq.priority === "MEDIUM"
                                    ? "bg-accent-yellow text-ink-black"
                                    : "bg-neutral-200 text-neutral-800"
                                }`}
                              >
                                {inq.priority}
                              </span>
                            </td>

                            <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                              <div className="relative inline-block">
                                <select
                                  value={inq.status}
                                  onChange={(e) =>
                                    updateInquiryStatus(inq.id, e.target.value as InquiryStatus)
                                  }
                                  className={`text-[10px] font-black uppercase px-2 py-1 border cursor-pointer ${statusConfig.border} ${statusConfig.bg} ${statusConfig.text}`}
                                >
                                  <option value="NEW">NEW DISPATCH</option>
                                  <option value="REVIEW">IN TRIAGE</option>
                                  <option value="SCHEDULED">CALL BOOKED</option>
                                  <option value="WON">WON SPRINT</option>
                                  <option value="ARCHIVED">ARCHIVED</option>
                                </select>
                              </div>
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5 font-mono">
                                <button
                                  onClick={() => setSelectedInquiry(inq)}
                                  className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-ink-black font-bold text-xs flex items-center gap-1 shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                                  title="Inspect Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>View</span>
                                </button>
                                <button
                                  onClick={() => deleteInquiry(inq.id)}
                                  className="p-1 hover:bg-accent-red hover:text-white border border-neutral-300 text-neutral-500 transition-colors"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: 📝 JOURNAL & MEMOS STUDIO                                 */}
          {/* ================================================================= */}
          {activeTab === "memos" && (
            <div className="space-y-6">
              {/* Header & Controls */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-headline font-black uppercase">
                        Journal Memos & Technical Editorial Studio
                      </h1>
                      <span className="font-mono text-xs bg-accent-teal px-2 py-0.5 border border-ink-black font-black">
                        {memos.length} ARTICLES
                      </span>
                    </div>
                    <p className="text-neutral-600 text-xs mt-1">
                      Author, edit, and audit deep-dive architectural engineering memos with full `/journal` parity and interactive live preview.
                    </p>
                  </div>

                  <button
                    onClick={openMemoStudioForNew}
                    className="self-start md:self-auto px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Compose Full Memo
                  </button>
                </div>

                {/* Filters Row */}
                <div className="mt-5 pt-4 border-t-2 border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search title, subtitle, excerpt, tags..."
                      value={memoSearch}
                      onChange={(e) => setMemoSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[#F7F5EE] border-2 border-ink-black text-xs font-mono focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    <span className="text-neutral-500 font-bold mr-1 text-[11px]">STATUS:</span>
                    {(["ALL", "PUBLISHED", "DRAFT"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setMemoStatusFilter(st)}
                        className={`px-2.5 py-1 border border-ink-black font-bold uppercase ${
                          memoStatusFilter === st
                            ? "bg-ink-black text-white"
                            : "bg-white hover:bg-neutral-100"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Memos List Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredMemos.map((memo) => {
                  const statusConfig = MEMO_STATUS_CONFIG[memo.status];
                  return (
                    <div
                      key={memo.id}
                      className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between font-mono text-xs">
                          <span className="bg-[#F7F5EE] px-2 py-0.5 border border-ink-black font-black">
                            {memo.category}
                          </span>
                          <span className="text-neutral-500">{memo.readTime}</span>
                        </div>

                        <h3 className="font-headline font-black text-lg leading-snug">
                          {memo.title}
                        </h3>

                        {memo.subtitle && (
                          <div className="text-xs font-mono text-neutral-600 line-clamp-2 italic">
                            {memo.subtitle}
                          </div>
                        )}

                        <p className="text-xs text-neutral-700 line-clamp-3">
                          {memo.excerpt}
                        </p>

                        {/* Author info pill */}
                        <div className="flex items-center justify-between font-mono text-[11px] pt-1 text-neutral-600 border-t border-neutral-100">
                          <span>By {memo.author?.name || memo.authorName || "Marcus Vance"}</span>
                          <span>{memo.date}</span>
                        </div>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {memo.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono bg-neutral-100 px-1.5 py-0.5 border border-neutral-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t-2 border-neutral-200 flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleMemoStatus(memo.id)}
                            className={`px-2.5 py-1 border font-black uppercase text-[10px] shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 ${statusConfig.border} ${statusConfig.bg} ${statusConfig.text}`}
                          >
                            {statusConfig.label}
                          </button>
                          {memo.views !== undefined && memo.views > 0 && (
                            <span className="text-[10px] text-neutral-500 font-bold">
                              {memo.views.toLocaleString()} reads
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openMemoStudioForEdit(memo)}
                            className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-ink-black font-bold text-[11px] flex items-center gap-1 shadow-[1px_1px_0px_#000000]"
                            title="Edit Full Memo in Studio"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Studio</span>
                          </button>
                          <Link
                            href={`/journal/${memo.slug}`}
                            target="_blank"
                            className="p-1 hover:bg-neutral-100 border border-neutral-300 text-neutral-700"
                            title="View Public Article"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => deleteMemo(memo.id)}
                            className="p-1 hover:bg-accent-red hover:text-white border border-neutral-300 text-neutral-500 transition-colors"
                            title="Delete Memo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: ❓ FAQ MANAGER WORKSTATION                                 */}
          {/* ================================================================= */}
          {activeTab === "faqs" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-headline font-black uppercase">
                        Client FAQ & Knowledge Base Manager
                      </h1>
                      <span className="font-mono text-xs bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                        {faqs.length} ENTRIES
                      </span>
                    </div>
                    <p className="text-neutral-600 text-xs mt-1">
                      Manage official client questions and answers across the Home page, About page, and Plans page.
                    </p>
                  </div>

                  <button
                    onClick={openFaqModalForNew}
                    className="self-start md:self-auto px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Add New FAQ
                  </button>
                </div>

                {/* Filters */}
                <div className="mt-5 pt-4 border-t-2 border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Search */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search question, answer, badge..."
                      value={faqSearch}
                      onChange={(e) => setFaqSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-[#F7F5EE] border-2 border-ink-black text-xs font-mono focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Target Page Filter */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    <span className="text-neutral-500 font-bold mr-1 text-[11px]">PAGE:</span>
                    {(["ALL", "HOME", "ABOUT", "PLANS"] as const).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setFaqPageFilter(pg)}
                        className={`px-2.5 py-1 border border-ink-black font-bold uppercase ${
                          faqPageFilter === pg
                            ? "bg-ink-black text-white"
                            : "bg-white hover:bg-neutral-100"
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  {/* Status Filter */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                    <span className="text-neutral-500 font-bold mr-1 text-[11px]">STATUS:</span>
                    {(["ALL", "ACTIVE", "HIDDEN"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setFaqStatusFilter(st)}
                        className={`px-2.5 py-1 border border-ink-black font-bold uppercase ${
                          faqStatusFilter === st
                            ? "bg-accent-yellow text-ink-black font-black"
                            : "bg-white hover:bg-neutral-100"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFaqs.map((faq) => {
                  const catCfg = FAQ_CATEGORY_CONFIG[faq.category];
                  const pageCfg = FAQ_PAGE_CONFIG[faq.targetPage];
                  const statusCfg = FAQ_STATUS_CONFIG[faq.status];

                  return (
                    <div
                      key={faq.id}
                      className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between font-mono text-xs gap-2 flex-wrap">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-neutral-500">{faq.id}</span>
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 border ${pageCfg.border} ${pageCfg.bg} ${pageCfg.text}`}
                            >
                              {pageCfg.label}
                            </span>
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 border ${catCfg.border} ${catCfg.bg} ${catCfg.text}`}
                            >
                              {catCfg.label}
                            </span>
                          </div>

                          <button
                            onClick={() => toggleFaqStatus(faq.id)}
                            className={`text-[9px] font-black px-2 py-0.5 border ${statusCfg.border} ${statusCfg.bg} ${statusCfg.text}`}
                          >
                            {statusCfg.label}
                          </button>
                        </div>

                        <h3 className="font-headline font-black text-base leading-snug">
                          {faq.question}
                        </h3>

                        <p className="text-xs text-neutral-700 leading-relaxed">
                          {faq.answer}
                        </p>

                        {faq.highlightBadge && (
                          <div className="inline-block bg-accent-yellow/20 border border-ink-black px-2 py-0.5 text-[10px] font-mono font-black text-ink-black">
                            {faq.highlightBadge}
                          </div>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t-2 border-neutral-200 flex items-center justify-between font-mono text-xs">
                        <span className="text-[10px] text-neutral-500">
                          Order Priority: #{faq.order}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openFaqModalForEdit(faq)}
                            className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-ink-black font-bold text-xs flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => deleteFaq(faq.id)}
                            className="p-1 hover:bg-accent-red hover:text-white border border-neutral-300 text-neutral-500 transition-colors"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 5: ⚡ SERVICES                                                */}
          {/* ================================================================= */}
          {activeTab === "services" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-headline font-black uppercase">
                      Engineering Capabilities & Services Matrix
                    </h1>
                    <span className="font-mono text-xs bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                      {services.length} OFFERINGS
                    </span>
                  </div>
                  <p className="text-neutral-600 text-xs mt-1">
                    Toggle service availability, review client deliverable checklists, and monitor verified performance SLAs.
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setServicesViewMode("cards")}
                    className={`px-3 py-1.5 border border-ink-black font-bold uppercase ${
                      servicesViewMode === "cards" ? "bg-ink-black text-white" : "bg-white"
                    }`}
                  >
                    Card Grid
                  </button>
                  <button
                    onClick={() => setServicesViewMode("table")}
                    className={`px-3 py-1.5 border border-ink-black font-bold uppercase ${
                      servicesViewMode === "table" ? "bg-ink-black text-white" : "bg-white"
                    }`}
                  >
                    Table Spec
                  </button>
                </div>
              </div>

              {/* Cards Grid Mode */}
              {servicesViewMode === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {services.map((srv) => {
                    const statusConfig = SERVICE_STATUS_CONFIG[srv.status];
                    return (
                      <div
                        key={srv.id}
                        className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="font-bold text-neutral-500">{srv.id}</span>
                            <button
                              onClick={() => toggleServiceStatus(srv.id)}
                              className={`text-[10px] font-mono font-black px-2 py-0.5 border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.text}`}
                            >
                              {statusConfig.label}
                            </button>
                          </div>

                          <h3 className="font-headline font-black text-xl leading-snug">
                            {srv.title}
                          </h3>

                          <p className="text-xs text-neutral-600">{srv.tagline}</p>

                          {/* Pricing & Turnaround Bar */}
                          <div className="p-2.5 bg-[#F7F5EE] border border-ink-black flex justify-between font-mono text-xs">
                            <div>
                              <span className="text-[10px] text-neutral-500 block uppercase">
                                Investment
                              </span>
                              <span className="font-black text-ink-black">{srv.price}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-neutral-500 block uppercase">
                                Delivery Window
                              </span>
                              <span className="font-bold text-ink-black">{srv.turnaround}</span>
                            </div>
                          </div>

                          {/* Deliverables Checklist */}
                          <div className="space-y-1.5 pt-2">
                            <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                              Key Deliverables:
                            </span>
                            {srv.deliverables.slice(0, 4).map((d, i) => (
                              <div key={i} className="flex items-start gap-1.5 text-xs">
                                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                <span className="text-neutral-700 leading-tight">{d}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tech Stack Pills & Metrics */}
                        <div className="mt-5 pt-3 border-t-2 border-neutral-200 space-y-2">
                          <div className="flex flex-wrap gap-1">
                            {srv.techStack.map((t) => (
                              <span
                                key={t}
                                className="text-[10px] font-mono bg-neutral-100 px-1.5 py-0.5 border border-neutral-300"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {srv.metricsHighlight && (
                            <div className="flex items-center justify-between text-xs font-mono bg-accent-yellow/20 p-1.5 border border-ink-black">
                              <span className="text-neutral-600">
                                {srv.metricsHighlight.label}:
                              </span>
                              <span className="font-black text-ink-black">
                                {srv.metricsHighlight.value}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Table Mode */
                <div className="bg-white border-2 border-ink-black shadow-[4px_4px_0px_#000000] overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#F7F5EE] border-b-2 border-ink-black font-mono font-black uppercase text-neutral-700">
                        <th className="py-3 px-4 border-r border-neutral-300">ID / Title</th>
                        <th className="py-3 px-4 border-r border-neutral-300">Price</th>
                        <th className="py-3 px-4 border-r border-neutral-300">Turnaround</th>
                        <th className="py-3 px-4 border-r border-neutral-300">Deliverables Count</th>
                        <th className="py-3 px-4 border-r border-neutral-300">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {services.map((srv) => (
                        <tr key={srv.id} className="hover:bg-[#FFFDF5]">
                          <td className="py-3 px-4 border-r border-neutral-200">
                            <div className="font-bold text-sm">{srv.title}</div>
                            <div className="text-neutral-500 font-mono text-[11px]">
                              {srv.tagline}
                            </div>
                          </td>
                          <td className="py-3 px-4 border-r border-neutral-200 font-mono font-bold">
                            {srv.price}
                          </td>
                          <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                            {srv.turnaround}
                          </td>
                          <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                            {srv.deliverables.length} core items
                          </td>
                          <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                            <button
                              onClick={() => toggleServiceStatus(srv.id)}
                              className={`text-[10px] font-mono font-black px-2 py-0.5 border ${
                                SERVICE_STATUS_CONFIG[srv.status].border
                              } ${SERVICE_STATUS_CONFIG[srv.status].bg} ${
                                SERVICE_STATUS_CONFIG[srv.status].text
                              }`}
                            >
                              {SERVICE_STATUS_CONFIG[srv.status].label}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => toggleServiceStatus(srv.id)}
                              className="px-2.5 py-1 bg-white hover:bg-neutral-100 border border-ink-black font-mono font-bold text-xs"
                            >
                              Toggle
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 6: 💼 PRICING PLANS & CAPACITY SLOTS                          */}
          {/* ================================================================= */}
          {activeTab === "plans" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-headline font-black uppercase">
                        Fixed-Scope Packages & Sprint Slots
                      </h1>
                      <span className="font-mono text-xs bg-emerald-300 text-emerald-950 px-2 py-0.5 border border-ink-black font-black">
                        SLOT CAPACITY MANAGER
                      </span>
                    </div>
                    <p className="text-neutral-600 text-xs mt-1">
                      Manage monthly client intake capacity, dynamically edit tier pricing, and monitor sprint reservations.
                    </p>
                  </div>

                  <div className="p-2.5 bg-[#F7F5EE] border-2 border-ink-black font-mono text-xs flex items-center gap-3">
                    <span className="font-bold">TOTAL BOOKED SPRINTS:</span>
                    <span className="font-black text-accent-red">6 OF 8 SLOTS</span>
                  </div>
                </div>
              </div>

              {/* 4 Pricing Plans Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {plans.map((plan) => {
                  const statusConfig = PLAN_STATUS_CONFIG[plan.status];
                  return (
                    <div
                      key={plan.id}
                      className={`
                        bg-white border-2 border-ink-black p-5 flex flex-col justify-between relative
                        ${plan.popular ? "shadow-[6px_6px_0px_#FFE600]" : "shadow-[4px_4px_0px_#000000]"}
                      `}
                    >
                      {plan.badge && (
                        <div className="absolute -top-3 left-4 bg-accent-yellow border border-ink-black px-2 py-0.5 font-mono text-[10px] font-black uppercase shadow-[2px_2px_0px_#000000]">
                          {plan.badge}
                        </div>
                      )}

                      <div className="space-y-4 pt-1">
                        <div>
                          <div className="text-xs font-mono font-bold text-neutral-500 uppercase">
                            {plan.id}
                          </div>
                          <h3 className="font-headline font-black text-2xl uppercase mt-0.5">
                            {plan.name}
                          </h3>
                        </div>

                        {/* Interactive Price Box */}
                        <div className="p-3 bg-[#F7F5EE] border-2 border-ink-black flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-headline font-black text-ink-black">
                              {plan.price}
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500 uppercase font-bold">
                              /{plan.period}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setEditingPlan(plan);
                              setTempPriceInput(plan.price);
                              setIsPriceEditModalOpen(true);
                            }}
                            className="px-2 py-1 bg-white hover:bg-neutral-100 border border-ink-black font-mono font-bold text-[10px] uppercase shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Interactive Slots Controller */}
                        <div className="p-3 bg-white border border-ink-black space-y-2">
                          <div className="flex items-center justify-between font-mono text-xs">
                            <span className="font-bold text-neutral-600">AVAILABLE SLOTS:</span>
                            <span className="font-black text-sm bg-accent-yellow px-1.5 border border-ink-black">
                              {plan.slotsAvailable}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => adjustPlanSlots(plan.id, -1)}
                              disabled={plan.slotsAvailable === 0}
                              className="flex-1 py-1 bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40 border border-ink-black font-mono font-black text-xs"
                            >
                              - 1
                            </button>
                            <button
                              onClick={() => adjustPlanSlots(plan.id, 1)}
                              className="flex-1 py-1 bg-neutral-100 hover:bg-neutral-200 border border-ink-black font-mono font-black text-xs"
                            >
                              + 1
                            </button>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          <span
                            className={`block text-center text-[10px] font-mono font-black px-2 py-1 border ${statusConfig.border} ${statusConfig.bg} ${statusConfig.text}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>

                        {/* Features List */}
                        <div className="space-y-1.5 pt-2">
                          <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                            Included in Sprint:
                          </span>
                          {plan.features.slice(0, 5).map((f, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs">
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="text-neutral-700 leading-tight">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-neutral-200 text-[10px] font-mono text-neutral-500">
                        Turnaround: <span className="font-bold text-ink-black">{plan.turnaround}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 7: 🏆 PROJECTS PORTFOLIO                                      */}
          {/* ================================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-headline font-black uppercase">
                      Engineering Case Studies & Portfolio
                    </h1>
                    <span className="font-mono text-xs bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                      {projects.length} PROJECTS
                    </span>
                  </div>
                  <p className="text-neutral-600 text-xs mt-1">
                    Showcase client architectures, benchmark metrics, and production deployments.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewProjectModalOpen(true)}
                  className="px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  Add Project
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((prj) => (
                  <div
                    key={prj.id}
                    className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="bg-[#F7F5EE] px-2 py-0.5 border border-ink-black font-bold">
                          {prj.category}
                        </span>
                        <span className="text-neutral-500 font-bold">{prj.year}</span>
                      </div>

                      <h3 className="font-headline font-black text-xl leading-snug">
                        {prj.title}
                      </h3>

                      <div className="text-xs font-mono text-neutral-500">
                        Client: <span className="font-bold text-ink-black">{prj.client}</span>
                      </div>

                      {prj.description && (
                        <p className="text-xs text-neutral-600 line-clamp-2">
                          {prj.description}
                        </p>
                      )}

                      {/* Metric Highlight Box */}
                      <div className="p-2 bg-accent-teal/20 border border-ink-black font-mono text-xs flex items-center justify-between">
                        <span className="text-neutral-600 text-[10px] uppercase font-bold">
                          VERIFIED IMPACT:
                        </span>
                        <span className="font-black text-ink-black">
                          {prj.metricHighlight}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {prj.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono bg-neutral-100 px-1.5 py-0.5 border border-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t-2 border-neutral-200 flex items-center justify-between font-mono text-xs">
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 border border-ink-black ${
                          prj.status === "COMPLETED"
                            ? "bg-emerald-300 text-emerald-950"
                            : "bg-accent-yellow text-ink-black"
                        }`}
                      >
                        {prj.status}
                      </span>

                      <a
                        href={prj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-neutral-700 hover:text-ink-black flex items-center gap-1 hover:underline"
                      >
                        <span>Inspect Live</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 8: 💬 CLIENT TESTIMONIALS                                     */}
          {/* ================================================================= */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-headline font-black uppercase">
                      Verified Client Reviews & Testimonials
                    </h1>
                    <span className="font-mono text-xs bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                      {reviews.length} REVIEWS
                    </span>
                  </div>
                  <p className="text-neutral-600 text-xs mt-1">
                    Manage authentic customer feedback, verified contract hashes, and conversion ROI statements.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 font-mono text-xs bg-[#F7F5EE] border border-ink-black px-3 py-1.5">
                    <Star className="w-4 h-4 fill-accent-yellow text-ink-black" />
                    <span className="font-black">5.0 / 5.0 RATING</span>
                  </div>
                  <button
                    onClick={openReviewModalForNew}
                    className="px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Add Testimonial
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Bar: Stars & Verified Badge */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-accent-yellow text-ink-black"
                            />
                          ))}
                        </div>
                        <button
                          onClick={() => toggleReviewVerified(rev.id)}
                          className={`text-[9px] font-mono font-black px-2 py-0.5 border flex items-center gap-1 ${
                            rev.verified
                              ? "bg-emerald-300 text-emerald-950 border-ink-black"
                              : "bg-neutral-200 text-neutral-600 border-neutral-400"
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                          {rev.verified ? "VERIFIED" : "UNVERIFIED"}
                        </button>
                      </div>

                      {/* Quote */}
                      <p className="text-xs text-neutral-700 italic leading-relaxed">
                        &ldquo;{rev.quote}&rdquo;
                      </p>

                      {/* Metric Badge */}
                      <div className="inline-block bg-[#F7F5EE] border border-ink-black px-2 py-0.5 text-[10px] font-mono font-black text-ink-black">
                        {rev.metricBadge}
                      </div>
                    </div>

                    {/* Author Footer */}
                    <div className="mt-5 pt-3 border-t-2 border-neutral-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 border-2 border-ink-black flex items-center justify-center font-mono font-black text-xs ${
                            rev.avatarBg || "bg-accent-yellow text-ink-black"
                          }`}
                        >
                          {rev.avatarInitials}
                        </div>
                        <div>
                          <div className="font-bold text-xs">{rev.clientName}</div>
                          <div className="text-[10px] font-mono text-neutral-500">
                            {rev.role}, {rev.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openReviewModalForEdit(rev)}
                          className="p-1 hover:bg-neutral-100 border border-neutral-300 text-neutral-700"
                          title="Edit Review"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="p-1 hover:bg-accent-red hover:text-white border border-neutral-300 text-neutral-500 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 9: ⚙️ AGENCY SETTINGS                                         */}
          {/* ================================================================= */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-headline font-black uppercase">
                    Agency Architecture & Studio Parameters
                  </h1>
                  <span className="font-mono text-xs bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                    SYSTEM CONFIG
                  </span>
                </div>
                <p className="text-neutral-600 text-xs mt-1">
                  Configure corporate contact endpoints, SLA response thresholds, and official digital communication links.
                </p>
              </div>

              {/* Settings Form */}
              <form onSubmit={handleSaveSettings} className="space-y-6">
                {/* 1. General Studio Info */}
                <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-neutral-200">
                    <User className="w-4 h-4" />
                    <h2 className="font-headline font-black text-base uppercase">
                      1. Studio Identity & Public Comms
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block font-bold mb-1">AGENCY NAME</label>
                      <input
                        type="text"
                        value={agencySettings.agencyName}
                        onChange={(e) =>
                          setAgencySettings({ ...agencySettings, agencyName: e.target.value })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">OFFICIAL EMAIL</label>
                      <input
                        type="email"
                        value={agencySettings.email}
                        onChange={(e) =>
                          setAgencySettings({ ...agencySettings, email: e.target.value })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">DIRECT PHONE</label>
                      <input
                        type="text"
                        value={agencySettings.phone}
                        onChange={(e) =>
                          setAgencySettings({ ...agencySettings, phone: e.target.value })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">HEADQUARTERS ADDRESS</label>
                      <input
                        type="text"
                        value={agencySettings.address.street}
                        onChange={(e) =>
                          setAgencySettings({
                            ...agencySettings,
                            address: { ...agencySettings.address, street: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="text-xs font-mono">
                    <label className="block font-bold mb-1">PRIMARY SITE TAGLINE</label>
                    <input
                      type="text"
                      value={agencySettings.siteTagline}
                      onChange={(e) =>
                        setAgencySettings({ ...agencySettings, siteTagline: e.target.value })
                      }
                      className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                    />
                  </div>
                </div>

                {/* 2. SLA & Performance Standards */}
                <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-neutral-200">
                    <Gauge className="w-4 h-4" />
                    <h2 className="font-headline font-black text-base uppercase">
                      2. Performance Guarantees & SLA SLAs
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="p-3 bg-[#F7F5EE] border border-ink-black space-y-2">
                      <label className="block font-bold">LIGHTHOUSE TARGET SLA</label>
                      <div className="text-2xl font-black text-emerald-600">
                        {agencySettings.lighthouseTarget}/100
                      </div>
                      <input
                        type="range"
                        min="95"
                        max="100"
                        value={agencySettings.lighthouseTarget}
                        onChange={(e) =>
                          setAgencySettings({
                            ...agencySettings,
                            lighthouseTarget: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-emerald-600"
                      />
                    </div>

                    <div className="p-3 bg-[#F7F5EE] border border-ink-black space-y-2">
                      <label className="block font-bold">EMERGENCY RESPONSE (HOURS)</label>
                      <div className="text-2xl font-black text-accent-red">
                        &lt; {agencySettings.slaResponseTimeHours} HOURS
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="12"
                        value={agencySettings.slaResponseTimeHours}
                        onChange={(e) =>
                          setAgencySettings({
                            ...agencySettings,
                            slaResponseTimeHours: parseInt(e.target.value),
                          })
                        }
                        className="w-full accent-accent-red"
                      />
                    </div>

                    <div className="p-3 bg-[#F7F5EE] border border-ink-black space-y-2">
                      <label className="block font-bold">MAX PARALLEL SPRINTS</label>
                      <div className="text-2xl font-black text-ink-black">
                        8 CONCURRENT
                      </div>
                      <span className="text-[10px] text-neutral-500 block">
                        Strict capacity enforcement prevents architectural debt.
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Developer & Social Handles */}
                <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000] space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b-2 border-neutral-200">
                    <Globe className="w-4 h-4" />
                    <h2 className="font-headline font-black text-base uppercase">
                      3. Developer Community & Repositories
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <label className="block font-bold mb-1">GITHUB REPO ORG</label>
                      <input
                        type="text"
                        value={agencySettings.socialLinks.github}
                        onChange={(e) =>
                          setAgencySettings({
                            ...agencySettings,
                            socialLinks: { ...agencySettings.socialLinks, github: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">DISCORD WAR ROOM</label>
                      <input
                        type="text"
                        value={agencySettings.socialLinks.discord}
                        onChange={(e) =>
                          setAgencySettings({
                            ...agencySettings,
                            socialLinks: { ...agencySettings.socialLinks, discord: e.target.value },
                          })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAgencySettings(INITIAL_AGENCY_SETTINGS);
                      showToast("Defaults Restored", "Settings reverted to base configuration.", "info");
                    }}
                    className="px-4 py-2 bg-white hover:bg-neutral-100 border-2 border-ink-black font-mono font-bold text-xs uppercase"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    Save Configuration
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* ===================================================================== */}
      {/* 3. MODALS SYSTEM: IN-DEPTH MEMO STUDIO, FAQS, REVIEWS, LEADS         */}
      {/* ===================================================================== */}

      {/* ===================================================================== */}
      {/* MODAL A: IN-DEPTH JOURNAL MEMO STUDIO & LIVE PREVIEW COMPOSER         */}
      {/* ===================================================================== */}
      {isMemoStudioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink-black/70 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-4xl w-full shadow-[8px_8px_0px_#000000] flex flex-col h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#F7F5EE] border-b-2 border-ink-black px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-accent-yellow border-2 border-ink-black flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-ink-black" />
                </div>
                <div>
                  <h3 className="font-headline font-black text-lg sm:text-xl uppercase leading-none">
                    {memoFormId ? "Edit Journal Technical Memo" : "Compose New Journal Memo"}
                  </h3>
                  <div className="text-[10px] font-mono text-neutral-500 uppercase mt-0.5">
                    Multi-Section Editorial Studio • Live `/journal` Engine Parity
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMemoStudioOpen(false)}
                className="p-1.5 border border-ink-black hover:bg-accent-red hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Composer Step / Tab Switcher */}
            <div className="bg-neutral-100 border-b-2 border-ink-black px-5 py-2 flex items-center gap-2 overflow-x-auto font-mono text-xs">
              <button
                type="button"
                onClick={() => setMemoComposerTab("meta")}
                className={`px-3 py-1 border border-ink-black font-bold uppercase transition-all ${
                  memoComposerTab === "meta"
                    ? "bg-accent-yellow text-ink-black shadow-[2px_2px_0px_#000000]"
                    : "bg-white hover:bg-neutral-200"
                }`}
              >
                1. Metadata & Slug
              </button>
              <button
                type="button"
                onClick={() => setMemoComposerTab("author")}
                className={`px-3 py-1 border border-ink-black font-bold uppercase transition-all ${
                  memoComposerTab === "author"
                    ? "bg-accent-yellow text-ink-black shadow-[2px_2px_0px_#000000]"
                    : "bg-white hover:bg-neutral-200"
                }`}
              >
                2. Author, Synopsis & Metrics
              </button>
              <button
                type="button"
                onClick={() => setMemoComposerTab("content")}
                className={`px-3 py-1 border border-ink-black font-bold uppercase transition-all ${
                  memoComposerTab === "content"
                    ? "bg-accent-yellow text-ink-black shadow-[2px_2px_0px_#000000]"
                    : "bg-white hover:bg-neutral-200"
                }`}
              >
                3. Section, Code & Callout
              </button>
              <button
                type="button"
                onClick={() => setMemoComposerTab("seo")}
                className={`px-3 py-1 border border-ink-black font-bold uppercase transition-all flex items-center gap-1.5 ${
                  memoComposerTab === "seo"
                    ? "bg-accent-yellow text-ink-black shadow-[2px_2px_0px_#000000]"
                    : "bg-white hover:bg-neutral-200"
                }`}
              >
                <span>4. 🎯 SEO, AEO & SERP Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setMemoComposerTab("preview")}
                className={`px-3 py-1 border border-ink-black font-black uppercase transition-all flex items-center gap-1.5 ${
                  memoComposerTab === "preview"
                    ? "bg-accent-teal text-ink-black shadow-[2px_2px_0px_#000000]"
                    : "bg-white hover:bg-neutral-200 text-accent-red"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>5. 👁️ Live Article Preview</span>
              </button>
            </div>

            {/* Composer Body Form */}
            <form onSubmit={handleSaveMemoStudio} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* TAB 1: METADATA */}
              {memoComposerTab === "meta" && (
                <div className="space-y-4 text-xs font-mono">
                  <div>
                    <label className="block font-bold mb-1">ARTICLE HEADLINE *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WHY WE DITCHED WORDPRESS FOR NEXT.JS 14 APP ROUTER"
                      value={memoForm.title}
                      onChange={(e) => setMemoForm({ ...memoForm, title: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black font-bold focus:outline-none focus:bg-white uppercase text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">SUBTITLE / DECK</label>
                    <textarea
                      rows={2}
                      placeholder="High-converting commercial platforms suffer from layout shifts and database locks..."
                      value={memoForm.subtitle}
                      onChange={(e) => setMemoForm({ ...memoForm, subtitle: e.target.value })}
                      className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold mb-1">CATEGORY</label>
                      <select
                        value={memoForm.category}
                        onChange={(e) => setMemoForm({ ...memoForm, category: e.target.value })}
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                      >
                        <option value="ARCHITECTURE">ARCHITECTURE</option>
                        <option value="SEO ENGINE">SEO ENGINE</option>
                        <option value="BACKEND">BACKEND</option>
                        <option value="DESIGN SYSTEM">DESIGN SYSTEM</option>
                        <option value="PERFORMANCE SLA">PERFORMANCE SLA</option>
                        <option value="AGILE STRATEGY">AGILE STRATEGY</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">ESTIMATED READ TIME</label>
                      <input
                        type="text"
                        placeholder="7 MIN READ"
                        value={memoForm.readTime}
                        onChange={(e) => setMemoForm({ ...memoForm, readTime: e.target.value })}
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold mb-1">STATUS</label>
                      <select
                        value={memoForm.status}
                        onChange={(e) =>
                          setMemoForm({ ...memoForm, status: e.target.value as MemoStatus })
                        }
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                      >
                        <option value="PUBLISHED">PUBLISHED (LIVE)</option>
                        <option value="DRAFT">DRAFT (STAGING)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1">CANONICAL SLUG</label>
                      <input
                        type="text"
                        placeholder="why-we-ditched-wordpress-for-nextjs-14"
                        value={memoForm.slug}
                        onChange={(e) => setMemoForm({ ...memoForm, slug: e.target.value })}
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                      <span className="text-[10px] text-neutral-500 block mt-1">
                        Leave blank to auto-generate from headline.
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">TAGS (COMMA SEPARATED)</label>
                      <input
                        type="text"
                        placeholder="Next.js 14, App Router, React 19, Performance"
                        value={memoForm.tags}
                        onChange={(e) => setMemoForm({ ...memoForm, tags: e.target.value })}
                        className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AUTHOR, SYNOPSIS & METRICS */}
              {memoComposerTab === "author" && (
                <div className="space-y-4 text-xs font-mono">
                  {/* Author Box */}
                  <div className="p-3 bg-white border-2 border-ink-black space-y-3">
                    <span className="font-bold text-neutral-600 block uppercase border-b pb-1">
                      Author Attribution
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold mb-1">AUTHOR NAME</label>
                        <input
                          type="text"
                          value={memoForm.authorName}
                          onChange={(e) => setMemoForm({ ...memoForm, authorName: e.target.value })}
                          className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">ROLE / TITLE</label>
                        <input
                          type="text"
                          value={memoForm.authorRole}
                          onChange={(e) => setMemoForm({ ...memoForm, authorRole: e.target.value })}
                          className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                      <div>
                        <label className="block font-bold mb-1">HANDLE / SOCIAL</label>
                        <input
                          type="text"
                          value={memoForm.authorHandle}
                          onChange={(e) => setMemoForm({ ...memoForm, authorHandle: e.target.value })}
                          className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <div>
                    <label className="block font-bold mb-1">EXECUTIVE SUMMARY / CALLOUT SYNOPSIS</label>
                    <textarea
                      rows={3}
                      placeholder="WordPress powers 40% of the web, but for high-growth commercial platforms, PHP database locks quietly destroy conversion rates..."
                      value={memoForm.executiveSummary}
                      onChange={(e) => setMemoForm({ ...memoForm, executiveSummary: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Key Takeaways */}
                  <div className="space-y-2">
                    <label className="block font-bold">KEY TAKEAWAYS (BULLET LIST)</label>
                    <input
                      type="text"
                      placeholder="Takeaway 1: Zero hydration overhead."
                      value={memoForm.takeaway1}
                      onChange={(e) => setMemoForm({ ...memoForm, takeaway1: e.target.value })}
                      className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                    />
                    <input
                      type="text"
                      placeholder="Takeaway 2: Sub-400ms LCP globally."
                      value={memoForm.takeaway2}
                      onChange={(e) => setMemoForm({ ...memoForm, takeaway2: e.target.value })}
                      className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                    />
                    <input
                      type="text"
                      placeholder="Takeaway 3: 100% intellectual property rights transfer."
                      value={memoForm.takeaway3}
                      onChange={(e) => setMemoForm({ ...memoForm, takeaway3: e.target.value })}
                      className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                    />
                  </div>

                  {/* Outcome Metrics */}
                  <div className="p-3 bg-white border-2 border-ink-black space-y-3">
                    <span className="font-bold text-neutral-600 block uppercase border-b pb-1">
                      Key Outcome Metrics
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">METRIC 1 LABEL</label>
                        <input
                          type="text"
                          value={memoForm.metricLabel1}
                          onChange={(e) => setMemoForm({ ...memoForm, metricLabel1: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">METRIC 1 VALUE</label>
                        <input
                          type="text"
                          value={memoForm.metricValue1}
                          onChange={(e) => setMemoForm({ ...memoForm, metricValue1: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black font-bold text-emerald-700"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">METRIC 2 LABEL</label>
                        <input
                          type="text"
                          value={memoForm.metricLabel2}
                          onChange={(e) => setMemoForm({ ...memoForm, metricLabel2: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">METRIC 2 VALUE</label>
                        <input
                          type="text"
                          value={memoForm.metricValue2}
                          onChange={(e) => setMemoForm({ ...memoForm, metricValue2: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black font-bold text-emerald-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SECTION CONTENT, CODE & CALLOUT */}
              {memoComposerTab === "content" && (
                <div className="space-y-4 text-xs font-mono">
                  {/* Heading & Paragraph */}
                  <div>
                    <label className="block font-bold mb-1">SECTION HEADING</label>
                    <input
                      type="text"
                      value={memoForm.sectionHeading}
                      onChange={(e) => setMemoForm({ ...memoForm, sectionHeading: e.target.value })}
                      className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">SECTION BODY / PARAGRAPHS</label>
                    <textarea
                      rows={4}
                      value={memoForm.sectionContent}
                      onChange={(e) => setMemoForm({ ...memoForm, sectionContent: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white leading-relaxed"
                    />
                  </div>

                  {/* Code Block Editor */}
                  <div className="p-3 bg-white border-2 border-ink-black space-y-2">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="font-bold text-neutral-600 uppercase flex items-center gap-1.5">
                        <Code className="w-3.5 h-3.5" />
                        Code Snippet Embed
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">FILENAME / PATH</label>
                        <input
                          type="text"
                          value={memoForm.codeFilename}
                          onChange={(e) => setMemoForm({ ...memoForm, codeFilename: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">LANGUAGE</label>
                        <input
                          type="text"
                          value={memoForm.codeLanguage}
                          onChange={(e) => setMemoForm({ ...memoForm, codeLanguage: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-0.5">SOURCE CODE</label>
                      <textarea
                        rows={4}
                        value={memoForm.codeSnippet}
                        onChange={(e) => setMemoForm({ ...memoForm, codeSnippet: e.target.value })}
                        className="w-full p-2 bg-neutral-900 text-emerald-400 font-mono text-xs border border-ink-black focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Callout Box */}
                  <div className="p-3 bg-white border-2 border-ink-black space-y-2">
                    <span className="font-bold text-neutral-600 block uppercase border-b pb-1">
                      Callout Highlight Box
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">CALLOUT TYPE</label>
                        <select
                          value={memoForm.calloutType}
                          onChange={(e) =>
                            setMemoForm({
                              ...memoForm,
                              calloutType: e.target.value as "note" | "warning" | "pro-tip",
                            })
                          }
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black font-bold"
                        >
                          <option value="pro-tip">PRO-TIP (ACCENT YELLOW)</option>
                          <option value="note">NOTE (TEAL ACCENT)</option>
                          <option value="warning">WARNING (RED ACCENT)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-neutral-500 mb-0.5">CALLOUT TITLE</label>
                        <input
                          type="text"
                          value={memoForm.calloutTitle}
                          onChange={(e) => setMemoForm({ ...memoForm, calloutTitle: e.target.value })}
                          className="w-full p-1.5 bg-[#F7F5EE] border border-ink-black font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-500 mb-0.5">CALLOUT BODY</label>
                      <textarea
                        rows={2}
                        value={memoForm.calloutBody}
                        onChange={(e) => setMemoForm({ ...memoForm, calloutBody: e.target.value })}
                        className="w-full p-2 bg-[#F7F5EE] border border-ink-black"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: 🎯 SEO, AEO & SERP PREVIEW */}
              {memoComposerTab === "seo" && (
                <div className="space-y-6 text-xs font-mono">
                  {/* Notice banner */}
                  <div className="p-3 bg-accent-yellow/20 border-2 border-ink-black flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-accent-red shrink-0 mt-0.5" />
                    <div>
                      <span className="font-black uppercase block">Technical On-Page SEO &amp; AI Answer Engine (AEO/GEO) Optimization</span>
                      <p className="font-sans text-xs text-neutral-700 font-normal mt-0.5">
                        These fields automatically control Google &amp; Bing meta tags, OpenGraph social sharing cards, and Schema.org TechArticle JSON-LD structures with AI speakable specifications for ChatGPT, Perplexity, and Gemini.
                      </p>
                    </div>
                  </div>

                  {/* SEO Meta Title */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold uppercase">
                        SEO Meta Title (Title Tag in Google Search)
                      </label>
                      <span
                        className={`text-[11px] font-bold ${
                          (memoForm.metaTitle.length || memoForm.title.length) > 60
                            ? "text-accent-red"
                            : (memoForm.metaTitle.length || memoForm.title.length) >= 40
                            ? "text-emerald-600"
                            : "text-neutral-500"
                        }`}
                      >
                        {memoForm.metaTitle.length || memoForm.title.length} / 60 Chars (Optimal: 50-60)
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder={`Default: ${memoForm.title || "WHY WE DITCHED WORDPRESS FOR NEXT.JS 14"}`}
                      value={memoForm.metaTitle}
                      onChange={(e) => setMemoForm({ ...memoForm, metaTitle: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black font-bold focus:outline-none focus:bg-white text-xs"
                    />
                    <div className="w-full bg-neutral-200 h-1.5 mt-1 border border-neutral-300 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          (memoForm.metaTitle.length || memoForm.title.length) > 60
                            ? "bg-accent-red"
                            : "bg-emerald-500"
                        }`}
                        style={{
                          width: `${Math.min(100, ((memoForm.metaTitle.length || memoForm.title.length) / 60) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="font-sans text-[11px] text-neutral-500 mt-1">
                      Leave empty to automatically use article headline. Appended with &quot; | CodeClovers Agency&quot;.
                    </p>
                  </div>

                  {/* SEO Meta Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold uppercase">
                        SEO Meta Description (SERP Snippet &amp; LLM Abstract)
                      </label>
                      <span
                        className={`text-[11px] font-bold ${
                          (memoForm.metaDescription.length || memoForm.subtitle.length) > 160
                            ? "text-accent-red"
                            : (memoForm.metaDescription.length || memoForm.subtitle.length) >= 120
                            ? "text-emerald-600"
                            : "text-neutral-500"
                        }`}
                      >
                        {memoForm.metaDescription.length || memoForm.subtitle.length} / 160 Chars (Optimal: 120-160)
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder={`Default: ${memoForm.subtitle || memoForm.executiveSummary || "Short executive synopsis of the article..."}`}
                      value={memoForm.metaDescription}
                      onChange={(e) => setMemoForm({ ...memoForm, metaDescription: e.target.value })}
                      className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black font-medium focus:outline-none focus:bg-white text-xs"
                    />
                    <div className="w-full bg-neutral-200 h-1.5 mt-1 border border-neutral-300 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          (memoForm.metaDescription.length || memoForm.subtitle.length) > 160
                            ? "bg-accent-red"
                            : "bg-emerald-500"
                        }`}
                        style={{
                          width: `${Math.min(100, ((memoForm.metaDescription.length || memoForm.subtitle.length) / 160) * 100)}%`,
                        }}
                      />
                    </div>
                    <p className="font-sans text-[11px] text-neutral-500 mt-1">
                      Direct summary crawled by search spiders and indexed by Perplexity/ChatGPT AI overviews.
                    </p>
                  </div>

                  {/* Focus Keywords & Canonical */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-1 uppercase">Focus Target Keywords (Comma-Separated)</label>
                      <input
                        type="text"
                        placeholder="Next.js 14, Web Architecture, Edge RSC"
                        value={memoForm.focusKeywords}
                        onChange={(e) => setMemoForm({ ...memoForm, focusKeywords: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1 uppercase">Canonical URL Override</label>
                      <input
                        type="text"
                        placeholder={`https://codeclovers.dev/journal/${memoForm.slug || "memo-slug"}`}
                        value={memoForm.canonicalUrl}
                        onChange={(e) => setMemoForm({ ...memoForm, canonicalUrl: e.target.value })}
                        className="w-full p-2.5 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Real-Time Google Search SERP Simulator Preview */}
                  <div className="pt-3 border-t-2 border-dashed border-neutral-300">
                    <span className="font-black uppercase text-xs block mb-2 text-neutral-700">
                      // LIVE GOOGLE SEARCH SERP SNIPPET PREVIEW:
                    </span>
                    <div className="p-4 bg-white border-2 border-ink-black shadow-brut-xs space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-accent-yellow border border-ink-black flex items-center justify-center font-black text-[9px]">
                          🍀
                        </div>
                        <div className="font-sans text-xs text-neutral-800 leading-tight">
                          <span className="font-medium">CodeClovers</span>
                          <span className="text-neutral-400 mx-1">›</span>
                          <span className="text-neutral-500">journal</span>
                          <span className="text-neutral-400 mx-1">›</span>
                          <span className="text-neutral-500">{memoForm.slug || "memo-slug"}</span>
                        </div>
                      </div>
                      <div className="font-sans font-medium text-blue-700 hover:underline cursor-pointer text-base sm:text-lg leading-snug">
                        {memoForm.metaTitle || memoForm.title || "Article Headline"} | CodeClovers Agency
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal line-clamp-2">
                        {memoForm.metaDescription || memoForm.subtitle || memoForm.executiveSummary || "WordPress powers 40% of the web, but for high-growth platforms, PHP database locks quietly destroy conversion rates. Here is the technical audit."}
                      </p>
                    </div>
                  </div>

                  {/* Generative Engine Optimization (GEO) / AEO Citation Simulator */}
                  <div className="pt-2">
                    <span className="font-black uppercase text-xs block mb-2 text-neutral-700">
                      // GENERATIVE ENGINE CITATION SIMULATOR (AEO / GEO / PERPLEXITY AI):
                    </span>
                    <div className="p-4 bg-neutral-900 text-white border-2 border-ink-black shadow-brut-xs space-y-2 max-w-2xl">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-700 pb-2">
                        <span className="flex items-center gap-1.5 text-accent-yellow font-bold">
                          <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
                          AI Overview Answer Citation
                        </span>
                        <span>Structured Schema: TechArticle</span>
                      </div>
                      <p className="font-sans text-xs text-neutral-200 leading-relaxed">
                        &ldquo;According to architectural benchmarks by <strong className="text-accent-yellow">CodeClovers</strong> in <em className="text-white">&apos;{memoForm.title || "Why We Ditched WordPress"}&apos;</em>, migrating from legacy monoliths to Next.js 14 Streaming Server Components reduced global TTFB to 140ms and guaranteed zero hydration layout shift.&rdquo;
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-mono text-[10px]">
                        <span className="px-2 py-0.5 bg-neutral-800 text-accent-teal border border-neutral-700">
                          [1] codeclovers.dev/journal/{memoForm.slug || "memo-slug"}
                        </span>
                        <span className="text-emerald-400 font-bold">✓ Speakable Verified</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: 👁️ LIVE ARTICLE PREVIEW */}
              {memoComposerTab === "preview" && (
                <div className="bg-[#F7F5EE] border-2 border-ink-black p-5 sm:p-8 space-y-6 shadow-inner">
                  {/* Article Hero Preview */}
                  <div className="space-y-3 pb-6 border-b-2 border-ink-black">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="bg-accent-yellow px-2 py-0.5 border border-ink-black font-black">
                        {memoForm.category}
                      </span>
                      <span className="text-neutral-500 font-bold">{memoForm.readTime}</span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-600 font-mono">
                        {new Date().toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        }).toUpperCase()}
                      </span>
                    </div>

                    <h1 className="font-headline font-black text-2xl sm:text-3xl uppercase leading-tight tracking-tight">
                      {memoForm.title || "UNTITLED MEMO HEADLINE"}
                    </h1>

                    {memoForm.subtitle && (
                      <p className="text-neutral-600 font-sans text-sm sm:text-base leading-relaxed">
                        {memoForm.subtitle}
                      </p>
                    )}

                    {/* Author Attribution Card */}
                    <div className="flex items-center gap-3 pt-3">
                      <div className="w-10 h-10 bg-accent-teal border-2 border-ink-black flex items-center justify-center font-mono font-black text-sm">
                        {memoForm.authorName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="font-mono text-xs">
                        <div className="font-black text-ink-black">{memoForm.authorName}</div>
                        <div className="text-neutral-500 text-[11px]">
                          {memoForm.authorRole} • {memoForm.authorHandle}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                    <div className="bg-white border-2 border-ink-black p-3.5 shadow-[3px_3px_0px_#000000]">
                      <div className="text-[10px] font-mono text-neutral-500 font-bold uppercase">
                        {memoForm.metricLabel1 || "SPEED SLA"}
                      </div>
                      <div className="text-2xl font-headline font-black text-emerald-700 mt-0.5">
                        {memoForm.metricValue1 || "100/100"}
                      </div>
                    </div>
                    <div className="bg-white border-2 border-ink-black p-3.5 shadow-[3px_3px_0px_#000000]">
                      <div className="text-[10px] font-mono text-neutral-500 font-bold uppercase">
                        {memoForm.metricLabel2 || "OUTCOME"}
                      </div>
                      <div className="text-2xl font-headline font-black text-accent-red mt-0.5">
                        {memoForm.metricValue2 || "+100%"}
                      </div>
                    </div>
                  </div>

                  {/* Executive Summary Box */}
                  {memoForm.executiveSummary && (
                    <div className="bg-white border-2 border-ink-black p-4 shadow-[4px_4px_0px_#000000] space-y-2">
                      <div className="text-xs font-mono font-black uppercase text-accent-red flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4" />
                        Executive Architectural Summary
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                        {memoForm.executiveSummary}
                      </p>
                    </div>
                  )}

                  {/* Key Takeaways */}
                  {(memoForm.takeaway1 || memoForm.takeaway2 || memoForm.takeaway3) && (
                    <div className="bg-[#FFE600]/20 border-2 border-ink-black p-4 space-y-2">
                      <div className="font-mono text-xs font-black uppercase flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-ink-black" />
                        Core Engineering Takeaways
                      </div>
                      <ul className="space-y-1 text-xs font-mono text-neutral-800">
                        {memoForm.takeaway1 && <li>• {memoForm.takeaway1}</li>}
                        {memoForm.takeaway2 && <li>• {memoForm.takeaway2}</li>}
                        {memoForm.takeaway3 && <li>• {memoForm.takeaway3}</li>}
                      </ul>
                    </div>
                  )}

                  {/* Section Content */}
                  <div className="bg-white border-2 border-ink-black p-5 space-y-4">
                    <h2 className="font-headline font-black text-lg uppercase pb-2 border-b-2 border-neutral-200">
                      {memoForm.sectionHeading}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed font-sans">
                      {memoForm.sectionContent}
                    </p>

                    {/* Styled Code Block */}
                    {memoForm.codeSnippet && (
                      <div className="border-2 border-ink-black overflow-hidden shadow-[3px_3px_0px_#000000]">
                        <div className="bg-neutral-800 text-neutral-300 px-3 py-1.5 font-mono text-xs flex items-center justify-between border-b border-neutral-700">
                          <span className="font-bold">{memoForm.codeFilename}</span>
                          <span className="text-[10px] bg-neutral-700 px-1.5 py-0.2 uppercase">
                            {memoForm.codeLanguage}
                          </span>
                        </div>
                        <pre className="p-3 bg-neutral-950 text-emerald-400 font-mono text-xs overflow-x-auto">
                          <code>{memoForm.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {/* Callout Box */}
                    {memoForm.calloutBody && (
                      <div
                        className={`p-3.5 border-2 border-ink-black space-y-1 ${
                          memoForm.calloutType === "pro-tip"
                            ? "bg-accent-yellow/30"
                            : memoForm.calloutType === "warning"
                            ? "bg-accent-red/20"
                            : "bg-accent-teal/20"
                        }`}
                      >
                        <div className="font-mono text-xs font-black uppercase flex items-center gap-1.5">
                          {memoForm.calloutType === "warning" ? (
                            <AlertTriangle className="w-4 h-4 text-accent-red" />
                          ) : (
                            <Info className="w-4 h-4 text-ink-black" />
                          )}
                          {memoForm.calloutTitle || "SYSTEM ADVISORY"}
                        </div>
                        <p className="text-xs text-neutral-700">{memoForm.calloutBody}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t-2 border-neutral-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsMemoStudioOpen(false)}
                  className="px-4 py-2 border border-ink-black font-mono font-bold text-xs uppercase hover:bg-neutral-100"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  {memoComposerTab !== "preview" ? (
                    <button
                      type="button"
                      onClick={() => setMemoComposerTab("preview")}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-ink-black font-mono font-bold text-xs uppercase flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setMemoComposerTab("content")}
                      className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-ink-black font-mono font-bold text-xs uppercase"
                    >
                      &larr; Back to Editor
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    {memoFormId ? "Save Changes" : "Commit to Journal"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL B: ADD / EDIT FAQ ITEM                                          */}
      {/* ===================================================================== */}
      {isFaqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-lg w-full shadow-[8px_8px_0px_#000000] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <h3 className="font-headline font-black text-xl uppercase">
                {editingFaqId ? "Edit FAQ Item" : "Create New FAQ"}
              </h3>
              <button
                onClick={() => setIsFaqModalOpen(false)}
                className="p-1 border border-ink-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block font-bold mb-1">QUESTION *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How fast can you deliver a custom Next.js website?"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">ANSWER *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Detail the exact process, timeline, or engineering guarantee..."
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">TARGET PAGE</label>
                  <select
                    value={faqForm.targetPage}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, targetPage: e.target.value as FaqTargetPage })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                  >
                    <option value="HOME">HOME PAGE</option>
                    <option value="ABOUT">ABOUT PAGE</option>
                    <option value="PLANS">PLANS PAGE</option>
                    <option value="ALL">GLOBAL / ALL</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">CATEGORY</label>
                  <select
                    value={faqForm.category}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, category: e.target.value as FaqCategory })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                  >
                    <option value="GENERAL">GENERAL PROCESS</option>
                    <option value="PRICING">PRICING & SPRINT</option>
                    <option value="ENGINEERING">ENGINEERING & SPEED</option>
                    <option value="OWNERSHIP">100% IP OWNERSHIP</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">HIGHLIGHT BADGE</label>
                  <input
                    type="text"
                    placeholder="2-4 WEEK SPRINTS"
                    value={faqForm.highlightBadge}
                    onChange={(e) => setFaqForm({ ...faqForm, highlightBadge: e.target.value })}
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">STATUS</label>
                  <select
                    value={faqForm.status}
                    onChange={(e) =>
                      setFaqForm({ ...faqForm, status: e.target.value as FaqStatus })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (VISIBLE)</option>
                    <option value="HIDDEN">HIDDEN (DRAFT)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
                  className="px-3 py-1.5 border border-ink-black font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-black uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL C: ADD / EDIT CLIENT TESTIMONIAL                                */}
      {/* ===================================================================== */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-lg w-full shadow-[8px_8px_0px_#000000] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <h3 className="font-headline font-black text-xl uppercase">
                {editingReviewId ? "Edit Testimonial" : "Register Client Testimonial"}
              </h3>
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="p-1 border border-ink-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">CLIENT NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Jenkins"
                    value={reviewForm.clientName}
                    onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">COMPANY *</label>
                  <input
                    type="text"
                    required
                    placeholder="GridFlow Systems"
                    value={reviewForm.company}
                    onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">ROLE / TITLE</label>
                  <input
                    type="text"
                    placeholder="VP of Engineering"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">STAR RATING (1 - 5)</label>
                  <select
                    value={reviewForm.rating}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                  >
                    <option value="5">★★★★★ 5 Stars</option>
                    <option value="4">★★★★☆ 4 Stars</option>
                    <option value="3">★★★☆☆ 3 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">CLIENT QUOTE *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="CodeClovers rebuilt our developer documentation in Next.js 14. Global LCP dropped to 0.19s..."
                  value={reviewForm.quote}
                  onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">CONTRACT HASH / ID</label>
                  <input
                    type="text"
                    placeholder="CLV-4091"
                    value={reviewForm.contractId}
                    onChange={(e) => setReviewForm({ ...reviewForm, contractId: e.target.value })}
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white uppercase font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">ROI METRIC TAG</label>
                  <input
                    type="text"
                    placeholder="+340% CONVERSION"
                    value={reviewForm.metricBadge}
                    onChange={(e) => setReviewForm({ ...reviewForm, metricBadge: e.target.value })}
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white uppercase font-bold text-accent-red"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verifiedCheck"
                  checked={reviewForm.verified}
                  onChange={(e) => setReviewForm({ ...reviewForm, verified: e.target.checked })}
                  className="w-4 h-4 accent-ink-black"
                />
                <label htmlFor="verifiedCheck" className="font-bold cursor-pointer">
                  Mark as Verified Enterprise Client Review
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-3 py-1.5 border border-ink-black font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-black uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL D: VIEW INQUIRY DETAILS                                         */}
      {/* ===================================================================== */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-2xl w-full shadow-[8px_8px_0px_#000000] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black bg-accent-yellow px-2 py-0.5 border border-ink-black">
                  {selectedInquiry.id}
                </span>
                <h3 className="font-headline font-black text-xl uppercase">
                  Lead Inspection & Triage
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1 border border-ink-black hover:bg-accent-red hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F7F5EE] p-3 border border-ink-black text-xs font-mono">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Client Name</span>
                <span className="font-bold">{selectedInquiry.name}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Company</span>
                <span className="font-bold">{selectedInquiry.company}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Budget</span>
                <span className="font-black text-emerald-700">{selectedInquiry.budget}</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Timeline</span>
                <span className="font-bold">{selectedInquiry.timeline}</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-white border border-neutral-300 px-2.5 py-1">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                <span className="font-bold">{selectedInquiry.email}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedInquiry.email);
                    showToast("Email Copied", selectedInquiry.email);
                  }}
                  className="ml-1 text-neutral-400 hover:text-ink-black"
                  title="Copy email"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              {selectedInquiry.phone && (
                <div className="flex items-center gap-1.5 bg-white border border-neutral-300 px-2.5 py-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-bold">{selectedInquiry.phone}</span>
                </div>
              )}

              <div className="flex items-center gap-1.5 bg-white border border-neutral-300 px-2.5 py-1">
                <span className="text-neutral-500 font-bold">TARGET:</span>
                <span className="font-bold">{selectedInquiry.service}</span>
              </div>
            </div>

            {/* Inquiry Message */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500">
                CLIENT BRIEF / PROBLEM STATEMENT:
              </span>
              <div className="p-3 bg-neutral-50 border-2 border-ink-black text-xs font-sans leading-relaxed text-neutral-800">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Change Pills */}
            <div className="space-y-1.5 pt-2 border-t border-neutral-200">
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 block">
                TRANSITION STATUS PILL:
              </span>
              <div className="flex flex-wrap gap-2">
                {(["NEW", "REVIEW", "SCHEDULED", "WON", "ARCHIVED"] as InquiryStatus[]).map((st) => {
                  const cfg = INQUIRY_STATUS_CONFIG[st];
                  const isCurrent = selectedInquiry.status === st;
                  return (
                    <button
                      key={st}
                      onClick={() => updateInquiryStatus(selectedInquiry.id, st)}
                      className={`px-3 py-1 text-xs font-mono font-black uppercase border-2 transition-all ${
                        isCurrent
                          ? `${cfg.bg} ${cfg.text} ${cfg.border} shadow-[2px_2px_0px_#000000]`
                          : "bg-white text-neutral-600 border-neutral-300 hover:border-ink-black"
                      }`}
                    >
                      {cfg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Reply Simulation */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              <span className="text-[10px] font-mono font-bold uppercase text-neutral-500 flex items-center justify-between">
                <span>QUICK ARCHITECT RESPONSE TRANSMISSION:</span>
                <span className="text-accent-red font-bold">4-HOUR SLA GUARANTEED</span>
              </span>
              <textarea
                rows={3}
                placeholder="Type response notes or architectural proposal outline to transmit to client..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black text-xs font-mono focus:outline-none focus:bg-white"
              />
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setReplyText(
                      `Hi ${selectedInquiry.name},\n\nWe have reviewed your project requirements for ${selectedInquiry.service} at CodeClovers. We guarantee 100/100 Lighthouse performance and can begin sprint kickoff within your timeline. When is a good time for a 15-minute technical alignment call?\n\nBest regards,\nMarcus Vance // CodeClovers`
                    );
                  }}
                  className="text-[10px] font-mono underline font-bold text-neutral-600 hover:text-ink-black"
                >
                  Load Template
                </button>
                <button
                  onClick={() => {
                    updateInquiryStatus(selectedInquiry.id, "SCHEDULED");
                    showToast(
                      "Proposal Transmitted",
                      `Dispatched response to ${selectedInquiry.email}. Status set to SCHEDULED.`
                    );
                    setSelectedInquiry(null);
                    setReplyText("");
                  }}
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Response
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL E: REGISTER NEW LEAD                                            */}
      {/* ===================================================================== */}
      {isNewInquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-lg w-full shadow-[8px_8px_0px_#000000] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <h3 className="font-headline font-black text-xl uppercase">
                Register New Enterprise Inbound Lead
              </h3>
              <button
                onClick={() => setIsNewInquiryModalOpen(false)}
                className="p-1 border border-ink-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInquiry} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block font-bold mb-1">CLIENT FULL NAME *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newInquiryForm.name}
                  onChange={(e) =>
                    setNewInquiryForm({ ...newInquiryForm, name: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">CORPORATE EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@gridflow.io"
                    value={newInquiryForm.email}
                    onChange={(e) =>
                      setNewInquiryForm({ ...newInquiryForm, email: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">COMPANY NAME</label>
                  <input
                    type="text"
                    placeholder="GridFlow Systems"
                    value={newInquiryForm.company}
                    onChange={(e) =>
                      setNewInquiryForm({ ...newInquiryForm, company: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">SERVICE TARGET</label>
                  <select
                    value={newInquiryForm.service}
                    onChange={(e) =>
                      setNewInquiryForm({ ...newInquiryForm, service: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  >
                    <option value="Next.js 14 Web App">Next.js 14 Web App</option>
                    <option value="UI/UX Design System">UI/UX Design System</option>
                    <option value="Full-Stack Node.js">Full-Stack Node.js</option>
                    <option value="Technical SEO Overhaul">Technical SEO Overhaul</option>
                    <option value="Continuous Retained SLA">Continuous Retained SLA</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">BUDGET BRACKET</label>
                  <select
                    value={newInquiryForm.budget}
                    onChange={(e) =>
                      setNewInquiryForm({ ...newInquiryForm, budget: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  >
                    <option value="$5K - $10K">$5K - $10K</option>
                    <option value="$10K - $25K">$10K - $25K</option>
                    <option value="$25K+ Custom">$25K+ Custom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">PROJECT SCOPE & OBJECTIVES</label>
                <textarea
                  rows={3}
                  placeholder="Detail key architectural requirements, technical obstacles, and conversion goals..."
                  value={newInquiryForm.message}
                  onChange={(e) =>
                    setNewInquiryForm({ ...newInquiryForm, message: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsNewInquiryModalOpen(false)}
                  className="px-3 py-1.5 border border-ink-black font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-black uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL F: ADD NEW SHOWCASE PROJECT                                     */}
      {/* ===================================================================== */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-lg w-full shadow-[8px_8px_0px_#000000] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <h3 className="font-headline font-black text-xl uppercase">
                Add Showcase Project
              </h3>
              <button
                onClick={() => setIsNewProjectModalOpen(false)}
                className="p-1 border border-ink-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Telemetry"
                    value={newProjectForm.title}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, title: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">CLIENT NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="Apex Dynamics Inc"
                    value={newProjectForm.client}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, client: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">CATEGORY</label>
                  <input
                    type="text"
                    placeholder="FINTECH / CLOUD"
                    value={newProjectForm.category}
                    onChange={(e) =>
                      setNewProjectForm({ ...newProjectForm, category: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white uppercase"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">METRIC HIGHLIGHT</label>
                  <input
                    type="text"
                    placeholder="+340% Conversion"
                    value={newProjectForm.metricHighlight}
                    onChange={(e) =>
                      setNewProjectForm({
                        ...newProjectForm,
                        metricHighlight: e.target.value,
                      })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">TECH STACK (COMMA SEPARATED)</label>
                <input
                  type="text"
                  placeholder="Next.js 14, TypeScript, Tailwind CSS, Redis"
                  value={newProjectForm.techStack}
                  onChange={(e) =>
                    setNewProjectForm({ ...newProjectForm, techStack: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">SHORT BRIEF</label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of engineering challenge and solution..."
                  value={newProjectForm.description}
                  onChange={(e) =>
                    setNewProjectForm({ ...newProjectForm, description: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="px-3 py-1.5 border border-ink-black font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-black uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL G: EDIT PLAN PRICING                                            */}
      {/* ===================================================================== */}
      {isPriceEditModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-sm w-full shadow-[8px_8px_0px_#000000] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b-2 border-ink-black">
              <h3 className="font-headline font-black text-lg uppercase">
                Modify Plan Pricing
              </h3>
              <button
                onClick={() => setIsPriceEditModalOpen(false)}
                className="p-1 border border-ink-black hover:bg-neutral-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditPriceSubmit} className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase block">Selected Tier</span>
                <span className="font-headline font-black text-base">{editingPlan.name}</span>
              </div>

              <div>
                <label className="block font-bold mb-1">PRICE DISPLAY STRING</label>
                <input
                  type="text"
                  required
                  placeholder="$4,499"
                  value={tempPriceInput}
                  onChange={(e) => setTempPriceInput(e.target.value)}
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black text-sm font-bold focus:outline-none focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsPriceEditModalOpen(false)}
                  className="px-3 py-1.5 border border-ink-black font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-black uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Update Price
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. FLOATING TOAST NOTIFICATION STACK                                  */}
      {/* ===================================================================== */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto p-3.5 border-2 border-ink-black shadow-[4px_4px_0px_#000000] flex items-start gap-3 transition-all animate-in slide-in-from-bottom-2
              ${
                toast.type === "success"
                  ? "bg-accent-yellow text-ink-black"
                  : toast.type === "warning"
                  ? "bg-accent-red text-white"
                  : "bg-white text-ink-black"
              }
            `}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-ink-black stroke-[2.5]" />
            ) : toast.type === "warning" ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-white stroke-[2.5]" />
            ) : (
              <Sparkles className="w-5 h-5 flex-shrink-0 text-accent-teal stroke-[2.5]" />
            )}

            <div className="flex-1">
              <div className="font-mono text-xs font-black uppercase">{toast.title}</div>
              {toast.description && (
                <div
                  className={`text-[11px] font-sans mt-0.5 ${
                    toast.type === "warning" ? "text-neutral-100" : "text-neutral-700"
                  }`}
                >
                  {toast.description}
                </div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-0.5 hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
