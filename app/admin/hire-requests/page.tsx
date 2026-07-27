"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { 
  Users, 
  Search, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Briefcase,
  Eye,
  X,
  Trash2
} from "lucide-react";

interface RequestRecord {
  id: string;
  type: "hire_staff" | "join_crew";
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  crewNeeded: string;
  crewCount: string;
  location: string;
  notes: string;
  status: "pending" | "approved" | "completed" | "cancelled";
  date: string;
}

export default function AdminHireRequestsPage() {
  const [requests, setRequests] = useState<RequestRecord[]>([
    {
      id: "REQ-101",
      type: "hire_staff",
      fullName: "Wanjiru Mwangi",
      email: "wanjiru@innovateafrica.com",
      phone: "+254 712 345 678",
      eventType: "Corporate Tech Summit",
      crewNeeded: "Ushers & Hostesses",
      crewCount: "15-20",
      location: "Nairobi, Kenya",
      notes: "Need corporate-dressed hostesses for VIP check-in tables and main auditorium ushering.",
      status: "approved",
      date: "Today, 10:45 AM",
    },
    {
      id: "REQ-102",
      type: "hire_staff",
      fullName: "James Ochieng",
      email: "james@afrosoundfest.co.ke",
      phone: "+254 722 987 654",
      eventType: "Music Festival",
      crewNeeded: "Tactical Security & Bouncers",
      crewCount: "10-15",
      location: "Mombasa, Kenya",
      notes: "Urgent dispatch needed for entry gate access control and VIP barrier protection.",
      status: "pending",
      date: "Today, 08:30 AM",
    },
    {
      id: "REQ-103",
      type: "join_crew",
      fullName: "Amina Ochieng",
      email: "amina.crew@gmail.com",
      phone: "+254 733 111 222",
      eventType: "Crew Application",
      crewNeeded: "Lead Usher & Protocol Officer",
      crewCount: "Individual",
      location: "Kisumu, Kenya",
      notes: "3 years experience in corporate ushering and diplomatic seating protocol.",
      status: "pending",
      date: "Yesterday",
    },
    {
      id: "REQ-104",
      type: "hire_staff",
      fullName: "David Kimani",
      email: "david@kimanigala.com",
      phone: "+254 700 555 444",
      eventType: "Private Gala Dinner",
      crewNeeded: "VIP Hostesses",
      crewCount: "6-8",
      location: "Westlands, Nairobi",
      notes: "Formal black-tie banquet with protocol seating requirements.",
      status: "completed",
      date: "Jul 25, 2026",
    },
  ]);

  const [filterType, setFilterType] = useState<"all" | "hire_staff" | "join_crew">("all");
  const [selectedRequest, setSelectedRequest] = useState<RequestRecord | null>(null);

  const filteredRequests = requests.filter((req) => filterType === "all" || req.type === filterType);

  const handleStatusChange = (id: string, newStatus: RequestRecord["status"]) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDeleteRequest = (id: string) => {
    if (confirm("Delete this request record?")) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      if (selectedRequest?.id === id) setSelectedRequest(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader title="Staffing Orders & Applications" subtitle="Review inbound client staffing orders and crew recruitment submissions" />

        <main className="p-6 md:p-8 space-y-6 flex-1">
          
          {/* Filter Bar */}
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType("all")}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  filterType === "all"
                    ? "bg-slate-950 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                All Records ({requests.length})
              </button>
              <button
                onClick={() => setFilterType("hire_staff")}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  filterType === "hire_staff"
                    ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Client Orders
              </button>
              <button
                onClick={() => setFilterType("join_crew")}
                className={`px-5 py-2 rounded-full text-xs font-extrabold transition-all ${
                  filterType === "join_crew"
                    ? "bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md shadow-pink-500/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Crew Applications
              </button>
            </div>
          </div>

          {/* Records Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                  <tr>
                    <th className="p-4 pl-6">ID & Type</th>
                    <th className="p-4">Applicant / Client</th>
                    <th className="p-4">Event Details</th>
                    <th className="p-4">Crew Requested</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 pl-6">
                        <div>
                          <span className="font-mono font-bold text-slate-950">{req.id}</span>
                          <p className="text-[11px] font-bold text-amber-600">
                            {req.type === "hire_staff" ? "Client Hire" : "Crew Application"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <h4 className="font-bold text-slate-950">{req.fullName}</h4>
                          <p className="text-xs text-slate-500">{req.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <span className="font-semibold text-slate-900">{req.eventType}</span>
                          <p className="text-xs text-slate-500">{req.location}</p>
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-800">
                        {req.crewNeeded} ({req.crewCount})
                      </td>
                      <td className="p-4">
                        <select
                          value={req.status}
                          onChange={(e) => handleStatusChange(req.id, e.target.value as RequestRecord["status"])}
                          className={`px-3 py-1 rounded-full text-[11px] font-extrabold cursor-pointer focus:outline-hidden ${
                            req.status === "approved"
                              ? "bg-emerald-100 text-emerald-800"
                              : req.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : req.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right pr-6 space-x-2">
                        <button
                          onClick={() => setSelectedRequest(req)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-amber-500/10 text-slate-700 hover:text-amber-600 transition-colors cursor-pointer"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-red-500/10 text-slate-700 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6 animate-fadeIn text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600">{selectedRequest.id}</span>
                <h3 className="text-xl font-extrabold text-slate-950">{selectedRequest.fullName}</h3>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="p-2 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{selectedRequest.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{selectedRequest.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{selectedRequest.location}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <p className="font-extrabold text-slate-950">Event & Staff Requirements:</p>
                <p className="text-slate-600">{selectedRequest.eventType} — {selectedRequest.crewNeeded} ({selectedRequest.crewCount})</p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-1">
                <p className="font-extrabold text-slate-950">Organizer Notes / Application Summary:</p>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">{selectedRequest.notes}</p>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end border-t border-slate-200">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-6 py-2.5 rounded-full bg-slate-950 text-white font-extrabold text-xs shadow-md"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
