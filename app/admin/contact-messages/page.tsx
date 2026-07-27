"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { 
  ContactMessageItem, 
  getStoredContactMessages, 
  CONTACT_MESSAGES_STORAGE_KEY,
  CONTACT_MESSAGES_UPDATE_EVENT 
} from "@/lib/contactMessages";
import { 
  Mail, 
  Search, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  Phone, 
  Sparkles, 
  ChevronRight, 
  X,
  Archive,
  MessageSquare
} from "lucide-react";

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessageItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const loadMessages = () => {
      setMessages(getStoredContactMessages());
    };

    loadMessages();

    window.addEventListener(CONTACT_MESSAGES_UPDATE_EVENT, loadMessages);
    window.addEventListener("storage", loadMessages);

    return () => {
      window.removeEventListener(CONTACT_MESSAGES_UPDATE_EVENT, loadMessages);
      window.removeEventListener("storage", loadMessages);
    };
  }, []);

  const saveUpdatedMessages = (updated: ContactMessageItem[]) => {
    setMessages(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(CONTACT_MESSAGES_STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const handleUpdateStatus = (id: string, newStatus: "Pending" | "Replied" | "Archived") => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
    saveUpdatedMessages(updated);
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, status: newStatus });
    }
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      const updated = messages.filter((m) => m.id !== deletingId);
      saveUpdatedMessages(updated);
      if (selectedMessage?.id === deletingId) setSelectedMessage(null);
      setDeletingId(null);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      (m.eventCategory && m.eventCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const pendingCount = messages.filter((m) => m.status === "Pending").length;
  const repliedCount = messages.filter((m) => m.status === "Replied").length;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Contact Messages Manager" subtitle="Manage inbound client inquiries and event staffing requests" />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Total Inquiries</span>
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-950">{messages.length}</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Pending Action</span>
                <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-extrabold text-slate-950">{pendingCount}</p>
                <span className="text-xs font-bold text-amber-600">Requires Reply</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Replied</span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
              <p className="text-3xl font-extrabold text-slate-950">{repliedCount}</p>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {["All", "Pending", "Replied", "Archived"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === st
                      ? "bg-slate-950 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table Listing */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden text-left">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4 pl-6">Contact Person</th>
                    <th className="p-4">Event Category</th>
                    <th className="p-4">Crew Size</th>
                    <th className="p-4">Submission Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredMessages.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-500 text-xs font-semibold">
                        No contact messages found matching your query.
                      </td>
                    </tr>
                  ) : (
                    filteredMessages.map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="font-extrabold text-slate-950 text-sm">{msg.fullName}</div>
                          <div className="text-[11px] text-slate-600 font-medium">{msg.email}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{msg.phone}</div>
                        </td>
                        <td className="p-4 font-bold text-slate-700">
                          {msg.eventCategory || "General Inquiry"}
                        </td>
                        <td className="p-4 text-slate-600">{msg.crewSize || "N/A"}</td>
                        <td className="p-4 text-slate-500 text-xs font-mono">{msg.createdAt}</td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                              msg.status === "Replied"
                                ? "bg-emerald-100 text-emerald-800"
                                : msg.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {msg.status}
                          </span>
                        </td>
                        <td className="p-4 text-right pr-6 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedMessage(msg)}
                              className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs transition-colors cursor-pointer"
                            >
                              View Inquiry
                            </button>
                            <button
                              onClick={() => setDeletingId(msg.id)}
                              className="p-2 rounded-lg bg-slate-100 hover:bg-red-500/10 text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
                              title="Delete Message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Message View Drawer / Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 text-left animate-fadeIn">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="text-xl font-extrabold text-slate-950">Inbound Contact Inquiry</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Person Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-extrabold text-slate-950">{selectedMessage.fullName}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${
                    selectedMessage.status === "Replied"
                      ? "bg-emerald-100 text-emerald-800"
                      : selectedMessage.status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {selectedMessage.status}
                </span>
              </div>
              <div className="text-xs text-slate-600 font-medium space-y-1">
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                <p><strong>Submitted:</strong> {selectedMessage.createdAt}</p>
              </div>
            </div>

            {/* Event Specs */}
            <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-800 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/50">
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-extrabold">Event Category</span>
                <span>{selectedMessage.eventCategory || "General Inquiry"}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase text-[10px] block font-extrabold">Crew Size</span>
                <span>{selectedMessage.crewSize || "N/A"}</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Message Content</label>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 font-medium leading-relaxed max-h-48 overflow-y-auto">
                {selectedMessage.message}
              </div>
            </div>

            {/* Actions / Status Toggle */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedMessage.id, "Replied")}
                  className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedMessage.id, "Pending")}
                  className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold shadow-sm transition-colors cursor-pointer"
                >
                  Mark as Pending
                </button>
              </div>

              <button
                onClick={() => setSelectedMessage(null)}
                className="px-5 py-2 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deletingId !== null}
        title="Delete Contact Inquiry?"
        message="Are you sure you want to delete this contact message? This action cannot be undone."
        confirmText="Yes, Delete Message"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
