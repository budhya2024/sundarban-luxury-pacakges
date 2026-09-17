import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaArrowRight,
  FaRegClock,
  FaTag,
  FaRegUser,
  FaShareNodes,
  FaPaperPlane,
  FaRegFolderOpen,
  FaRegEnvelope,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";
import { getBlogPost, getRelatedPosts, blogPosts } from "@/lib/blog-data";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Sundarban Luxury Package`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const recentPosts = blogPosts.slice(0, 4);

  // Compute category counts
  const categoryCounts = blogPosts.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const allCategories = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  // Popular tags list
  const popularTags = Array.from(
    new Set(blogPosts.flatMap((item) => item.tags))
  );

  const contentBlocks = post.content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-[#0e2a47] text-xl sm:text-2xl font-extrabold mt-8 mb-4 tracking-tight"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p key={i} className="text-gray-600 leading-relaxed mb-5 text-base sm:text-[17px]">
        {block}
      </p>
    );
  });

  return (
    <main className="bg-slate-50/50 min-h-screen">
      {/* Hero Banner (Only Breadcrumbs) */}
      <section className="relative bg-black text-white py-12 sm:py-16 overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: `url('${post.image}')`,
          }}
        />

        {/* Deep Black Gradient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumbs */}
          <div className="inline-flex items-center gap-2.5 text-base sm:text-lg font-bold text-white flex-wrap justify-center">
            <Link href="/" className="text-white hover:text-[#fbbf24] transition-colors">
              Home
            </Link>
            <span className="text-white font-bold">»</span>
            <Link href="/blog" className="text-white hover:text-[#fbbf24] transition-colors">
              Blog
            </Link>
            <span className="text-white font-bold">»</span>
            <span className="text-[#fbbf24] truncate max-w-xs sm:max-w-md">{post.title}</span>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#064e3b] font-bold mb-8 hover:gap-3 transition-all duration-300 group"
        >
          <FaArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Articles</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className=" lg:col-span-8 bg-white p-6 sm:p-8 md:p-10 border border-slate-100 shadow-sm">
            {/* Category & Article Title */}
            <div className="mb-6">

              <h1 className="text-xl sm:text-2xl  font-extrabold text-[#0e2a47] tracking-tight leading-snug">
                {post.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#064e3b]/30 shrink-0">
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-[#0e2a47] font-bold text-sm sm:text-base flex items-center gap-1.5">
                    <FaRegUser className="w-3.5 h-3.5 text-[#064e3b]" />
                    {post.author}
                  </p>
                  <p className="text-gray-400 text-xs flex items-center gap-2 mt-0.5">
                    <span>{post.date}</span>
                    <span className="w-[1px] h-3 bg-gray-300 inline-block" />
                    <span className="flex items-center gap-1">
                      <FaRegClock className="w-3 h-3 text-[#d97706]" />
                      {post.readTime}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#064e3b] bg-amber-50/80 px-3 py-1 rounded-full border border-amber-100/50"
                  >
                    <FaTag className="w-2.5 h-2.5 text-[#d97706]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-[#0e2a47] text-lg sm:text-xl font-medium leading-relaxed mb-8 border-l-4 border-[#064e3b] pl-5 bg-amber-50/40 py-5 pr-5">
              {post.excerpt}
            </p>

            <div className="prose prose-slate max-w-none">{contentBlocks}</div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-10 pt-6 border-t border-slate-100 bg-slate-50/80 p-4 sm:p-5">
              <span className="text-[#0e2a47] font-bold text-sm flex items-center gap-2">
                <FaShareNodes className="w-4 h-4 text-[#064e3b]" /> Share this article:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://sundarbanluxury.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#064e3b] hover:text-[#fbbf24] hover:border-[#064e3b] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://sundarbanluxury.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#064e3b] hover:text-[#fbbf24] hover:border-[#064e3b] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://sundarbanluxury.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#064e3b] hover:text-[#fbbf24] hover:border-[#064e3b] transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 my-10" />

            <div className="bg-primary/10 p-7 sm:p-10 text-center relative overflow-hidden">

              <h3 className="text-primary text-xl sm:text-xl font-extrabold mb-3 relative z-10">
                Ready to Experience Sundarban?
              </h3>
              <p className="text-primary text-sm sm:text-base mb-6 max-w-lg mx-auto relative z-10">
                Book a luxury Sundarban package and experience the magic of the world's largest mangrove forest.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-secondary hover:text-white transition-all duration-300 shadow-md relative z-10"
              >
                <span>Plan My Trip</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            {/* 1. Recent Posts Widget (FIRST) */}
            <div className="bg-white  p-6 sm:p-7 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#0e2a47] mb-5 flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <FaRegClock className="w-4 h-4 text-[#d97706]" />
                <span>Recent Posts</span>
              </h3>
              <div className="space-y-4">
                {recentPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="flex gap-3.5 group items-center p-2  bg-primary/10 rounded-md hover:bg-secondary/10 transition-all duration-300 border border-transparent hover:border-slate-100"
                  >
                    <div className="relative w-16 h-16 overflow-hidden rounded-sm flex-shrink-0 bg-slate-100 shadow-sm">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0e2a47] font-bold text-xs sm:text-sm leading-snug group-hover:text-[#064e3b] transition-colors line-clamp-2 mb-1">
                        {item.title}
                      </p>
                      <span className="text-[11px] text-gray-400 font-medium">
                        {item.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Categories Widget */}
            <div className="bg-white  p-6 sm:p-7 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#0e2a47] mb-5 flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <FaRegFolderOpen className="w-4 h-4 text-[#064e3b]" />
                <span>Categories</span>
              </h3>
              <ul className="space-y-2">
                {allCategories.map((cat) => (
                  <li key={cat.name} className="border-b">
                    <Link
                      href="/blog"
                      className="flex items-center justify-between text-sm text-slate-700 hover:text-[#064e3b] px-1 py-2.5 hover:bg-amber-50/40 transition-all duration-200 font-semibold group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {cat.name}
                      </span>
                      <span className="text-xs font-bold text-[#064e3b]   transition-colors">
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Popular Tags Widget */}
            <div className="bg-white  p-6 sm:p-7 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#0e2a47] mb-5 flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <FaTag className="w-4 h-4 text-[#d97706]" />
                <span>Popular Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href="/blog"
                    className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-[#064e3b] hover:text-[#fbbf24] px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-2xs"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Share Widget */}
            <div className="bg-white  p-6 sm:p-7 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-extrabold text-[#0e2a47] mb-4 flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <FaShareNodes className="w-4 h-4 text-[#064e3b]" />
                <span>Share This Post</span>
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Liked this article? Share it with your friends and fellow travelers.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://sundarbanluxury.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary hover:bg-secondary text-white  flex items-center justify-center transition-all duration-300"
                  aria-label="Share on Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://sundarbanluxury.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary hover:bg-secondary text-white  flex items-center justify-center transition-all duration-300"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://sundarbanluxury.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary hover:bg-secondary text-white  flex items-center justify-center transition-all duration-300"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 5. Subscribe to Newsletter Widget (LAST / BOTTOM) */}
            <div className="bg-gradient-to-br from-[#052e16] via-[#064e3b] to-[#022c22]  rounded-sm p-6 sm:p-7 text-white relative overflow-hidden border border-[#fbbf24]/20">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#d97706]/20 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2.5 text-[#fbbf24] font-bold text-xs uppercase tracking-widest mb-2.5 relative z-10">
                <FaRegEnvelope className="w-4 h-4" />
                <span>Newsletter</span>
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2 relative z-10">
                Subscribe to Newsletter
              </h3>
              <p className="text-white/75 text-xs sm:text-sm mb-5 leading-relaxed relative z-10">
                Get the latest travel stories, tiger sighting updates & tour deals delivered right to your inbox.
              </p>
              <form className="space-y-3 relative z-10">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white/10 border border-white/25 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all"
                />
                <button
                  type="button"
                  className="w-full bg-[#d97706] hover:bg-[#b45309] text-white font-extrabold text-sm py-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md group cursor-pointer"
                >
                  <span>Subscribe Now</span>
                  <FaPaperPlane className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>

      {/* Related Articles Section - Rich Blog List Card Design */}
      <section className="bg-primary/5 py-8 md:py-16 border-t border-border">
        <div className="container">
          <div className="mb-8 md:mb-10">
            <span className="text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
              Explore More Stories
            </span>
            <h2 className="text-foreground text-2xl sm:text-3xl font-extrabold tracking-tight">
              Related Articles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {related.map((article) => (
              <article
                key={article.slug}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                {/* Image with Category Badge */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-100">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-primary text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-sm border border-slate-100">
                    {article.category}
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-3">
                    <span>{article.date}</span>
                    <span className="w-[1px] h-3 bg-slate-300 inline-block" />
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <FaRegClock className="w-3.5 h-3.5 text-secondary" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-foreground font-bold text-base sm:text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    <Link href={`/blog/${article.slug}`} className="hover:underline">
                      {article.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-6">
                    {article.excerpt}
                  </p>

                  {/* Read More button */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-secondary transition-all duration-300"
                    >
                      <span>Read Full Story</span>
                      <FaArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}