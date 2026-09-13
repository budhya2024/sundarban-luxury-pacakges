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
  addBooking: (booking: Omit<AdminBooking, "id" | "bookingCode" | "createdAt">) => void;
  updateBookingStatus: (id: string, status: AdminBooking["bookingStatus"], paymentStatus?: AdminBooking["paymentStatus"]) => void;
  deleteBooking: (id: string) => void;

  // Hotel Room Actions
  updateRoom: (id: string, room: Partial<AdminHotelRoom>) => void;
  addRoom: (room: Omit<AdminHotelRoom, "id">) => void;

  // Menu Actions
  addMenuItem: (item: Omit<AdminMenuItem, "id">) => void;
  updateMenuItem: (id: string, item: Partial<AdminMenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // Inquiry Actions
  addInquiry: (inq: Omit<AdminInquiry, "id" | "date">) => void;
  updateInquiryStatus: (id: string, status: AdminInquiry["status"]) => void;
  deleteInquiry: (id: string) => void;
  convertInquiryToBooking: (inquiryId: string, bookingData?: Partial<AdminBooking>) => void;

  // Contact Us Page Actions
  addContactCard: (card: Omit<AdminContactCard, "id">) => void;
  updateContactCard: (id: string, card: Partial<AdminContactCard>) => void;
  deleteContactCard: (id: string) => void;
  updateContactGeneralInfo: (info: Partial<AdminContactGeneralInfo>) => void;

  // Blog Post Actions
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (slug: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (slug: string) => void;

  // Page-wise Content & Alert Actions
  updatePageHero: (pageKey: string, heroData: { heroTitle?: string; heroSubtitle?: string; heroBadge?: string; metaDescription?: string }) => void;
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
  const [packages, setPackages] = useState<AdminTourPackage[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_packages");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminPackages;
  });

  const [bookings, setBookings] = useState<AdminBooking[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_bookings");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminBookings;
  });

  const [rooms, setRooms] = useState<AdminHotelRoom[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_rooms");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminRooms;
  });

  const [menuItems, setMenuItems] = useState<AdminMenuItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_menu");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminMenuItems;
  });

  const [inquiries, setInquiries] = useState<AdminInquiry[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_inquiries");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminInquiries;
  });

  const [contactCards, setContactCards] = useState<AdminContactCard[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_contact_cards");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminContactCards;
  });

  const [contactGeneralInfo, setContactGeneralInfo] = useState<AdminContactGeneralInfo>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_contact_general");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminContactGeneralInfo;
  });

  const [blogPostsList, setBlogPostsList] = useState<BlogPost[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_blog_posts");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return defaultBlogPosts;
  });

  const [pageContents, setPageContents] = useState<AdminPageContent[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_page_contents");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminPages;
  });

  const [globalAlertBanner, setGlobalAlertBanner] = useState<AdminGlobalAlertBanner>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_alert_banner");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminAlertBanner;
  });

  // FAQs
  const [faqs, setFaqs] = useState<AdminFaqItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_faqs");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminFaqs;
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<AdminTestimonialItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_testimonials");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminTestimonials;
  });

  // Gallery Items
  const [galleryItems, setGalleryItems] = useState<AdminGalleryItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sb_admin_gallery");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return initialAdminGallery;
  });

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
  const addPackage = (pkg: Omit<AdminTourPackage, "id">) => {
    const newPkg: AdminTourPackage = {
      ...pkg,
      id: `pkg-${Date.now()}`,
    };
    setPackages((prev) => [newPkg, ...prev]);
    showToast(`Package "${newPkg.name}" created successfully.`);
  };

  const updatePackage = (id: string, pkg: Partial<AdminTourPackage>) => {
    setPackages((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...pkg } : item))
    );
    showToast("Package updated successfully.");
  };

  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((item) => item.id !== id));
    showToast("Package deleted.");
  };

  // Booking CRUD
  const addBooking = (booking: Omit<AdminBooking, "id" | "bookingCode" | "createdAt">) => {
    const code = `SB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);
    const newBooking: AdminBooking = {
      ...booking,
      id: `bk-${Date.now()}`,
      bookingCode: code,
      createdAt: now,
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Booking ${code} created successfully.`);
  };

  const updateBookingStatus = (
    id: string,
    status: AdminBooking["bookingStatus"],
    paymentStatus?: AdminBooking["paymentStatus"]
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
            ...b,
            bookingStatus: status,
            paymentStatus: paymentStatus || b.paymentStatus,
          }
          : b
      )
    );
    showToast(`Reservation #${id.substring(0, 8)} updated to ${status}.`);
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    showToast("Booking reservation deleted.");
  };

  // Hotel Room Actions
  const updateRoom = (id: string, room: Partial<AdminHotelRoom>) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...room } : r))
    );
    showToast("Room inventory updated.");
  };

  const addRoom = (room: Omit<AdminHotelRoom, "id">) => {
    const newRoom: AdminHotelRoom = {
      ...room,
      id: `rm-${Date.now()}`,
    };
    setRooms((prev) => [...prev, newRoom]);
    showToast(`Room category "${newRoom.name}" added.`);
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
  const addInquiry = (inq: Omit<AdminInquiry, "id" | "date">) => {
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);
    const newInquiry: AdminInquiry = {
      ...inq,
      id: `inq-${Date.now()}`,
      date: now,
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    showToast("New inquiry received and saved to admin dashboard.");
  };

  const updateInquiryStatus = (id: string, status: AdminInquiry["status"]) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry marked as ${status}.`);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast("Inquiry lead deleted.");
  };

  // Contact Page Actions
  const addContactCard = (card: Omit<AdminContactCard, "id">) => {
    const newCard: AdminContactCard = {
      ...card,
      id: `card-${Date.now()}`,
    };
    setContactCards((prev) => [...prev, newCard]);
    showToast(`Contact card "${newCard.title}" created successfully.`);
  };

  const updateContactCard = (id: string, card: Partial<AdminContactCard>) => {
    setContactCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...card } : c))
    );
    showToast("Contact card updated.");
  };

  const deleteContactCard = (id: string) => {
    setContactCards((prev) => prev.filter((c) => c.id !== id));
    showToast("Contact card removed.");
  };

  const updateContactGeneralInfo = (info: Partial<AdminContactGeneralInfo>) => {
    setContactGeneralInfo((prev) => ({ ...prev, ...info }));
    showToast("Contact settings updated successfully.");
  };

  // Blog Post Actions
  const addBlogPost = (post: BlogPost) => {
    setBlogPostsList((prev) => [post, ...prev]);
    showToast(`Article "${post.title}" published successfully.`);
  };

  const updateBlogPost = (slug: string, post: Partial<BlogPost>) => {
    setBlogPostsList((prev) =>
      prev.map((p) => (p.slug === slug ? { ...p, ...post } : p))
    );
    showToast("Article updated successfully.");
  };

  const deleteBlogPost = (slug: string) => {
    setBlogPostsList((prev) => prev.filter((p) => p.slug !== slug));
    showToast("Article deleted from blog.");
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
    heroData: { heroTitle?: string; heroSubtitle?: string; heroBadge?: string; metaDescription?: string }
  ) => {
    setPageContents((prev) =>
      prev.map((p) => (p.pageKey === pageKey ? { ...p, ...heroData } : p))
    );
    showToast("Page header & metadata updated successfully.");
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
        updateRoom,
        addRoom,
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
