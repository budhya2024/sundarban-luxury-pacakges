"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { CheckCircle2, Trash2, Sparkles, X } from "lucide-react";
import {
  AdminTourPackage,
  AdminBooking,
  AdminHotelRoom,
  AdminMenuItem,
  AdminInquiry,
  AdminContactCard,
  AdminContactGeneralInfo,
  AdminPageContent,
  AdminPageSection,
  AdminGlobalAlertBanner,
  AdminFaqItem,
  AdminTestimonialItem,
  AdminGalleryItem,
  initialAdminPackages,
  initialAdminBookings,
  initialAdminRooms,
  initialAdminMenuItems,
  initialAdminInquiries,
  initialAdminContactCards,
  initialAdminContactGeneralInfo,
  initialAdminPages,
  initialAdminAlertBanner,
  initialAdminFaqs,
  initialAdminTestimonials,
  initialAdminGallery,
} from "@/lib/admin-data";
import { BlogPost, blogPosts as defaultBlogPosts } from "@/lib/blog-data";

interface AdminContextType {
  packages: AdminTourPackage[];
  bookings: AdminBooking[];
  rooms: AdminHotelRoom[];
  menuItems: AdminMenuItem[];
  inquiries: AdminInquiry[];
  contactCards: AdminContactCard[];
  contactGeneralInfo: AdminContactGeneralInfo;
  blogPostsList: BlogPost[];
  pageContents: AdminPageContent[];
  globalAlertBanner: AdminGlobalAlertBanner;
  faqs: AdminFaqItem[];
  testimonials: AdminTestimonialItem[];
  galleryItems: AdminGalleryItem[];

  // Package Actions
  addPackage: (pkg: Omit<AdminTourPackage, "id">) => void;
  updatePackage: (id: string, pkg: Partial<AdminTourPackage>) => void;
  deletePackage: (id: string) => void;

  // Booking Actions
  addBooking: (booking: Omit<AdminBooking, "id" | "bookingCode" | "createdAt"> | AdminBooking) => Promise<void> | void;
  updateBookingStatus: (id: string, status: AdminBooking["bookingStatus"], paymentStatus?: AdminBooking["paymentStatus"], paidAmount?: number) => Promise<void> | void;
  deleteBooking: (id: string) => Promise<void> | void;
  refreshBookings: () => Promise<void>;

  // Hotel Room Actions
  updateRoom: (id: string, room: Partial<AdminHotelRoom>) => Promise<void> | void;
  addRoom: (room: Omit<AdminHotelRoom, "id">) => Promise<void> | void;
  deleteRoom: (id: string) => Promise<void> | void;

