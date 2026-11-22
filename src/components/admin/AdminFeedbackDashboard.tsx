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
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col bg-[#f3f4f8] animate-in fade-in duration-200">
      <AdminDashboard isModal={true} onClose={onClose} />
    </div>
  );
}
