"use client";

import { useMemo } from "react";

export const usePagination = <T>(items: T[], page: number, limit: number) => {
  return useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return {
      total: items.length,
      pages: Math.max(Math.ceil(items.length / limit), 1),
      pageItems: items.slice(start, end)
    };
  }, [items, page, limit]);
};
