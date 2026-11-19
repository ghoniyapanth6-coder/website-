"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Clock,
  Wifi,
  ShieldCheck,
  Mail,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Activity,
  Globe,
  Radio,
  Compass,
} from "lucide-react";

interface NodeLocation {
  id: "sf" | "london" | "tokyo";
  name: string;
  code: string;
  city: string;
  district: string;
  coords: string;
  lat: number;
  lng: number;
  // SVG coordinates on our 600x320 canvas
  svgX: number;
  svgY: number;
  timezone: string;
  tzLabel: string;
  basePing: number;
  role: string;
  status: string;
  accentColor: string;
}

const NODES: NodeLocation[] = [
  {
    id: "sf",
    name: "SAN FRANCISCO HQ",
    code: "SFO-PRIMARY-01",
    city: "San Francisco, USA",
    district: "SoMa Innovation District",
    coords: "37.7749° N, 122.4194° W",
    lat: 37.7749,
    lng: -122.4194,
    svgX: 135,
    svgY: 125,
    timezone: "America/Los_Angeles",
    tzLabel: "PST / PDT (UTC-8)",
    basePing: 14,
    role: "Senior Architecture & Systems Engineering",
    status: "PRIMARY HQ // SPRINT CORE",
    accentColor: "bg-accent-yellow",
  },
  {
    id: "london",
    name: "LONDON NODE",
    code: "LON-RELAY-02",
    city: "London, UK",
    district: "Shoreditch Silicon Roundabout",
    coords: "51.5074° N, 0.1278° W",
    lat: 51.5074,
    lng: -0.1278,
    svgX: 300,
    svgY: 100,
    timezone: "Europe/London",
    tzLabel: "GMT / BST (UTC+0)",
    basePing: 24,
    role: "Design Systems & Conversion Architecture",
    status: "ACTIVE // EMEA RELAY",
    accentColor: "bg-accent-teal",
  },
  {
    id: "tokyo",
    name: "TOKYO EDGE",
    code: "TYO-EDGE-03",
    city: "Tokyo, Japan",
    district: "Shibuya Edge Corridor",
    coords: "35.6762° N, 139.6503° E",
    lat: 35.6762,
    lng: 139.6503,
    svgX: 505,
    svgY: 130,
    timezone: "Asia/Tokyo",
    tzLabel: "JST (UTC+9)",
    basePing: 46,
    role: "Edge Compute & High-Throughput Node.js",
    status: "ACTIVE // APAC GATEWAY",
    accentColor: "bg-accent-red",
  },
];

