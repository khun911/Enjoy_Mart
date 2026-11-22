"use client";

import React from "react";
import AdminDashboard from "./AdminDashboard";
import { ClientFeedback } from "@/types";

interface AdminFeedbackDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  feedbacks: ClientFeedback[];
}

export default function AdminFeedbackDashboard({
  isOpen,
  onClose,
}: AdminFeedbackDashboardProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-7xl max-h-[96vh] flex flex-col overflow-hidden">
        <AdminDashboard isModal={true} onClose={onClose} />
      </div>
    </div>
  );
}
