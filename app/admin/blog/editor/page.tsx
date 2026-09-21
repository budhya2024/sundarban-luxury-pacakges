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
  Heading1,
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
  Clock,
  User,
  Tag,
  CheckCircle2,
  Layers,
  FileText,
  Search,
  ExternalLink,
  X,
  UploadCloud,
} from "lucide-react";

const AUTHORS_PRESETS = [
  {
    name: "Arjun Chowdhury",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    role: "Senior Wildlife Naturalist & Expedition Lead",
  },
  {
    name: "Dr. Subhashis Mukherjee",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    role: "Marine & Mangrove Delta Ecologist",
  },
  {
    name: "Priya Mondal",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    role: "Sundarban Ornithologist & Birding Guide",
  },
  {
    name: "Capt. Rajesh Mondal",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    role: "Master Cruise Captain & Safari Pilot",
  },
];

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
    // Basic inline formatting: bold, italic, code, links
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
            <Image src={imgMatch[2]} alt={imgMatch[1] || "Article Photo"} fill className="object-cover" unoptimized={imgMatch[2].startsWith("data:")} />
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
  const [featuredImage, setFeaturedImage] = useState(
    "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80"
  );
  const [category, setCategory] = useState("Wildlife");
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [status, setStatus] = useState<"Published" | "Draft" | "Scheduled">("Published");
  const [publishDate, setPublishDate] = useState(
    new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  );
  const [selectedAuthor, setSelectedAuthor] = useState(AUTHORS_PRESETS[0].name);
  const [authorImage, setAuthorImage] = useState(AUTHORS_PRESETS[0].image);
  const [tags, setTags] = useState<string[]>(["Sundarban", "Wildlife", "Tiger Trail"]);
  const [tagInput, setTagInput] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Editor View Mode: "edit" | "split" | "preview"
  const [viewMode, setViewMode] = useState<"edit" | "split" | "preview">("edit");
  const [activeInspectorTab, setActiveInspectorTab] = useState<"document" | "seo">("document");
  const [isSaved, setIsSaved] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (editSlug) {
      fetch(`/api/admin/blog/${editSlug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.post) {
            const p = data.post;
            setTitle(p.title || "");
            setSlug(p.slug || "");
            setIsSlugManual(true);
            setExcerpt(p.excerpt || "");
            setContent(p.content || "");
            setFeaturedImage(p.image || SAMPLE_GALLERY_IMAGES[0]);
            setCategory(p.category || "Wildlife");
            setPublishDate(p.date || "Today");
            setSelectedAuthor(p.author || AUTHORS_PRESETS[0].name);
            setAuthorImage(p.authorImage || AUTHORS_PRESETS[0].image);
            setTags(Array.isArray(p.tags) ? p.tags : ["Sundarban"]);
            setStatus(p.status || "Published");
            setIsFeatured(p.featured || false);
            setMetaTitle(p.metaTitle || p.title);
            setMetaDescription(p.metaDescription || p.excerpt);
            setHistory([p.content || ""]);
            setHistoryIndex(0);
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
            setFeaturedImage(existing.image || SAMPLE_GALLERY_IMAGES[0]);
            setCategory(existing.category || "Wildlife");
            setPublishDate(existing.date || "Today");
            setSelectedAuthor(existing.author || AUTHORS_PRESETS[0].name);
            setAuthorImage(existing.authorImage || AUTHORS_PRESETS[0].image);
            setTags(existing.tags || ["Sundarban"]);
            setStatus(existing.status || "Published");
            setIsFeatured(existing.featured || false);
            setMetaTitle(existing.metaTitle || existing.title);
            setMetaDescription(existing.metaDescription || existing.excerpt);
            setHistory([existing.content || ""]);
            setHistoryIndex(0);
          }
        })
        .catch(() => {
          const existing = blogPostsList.find((p) => p.slug === editSlug);
          if (existing) {
            setTitle(existing.title);
            setSlug(existing.slug);
            setIsSlugManual(true);
            setExcerpt(existing.excerpt);
            setContent(existing.content);
            setFeaturedImage(existing.image || SAMPLE_GALLERY_IMAGES[0]);
            setCategory(existing.category || "Wildlife");
            setPublishDate(existing.date || "Today");
            setSelectedAuthor(existing.author || AUTHORS_PRESETS[0].name);
            setAuthorImage(existing.authorImage || AUTHORS_PRESETS[0].image);
            setTags(existing.tags || ["Sundarban"]);
            setStatus(existing.status || "Published");
            setIsFeatured(existing.featured || false);
            setMetaTitle(existing.metaTitle || existing.title);
            setMetaDescription(existing.metaDescription || existing.excerpt);
            setHistory([existing.content || ""]);
            setHistoryIndex(0);
          }
        });
    }
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

  const handleAuthorChange = (name: string) => {
    setSelectedAuthor(name);
    const author = AUTHORS_PRESETS.find((a) => a.name === name);
    if (author) {
      setAuthorImage(author.image);
    }
    setIsSaved(false);
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
      console.error(err);
      // Fallback update to context
      if (editSlug) {
        updateBlogPost(editSlug, postData);
      } else {
        addBlogPost(postData);
      }
      showToast(err?.message || `Saved article "${title}"`);
      setIsSaved(true);
      router.push("/admin/blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col -m-4 sm:-m-6">
      {/* WordPress-Style Top Bar */}
      <header className="sticky top-0 z-40 bg-[#0f172a] text-white border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Posts</span>
          </Link>

          <span className="text-slate-600">|</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {editSlug ? "Edit Article" : "New Article"}
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              {isSaved ? "Saved" : "Unsaved changes"}
            </span>
          </div>
        </div>

        {/* View mode switcher & actions */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-0.5 rounded-[3px] flex items-center text-xs">
            <button
              onClick={() => setViewMode("edit")}
              className={`px-2.5 py-1 rounded-[2px] font-bold transition-colors ${
                viewMode === "edit" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Visual Editor
            </button>
            <button
              onClick={() => setViewMode("split")}
              className={`px-2.5 py-1 rounded-[2px] font-bold transition-colors ${
                viewMode === "split" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Split View
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={`px-2.5 py-1 rounded-[2px] font-bold transition-colors ${
                viewMode === "preview" ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white"
              }`}
            >
              Live Preview
            </button>
          </div>

          <button
            onClick={() => handleSaveOrPublish("Draft")}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-[3px] transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Save Draft</span>
          </button>

          <button
            onClick={() => handleSaveOrPublish("Published")}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-500 rounded-[3px] shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>{editSlug ? "Update & Publish" : "Publish Now"}</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Area (Canvas + Inspector Sidebar) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Editor Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Title & Permalink Box */}
            <div className="bg-white rounded-[4px] border border-slate-200 p-6 shadow-2xs space-y-4">
              <div>
                <textarea
                  rows={2}
                  placeholder="Enter Post Title Here..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full text-2xl sm:text-3xl font-black text-slate-900 border-none outline-none focus:ring-0 p-0 placeholder-slate-300 resize-none leading-tight"
                />
              </div>

              {/* Permalink bar */}
              <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="font-semibold text-slate-400">Permalink:</span>
                <span className="font-mono text-slate-600">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setIsSlugManual(true);
                    setIsSaved(false);
                  }}
                  placeholder="custom-post-url-slug"
                  className="px-2 py-0.5 text-xs font-mono font-bold text-blue-700 bg-blue-50/70 border border-blue-200 rounded focus:bg-white focus:outline-none focus:border-blue-600"
                />
                {slug && (
                  <Link
                    href={`/blog/${slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-blue-600 underline ml-2"
                  >
                    <ExternalLink className="w-3 h-3" /> View Public
                  </Link>
                )}
              </div>
            </div>

            {/* STICKY RICH WORDPRESS EDITOR TOOLBAR */}
            <div className="sticky top-[53px] z-30 bg-white/95 backdrop-blur-md border border-slate-200 rounded-[4px] shadow-sm p-1.5 flex flex-wrap items-center gap-1">
              {/* Undo / Redo */}
              <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 disabled:opacity-30"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 disabled:opacity-30"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </div>

              {/* Headings */}
              <div className="flex items-center border-r border-slate-200 pr-1 mr-1">
                <button
                  onClick={() => insertFormatting("\n## ", "\n", "Heading 2 Title")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-bold text-xs flex items-center gap-0.5"
                  title="Heading 2 (##)"
                >
                  <Heading2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("\n### ", "\n", "Heading 3 Subtitle")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-bold text-xs flex items-center gap-0.5"
                  title="Heading 3 (###)"
                >
                  <Heading3 className="w-4 h-4" />
                </button>
              </div>

              {/* Formatting */}
              <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                <button
                  onClick={() => insertFormatting("**", "**", "bold text")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 font-bold text-xs"
                  title="Bold (Ctrl+B)"
                >
                  <Bold className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("*", "*", "italic text")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Italic (Ctrl+I)"
                >
                  <Italic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("<u>", "</u>", "underlined text")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Underline"
                >
                  <Underline className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("~~", "~~", "strikethrough text")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Strikethrough"
                >
                  <Strikethrough className="w-4 h-4" />
                </button>
              </div>

              {/* Lists & Quotes */}
              <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                <button
                  onClick={() => insertFormatting("\n- ", "", "Bullet point item")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Bullet List"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("\n1. ", "", "Numbered item")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Numbered List"
                >
                  <ListOrdered className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("\n> ", "\n", "Inspiring wildlife quote or key highlight")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Blockquote"
                >
                  <Quote className="w-4 h-4" />
                </button>
                <button
                  onClick={() => insertFormatting("`", "`", "code snippet")}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs"
                  title="Inline Code"
                >
                  <Code className="w-4 h-4" />
                </button>
              </div>

              {/* Insert Links & Media */}
              <div className="flex items-center border-r border-slate-200 pr-1 mr-1 gap-0.5">
                <button
                  onClick={() => setIsLinkModalOpen(true)}
                  className="p-1.5 hover:bg-slate-100 rounded text-blue-600 text-xs flex items-center gap-1 font-bold"
                  title="Insert Hyperlink"
                >
                  <LinkIcon className="w-4 h-4" />
                  <span className="text-[11px] hidden sm:inline">Link</span>
                </button>
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="p-1.5 hover:bg-slate-100 rounded text-emerald-600 text-xs flex items-center gap-1 font-bold"
                  title="Insert Photo Image"
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-[11px] hidden sm:inline">Image</span>
                </button>
                <button
                  onClick={insertTable}
                  className="p-1.5 hover:bg-slate-100 rounded text-slate-700 text-xs flex items-center gap-1"
                  title="Insert Table Matrix"
                >
                  <TableIcon className="w-4 h-4" />
                  <span className="text-[11px] hidden sm:inline">Table</span>
                </button>
              </div>

              {/* Callouts */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => insertCallout("tip")}
                  className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 text-[10px] font-bold rounded flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Tip</span>
                </button>
                <button
                  onClick={() => insertCallout("warning")}
                  className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-800 text-[10px] font-bold rounded flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3 text-rose-600" />
                  <span>Notice</span>
                </button>
              </div>
            </div>

            {/* Editor Textarea / Split Preview / Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Markdown Code Editor */}
              {(viewMode === "edit" || viewMode === "split") && (
                <div
                  className={`bg-white rounded-[4px] border border-slate-200 overflow-hidden shadow-2xs ${
                    viewMode === "split" ? "lg:col-span-6" : "lg:col-span-12"
                  }`}
                >
                  <div className="p-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Markdown / Visual Canvas</span>
                    <span className="font-mono text-[11px]">
                      {wordCount} Words | {calculatedReadTime}
                    </span>
                  </div>

                  <textarea
                    ref={contentTextareaRef}
                    rows={20}
                    value={content}
                    onChange={(e) => setContentWithHistory(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Write your article story here... You can use headings (##), lists (-), quotes (>), bold (**word**), links, images, tables, and callouts.`}
                    className="w-full p-6 text-sm font-sans text-slate-800 focus:outline-none leading-relaxed border-none resize-y min-h-[450px]"
                  />
                </div>
              )}

              {/* Right Column: Live Formatted Preview */}
              {(viewMode === "preview" || viewMode === "split") && (
                <div
                  className={`bg-white rounded-[4px] border border-slate-200 overflow-hidden shadow-2xs ${
                    viewMode === "split" ? "lg:col-span-6" : "lg:col-span-12"
                  }`}
                >
                  <div className="p-2.5 bg-slate-900 text-white flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-blue-400" />
                      Live Formatted Public Reader View
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400">
                      Sundarban Theme Style
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 prose prose-slate max-w-none space-y-4">
                    {/* Featured Image Header */}
                    {featuredImage && (
                      <div className="relative h-60 w-full rounded overflow-hidden shadow-sm">
                        <Image
                          src={featuredImage}
                          alt={title || "Featured Image"}
                          fill
                          className="object-cover"
                          unoptimized={featuredImage.startsWith("data:")}
                        />
                      </div>
                    )}

                    <h1 className="text-2xl font-extrabold text-slate-900">{title || "Untitled Article"}</h1>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pb-3 border-b border-slate-200">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-200">
                        <Image src={authorImage} alt={selectedAuthor} fill className="object-cover" unoptimized={authorImage.startsWith("data:")} />
                      </div>
                      <span className="font-bold text-slate-700">{selectedAuthor}</span>
                      <span>•</span>
                      <span>{publishDate}</span>
                      <span>•</span>
                      <span className="font-mono text-blue-600 font-bold">{calculatedReadTime}</span>
                    </div>

                    {/* Rich Markdown Preview Output */}
                    <MarkdownPreviewRenderer content={content} />
                  </div>
                </div>
              )}
            </div>

            {/* Excerpt Box */}
            <div className="bg-white rounded-[4px] border border-slate-200 p-5 shadow-2xs space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Article Short Excerpt (Summary for Cards &amp; Archive)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => {
                  setExcerpt(e.target.value);
                  setIsSaved(false);
                }}
                placeholder="A compelling 1-2 sentence lead summary of the article..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>
        </main>

        {/* Right: WordPress Gutenberg-Style Inspector Panel */}
        <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col shrink-0">
          {/* Tab Switcher */}
          <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold">
            <button
              onClick={() => setActiveInspectorTab("document")}
              className={`flex-1 py-2.5 text-center transition-colors ${
                activeInspectorTab === "document"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Post Settings
            </button>
            <button
              onClick={() => setActiveInspectorTab("seo")}
              className={`flex-1 py-2.5 text-center transition-colors ${
                activeInspectorTab === "seo"
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              SEO &amp; Social
            </button>
          </div>

          <div className="p-5 overflow-y-auto space-y-6 text-xs flex-1">
            {activeInspectorTab === "document" ? (
              <>
                {/* Status & Visibility */}
                <div className="space-y-3 pb-5 border-b border-slate-100">
                  <span className="font-extrabold text-slate-900 uppercase tracking-wider block">
                    Publication Status
                  </span>

                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded">
                    {(["Published", "Draft", "Scheduled"] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setStatus(s);
                          setIsSaved(false);
                        }}
                        className={`py-1 text-center font-bold rounded transition-colors ${
                          status === s ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-600">Featured Article</span>
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => {
                        setIsFeatured(e.target.checked);
                        setIsSaved(false);
                      }}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Author Selection */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                  <label className="font-extrabold text-slate-900 uppercase tracking-wider block">
                    Author &amp; Byline
                  </label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => handleAuthorChange(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                  >
                    {AUTHORS_PRESETS.map((author) => (
                      <option key={author.name} value={author.name}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Selection */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                  <label className="font-extrabold text-slate-900 uppercase tracking-wider block">
                    Primary Category
                  </label>
                  <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 p-1 rounded hover:bg-slate-50 cursor-pointer"
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
                        <span className="font-medium text-slate-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tags Management */}
                <div className="space-y-2 pb-5 border-b border-slate-100">
                  <label className="font-extrabold text-slate-900 uppercase tracking-wider block">
                    Tags &amp; Keywords
                  </label>
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
                      className="flex-1 px-2.5 py-1 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-2.5 py-1 bg-slate-800 text-white font-bold rounded hover:bg-slate-900"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[11px] border border-blue-200"
                      >
                        <span>{t}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="hover:text-rose-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Image Box */}
                <div className="space-y-2">
                  <label className="font-extrabold text-slate-900 uppercase tracking-wider block">
                    Featured Cover Image
                  </label>
                  <ImageUploadDropzone
                    value={featuredImage}
                    onChange={(val) => {
                      setFeaturedImage(val);
                      setIsSaved(false);
                    }}
                    label=""
                    helperText="Upload cover image or pick a delta photo"
                    presets={SAMPLE_GALLERY_IMAGES}

                    aspectRatio="video"
                  />
                </div>
              </>
            ) : (
              /* SEO Inspector Tab */
              <div className="space-y-4">
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-blue-900">
                  <span className="font-bold block mb-1">Google SERP Snippet Preview</span>
                  <div className="bg-white p-3 rounded border border-slate-200 space-y-1 font-sans">
                    <span className="text-[11px] text-emerald-800 block truncate">
                      https://sundarbanluxurypackage.com/blog/{slug || "article-url"}
                    </span>
                    <h4 className="text-sm font-bold text-blue-800 leading-snug line-clamp-1 hover:underline cursor-pointer">
                      {metaTitle || title || "Article Headline Preview"}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {metaDescription || excerpt || "Write an effective description that helps searchers understand your Sundarban travel article..."}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
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
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                  />
                  <span className="text-[10px] text-slate-400">
                    Recommended: 50-60 characters ({metaTitle.length}/60)
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
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
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none focus:border-blue-600 leading-relaxed"
                  />
                  <span className="text-[10px] text-slate-400">
                    Recommended: 150-160 characters ({metaDescription.length}/160)
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Insert Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[4px] p-5 w-full max-w-md shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-blue-600" />
                Insert Hyperlink
              </h3>
              <button
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
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Anchor Text (Optional)</label>
                <input
                  type="text"
                  placeholder="Click here or descriptive text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded shadow-xs"
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
          <div className="bg-white rounded-[4px] p-5 w-full max-w-md shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                Insert Article Photo
              </h3>
              <button
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
                helperText="Upload image from computer, drop file, or pick a preset"
                presets={SAMPLE_GALLERY_IMAGES}

                aspectRatio="wide"
              />

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  placeholder="e.g. Royal Bengal Tiger drinking water"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption Text</label>
                <input
                  type="text"
                  placeholder="e.g. Sighted near Sudhanyakhali creek at dawn"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsImageModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded shadow-xs cursor-pointer"
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
