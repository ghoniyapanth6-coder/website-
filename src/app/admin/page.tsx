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
  Sliders,
  DollarSign,
  Gauge,
  Sparkles,
  ChevronLeft,
} from "lucide-react";

import {
  INITIAL_INQUIRIES,
  INITIAL_JOURNAL_MEMOS,
  INITIAL_SERVICES,
  INITIAL_PLANS,
  INITIAL_PROJECTS,
  INITIAL_CLIENT_REVIEWS,
  INITIAL_AGENCY_SETTINGS,
  INITIAL_KPI_STATS,
  INQUIRY_STATUS_CONFIG,
  MEMO_STATUS_CONFIG,
  PLAN_STATUS_CONFIG,
  SERVICE_STATUS_CONFIG,
  AdminInquiry,
  AdminJournalMemo,
  AdminService,
  AdminPlan,
  AdminPortfolioProject,
  AdminClientReview,
  AdminAgencySettings,
  AdminKpiStats,
  InquiryStatus,
  MemoStatus,
  PlanStatus,
  ServiceStatus,
} from "@/data/adminMockData";

type AdminTab =
  | "overview"
  | "inquiries"
  | "memos"
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
  const [services, setServices] = useState<AdminService[]>(INITIAL_SERVICES);
  const [plans, setPlans] = useState<AdminPlan[]>(INITIAL_PLANS);
  const [projects, setProjects] = useState<AdminPortfolioProject[]>(INITIAL_PROJECTS);
  const [reviews, setReviews] = useState<AdminClientReview[]>(INITIAL_CLIENT_REVIEWS);
  const [agencySettings, setAgencySettings] = useState<AdminAgencySettings>(INITIAL_AGENCY_SETTINGS);
  const [kpiStats, setKpiStats] = useState<AdminKpiStats>(INITIAL_KPI_STATS);

  // Global & Tab Filters
  const [globalSearch, setGlobalSearch] = useState("");
  const [inquirySearch, setInquirySearch] = useState("");
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("ALL");
  const [inquiryPriorityFilter, setInquiryPriorityFilter] = useState<string>("ALL");

  const [memoSearch, setMemoSearch] = useState("");
  const [memoCategoryFilter, setMemoCategoryFilter] = useState<string>("ALL");
  const [memoStatusFilter, setMemoStatusFilter] = useState<string>("ALL");

  const [servicesViewMode, setServicesViewMode] = useState<"cards" | "table">("cards");
  const [projectFilterCategory, setProjectFilterCategory] = useState<string>("ALL");

  // Modals State
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiry | null>(null);
  const [replyText, setReplyText] = useState("");

  const [isNewInquiryModalOpen, setIsNewInquiryModalOpen] = useState(false);
  const [isNewMemoModalOpen, setIsNewMemoModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isPriceEditModalOpen, setIsPriceEditModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AdminPlan | null>(null);
  const [tempPriceInput, setTempPriceInput] = useState("");

  // Forms State
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

  const [newMemoForm, setNewMemoForm] = useState({
    title: "",
    category: "ARCHITECTURE",
    readTime: "6 MIN READ",
    tags: "Next.js 14, Architecture, React 19",
    excerpt: "",
    authorName: "Marcus Vance",
    status: "PUBLISHED" as MemoStatus,
  });

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

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: "success" | "info" | "warning" = "success") => {
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
      const matchesPriority =
        inquiryPriorityFilter === "ALL" || inq.priority === inquiryPriorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [inquiries, inquirySearch, inquiryStatusFilter, inquiryPriorityFilter]);

  // Filtered Memos
  const filteredMemos = useMemo(() => {
    return memos.filter((memo) => {
      const matchesSearch =
        memo.title.toLowerCase().includes(memoSearch.toLowerCase()) ||
        memo.excerpt.toLowerCase().includes(memoSearch.toLowerCase()) ||
        memo.tags.some((t) => t.toLowerCase().includes(memoSearch.toLowerCase()));

      const matchesCategory =
        memoCategoryFilter === "ALL" || memo.category === memoCategoryFilter;
      const matchesStatus =
        memoStatusFilter === "ALL" || memo.status === memoStatusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [memos, memoSearch, memoCategoryFilter, memoStatusFilter]);

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
    showToast(
      `Inquiry status updated to ${newStatus}`,
      `Lead #${id} moved to ${newStatus} state.`
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    if (selectedInquiry?.id === id) setSelectedInquiry(null);
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

  // Handlers for Memos
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

  const handleCreateMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoForm.title || !newMemoForm.excerpt) {
      showToast("Validation Error", "Title and excerpt are required.", "warning");
      return;
    }
    const id = `MEMO-00${memos.length + 1}`;
    const slug = newMemoForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const tags = newMemoForm.tags.split(",").map((t) => t.trim()).filter(Boolean);

    const newMemo: AdminJournalMemo = {
      id,
      title: newMemoForm.title.toUpperCase(),
      slug,
      category: newMemoForm.category,
      readTime: newMemoForm.readTime,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).toUpperCase(),
      excerpt: newMemoForm.excerpt,
      tags: tags.length > 0 ? tags : ["Architecture", "Next.js 14"],
      status: newMemoForm.status,
      views: 0,
      featured: false,
      authorName: newMemoForm.authorName,
    };

    setMemos([newMemo, ...memos]);
    setIsNewMemoModalOpen(false);
    setNewMemoForm({
      title: "",
      category: "ARCHITECTURE",
      readTime: "6 MIN READ",
      tags: "Next.js 14, Architecture, React 19",
      excerpt: "",
      authorName: "Marcus Vance",
      status: "PUBLISHED",
    });
    showToast("Journal Memo Created", `"${newMemo.title}" added to CMS state.`);
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

  // Handlers for Reviews
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
              {currentTime || "2026-11-19 16:40:00 UTC"}
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
      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT CONTAINER                          */}
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
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-ink-black stroke-[2.5]" : "text-neutral-600"}`} />
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
              {/* Welcome Banner with Swiss Striping */}
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
                      onClick={() => setIsNewMemoModalOpen(true)}
                      className="px-4 py-2 bg-white hover:bg-neutral-100 border-2 border-ink-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      Draft Memo
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
                            {/* ID / Date */}
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

                            {/* Client / Company */}
                            <td className="py-3 px-4 border-r border-neutral-200">
                              <div className="font-bold text-sm">{inq.name}</div>
                              <div className="text-neutral-500 font-mono text-[11px]">
                                {inq.company} • {inq.email}
                              </div>
                            </td>

                            {/* Service */}
                            <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                              <span className="bg-neutral-100 px-2 py-0.5 border border-neutral-300 font-bold">
                                {inq.service}
                              </span>
                            </td>

                            {/* Budget / Timeline */}
                            <td className="py-3 px-4 border-r border-neutral-200 font-mono">
                              <div className="font-black text-ink-black">{inq.budget}</div>
                              <div className="text-[10px] text-neutral-500">{inq.timeline}</div>
                            </td>

                            {/* Priority */}
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

                            {/* Status */}
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

                            {/* Actions */}
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
          {/* TAB 3: 📝 JOURNAL & MEMOS                                         */}
          {/* ================================================================= */}
          {activeTab === "memos" && (
            <div className="space-y-6">
              {/* Header & Controls */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl font-headline font-black uppercase">
                        Journal & Technical Memos
                      </h1>
                      <span className="font-mono text-xs bg-accent-teal px-2 py-0.5 border border-ink-black font-black">
                        {memos.length} ARTICLES
                      </span>
                    </div>
                    <p className="text-neutral-600 text-xs mt-1">
                      Manage published thought leadership, architectural benchmarks, and SEO ranking assets.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsNewMemoModalOpen(true)}
                    className="self-start md:self-auto px-4 py-2 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-mono font-black text-xs uppercase shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Create Article
                  </button>
                </div>

                {/* Filters Row */}
                <div className="mt-5 pt-4 border-t-2 border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search title, excerpt, tags..."
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

              {/* Memos List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <p className="text-xs text-neutral-600 line-clamp-3">
                          {memo.excerpt}
                        </p>

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

                        <Link
                          href={`/journal/${memo.slug}`}
                          target="_blank"
                          className="font-bold text-neutral-700 hover:text-ink-black flex items-center gap-1 hover:underline"
                        >
                          <span>Read</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: ⚡ SERVICES                                                */}
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
          {/* TAB 5: 💼 PRICING PLANS & CAPACITY SLOTS                          */}
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
          {/* TAB 6: 🏆 PROJECTS PORTFOLIO                                      */}
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
          {/* TAB 7: 💬 CLIENT TESTIMONIALS                                     */}
          {/* ================================================================= */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-white border-2 border-ink-black p-5 shadow-[4px_4px_0px_#000000]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

                  <div className="flex items-center gap-2 font-mono text-xs bg-[#F7F5EE] border border-ink-black px-3 py-1.5">
                    <Star className="w-4 h-4 fill-accent-yellow text-ink-black" />
                    <span className="font-black">5.0 / 5.0 RATING</span>
                    <span className="text-neutral-500">| 100% Client Satisfaction</span>
                  </div>
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
                    <div className="mt-5 pt-3 border-t-2 border-neutral-200 flex items-center gap-3">
                      <div
                        className={`w-9 h-9 border-2 border-ink-black flex items-center justify-center font-mono font-black text-xs ${
                          rev.avatarBg || "bg-accent-yellow text-ink-black"
                        }`}
                      >
                        {rev.avatarInitials}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-xs">{rev.clientName}</div>
                        <div className="text-[10px] font-mono text-neutral-500">
                          {rev.role}, {rev.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* TAB 8: ⚙️ AGENCY SETTINGS                                         */}
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
      {/* 3. MODALS SYSTEM                                                      */}
      {/* ===================================================================== */}

      {/* MODAL: View Inquiry Details */}
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

      {/* MODAL: Register New Lead */}
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

      {/* MODAL: Create New Journal Memo */}
      {isNewMemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-black/60 backdrop-blur-xs">
          <div className="bg-white border-2 border-ink-black max-w-lg w-full shadow-[8px_8px_0px_#000000] p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b-2 border-ink-black">
              <h3 className="font-headline font-black text-xl uppercase">
                Publish Technical Memo / Journal Entry
              </h3>
              <button
                onClick={() => setIsNewMemoModalOpen(false)}
                className="p-1 border border-ink-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMemo} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block font-bold mb-1">ARTICLE TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ZERO-JAVASCRIPT HYDRATION IN NEXT.JS 14"
                  value={newMemoForm.title}
                  onChange={(e) =>
                    setNewMemoForm({ ...newMemoForm, title: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">CATEGORY</label>
                  <select
                    value={newMemoForm.category}
                    onChange={(e) =>
                      setNewMemoForm({ ...newMemoForm, category: e.target.value })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
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
                  <label className="block font-bold mb-1">INITIAL STATUS</label>
                  <select
                    value={newMemoForm.status}
                    onChange={(e) =>
                      setNewMemoForm({
                        ...newMemoForm,
                        status: e.target.value as MemoStatus,
                      })
                    }
                    className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                  >
                    <option value="PUBLISHED">PUBLISHED (LIVE)</option>
                    <option value="DRAFT">DRAFT (UNLISTED)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">TAGS (COMMA SEPARATED)</label>
                <input
                  type="text"
                  placeholder="Next.js 14, Web Vitals, Performance"
                  value={newMemoForm.tags}
                  onChange={(e) =>
                    setNewMemoForm({ ...newMemoForm, tags: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">EXCERPT / TEASER SUMMARY *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="A concise, high-contrast engineering thesis explaining the findings..."
                  value={newMemoForm.excerpt}
                  onChange={(e) =>
                    setNewMemoForm({ ...newMemoForm, excerpt: e.target.value })
                  }
                  className="w-full p-2 bg-[#F7F5EE] border-2 border-ink-black focus:outline-none focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setIsNewMemoModalOpen(false)}
                  className="px-3 py-1.5 border border-ink-black font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-accent-yellow hover:bg-[#ffe000] border-2 border-ink-black font-black uppercase shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
                >
                  Commit Memo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add New Portfolio Project */}
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

      {/* MODAL: Edit Plan Price */}
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
