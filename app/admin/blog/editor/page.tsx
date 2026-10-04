"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "@/context/AdminContext";
import { BlogPost } from "@/lib/blog-data";
import { ImageUploadDropzone } from "@/components/admin/ImageUploadDropzone";
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Sparkles,
  AlertCircle,
  Undo2,
  Redo2,
  Calendar,
  Tag,
  Layers,
  FileText,
  ExternalLink,
  X,
  Globe,
  Edit3,
  PanelRightClose,
  PanelRightOpen,
  SlidersHorizontal,
} from "lucide-react";

const DEFAULT_CATEGORIES = [
  "Wildlife",
  "Boat Safari",
  "Birding",
  "Travel Guide",
  "Resort & Stays",
  "Cuisine & Dining",
  "Conservation",
  "Photography",
];

const SAMPLE_GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1549608276-5786777e6587?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
];

// Helper to render markdown content in Live Preview accurately
function MarkdownPreviewRenderer({ content }: { content: string }) {
  if (!content) {
    return <em className="text-slate-400">No content written yet...</em>;
  }

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-5 space-y-1 my-3 text-slate-700">
          {listItems.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const formatInline = (text: string): React.ReactNode => {
    // Basic inline formatting: bold, italic, code, links, underline, strikethrough
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\)|<u>.*?<\/u>|~~.*?~~)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
        return <em key={index} className="italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index} className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-rose-600">{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("<u>") && part.endsWith("</u>")) {
        return <span key={index} className="underline">{part.slice(3, -4)}</span>;
      }
      if (part.startsWith("~~") && part.endsWith("~~")) {
        return <span key={index} className="line-through text-slate-400">{part.slice(2, -2)}</span>;
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <a key={index} href={linkMatch[2]} target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold hover:text-blue-800">
            {linkMatch[1]}
          </a>
        );
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Image markdown: ![alt](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushList();
      elements.push(
        <div key={i} className="my-5 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
          <div className="relative h-64 sm:h-80 w-full">
            <Image
              src={imgMatch[2]}
              alt={imgMatch[1] || "Article Photo"}
              fill
              className="object-cover"
              unoptimized={true}
            />
          </div>
          {imgMatch[1] && (
            <p className="text-xs text-slate-500 italic p-2 text-center bg-slate-50 border-t border-slate-100">
              {imgMatch[1]}
            </p>
          )}
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={i} className="text-lg font-bold text-slate-900 mt-5 mb-2">
          {formatInline(line.slice(4))}
        </h3>
      );
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={i} className="text-xl font-black text-slate-900 mt-6 mb-3 pb-1 border-b border-slate-100">
          {formatInline(line.slice(3))}
        </h2>
      );
      continue;
    }
    if (line.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={i} className="text-2xl font-black text-slate-900 mt-6 mb-3">
          {formatInline(line.slice(2))}
        </h1>
      );
      continue;
    }

    // Blockquote & Callouts
    if (line.startsWith("> ")) {
      flushList();
      const quoteText = line.slice(2);
      elements.push(
        <blockquote key={i} className="border-l-4 border-[#d97706] pl-4 py-2 my-4 bg-amber-50/50 rounded-r text-slate-800 italic text-sm">
          {formatInline(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Lists
    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listItems.push(line.slice(2));
      continue;
    }

    // Table rows
    if (line.startsWith("|") && line.endsWith("|")) {
      flushList();
      const cells = line.split("|").filter((c) => c.trim().length > 0);
      if (cells.some((c) => c.includes("---"))) {
        continue; // delimiter row
      }
      elements.push(
        <div key={i} className="my-1 overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-fr gap-2 p-2 bg-slate-50 border border-slate-200 text-xs font-medium rounded">
            {cells.map((cell, cIdx) => (
              <div key={cIdx} className="text-slate-800">{formatInline(cell.trim())}</div>
            ))}
          </div>
        </div>
      );
      continue;
    }

    // Empty line
    if (!line.trim()) {
      flushList();
      continue;
    }

    // Normal paragraph
    flushList();
    elements.push(
      <p key={i} className="text-sm leading-relaxed text-slate-700 my-3">
        {formatInline(line)}
      </p>
    );
  }

  flushList();
  return <div className="space-y-1">{elements}</div>;
}

function WordPressBlogEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("slug");

  const { blogPostsList, addBlogPost, updateBlogPost, showToast } = useAdmin();

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugManual, setIsSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [category, setCategory] = useState("Wildlife");
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft" | "Scheduled">("Published");
  const [publishDate, setPublishDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  );
  const [selectedAuthor, setSelectedAuthor] = useState("Editorial Team");
  const [authorImage, setAuthorImage] = useState("");
  const [tags, setTags] = useState<string[]>(["Sundarban", "Wildlife", "Tiger Trail"]);
  const [tagInput, setTagInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Editor View Mode & Layout controls
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSaved, setIsSaved] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(Boolean(editSlug));

  // History states for Undo / Redo
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Modals for insert tool
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageCaption, setImageCaption] = useState("");

  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing post if editing from API, fallback to context
  useEffect(() => {
    if (!editSlug) {
      setIsLoadingPost(false);
      return;
    }

    let isMounted = true;
    setIsLoadingPost(true);

    fetch(`/api/admin/blog/${editSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.post) {
          const p = data.post;
          setTitle(p.title || "");
          setSlug(p.slug || "");
          setIsSlugManual(true);
          setExcerpt(p.excerpt || "");
          setContent(p.content || "");
          setFeaturedImage(p.image || "");
          setCategory(p.category || "Wildlife");
          setPublishDate(p.date || "Today");
          setSelectedAuthor(p.author || "Editorial Team");
          setAuthorImage(p.authorImage || "");
          setTags(Array.isArray(p.tags) ? p.tags : ["Sundarban"]);
          setStatus(p.status || "Published");
          setIsFeatured(p.featured || false);
          setMetaTitle(p.metaTitle || p.title);
          setMetaDescription(p.metaDescription || p.excerpt);
          setHistory([p.content || ""]);
          setHistoryIndex(0);
          setIsSaved(true);
          setIsLoadingPost(false);
          return;
        }

        // Fallback to blogPostsList
        const existing = blogPostsList.find((p) => p.slug === editSlug);
        if (existing) {
          setTitle(existing.title);
          setSlug(existing.slug);
          setIsSlugManual(true);
          setExcerpt(existing.excerpt);
          setContent(existing.content);
          setFeaturedImage(existing.image || "");
          setCategory(existing.category || "Wildlife");
          setPublishDate(existing.date || "Today");
          setSelectedAuthor(existing.author || "Editorial Team");
          setAuthorImage(existing.authorImage || "");
          setTags(existing.tags || ["Sundarban"]);
          setStatus(existing.status || "Published");
          setIsFeatured(existing.featured || false);
          setMetaTitle(existing.metaTitle || existing.title);
          setMetaDescription(existing.metaDescription || existing.excerpt);
          setHistory([existing.content || ""]);
          setHistoryIndex(0);
          setIsSaved(true);
        } else {
          showToast("Article not found or could not be loaded");
        }
        setIsLoadingPost(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Error loading blog post:", err);
        const existing = blogPostsList.find((p) => p.slug === editSlug);
        if (existing) {
          setTitle(existing.title);
          setSlug(existing.slug);
          setIsSlugManual(true);
          setExcerpt(existing.excerpt);
          setContent(existing.content);
          setFeaturedImage(existing.image || "");
          setCategory(existing.category || "Wildlife");
          setPublishDate(existing.date || "Today");
          setSelectedAuthor(existing.author || "Editorial Team");
          setAuthorImage(existing.authorImage || "");
          setTags(existing.tags || ["Sundarban"]);
          setStatus(existing.status || "Published");
          setIsFeatured(existing.featured || false);
          setMetaTitle(existing.metaTitle || existing.title);
          setMetaDescription(existing.metaDescription || existing.excerpt);
          setHistory([existing.content || ""]);
          setHistoryIndex(0);
          setIsSaved(true);
        } else {
          showToast("Failed to load article from server");
        }
        setIsLoadingPost(false);
      });

    return () => {
      isMounted = false;
    };
  }, [editSlug]);

  // Push to history when content changes
  const setContentWithHistory = (newVal: string) => {
    setContent(newVal);
    setIsSaved(false);
    setHistory((prev) => {
      const next = prev.slice(0, historyIndex + 1);
      return [...next, newVal];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setContent(history[nextIdx]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setContent(history[nextIdx]);
    }
  };

  // Auto-generate slug and meta title from Title if not manual
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setIsSaved(false);
    if (!isSlugManual && !editSlug) {
      const autoSlug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(autoSlug);
    }
    if (!metaTitle || metaTitle === title) {
      setMetaTitle(newTitle);
    }
  };

  // Add tag
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setIsSaved(false);
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
    setIsSaved(false);
  };

  // Calculate live word count & reading time
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const calculatedReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} Min Read`;

  // Insert formatting into textarea
  const insertFormatting = (prefix: string, suffix: string = "", defaultPlaceholder: string = "") => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || defaultPlaceholder;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);

    setContentWithHistory(newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  // Keyboard shortcut listener for textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
      e.preventDefault();
      insertFormatting("**", "**", "bold text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
      e.preventDefault();
      insertFormatting("*", "*", "italic text");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      if (e.shiftKey) {
        e.preventDefault();
        handleRedo();
      } else {
        e.preventDefault();
        handleUndo();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
      e.preventDefault();
      handleRedo();
    }
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl) return;
    const formatted = `[${linkText || linkUrl}](${linkUrl})`;
    insertFormatting(formatted, "", "");
    setLinkUrl("");
    setLinkText("");
    setIsLinkModalOpen(false);
  };

  const handleInsertImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;
    const formatted = `\n![${imageAlt || "Sundarban image"}](${imageUrl})\n`;
    insertFormatting(formatted, "", "");
    setImageUrl("");
    setImageAlt("");
    setImageCaption("");
    setIsImageModalOpen(false);
  };

  const insertTable = () => {
    const tableMarkdown = `
| Day / Activity | Location | Highlights |
| :--- | :--- | :--- |
| Day 1 - Dawn Creek Cruise | Sajnekhali Delta | Morning Tiger Trail & Mangrove Birding |
| Day 2 - Deep Canopy Watch | Sudhanyakhali Tower | Canopy observation & saltwater crocodile sighting |
| Day 3 - Sunset River Safari | Dobanki Canopy Walk | 500m elevated forest walkway & sunset tea |
`;
    insertFormatting(tableMarkdown, "", "");
  };

  const insertCallout = (type: "tip" | "warning" | "note") => {
    let callout = "";
    if (type === "tip") {
      callout = `\n> **PRO TRAVEL TIP:** Best lighting for wildlife photography in Sundarban creeks occurs between 6:30 AM and 8:30 AM.\n`;
    } else if (type === "warning") {
      callout = `\n> **IMPORTANT NOTICE:** All tourists must strictly remain inside designated boat vessels and accompanied by licensed forest department guides.\n`;
    } else {
      callout = `\n> **DID YOU KNOW:** The Sundarban delta is the only mangrove forest ecosystem in the world inhabited by Royal Bengal Tigers.\n`;
    }
    insertFormatting(callout, "", "");
  };

  // Save/Publish Post via API + Context
  const handleSaveOrPublish = async (postStatus: "Published" | "Draft" = status === "Draft" ? "Draft" : "Published") => {
    if (!title.trim()) {
      alert("Please provide an article title before saving.");
      return;
    }

    const finalSlug = slug.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const postData: BlogPost = {
      slug: finalSlug,
      title: title.trim(),
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      image: featuredImage,
      category: category || "Wildlife",
      date: publishDate || "Today",
      readTime: calculatedReadTime,
      author: selectedAuthor,
      authorImage: authorImage,
      tags: tags.length > 0 ? tags : ["Sundarban", "Wildlife"],
      status: postStatus,
      featured: isFeatured,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
    };

    setIsSubmitting(true);

    try {
      if (editSlug) {
        const res = await fetch(`/api/admin/blog/${editSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to update article");
        updateBlogPost(editSlug, postData);
        showToast(`Updated article "${title}" successfully`);
      } else {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to create article");
        addBlogPost(data.post || postData);
        showToast(`Published new article "${title}" successfully`);
      }

      setIsSaved(true);
      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      console.error("Save blog post error:", err);
      showToast(err?.message || "Failed to save article to server");
      alert(`Error saving article: ${err?.message || "Server error"}. Your edits have not been lost.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingPost) {
    return (
      <div className="flex-1 flex flex-col h-[100dvh] min-h-0 bg-slate-100 overflow-hidden select-text">
        {/* Top Header Placeholder */}
        <header className="shrink-0 h-14 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Articles</span>
            </Link>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded">
              Loading Article...
            </span>
          </div>
        </header>

        {/* Loading Workspace Canvas Skeleton */}
        <div className="flex-1 flex items-center justify-center p-6 bg-slate-50/70">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-8 sm:p-12 max-w-md w-full text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative mx-auto w-14 h-14 flex items-center justify-center">
              <div className="w-14 h-14 border-3 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
              <FileText className="w-6 h-6 text-blue-600 absolute" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">
                Loading Article for Editing
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Fetching story content, media, and SEO configuration...
              </p>
            </div>

            <div className="w-40 h-1 bg-slate-100 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[100dvh] min-h-0 bg-slate-100 overflow-hidden select-text">
      {/* WordPress / Notion-Style Top Header Bar */}
      <header className="shrink-0 h-14 bg-slate-900 text-white border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-30 shadow-sm">
        {/* Left: Back & Badge */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-slate-700/60 rounded-[4px] transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Articles</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block shrink-0" />

          <div className="flex items-center gap-2 min-w-0 truncate">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded-[4px] shrink-0">
              {editSlug ? "Edit" : "New"}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium shrink-0">
              <span className={`w-2 h-2 rounded-full ${isSaved ? "bg-emerald-500" : "bg-amber-400 animate-pulse"}`} />
              <span className="hidden md:inline">{isSaved ? "Saved" : "Unsaved changes"}</span>
            </span>
          </div>
        </div>

        {/* Center: Write vs Live Preview Segmented Switcher */}
        <div className="flex items-center bg-slate-800/90 p-0.5 rounded-[4px] border border-slate-700/70 shadow-inner">
          <button
            type="button"
            onClick={() => setViewMode("edit")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-[4px] transition-all cursor-pointer ${
              viewMode === "edit"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("preview")}
            className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-[4px] transition-all cursor-pointer ${
              viewMode === "preview"
                ? "bg-blue-600 text-white shadow-xs"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Actions & Sidebar Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {editSlug && (
            <a
              href={`/blog/${slug || editSlug}`}
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-[4px] transition-colors"
              title="View live post on public site"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Live Post</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => handleSaveOrPublish("Draft")}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-[4px] transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => handleSaveOrPublish("Published")}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-500 rounded-[4px] shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{editSlug ? "Update" : "Publish"}</span>
          </button>

          {/* Toggle Inspector Sidebar Button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1.5 sm:p-2 rounded-[4px] border transition-colors cursor-pointer ${
              isSidebarOpen
                ? "bg-slate-800 text-blue-400 border-slate-700"
                : "bg-slate-800/40 text-slate-400 border-slate-700/60 hover:text-white"
            }`}
            title={isSidebarOpen ? "Hide Settings Sidebar" : "Show Settings Sidebar"}
          >
            {isSidebarOpen ? (
              <PanelRightClose className="w-4 h-4" />
            ) : (
              <PanelRightOpen className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace Area (Canvas + Inspector Sidebar) */}
      <div className="flex-1 flex min-h-0 overflow-hidden relative">
        {/* Left: Editor Canvas / Preview Area */}
        <main className="flex-1 min-w-0 overflow-y-auto bg-slate-50/70 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6 pb-28">
            {viewMode === "preview" ? (
              /* ================= LIVE PREVIEW MODE ================= */
              <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
                {/* Category & Date Header */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-full border border-blue-200">
                    {category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">{publishDate}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-medium">{calculatedReadTime}</span>
                  {isFeatured && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold rounded text-[11px] border border-amber-200 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" /> Featured
                      </span>
                    </>
                  )}
                </div>

                {/* Article Headline */}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {title || "Untitled Article Headline"}
                </h1>

                {/* Article Excerpt */}
                {excerpt && (
                  <p className="text-base sm:text-lg text-slate-600 italic border-l-4 border-blue-500 pl-4 py-1 leading-relaxed bg-blue-50/30 rounded-r">
                    {excerpt}
                  </p>
                )}

                {/* Cover Image Preview */}
                {featuredImage && (
                  <div className="relative h-64 sm:h-96 w-full rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                    <Image
                      src={featuredImage}
                      alt={title || "Featured Image"}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                )}

                {/* Content Body */}
                <div className="pt-2">
                  <MarkdownPreviewRenderer content={content} />
                </div>

                {/* Tags Footer */}
                {tags.length > 0 && (
                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    {tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ================= WRITE / EDIT MODE ================= */
              <>
                {/* Title & Permalink Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-3">
                  <div>
                    <textarea
                      rows={2}
                      placeholder="Enter Article Title Here..."
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full text-2xl sm:text-3xl font-extrabold text-slate-900 border-none outline-none focus:ring-0 p-0 placeholder-slate-300 resize-none leading-tight bg-transparent"
                    />
                  </div>

                  {/* Permalink / URL Slug Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1 text-slate-500 font-medium">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>Permalink:</span>
                    </div>

                    <div className="flex items-center gap-1 font-mono bg-slate-50 px-2.5 py-1 rounded border border-slate-200 text-slate-700 text-[11px] max-w-full">
                      <span className="text-slate-400 select-none">/blog/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => {
                          setSlug(e.target.value);
                          setIsSlugManual(true);
                          setIsSaved(false);
                        }}
                        placeholder="url-slug"
                        className="bg-transparent border-none outline-none text-blue-600 font-semibold p-0 w-44 sm:w-64 focus:ring-0"
                      />
                    </div>

                    {editSlug && (
                      <a
                        href={`/blog/${slug || editSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold ml-auto"
                      >
                        <span>View live post</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* STICKY RICH WORDPRESS EDITOR TOOLBAR */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xs p-1.5 flex flex-wrap items-center gap-1">
                  {/* Undo / Redo */}
                  <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                    <button
                      type="button"
                      onClick={handleUndo}
                      disabled={historyIndex <= 0}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 disabled:opacity-30 transition-colors"
                      title="Undo (Ctrl+Z)"
                    >
                      <Undo2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleRedo}
                      disabled={historyIndex >= history.length - 1}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 disabled:opacity-30 transition-colors"
                      title="Redo (Ctrl+Y)"
                    >
                      <Redo2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Headings */}
                  <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n## ", "\n", "Heading 2 Title")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-bold text-xs flex items-center gap-0.5 transition-colors"
                      title="Heading 2 (##)"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n### ", "\n", "Heading 3 Subtitle")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-bold text-xs flex items-center gap-0.5 transition-colors"
                      title="Heading 3 (###)"
                    >
                      <Heading3 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Formatting */}
                  <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                    <button
                      type="button"
                      onClick={() => insertFormatting("**", "**", "bold text")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-bold text-xs transition-colors"
                      title="Bold (Ctrl+B)"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("*", "*", "italic text")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Italic (Ctrl+I)"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Underline"
                    >
                      <Underline className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("~~", "~~", "strikethrough text")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Strikethrough"
                    >
                      <Strikethrough className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Lists & Quotes */}
                  <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n- ", "", "Bullet point item")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n1. ", "", "Numbered item")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("\n> ", "\n", "Inspiring wildlife quote or key highlight")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Blockquote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => insertFormatting("`", "`", "code snippet")}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs transition-colors"
                      title="Inline Code"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Insert Links & Media */}
                  <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                    <button
                      type="button"
                      onClick={() => setIsLinkModalOpen(true)}
                      className="p-1.5 hover:bg-blue-50 rounded text-blue-600 text-xs flex items-center gap-1 font-bold transition-colors"
                      title="Insert Hyperlink"
                    >
                      <LinkIcon className="w-4 h-4" />
                      <span className="text-[11px] hidden sm:inline">Link</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsImageModalOpen(true)}
                      className="p-1.5 hover:bg-emerald-50 rounded text-emerald-600 text-xs flex items-center gap-1 font-bold transition-colors"
                      title="Insert Photo Image"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span className="text-[11px] hidden sm:inline">Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={insertTable}
                      className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs flex items-center gap-1 transition-colors"
                      title="Insert Table Matrix"
                    >
                      <TableIcon className="w-4 h-4" />
                      <span className="text-[11px] hidden sm:inline">Table</span>
                    </button>
                  </div>

                  {/* Callouts */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => insertCallout("tip")}
                      className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold rounded flex items-center gap-1 transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Tip</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => insertCallout("warning")}
                      className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 text-[11px] font-bold rounded flex items-center gap-1 transition-colors"
                    >
                      <AlertCircle className="w-3 h-3 text-rose-600" />
                      <span>Notice</span>
                    </button>
                  </div>
                </div>

                {/* Editor Textarea Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold text-slate-700">Article Story &amp; Markdown Canvas</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
                      <span>{wordCount} Words</span>
                      <span>•</span>
                      <span>{calculatedReadTime}</span>
                    </div>
                  </div>

                  <textarea
                    ref={contentTextareaRef}
                    rows={22}
                    value={content}
                    onChange={(e) => setContentWithHistory(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write your article story here... You can use headings (##), lists (-), quotes (>), bold (**word**), links, images, tables, and callouts."
                    className="w-full p-5 sm:p-6 text-sm font-sans text-slate-800 focus:outline-none leading-relaxed border-none resize-y min-h-[500px]"
                  />
                </div>

                {/* Excerpt Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Article Excerpt / Lead Summary
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {excerpt.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={excerpt}
                    onChange={(e) => {
                      setExcerpt(e.target.value);
                      setIsSaved(false);
                    }}
                    placeholder="A compelling 1-2 sentence lead summary of the article shown on cards and search results..."
                    className="w-full px-3.5 py-2.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                </div>
              </>
            )}
          </div>
        </main>

        {/* Mobile Inspector Drawer Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Right: WordPress Gutenberg-Style Inspector Panel */}
        <aside
          className={`
            fixed inset-y-0 right-0 z-40 lg:static lg:z-auto
            w-80 sm:w-96 lg:w-84 xl:w-96 bg-white border-l border-slate-200
            flex flex-col min-h-0 shrink-0 shadow-xl lg:shadow-none
            transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:hidden"}
          `}
        >
          {/* Sidebar Header */}
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Article Settings
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded lg:hidden"
              title="Close Settings"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar Content Cards */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Publication Status & Visibility */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-2xs">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Publication Status
              </span>

              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-md">
                {(["Published", "Draft"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setStatus(s);
                      setIsSaved(false);
                    }}
                    className={`py-1.5 text-center font-bold rounded transition-all text-[11px] cursor-pointer ${
                      status === s
                        ? "bg-white text-blue-600 shadow-xs border border-slate-200"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <label className="flex items-center justify-between cursor-pointer pt-1 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-semibold text-slate-700 text-xs">Featured Article</span>
                </div>
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => {
                    setIsFeatured(e.target.checked);
                    setIsSaved(false);
                  }}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </label>

              {/* Publish Date */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Publish Date
                </label>
                <div className="flex items-center gap-2 px-2.5 py-1.5 border border-slate-200 rounded-md bg-slate-50 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    value={publishDate}
                    onChange={(e) => {
                      setPublishDate(e.target.value);
                      setIsSaved(false);
                    }}
                    placeholder="e.g. Oct 15, 2026"
                    className="bg-transparent border-none outline-none text-xs w-full p-0 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Featured Cover Image */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Featured Cover Image</span>
              </div>
              <ImageUploadDropzone
                value={featuredImage}
                onChange={(newVal) => {
                  setFeaturedImage(newVal);
                  setIsSaved(false);
                }}
                label=""
                helperText="Upload blog card cover photo or choose from presets"
                presets={SAMPLE_GALLERY_IMAGES}
                aspectRatio="wide"
                folder="blog"
              />
            </div>

            {/* Category */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Primary Category</span>
              </div>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {Array.from(new Set([...DEFAULT_CATEGORIES, category])).map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => {
                        setCategory(cat);
                        setIsSaved(false);
                      }}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-medium text-slate-700 text-xs">{cat}</span>
                  </label>
                ))}
              </div>

              {/* Add Custom Category */}
              <div className="flex gap-1.5 pt-1 border-t border-slate-100">
                <input
                  type="text"
                  placeholder="Add custom..."
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (customCategoryInput.trim()) {
                        setCategory(customCategoryInput.trim());
                        setCustomCategoryInput("");
                        setIsSaved(false);
                      }
                    }
                  }}
                  className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customCategoryInput.trim()) {
                      setCategory(customCategoryInput.trim());
                      setCustomCategoryInput("");
                      setIsSaved(false);
                    }
                  }}
                  className="px-2 py-1 bg-slate-800 text-white font-semibold rounded-md hover:bg-slate-900 text-xs transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <Tag className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Tags &amp; Keywords</span>
              </div>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Add new tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs focus:outline-none focus:border-blue-600"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-2.5 py-1.5 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-900 text-xs transition-colors"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1 max-h-32 overflow-y-auto">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium text-[11px] border border-blue-200"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="hover:text-rose-600 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Search Engine Optimization (SEO) & Google Preview */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] uppercase tracking-wider text-slate-500">Google Search Preview</span>
              </div>

              {/* Google Preview Snippet */}
              <div className="bg-slate-50 border border-slate-200 rounded-md p-2.5 space-y-1">
                <div className="flex items-center gap-1 text-[10px] text-slate-500 truncate">
                  <span className="text-slate-400">sundarbanpackages.com &gt; blog &gt;</span>
                  <span className="font-mono text-slate-600">{slug || "url-slug"}</span>
                </div>
                <h4 className="text-xs font-semibold text-blue-700 hover:underline line-clamp-1">
                  {metaTitle || title || "Article Headline"}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {metaDescription || excerpt || "Write an engaging excerpt or SEO description to help your article rank on search engines."}
                </p>
              </div>

              {/* SEO Meta Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  SEO Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => {
                    setMetaTitle(e.target.value);
                    setIsSaved(false);
                  }}
                  placeholder="Defaults to Post Title"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-xs"
                />
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Recommended: 50–60 chars</span>
                  <span className={`font-bold ${metaTitle.length > 60 ? "text-rose-500" : metaTitle.length >= 50 ? "text-emerald-600" : "text-slate-400"}`}>
                    {metaTitle.length}/60
                  </span>
                </div>
              </div>

              {/* SEO Meta Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  SEO Meta Description
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => {
                    setMetaDescription(e.target.value);
                    setIsSaved(false);
                  }}
                  placeholder="Defaults to Excerpt summary"
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 text-xs leading-relaxed"
                />
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Recommended: 140–160 chars</span>
                  <span className={`font-bold ${metaDescription.length > 160 ? "text-rose-500" : metaDescription.length >= 140 ? "text-emerald-600" : "text-slate-400"}`}>
                    {metaDescription.length}/160
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Insert Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-md shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                Insert Hyperlink
              </h3>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertLink} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://... or /tour/2-nights-3-days..."
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Anchor Text (Optional)</label>
                <input
                  type="text"
                  placeholder="Descriptive anchor text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-lg shadow-xs cursor-pointer hover:bg-blue-500"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Insert Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-5 w-full max-w-md shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Insert Article Photo
              </h3>
              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInsertImage} className="space-y-3 text-xs">
              <ImageUploadDropzone
                value={imageUrl}
                onChange={setImageUrl}
                label="Article Photo Upload *"
                helperText="Upload image, drop file, or pick a preset"
                presets={SAMPLE_GALLERY_IMAGES}
                aspectRatio="wide"
                folder="blog"
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Bengal Tiger drinking water"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption Text</label>
                <input
                  type="text"
                  placeholder="e.g. Sighted near Sudhanyakhali creek at dawn"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-lg shadow-xs cursor-pointer hover:bg-emerald-500"
                >
                  Insert Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WordPressBlogEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <WordPressBlogEditorContent />
    </Suspense>
  );
}
