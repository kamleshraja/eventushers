"use client";

import { API_BASE_URL } from "@/lib/api";

export interface ContactMessageItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  eventCategory?: string;
  crewSize?: string;
  eventDate?: string;
  message: string;
  status: "Pending" | "Replied" | "Archived";
  createdAt: string;
}

export const CONTACT_MESSAGES_STORAGE_KEY = "eventushers_contact_messages";
export const CONTACT_MESSAGES_UPDATE_EVENT = "eventushers_contact_messages_updated";

const INITIAL_DEMO_MESSAGES: ContactMessageItem[] = [
  {
    id: "msg-101",
    fullName: "Kamau Njuguna",
    email: "kamau@innovatekenya.co.ke",
    phone: "+254 712 345 678",
    eventCategory: "Corporate Summit",
    crewSize: "20-50 Staff & Security",
    eventDate: "2026-08-15",
    message: "Inquiring about 15 hostesses and 5 VIP security bouncers for our annual tech summit at KICC Nairobi.",
    status: "Pending",
    createdAt: "Today, 11:20 AM",
  },
  {
    id: "msg-102",
    fullName: "Amina Hassan",
    email: "amina@mombasagalas.com",
    phone: "+254 733 987 654",
    eventCategory: "Gala & Award Ceremony",
    crewSize: "5-20 Crew Members",
    eventDate: "2026-08-28",
    message: "Looking for 10 hostess ushers dressed in formal black gowns for an evening award ceremony at Nyali Beach Resort.",
    status: "Replied",
    createdAt: "Yesterday, 03:45 PM",
  },
  {
    id: "msg-103",
    fullName: "Otieno Ochieng",
    email: "otieno@kisumuexpos.org",
    phone: "+254 722 555 123",
    eventCategory: "Trade Expo & Exhibition",
    crewSize: "20-50 Staff & Security",
    eventDate: "2026-09-05",
    message: "We need registration desk clerks and badge scanners for a 3-day expo at Grand Royal Hotel Kisumu.",
    status: "Pending",
    createdAt: "Jul 24, 2026",
  },
];

export function getStoredContactMessages(): ContactMessageItem[] {
  if (typeof window === "undefined") return INITIAL_DEMO_MESSAGES;
  try {
    const raw = localStorage.getItem(CONTACT_MESSAGES_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn("Failed to read contact messages from localStorage", e);
  }
  return INITIAL_DEMO_MESSAGES;
}

export function saveContactMessage(msg: Omit<ContactMessageItem, "id" | "createdAt" | "status">): boolean {
  const newMsg: ContactMessageItem = {
    ...msg,
    id: `msg-${Date.now()}`,
    status: "Pending",
    createdAt: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  try {
    const existing = getStoredContactMessages();
    const updated = [newMsg, ...existing];
    if (typeof window !== "undefined") {
      localStorage.setItem(CONTACT_MESSAGES_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event(CONTACT_MESSAGES_UPDATE_EVENT));
    }

    // Try posting to Express API if available
    fetch(`${API_BASE_URL}/hire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "contact_inquiry",
        fullName: msg.fullName,
        email: msg.email,
        phone: msg.phone,
        eventType: msg.eventCategory,
        crewCount: msg.crewSize,
        eventDate: msg.eventDate,
        notes: msg.message,
      }),
    }).catch(() => {});

    return true;
  } catch (e) {
    console.error("Failed to save contact message", e);
    return false;
  }
}