  // Menu Actions
  addMenuItem: (item: Omit<AdminMenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<AdminMenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // Inquiry Actions
  addInquiry: (inq: Omit<AdminInquiry, "id" | "date">) => Promise<void> | void;
  updateInquiryStatus: (id: string, status: AdminInquiry["status"]) => Promise<void> | void;
  deleteInquiry: (id: string) => Promise<void> | void;
  convertInquiryToBooking: (inquiryId: string, bookingData?: Partial<AdminBooking>) => void;

  // Contact Us Page Actions
  addContactCard: (card: Omit<AdminContactCard, "id">) => Promise<void> | void;
  updateContactCard: (id: string, card: Partial<AdminContactCard>) => Promise<void> | void;
  deleteContactCard: (id: string) => Promise<void> | void;
  updateContactGeneralInfo: (info: Partial<AdminContactGeneralInfo>) => Promise<void> | void;

  // Blog Post Actions
  addBlogPost: (post: BlogPost) => Promise<void> | void;
  updateBlogPost: (slug: string, post: Partial<BlogPost>) => Promise<void> | void;
  deleteBlogPost: (slug: string) => Promise<void> | void;

  // Page-wise Content & Alert Actions
  updatePageHero: (pageKey: string, heroData: { heroTitle?: string; heroSubtitle?: string; heroBadge?: string; heroBackgroundImage?: string; metaDescription?: string }) => void;
  addPageSection: (pageKey: string, section: Omit<AdminPageSection, "id">) => void;
  updatePageSection: (pageKey: string, sectionId: string, section: Partial<AdminPageSection>) => void;
  deletePageSection: (pageKey: string, sectionId: string) => void;
  updateGlobalAlertBanner: (banner: Partial<AdminGlobalAlertBanner>) => void;

  // FAQ Actions
  addFaq: (faq: Omit<AdminFaqItem, "id">) => void;
  updateFaq: (id: string, faq: Partial<AdminFaqItem>) => void;
  deleteFaq: (id: string) => void;

  // Testimonial Actions
  addTestimonial: (item: Omit<AdminTestimonialItem, "id">) => void;
  updateTestimonial: (id: string, item: Partial<AdminTestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Gallery Actions
  addGalleryItem: (item: Omit<AdminGalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<AdminGalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Toast notification system
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<AdminTourPackage[]>(initialAdminPackages);
  const [bookings, setBookings] = useState<AdminBooking[]>(initialAdminBookings);
  const [rooms, setRooms] = useState<AdminHotelRoom[]>(initialAdminRooms);
  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>(initialAdminMenuItems);
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(initialAdminInquiries);
  const [contactCards, setContactCards] = useState<AdminContactCard[]>(initialAdminContactCards);
  const [contactGeneralInfo, setContactGeneralInfo] = useState<AdminContactGeneralInfo>(initialAdminContactGeneralInfo);
  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>(defaultBlogPosts);
  const [pageContents, setPageContents] = useState<AdminPageContent[]>(initialAdminPages);
  const [globalAlertBanner, setGlobalAlertBanner] = useState<AdminGlobalAlertBanner>(initialAdminAlertBanner);
  const [faqs, setFaqs] = useState<AdminFaqItem[]>(initialAdminFaqs);
  const [testimonials, setTestimonials] = useState<AdminTestimonialItem[]>(initialAdminTestimonials);
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>(initialAdminGallery);

  // Restore client-side cached data safely after initial hydration
  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem("sb_admin_bookings");
      if (savedBookings) setBookings(JSON.parse(savedBookings));
      const savedPackages = localStorage.getItem("sb_admin_packages");
      if (savedPackages) setPackages(JSON.parse(savedPackages));
      const savedRooms = localStorage.getItem("sb_admin_rooms");
      if (savedRooms) setRooms(JSON.parse(savedRooms));
      const savedInquiries = localStorage.getItem("sb_admin_inquiries");
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));
      const savedMenu = localStorage.getItem("sb_admin_menu");
      if (savedMenu) setMenuItems(JSON.parse(savedMenu));
      const savedContactCards = localStorage.getItem("sb_admin_contact_cards");
      if (savedContactCards) setContactCards(JSON.parse(savedContactCards));
      const savedContactGeneral = localStorage.getItem("sb_admin_contact_general");
      if (savedContactGeneral) setContactGeneralInfo(JSON.parse(savedContactGeneral));
      const savedBlog = localStorage.getItem("sb_admin_blog_posts");
      if (savedBlog) setBlogPostsList(JSON.parse(savedBlog));
      const savedPages = localStorage.getItem("sb_admin_page_contents");
      if (savedPages) setPageContents(JSON.parse(savedPages));
      const savedBanner = localStorage.getItem("sb_admin_alert_banner");
      if (savedBanner) setGlobalAlertBanner(JSON.parse(savedBanner));
      const savedFaqs = localStorage.getItem("sb_admin_faqs");
      if (savedFaqs) setFaqs(JSON.parse(savedFaqs));
      const savedTestimonials = localStorage.getItem("sb_admin_testimonials");
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
      const savedGallery = localStorage.getItem("sb_admin_gallery");
      if (savedGallery) setGalleryItems(JSON.parse(savedGallery));
    } catch {
      // ignore
    }
  }, []);

  const [toastInfo, setToastInfo] = useState<{ message: string; type: "success" | "danger" | "info" } | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string, type?: "success" | "danger" | "info") => {
    let detectedType = type;
    if (!detectedType) {
      const lower = msg.toLowerCase();
      if (
        lower.includes("delete") ||
        lower.includes("removed") ||
        lower.includes("deleted") ||
        lower.includes("remove")
      ) {
        detectedType = "danger";
      } else if (
        lower.includes("save") ||
        lower.includes("added") ||
        lower.includes("created") ||
        lower.includes("updated") ||
        lower.includes("published") ||
        lower.includes("duplicated")
      ) {
        detectedType = "success";
      } else {
        detectedType = "info";
      }
    }

    setToastInfo({ message: msg, type: detectedType });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastInfo(null);
    }, 4000);
  };

  // Synchronize live data from Neon database backend APIs
  useEffect(() => {
    // 1. Live Blog Posts
    fetch("/api/admin/blog")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.posts) && data.posts.length > 0) {
          setBlogPostsList(data.posts);
        }
      })
      .catch(() => {});

    // 2. Live Inquiries & Bookings Notification polling
    const fetchInquiries = () => {
      fetch("/api/admin/inquiries")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.success && Array.isArray(data.inquiries)) {
            setInquiries(data.inquiries);
          }
        })
        .catch(() => {});
    };

    const fetchBookings = () => {
      fetch("/api/admin/bookings")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.success && Array.isArray(data.bookings)) {
            setBookings(data.bookings);
            if (typeof window !== "undefined") {
              localStorage.setItem("sb_admin_bookings", JSON.stringify(data.bookings));
            }
          }
        })
        .catch(() => {});
    };

    const fetchRooms = () => {
      fetch("/api/admin/hotel/rooms")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.success && Array.isArray(data.rooms) && data.rooms.length > 0) {
            setRooms(data.rooms);
          }
        })
        .catch(() => {});
    };

    fetchInquiries();
    fetchBookings();
    fetchRooms();
    // Poll every 30 seconds for live new inquiries, bookings, and rooms updates
    const pollInterval = setInterval(() => {
      fetchInquiries();
      fetchBookings();
      fetchRooms();
    }, 30000);
    const handleFocus = () => {
      fetchInquiries();
      fetchBookings();
      fetchRooms();
    };
    window.addEventListener("focus", handleFocus);

    // 3. Live Contact Information & Branch Cards
    fetch("/api/admin/contact")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success) {
          if (data.generalInfo) {
            setContactGeneralInfo((prev) => ({ ...prev, ...data.generalInfo }));
          }
          if (Array.isArray(data.contactCards) && data.contactCards.length > 0) {
            setContactCards(data.contactCards);
          }
        }
      })
      .catch(() => {});

    // 4. Live Tour Packages (ordered by created_at ascending)
    fetch("/api/packages?sort=createdAt_asc&status=all")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.packages) && data.packages.length > 0) {
          setPackages(data.packages);
        }
      })
      .catch(() => {});

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);


  // Sync to local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_packages", JSON.stringify(packages));
    }
  }, [packages]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_rooms", JSON.stringify(rooms));
    }
  }, [rooms]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_menu", JSON.stringify(menuItems));
    }
  }, [menuItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_inquiries", JSON.stringify(inquiries));
    }
  }, [inquiries]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_contact_cards", JSON.stringify(contactCards));
    }
  }, [contactCards]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_contact_general", JSON.stringify(contactGeneralInfo));
    }
  }, [contactGeneralInfo]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_blog_posts", JSON.stringify(blogPostsList));
    }
  }, [blogPostsList]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_page_contents", JSON.stringify(pageContents));
    }
  }, [pageContents]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_alert_banner", JSON.stringify(globalAlertBanner));
    }
  }, [globalAlertBanner]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_faqs", JSON.stringify(faqs));
    }
  }, [faqs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_testimonials", JSON.stringify(testimonials));
    }
  }, [testimonials]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sb_admin_gallery", JSON.stringify(galleryItems));
    }
  }, [galleryItems]);

  // Package CRUD
  const addPackage = async (pkg: Omit<AdminTourPackage, "id">) => {
    // Generate temporary ID for optimistic UI
    const tempId = `pkg-${Date.now()}`;
    const optimisticPkg: AdminTourPackage = {
      ...pkg,
      id: tempId,
    };
    setPackages((prev) => [...prev, optimisticPkg]);

    try {
      const res = await fetch("/api/admin/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pkg),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data?.package) {
        setPackages((prev) =>
          prev.map((p) => (p.id === tempId ? data.package : p))
        );
        showToast(`Package "${data.package.name}" created successfully.`, "success");
      } else {
        showToast(data?.error || `Package "${optimisticPkg.name}" created locally.`, "info");
      }
    } catch (err) {
      console.error("Failed to persist package to server:", err);
      showToast(`Package "${optimisticPkg.name}" created locally.`, "info");
    }
  };

  const updatePackage = async (id: string, pkg: Partial<AdminTourPackage>) => {
    setPackages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...pkg } : item))
    );

    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pkg),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data?.package) {
        setPackages((prev) =>
          prev.map((item) => (item.id === id ? data.package : item))
        );
        showToast("Package updated successfully.", "success");
      } else {
        showToast(data?.error || "Package updated.", "info");
      }
    } catch (err) {
      console.error("Failed to update package on server:", err);
      showToast("Package updated locally.");
    }
  };

  const deletePackage = async (id: string) => {
    setPackages((prev) => prev.filter((item) => item.id !== id));

    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast("Package and storage assets deleted.", "danger");
      } else {
        showToast(data?.error || "Package deleted.", "info");
      }
    } catch (err) {
      console.error("Failed to delete package on server:", err);
      showToast("Package deleted.");
    }
  };


  // Booking CRUD
  const addBooking = async (
    booking: Omit<AdminBooking, "id" | "bookingCode" | "createdAt"> | AdminBooking
  ) => {
    // If already has id & bookingCode (e.g. returned from server API), just merge
    if ("id" in booking && "bookingCode" in booking) {
      setBookings((prev) => {
        const exists = prev.some((b) => b.id === booking.id);
        return exists ? prev : [booking as AdminBooking, ...prev];
      });
      return;
    }

    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data.booking) {
        setBookings((prev) => [data.booking, ...prev]);
        showToast(`Booking ${data.booking.bookingCode} created successfully.`);
      } else {
        showToast(data?.error || "Failed to create booking.", "danger");
      }
    } catch (err) {
      console.error("Failed to create booking:", err);
      // Fallback optimistic local insertion if network error
      const code = `SB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date().toISOString().replace("T", " ").substring(0, 16);
      const newBooking: AdminBooking = {
        ...booking,
        id: `bk-${Date.now()}`,
        bookingCode: code,
        createdAt: now,
      };
      setBookings((prev) => [newBooking, ...prev]);
      showToast(`Booking ${code} saved locally.`);
    }
  };

  const refreshBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
          if (typeof window !== "undefined") {
            localStorage.setItem("sb_admin_bookings", JSON.stringify(data.bookings));
          }
        }
      }
    } catch (e) {
      console.error("Failed to refresh bookings:", e);
    }
  };

  const updateBookingStatus = async (
    id: string,
    status: AdminBooking["bookingStatus"],
    paymentStatus?: AdminBooking["paymentStatus"],
    paidAmount?: number
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id || b.id === `b-${id}` || b.bookingCode === id
          ? {
            ...b,
            bookingStatus: status,
            paymentStatus: paymentStatus || b.paymentStatus,
            paidAmount: paidAmount !== undefined ? paidAmount : b.paidAmount,
          }
          : b
      )
    );

    try {
      const res = await fetch(`/api/admin/bookings/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingStatus: status,
          paymentStatus,
          paidAmount,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast(`Reservation #${id.substring(0, 8)} updated to ${status}.`);
        refreshBookings();
      } else {
        showToast(data?.error || "Failed to update reservation on server.", "info");
      }
    } catch (err) {
      console.error("Failed to update booking on server:", err);
      showToast(`Reservation #${id.substring(0, 8)} updated locally.`);
    }
  };

  const deleteBooking = async (id: string) => {
    setBookings((prev) =>
      prev.filter((b) => b.id !== id && b.id !== `b-${id}` && b.bookingCode !== id)
    );

    try {
      const res = await fetch(`/api/admin/bookings/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast("Booking reservation deleted.");
        refreshBookings();
      } else {
        showToast(data?.error || "Failed to delete booking on server.", "info");
      }
    } catch (err) {
      console.error("Failed to delete booking on server:", err);
      showToast("Booking reservation deleted locally.");
    }
  };

  // Hotel Room Actions
  const updateRoom = async (id: string, room: Partial<AdminHotelRoom>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...room } : r))
    );

    try {
      const res = await fetch(`/api/admin/hotel/rooms/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast("Room inventory updated.");
      } else {
        showToast(data?.error || "Failed to update room.", "info");
      }
    } catch (err) {
      console.error("Failed to update room on server:", err);
      showToast("Room updated locally.");
    }
  };

  const addRoom = async (room: Omit<AdminHotelRoom, "id">) => {
    try {
      const res = await fetch("/api/admin/hotel/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(room),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data.room) {
        setRooms((prev) => [...prev, data.room]);
        showToast(`Room category "${data.room.name}" added.`);
      } else {
        showToast(data?.error || "Failed to create room.", "danger");
      }
    } catch (err) {
      console.error("Failed to create room:", err);
      const newRoom: AdminHotelRoom = {
        ...room,
        id: `rm-${Date.now()}`,
      };
      setRooms((prev) => [...prev, newRoom]);
      showToast(`Room category "${newRoom.name}" added locally.`);
    }
  };

  const deleteRoom = async (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));

    try {
      const res = await fetch(`/api/admin/hotel/rooms/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        showToast("Room category deleted.");
      } else {
        showToast(data?.error || "Failed to delete room on server.", "info");
      }
    } catch (err) {
      console.error("Failed to delete room:", err);
      showToast("Room deleted locally.");
    }
  };

  // Menu Actions
  const addMenuItem = (item: Omit<AdminMenuItem, "id">) => {
    const newItem: AdminMenuItem = {
      ...item,
      id: `menu-${Date.now()}`,
    };
    setMenuItems((prev) => [...prev, newItem]);
    showToast(`Dish "${newItem.name}" added to special menu.`);
  };

  const updateMenuItem = (id: string, item: Partial<AdminMenuItem>) => {
    setMenuItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...item } : m))
    );
    showToast("Dish details updated.");
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
    showToast("Dish removed from menu.");
  };

  // Inquiry Actions
  const addInquiry = async (inq: Omit<AdminInquiry, "id" | "date">) => {
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);
    const tempId = `inq-${Date.now()}`;
    const newInquiry: AdminInquiry = {
      ...inq,
      id: tempId,
      date: now,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast("New inquiry received and saved to admin dashboard.");

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inq),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.inquiry) {
          setInquiries((prev) =>
            prev.map((i) =>
              i.id === tempId
                ? { ...i, ...data.inquiry, date: data.inquiry.createdAt ? new Date(data.inquiry.createdAt).toISOString().replace("T", " ").substring(0, 16) : now }
                : i
            )
          );
        }
      }
    } catch (e) {
      console.error("Failed to sync inquiry to server:", e);
    }
  };

  const updateInquiryStatus = async (id: string, status: AdminInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry marked as ${status}.`);

    try {
      await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
    } catch (e) {
      console.error("Failed to update inquiry status on server:", e);
    }
  };

  const deleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast("Inquiry lead deleted.");

    try {
      await fetch(`/api/admin/inquiries/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete inquiry on server:", e);
    }
  };

  // Contact Page Actions
  const addContactCard = async (card: Omit<AdminContactCard, "id">) => {
    const tempId = `card-${Date.now()}`;
    const newCard: AdminContactCard = {
      ...card,
      id: tempId,
    };
    setContactCards((prev) => [...prev, newCard]);
    showToast(`Contact card "${newCard.title}" created successfully.`);

    try {
      const res = await fetch("/api/admin/contact/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.card) {
          setContactCards((prev) =>
            prev.map((c) => (c.id === tempId ? data.card : c))
          );
        }
      }
    } catch (e) {
      console.error("Failed to save contact card to server:", e);
    }
  };

  const updateContactCard = async (id: string, card: Partial<AdminContactCard>) => {
    setContactCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...card } : c))
    );
    showToast("Contact card updated.");

    try {
      const res = await fetch(`/api/admin/contact/cards/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.card) {
          setContactCards((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...data.card } : c))
          );
        }
      }
    } catch (e) {
      console.error("Failed to update contact card on server:", e);
    }
  };

  const deleteContactCard = async (id: string) => {
    setContactCards((prev) => prev.filter((c) => c.id !== id));
    showToast("Contact card removed.");

    try {
      await fetch(`/api/admin/contact/cards/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete contact card on server:", e);
    }
  };

  const updateContactGeneralInfo = async (info: Partial<AdminContactGeneralInfo>) => {
    setContactGeneralInfo((prev) => ({ ...prev, ...info }));
    showToast("Contact settings updated successfully.");

    try {
      await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
    } catch (e) {
      console.error("Failed to update contact settings on server:", e);
    }
  };

  // Blog Post Actions
  const addBlogPost = async (post: BlogPost) => {
    setBlogPostsList((prev) => [post, ...prev]);
    showToast(`Article "${post.title}" published successfully.`);

    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.post) {
          setBlogPostsList((prev) =>
            prev.map((p) => (p.slug === post.slug ? { ...p, ...data.post } : p))
          );
        }
      }
    } catch (e) {
      console.error("Failed to save blog post to server:", e);
    }
  };

  const updateBlogPost = async (slug: string, post: Partial<BlogPost>) => {
    setBlogPostsList((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, ...post } : p))
    );
    showToast("Article updated successfully.");

    try {
      const res = await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.post) {
          setBlogPostsList((prev) =>
            prev.map((p) => (p.slug === (post.slug || slug) ? { ...p, ...data.post } : p))
          );
        }
      }
    } catch (e) {
      console.error("Failed to update blog post on server:", e);
    }
  };

  const deleteBlogPost = async (slug: string) => {
    setBlogPostsList((prev) => prev.filter((p) => p.slug !== slug));
    showToast("Article deleted from blog.");

    try {
      await fetch(`/api/admin/blog/${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.error("Failed to delete blog post on server:", e);
    }
  };

  // Inquiry Conversion
  const convertInquiryToBooking = (inquiryId: string, bookingData?: Partial<AdminBooking>) => {
    const inq = inquiries.find((i) => i.id === inquiryId);
    if (!inq) return;

    const code = `SB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);

    const newBooking: AdminBooking = {
      id: `bk-${Date.now()}`,
      bookingCode: code,
      guestName: inq.name,
      email: inq.email,
      phone: inq.phone,
      packageOrRoom: bookingData?.packageOrRoom || inq.subject || "Sundarban Luxury Expedition",
      type: bookingData?.type || "Tour Package",
      travelDate: bookingData?.travelDate || "2026-10-15",
      guestsCount: bookingData?.guestsCount || 2,
      totalAmount: bookingData?.totalAmount || 9998,
      paidAmount: bookingData?.paidAmount || 0,
      paymentStatus: bookingData?.paymentStatus || "Unpaid",
      bookingStatus: "Confirmed",
      createdAt: now,
      specialRequests: `Converted from Lead Inquiry: "${inq.message}". ${bookingData?.specialRequests || ""}`,
    };

    setBookings((prev) => [newBooking, ...prev]);
    setInquiries((prev) =>
      prev.map((i) => (i.id === inquiryId ? { ...i, status: "Converted" as const } : i))
    );
    showToast(`Inquiry converted to Confirmed Booking (${code})!`);
  };

  // Page-wise Content & Section Actions
  const updatePageHero = (
    pageKey: string,
    heroData: { heroTitle?: string; heroSubtitle?: string; heroBadge?: string; heroBackgroundImage?: string; metaDescription?: string }
  ) => {
    setPageContents((prev) => {
      const updated = prev.map((p) => (p.pageKey === pageKey ? { ...p, ...heroData } : p));
      try {
        localStorage.setItem("sb_admin_page_contents", JSON.stringify(updated));
      } catch {}
      return updated;
    });
    showToast("Page header & background photo updated successfully.");
  };

  const addPageSection = (pageKey: string, section: Omit<AdminPageSection, "id">) => {
    const newSection: AdminPageSection = {
      ...section,
      id: `sec-${Date.now()}`,
    };
    setPageContents((prev) =>
      prev.map((p) =>
        p.pageKey === pageKey
          ? { ...p, sections: [...p.sections, newSection] }
          : p
      )
    );
    showToast(`New content section "${newSection.title}" created.`);
  };

  const updatePageSection = (
    pageKey: string,
    sectionId: string,
    section: Partial<AdminPageSection>
  ) => {
    setPageContents((prev) =>
      prev.map((p) =>
        p.pageKey === pageKey
          ? {
            ...p,
            sections: p.sections.map((s) =>
              s.id === sectionId ? { ...s, ...section } : s
            ),
          }
          : p
      )
    );
    showToast("Section content updated.");
  };

  const deletePageSection = (pageKey: string, sectionId: string) => {
    setPageContents((prev) =>
      prev.map((p) =>
        p.pageKey === pageKey
          ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) }
          : p
      )
    );
    showToast("Section removed.");
  };

  const updateGlobalAlertBanner = (banner: Partial<AdminGlobalAlertBanner>) => {
    setGlobalAlertBanner((prev) => ({ ...prev, ...banner }));
    showToast("Global Alert & Red Notification Banner updated.");
  };

  // FAQ CRUD
  const addFaq = (faq: Omit<AdminFaqItem, "id">) => {
    const newFaq: AdminFaqItem = {
      ...faq,
      id: `faq-${Date.now()}`,
    };
    setFaqs((prev) => [...prev, newFaq]);
    showToast("FAQ question created successfully.");
  };

  const updateFaq = (id: string, faq: Partial<AdminFaqItem>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...faq } : f))
    );
    showToast("FAQ updated.");
  };

  const deleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    showToast("FAQ removed.");
  };

  // Testimonial CRUD
  const addTestimonial = (item: Omit<AdminTestimonialItem, "id">) => {
    const newTestimonial: AdminTestimonialItem = {
      ...item,
      id: `test-${Date.now()}`,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
    showToast(`Testimonial by "${newTestimonial.name}" created.`);
  };

  const updateTestimonial = (id: string, item: Partial<AdminTestimonialItem>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...item } : t))
    );
    showToast("Testimonial updated.");
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast("Testimonial deleted.");
  };

  // Gallery CRUD
  const addGalleryItem = (item: Omit<AdminGalleryItem, "id">) => {
    const newItem: AdminGalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGalleryItems((prev) => [...prev, newItem]);
    showToast(`Gallery photo "${newItem.title}" added.`);
  };

  const updateGalleryItem = (id: string, item: Partial<AdminGalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...item } : g))
    );
    showToast("Gallery item updated.");
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((g) => g.id !== id));
    showToast("Photo removed from gallery.");
  };

  return (
    <AdminContext.Provider
      value={{
        packages,
        bookings,
        rooms,
        menuItems,
        inquiries,
        contactCards,
        contactGeneralInfo,
        blogPostsList,
        pageContents,
        globalAlertBanner,
        faqs,
        testimonials,
        galleryItems,
        addPackage,
        updatePackage,
        deletePackage,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        refreshBookings,
        updateRoom,
        addRoom,
        deleteRoom,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        convertInquiryToBooking,
        addContactCard,
        updateContactCard,
        deleteContactCard,
        updateContactGeneralInfo,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        updatePageHero,
        addPageSection,
        updatePageSection,
        deletePageSection,
        updateGlobalAlertBanner,
        addFaq,
        updateFaq,
        deleteFaq,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        toastMessage: toastInfo?.message || null,
        showToast,
      }}
    >
      {children}

      {/* Top Site Global Admin Toast Notification */}
      {toastInfo && (
        <div className="fixed top-5 right-5 sm:right-8 z-[99999] max-w-sm sm:max-w-md animate-in fade-in slide-in-from-top-5 duration-300 pointer-events-auto">
          <div
            className={`flex items-center gap-3 p-3.5 rounded-md shadow-2xl border text-xs font-bold transition-all ${
              toastInfo.type === "danger"
                ? "bg-slate-900 text-rose-100 border-rose-600/80 shadow-rose-950/50"
                : toastInfo.type === "success"
                ? "bg-slate-900 text-emerald-100 border-emerald-500/80 shadow-emerald-950/50"
                : "bg-slate-900 text-slate-100 border-blue-500/80 shadow-blue-950/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-xs ${
                toastInfo.type === "danger"
                  ? "bg-rose-600 text-white"
                  : toastInfo.type === "success"
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {toastInfo.type === "danger" ? (
                <Trash2 className="w-4 h-4" />
              ) : toastInfo.type === "success" ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    toastInfo.type === "danger"
                      ? "bg-rose-500 animate-pulse"
                      : toastInfo.type === "success"
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-blue-400 animate-pulse"
                  }`}
                />
                <span className="font-extrabold uppercase text-[10px] tracking-wider text-slate-400">
                  {toastInfo.type === "danger"
                    ? "Deleted Action"
                    : toastInfo.type === "success"
                    ? "Saved & Success"
                    : "Admin System"}
                </span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5 truncate">{toastInfo.message}</p>
            </div>

            <button
              onClick={() => setToastInfo(null)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
              title="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
