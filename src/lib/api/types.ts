/**
 * RFC 7807 Problem Details and REST API Type Definitions
 */

export interface RFC7807Problem {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance?: string;
  invalidParams?: Array<{ name: string; reason: string }>;
  timestamp: string;
  code?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  source: "mongodb" | "mock-fallback";
  data?: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    pages?: number;
    [key: string]: unknown;
  };
  error?: RFC7807Problem;
  timestamp: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