export const ContactMap: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<"sf" | "london" | "tokyo">("sf");
  const [currentTime, setCurrentTime] = useState<Record<string, string>>({});
  const [currentPing, setCurrentPing] = useState<number>(14);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [radarAngle, setRadarAngle] = useState(0);

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  // Update clock every second for all 3 nodes
  useEffect(() => {
    const updateClocks = () => {
      const times: Record<string, string> = {};
      const now = new Date();
      NODES.forEach((node) => {
        try {
          times[node.id] = new Intl.DateTimeFormat("en-US", {
            timeZone: node.timezone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(now);
        } catch {
          times[node.id] = now.toLocaleTimeString();
        }
      });
      setCurrentTime(times);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate network telemetry jitter
  useEffect(() => {
    const pingInterval = setInterval(() => {
      const jitter = Math.floor(Math.random() * 5) - 2;
      setCurrentPing(Math.max(8, activeNode.basePing + jitter));
    }, 1800);
    return () => clearInterval(pingInterval);
  }, [activeNode]);

  // Radar beam sweep animation
  useEffect(() => {
    const anim = setInterval(() => {
      setRadarAngle((prev) => (prev + 4) % 360);
    }, 50);
    return () => clearInterval(anim);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@codeclovers.dev");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <div className="w-full flex flex-col font-mono select-none">
      {/* ========================================================= */}
      {/* 1. TOP TELEMETRY HUD HEADER                               */}
      {/* ========================================================= */}
      <div className="bg-ink-black text-white p-3.5 sm:p-4 border-b-2 border-ink-black flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-black tracking-widest text-[11px] sm:text-xs uppercase text-emerald-400">
            DISPATCH NODE TELEMETRY // ONLINE
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-accent-teal" />
            <span>PING: <span className="text-white font-mono">{currentPing}ms</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-accent-yellow" />
            <span>PACKET LOSS: <span className="text-white">0.00%</span></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-accent-red" />
            <span>SLA: <span className="text-emerald-400 font-black">4-HR MAX</span></span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. INTERACTIVE NODE SELECTOR TABS                         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-3 border-b-2 border-ink-black bg-white">
        {NODES.map((node) => {
          const isActive = node.id === activeNodeId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setActiveNodeId(node.id)}
              className={`p-3 sm:p-4 text-left border-r-2 last:border-r-0 border-ink-black transition-all ${
                isActive
                  ? "bg-accent-yellow text-ink-black shadow-[inset_0_-3px_0_#000000]"
                  : "bg-paper-beige hover:bg-neutral-100 text-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-ink-black">
                  {node.id === "sf" ? "★ HQ" : "NODE"}
                </span>
                <span
                  className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 border border-ink-black ${
                    isActive ? "bg-white text-ink-black" : "bg-neutral-200 text-gray-700"
                  }`}
                >
                  {node.tzLabel.split(" ")[0]}
                </span>
              </div>
              <div className="font-display font-black text-xs sm:text-sm tracking-tight text-ink-black truncate">
                {node.name.split(" ")[0]}
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-800 mt-1">
                {currentTime[node.id] || "--:--:--"}
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 3. NEO-BRUTALIST SWISS GRID MAP (SVG CANVAS)               */}
      {/* ========================================================= */}
      <div className="relative w-full bg-[#0a0d12] text-white border-b-2 border-ink-black overflow-hidden p-4 sm:p-6 select-none">
        {/* Subtle grid background pattern */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* HUD Coordinate Crossbars / Corner Accents */}
        <div className="absolute top-2 left-2 text-[9px] font-mono text-emerald-400 font-bold tracking-widest pointer-events-none">
          + 37.7749° N // 122.4194° W
        </div>
        <div className="absolute top-2 right-2 text-[9px] font-mono text-gray-500 font-bold tracking-widest pointer-events-none">
          SWISS-GRID V2.6
        </div>
        <div className="absolute bottom-2 left-2 text-[9px] font-mono text-gray-500 font-bold tracking-widest pointer-events-none hidden sm:block">
          ENCRYPTED DISPATCH // ZERO LATENCY
        </div>
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-accent-yellow font-bold tracking-widest pointer-events-none">
          NODE: {activeNode.code}
        </div>

        {/* SVG World Architecture Map */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[2.1/1] max-h-[360px] mx-auto my-2">
          <svg
            viewBox="0 0 600 280"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Grid Lines & Crosshairs */}
            <g stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3">
              <line x1="30" y1="70" x2="570" y2="70" />
              <line x1="30" y1="140" x2="570" y2="140" />
              <line x1="30" y1="210" x2="570" y2="210" />
              <line x1="150" y1="20" x2="150" y2="260" />
              <line x1="300" y1="20" x2="300" y2="260" />
              <line x1="450" y1="20" x2="450" y2="260" />
            </g>

            {/* Stylized Neo-Brutalist Geometric Continent Silhouettes */}
            {/* North America */}
            <path
              d="M60 55 L160 55 L200 90 L170 145 L135 155 L120 185 L90 150 L65 110 Z"
              fill="#141c26"
              stroke="#2d3748"
              strokeWidth="1.5"
            />
            {/* South America */}
            <path
              d="M140 180 L185 190 L195 240 L160 270 L130 230 Z"
              fill="#141c26"
              stroke="#2d3748"
              strokeWidth="1.5"
            />
            {/* Europe */}
            <path
              d="M270 60 L350 55 L360 100 L320 120 L275 105 Z"
              fill="#141c26"
              stroke="#2d3748"
              strokeWidth="1.5"
            />
            {/* Africa */}
            <path
              d="M275 125 L345 125 L360 170 L330 240 L285 210 L270 155 Z"
              fill="#141c26"
              stroke="#2d3748"
              strokeWidth="1.5"
            />
            {/* Asia */}
            <path
              d="M365 55 L520 50 L545 100 L510 160 L450 170 L380 140 L360 95 Z"
              fill="#141c26"
              stroke="#2d3748"
              strokeWidth="1.5"
            />
            {/* Australia */}
            <path
              d="M480 200 L550 200 L540 250 L470 245 Z"
              fill="#141c26"
              stroke="#2d3748"
              strokeWidth="1.5"
            />

            {/* Geodesic Inter-Node Transmission Arcs */}
            {/* SF to London Arc */}
            <path
              d="M 135 125 Q 215 50 300 100"
              stroke="#FFE600"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-75"
            />
            {/* London to Tokyo Arc */}
            <path
              d="M 300 100 Q 400 40 505 130"
              stroke="#00C2CB"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="opacity-75"
            />
            {/* Tokyo to SF Trans-Pacific Arc */}
            <path
              d="M 505 130 Q 560 160 590 170"
              stroke="#FF3E1D"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="opacity-50"
            />
            <path
              d="M 10 170 Q 70 150 135 125"
              stroke="#FF3E1D"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className="opacity-50"
            />

            {/* Radar sweep line centered on active node */}
            <g transform={`translate(${activeNode.svgX}, ${activeNode.svgY})`}>
              <line
                x1="0"
                y1="0"
                x2={Math.cos((radarAngle * Math.PI) / 180) * 45}
                y2={Math.sin((radarAngle * Math.PI) / 180) * 45}
                stroke="#10B981"
                strokeWidth="1.5"
                opacity="0.8"
              />
              <circle
                r="45"
                fill="none"
                stroke="#10B981"
                strokeWidth="1"
                strokeDasharray="2 4"
                opacity="0.3"
              />
            </g>

            {/* Render all 3 interactive nodes */}
            {NODES.map((node) => {
              const isActive = node.id === activeNodeId;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-transform"
                  onClick={() => setActiveNodeId(node.id)}
                >
                  {/* Outer pulsing ring for active node */}
                  {isActive && (
                    <>
                      <circle
                        cx={node.svgX}
                        cy={node.svgY}
                        r="20"
                        fill="none"
                        stroke={node.id === "sf" ? "#FFE600" : node.id === "london" ? "#00C2CB" : "#FF3E1D"}
                        strokeWidth="1.5"
                        opacity="0.4"
                      >
                        <animate
                          attributeName="r"
                          values="12;28;12"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.8;0;0.8"
                          dur="2.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <circle
                        cx={node.svgX}
                        cy={node.svgY}
                        r="10"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                    </>
                  )}

                  {/* Core Node Dot */}
                  <circle
                    cx={node.svgX}
                    cy={node.svgY}
                    r={isActive ? "6" : "4.5"}
                    fill={node.id === "sf" ? "#FFE600" : node.id === "london" ? "#00C2CB" : "#FF3E1D"}
                    stroke="#000000"
                    strokeWidth="2"
                  />

                  {/* Node Label Badge */}
                  <g transform={`translate(${node.svgX + 8}, ${node.svgY - 10})`}>
                    <rect
                      x="0"
                      y="-10"
                      width={node.id === "sf" ? "68" : "58"}
                      height="16"
                      fill={isActive ? "#FFE600" : "#1e293b"}
                      stroke="#000000"
                      strokeWidth="1"
                    />
                    <text
                      x="4"
                      y="2"
                      fill={isActive ? "#000000" : "#ffffff"}
                      fontSize="9"
                      fontWeight="900"
                      fontFamily="monospace"
                    >
                      {node.id === "sf" ? "SF HQ ★" : node.id.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Status Footer on Map */}
        <div className="bg-neutral-900 border border-neutral-700 p-3 mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-black text-white">{activeNode.name}</span>
            <span className="text-gray-400 font-bold hidden sm:inline">({activeNode.coords})</span>
          </div>
          <div className="font-mono text-emerald-400 font-bold text-[11px]">
            {activeNode.status}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. STUDIO COORDINATES & DIRECT DISPATCH DOSSIER           */}
      {/* ========================================================= */}
      <div className="p-6 sm:p-8 bg-paper-beige flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-black uppercase text-accent-red tracking-wider">
              DIRECT AGENCY DIRECTIVE
            </span>
            <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 border border-ink-black shadow-brut-xs">
              CODECLOVERS CORE
            </span>
          </div>

          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black mb-2">
            {activeNode.city}
          </h3>
          <p className="font-mono text-xs font-bold uppercase text-gray-700 mb-6">
            {activeNode.district} • {activeNode.role}
          </p>

          {/* Key Direct Contact Cards */}
          <div className="space-y-3 font-mono text-xs">
            {/* Email dispatch card */}
            <div className="neo-card p-4 bg-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-none bg-accent-yellow border-2 border-ink-black flex items-center justify-center shrink-0 shadow-brut-xs">
                  <Mail className="w-4 h-4 text-ink-black" />
                </div>
                <div className="truncate">
                  <div className="text-[10px] font-black uppercase text-gray-500">
                    DIRECT INQUIRY DISPATCH
                  </div>
                  <div className="font-black text-ink-black text-xs sm:text-sm tracking-tight truncate">
                    hello@codeclovers.dev
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-3 py-1.5 border-2 border-ink-black bg-paper-beige hover:bg-accent-yellow text-ink-black font-black text-[11px] uppercase shadow-brut-xs transition-colors shrink-0 flex items-center gap-1.5"
                title="Copy Email Address"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* 4-Hour Response SLA */}
            <div className="neo-card p-4 bg-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-accent-teal border-2 border-ink-black flex items-center justify-center shrink-0 shadow-brut-xs">
                <Clock className="w-4 h-4 text-ink-black" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-gray-500">
                  GUARANTEED INQUIRY SLA
                </div>
                <div className="font-black text-ink-black text-xs sm:text-sm">
                  &lt; 4 HOURS DIRECT SENIOR TRIAGE
                </div>
              </div>
            </div>

            {/* Mutual NDA Protection */}
            <div className="neo-card p-4 bg-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-none bg-accent-red border-2 border-ink-black flex items-center justify-center shrink-0 shadow-brut-xs text-white">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase text-gray-500">
                  INTELLECTUAL PROPERTY &amp; PRIVACY
                </div>
                <div className="font-black text-ink-black text-xs sm:text-sm">
                  MUTUAL NDA EXECUTED UPON BRIEF
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Verification Callout */}
        <div className="p-3.5 bg-accent-yellow border-2 border-ink-black shadow-brut-xs">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-3.5 h-3.5 text-ink-black" />
            <span className="font-mono text-[11px] font-black uppercase text-ink-black">
              DIRECT ARCHITECT DIALOGUE
            </span>
          </div>
          <p className="font-mono text-[11px] font-bold uppercase text-ink-black leading-snug">
            All brief submissions go straight to senior engineering principals. Zero account managers, zero sales fluff.
          </p>
        </div>

        {/* Footer Hash Indicator */}
        <div className="pt-2 border-t-2 border-ink-black flex items-center justify-between text-[10px] font-black text-gray-500 uppercase">
          <span>CODECLOVERS.DEV // PRODUCTION NODE</span>
          <span>EST. 2026 // GLOBAL</span>
        </div>
      </div>
    </div>
  );
};
