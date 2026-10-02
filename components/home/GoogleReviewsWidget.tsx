"use client";

import React, { useState, useEffect } from "react";
import { Star, ExternalLink, ShieldCheck, MapPin, CheckCircle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ReviewAvatar } from "@/components/ui/ReviewAvatar";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

export interface GoogleReviewItem {
  id: string;
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  date?: string;
  relativeTime?: string;
  text: string;
  isLocalGuide?: boolean;
  reviewCount?: number;
  url?: string | null;
}

// 15 Actual Verified Google Business Reviews for Sundarban Bengal Trip (Sundarban Luxury Packages)
export const authenticGoogleReviews: GoogleReviewItem[] = [
  {
    id: "5c316676-1a32-4653-896e-2cf8dbbe14fb",
    name: "Fossilian subham joy rock",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjXMDjTlAeiUxeDEB9o_lc9ard5qlGN-Rf6u53WQ9rA5OgHZyVV1=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-26",
    relativeTime: "Today",
    text: "The name has been maintained. Value for money package! Especially in the evening, the moment of enjoying the silence of the forest while having tea and hot pakoras on the boat is the best reward.\"thanks for souvik",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "2b297f93-9c85-4357-976f-4cbd4c33ccc4",
    name: "Aditya Raj",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ12X_lqBtCCWo8wL-5ewW2AWLenqNq6cQfFKipcyha0cGkzg=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-24",
    relativeTime: "2 days ago",
    text: "Wow, this is an amazing trip service ,if you want tour anywhere so I can say use their services which is come with great experience,and all affordable cost",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "3b85b6b4-4482-4c77-9b1d-ae1e626b0225",
    name: "Aditya Raj",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLLCjumR9TOlQ0a1jGNb_IAccpCoIw2drr5odgOgrsVEOfxLg=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-24",
    relativeTime: "2 days ago",
    text: "This tour-trip service is very amazing experience with affordable cost ,so I hardly say this ,use and experience their services.",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "f1dcaf7e-80ed-41ed-8433-8e9cfeecc074",
    name: "Anannya Naskar",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocL7wHBt7bGOKmORwgAK6U4MXm8oabQPIBbf6A-CW6WcpeZT-A=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-21",
    relativeTime: "5 days ago",
    text: "\"Our 2-night, 3-day tour with Sundarban Bengal Trip was amazing. The boat was very clean and the guide Dada showed us around each watch tower with great care. The quality of the food was simply amazing!\" thankyou for souvik 👍",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "c1ff96db-bec8-490a-a99a-c0b8319ab5ee",
    name: "Amrit Tarui",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIiphEEPY2Az1zyyHakted6nRQ1F31Oe2_OlfltnvUiyLdxEg=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-21",
    relativeTime: "5 days ago",
    text: "A seamless and memorable weekend getaway with Sundarban Bengal Tourism! The pickup from Kolkata was right on time, and the entire itinerary was executed flawlessly without any rush. Cruising along the serene mangrove creeks on a comfortable houseboat while sipping warm tea was pure therapy. The food served on board was freshly prepared, hygienic, and authentic Bengali style. Kudos to the polite staff and knowledgeable guide for making our jungle safari both thrilling and safe. Will definitely recommend them to all my friends and family!\"",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "2f37a572-6274-414c-9db8-a87606f5b0ae",
    name: "Monika Kumari",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLNSOasw1GI6gsl2BZKy6xE_FDdWXAmXeXu-FbzyJcSWxKLbA=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-20",
    relativeTime: "6 days ago",
    text: "​\"The experience of traveling to the Sundarbans with my family was, in a word, amazing! Especially the accommodation at Hotel Sonar Bangla, the cleanliness of the room and the hospitality touched my heart. The planning of the entire tour package was absolutely perfect - pick-up from Kolkata, comfortable boat safari, sightseeing with an experienced guide and delicious food arrangements, I enjoyed everything very much. I would definitely recommend this package to everyone for a trip to the Sundarbans in a combination of luxury and nature.\" thank you for souvik\"",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "de342657-47cb-45af-816b-913e6627b708",
    name: "Motion Frame Studio",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocLHnTkVPgpWh_fq15HU2U4jx3xAmquKogrpc1C1XxpzB5gQng=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-17",
    relativeTime: "1 week ago",
    text: "I recently booked my Sundarban tour with Sundarban Bengal Trip, and it was a wonderful experience from start to finish. Everything was well organized, from the pickup in Kolkata to the stay, food, boat safari, and overall trip arrangements. The entire journey was smooth and enjoyable, and the team was very helpful and cooperative throughout the trip. The Sundarban experience was truly memorable, especially the beautiful nature and boat safari. Thank you, Sundarban Bengal Trip, for making our trip so comfortable and enjoyable. I would definitely recommend them to anyone planning a Sundarban tour from Kolkata.",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "a758778f-6cf2-4bc4-9d57-3f8205f98d44",
    name: "Kishaloy Banerjee",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKz-l4lCj77m-8wI1rZ_p33Y5p744N4rN3Z28d-Yd9Ew8gq9A=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-12",
    relativeTime: "2 weeks ago",
    text: "Khub sundor experience ar staff member rao khub valo, r setai amader khub valo legachilo. Thank you so much, Sundorban Bengal Trip group tomader jonnei ami eto sundor ekta vacation katate parlam...",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "3e46ca79-d3fb-4638-aaee-da5830999aa7",
    name: "Krish Banerjee",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKz-l4lCj77m-8wI1rZ_p33Y5p744N4rN3Z28d-Yd9Ew8gq9A=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-12",
    relativeTime: "2 weeks ago",
    text: "Khub sundor experience ar staff member rao khub valo, r setai amader khub valo legachilo. Thank you so much, Sundorban Bengal Trip group tomader jonnei ami eto sundor ekta vacation katate parlam...",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "51a7f750-7eb5-4ceb-bd35-62d4e0de916e",
    name: "Krish Roshan",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocK_UlZJlQBYiz9Q3ILEPliE449x3ViJMC5Pxanx99srgN92Fw=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-12",
    relativeTime: "2 weeks ago",
    text: "Khub sundor experience ar staff member rao khub valo, r setai amader khub valo legachilo. Thank you so much, Sundorban Bengal Trip group tomader jonnei ami eto sundor ekta vacation katate parlam...",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "2cf7f49c-8979-4e6e-85a4-334fd1a53977",
    name: "Pulak Banerjee",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocKBrvYmEUGXBPbPiHgQXAHMt8aCxSKnpR4YLw6PI3u3VRAgig=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-12",
    relativeTime: "2 weeks ago",
    text: "Khub sundor experience ar staff member rao khub valo, r setai amader khub valo legachilo. Thank you so much, Sundorban Bengal Trip group tomader jonnei ami eto sundor ekta vacation katate parlam...",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "58c52897-b81c-4f93-990c-6cb55f8642b6",
    name: "Papai Malo",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWY5cIoKsE1PliQ0unW4OlChIMO8r8i4e5bLoz4qX5GQK4tqdN5=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-09",
    relativeTime: "2 weeks ago",
    text: "I had a really wonderful experience with Sundarban Bengal Trip. From the initial communication to the completion of the trip, everything was arranged quite well. The team was friendly, polite, and helpful, and they guided us properly throughout the journey. The boat ride through the beautiful waterways of the Sundarbans was one of the highlights of the trip. We really enjoyed the peaceful surroundings, natural beauty, and overall atmosphere. The coordination and arrangements made the journey comfortable and hassle-free. Overall, it was a memorable experience, and I would definitely recommend Sundarban Bengal Trip to anyone planning a Sundarbans trip.",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "e2cb5ffa-a087-4ef2-8b82-a7f8c46f2f22",
    name: "Piyali Saren",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWE6zSJAgHbgScLrF2BLXr7pz8b1Yt54z1uhrkLWfDywkN1wLw6Sw=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-09",
    relativeTime: "2 weeks ago",
    text: "We recently had a very pleasant experience with Sundarban Bengal Trip, and overall we were quite satisfied with the way everything was arranged. Right from the initial enquiry, the team was helpful and explained the trip details clearly. They were also easy to communicate with and responded properly whenever we had any doubts or needed information. The entire trip was organized in a systematic manner, and the arrangements were handled well. The team was polite, friendly, and cooperative, which made us feel comfortable throughout the journey. We especially enjoyed the boat journey and the opportunity to experience the natural beauty and peaceful surroundings of the Sundarbans. It was a refreshing break from our usual routine and a wonderful experience to spend time surrounded by nature. Another thing we appreciated was that the team was attentive and tried to make the journey convenient for everyone. The overall coordination was good, and we didn’t have to spend our time worrying about every small arrangement. There were some moments during the trip that were simply beautiful and memorable, especially while travelling through the waterways and exploring the surroundings. Overall, Sundarban Bengal Trip provided us with a memorable and enjoyable experience. The service, coordination, and behaviour of the team were all good, and we genuinely enjoyed our trip. I would definitely recommend Sundarban Bengal Trip to friends, family, and anyone planning a visit to the Sundarbans. Thank you to the entire team for organizing everything so nicely and making our trip a memorable one! 🌿🚤🌊✨",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "e13eb281-a9e9-4ab9-9525-32f74a2aaf8e",
    name: "Adip Saren",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUv_AEpCBuqv37wPxxDbEQOlOV-8iaOqiRXkoQQqLoAGEA2koE=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-09",
    relativeTime: "2 weeks ago",
    text: "I had a really great experience with Sundarban Bengal Trip, and I’m very happy with the overall service. From the beginning, the communication was clear and the team was very helpful in explaining the trip details, timings, arrangements, and other necessary information. They were responsive whenever we had any questions, which made the planning process much easier. The trip itself was well organized and we didn’t have to worry much about the arrangements. The staff were friendly, polite, and cooperative throughout the journey. Everything was managed in a smooth and comfortable way, and the overall experience felt quite hassle-free. We also really enjoyed exploring the beautiful natural surroundings of the Sundarbans and getting to experience the local atmosphere. What I liked most was the way the team handled everything with patience and professionalism. They made sure that the trip went smoothly and that we were comfortable during the journey. The experience was enjoyable, relaxing, and definitely something we will remember for a long time. Overall, I’m really satisfied with Sundarban Bengal Trip and would happily recommend them to anyone who is planning to visit the Sundarbans. If you are looking for a well-organized trip with helpful people and good arrangements, I would definitely suggest giving them a try. Thank you to the entire team for making our Sundarbans trip such a memorable experience! 🌿🌊😊",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  },
  {
    id: "546d8f94-ae51-46c4-8132-38196adbda43",
    name: "BRITI DAS",
    role: "Verified Google Reviewer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWl5pOOlqlmgmG3f9bm7ryIkyq-7xKtpDytmmxITVkweC1e9SUA4w=s64-c-rp-mo-br100",
    rating: 5,
    date: "2026-09-02",
    relativeTime: "3 weeks ago",
    text: "First time Sundarban trip with family, and it was a great decision. Food was tasty, arrangements were good and everyone was cooperative. Thank you Sundarban Bengal Trip!",
    isLocalGuide: false,
    url: "https://www.google.com/maps/place//data=!4m3!3m2!1s0x3a018b00753514b5:0x4a5ccb8cdf28b0ea!12e1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA"
  }
];

interface GoogleReviewsWidgetProps {
  featurableId?: string;
  googlePlaceId?: string;
  googlePlaceUrl?: string;
  googleRating?: number;
  googleReviewsCount?: number;
}

function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}



export function GoogleReviewsWidget({
  featurableId = "3244b520-3369-414c-a09e-339ea6dbd9e9",
  googlePlaceId = "ChIJtRQ1dQCLAToR6rAo34zLXEo",
  googlePlaceUrl = "https://maps.app.goo.gl/49hCpzhsd1WremJW6?g_st=awb",
  googleRating = 4.9,
  googleReviewsCount = 32,
}: GoogleReviewsWidgetProps) {
  // Pre-initialize with authentic Google reviews so initial render NEVER shows database or mock data
  const [reviews, setReviews] = useState<GoogleReviewItem[]>(authenticGoogleReviews);
  const [rating, setRating] = useState<number>(googleRating);
  const [reviewsCount, setReviewsCount] = useState<number>(googleReviewsCount);
  const [writeReviewUrl, setWriteReviewUrl] = useState<string>(googlePlaceUrl);

  // Sync background updates seamlessly without flashing
  useEffect(() => {
    let isMounted = true;
    async function loadLiveReviews() {
      try {
        const query = featurableId ? `?featurableId=${encodeURIComponent(featurableId)}` : "";
        const res = await fetch(`/api/google-reviews${query}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
          if (data.rating) setRating(data.rating);
          if (data.reviewsCount) setReviewsCount(data.reviewsCount);
          if (data.writeAReviewUri) setWriteReviewUrl(data.writeAReviewUri);
        }
      } catch (err) {
        console.warn("Background Google reviews refresh failed:", err);
      }
    }
    loadLiveReviews();
    return () => {
      isMounted = false;
    };
  }, [featurableId]);

  const displayReviews = reviews.length > 0 ? reviews : authenticGoogleReviews;

  return (
    <div className="w-full">
      {/* Top Banner: Google Rating Score + Direct Google Maps CTAs */}
      <div className="max-w-md sm:max-w-4xl mx-auto mb-8 p-6 sm:p-5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-center sm:text-left">
        <div className="w-full sm:w-auto flex flex-row items-center sm:items-start justify-start">
          <div className="w-16 h-16 sm:w-12 sm:h-12 rounded-full border border-slate-100 flex items-center justify-center shrink-0 shadow-sm bg-white">
            <GoogleIcon className="w-8 h-8 sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1 flex flex-col items-center sm:items-start pl-3 sm:pl-3.5">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-500">
              <span className="text-2xl sm:text-xl font-black text-[#0f172a] mr-1">
                {rating.toFixed(1)}
              </span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 sm:h-4 sm:w-4 fill-[#f59e0b] text-[#f59e0b]" />
              ))}
            </div>
            <div className="text-[13px] sm:text-xs text-slate-500 font-medium mt-1.5 flex items-start sm:items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left leading-snug max-w-[240px] sm:max-w-none mx-auto sm:mx-0">
              <ShieldCheck className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#2563eb] shrink-0 mt-0.5 sm:mt-0" />
              <span>
                Verified Google Business Reviews &bull; {reviewsCount}+<br className="block sm:hidden" /> Ratings
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row w-[90%] sm:w-auto items-stretch sm:items-center justify-center gap-3 shrink-0 mx-auto sm:mx-0">
          <a
            href={writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-md bg-[#1d4ed8] hover:bg-blue-800 text-white text-[14px] sm:text-[13px] font-bold shadow-sm transition-all cursor-pointer"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
          </a>
          <a
            href={googlePlaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto justify-center inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-md bg-[#f1f5f9] hover:bg-slate-200 text-[#334155] text-[14px] sm:text-[13px] font-bold transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#ef4444]" />
            <span>Open Google Maps</span>
          </a>
        </div>
      </div>

      {/* Native Google Reviews Swiper Slider - Clean Professional Grid */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides={false}
          loop={displayReviews.length > 2}
          loopAdditionalSlides={3}
          speed={600}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".google-swiper-pagination",
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: Math.min(3, displayReviews.length),
              spaceBetween: 24,
              centeredSlides: false,
            },
          }}
          className="!pb-8 px-1"
        >
          {displayReviews.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto flex">
              <div className="w-full h-full relative flex flex-col rounded-2xl justify-between bg-white p-6 sm:p-7 transition-all duration-300 min-h-[310px] border border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300">
                <div>
                  {/* Header: Reviewer Info + Google Logo */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <ReviewAvatar src={item.avatar} name={item.name} />
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                          {item.name}
                        </h4>
                        <p className=" text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                          {item.isLocalGuide ? (
                            <span className="inline-flex items-center gap-0.5 text-blue-600 font-semibold">
                              <ShieldCheck className="w-3 h-3 text-blue-600 shrink-0" />
                              <span>Local Guide {item.reviewCount ? `• ${item.reviewCount} reviews` : ""}</span>
                            </span>
                          ) : (
                            <span className="text-slate-500 font-medium">
                              {item.role || "Verified Google Reviewer"}
                            </span>
                          )}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                          {item.relativeTime || item.date}
                        </span>
                      </div>
                    </div>

                    {/* Google G Brand Badge */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50/80 border border-blue-200/70 text-[10px] font-extrabold text-blue-700">
                        <GoogleIcon className="w-3 h-3" />
                        <span>Google</span>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500 mt-1">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-amber-500 text-amber-500"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Comment Text */}
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-normal line-clamp-6">
                    &ldquo;{item.text}&rdquo;
                  </p>
                </div>

                {/* Card Bottom Badge */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between  text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Google Review</span>
                  </span>

                  <a
                    href={item.url || googlePlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 hover:underline cursor-pointer"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                {/* Center Floating Google Logo Circle */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-xs border border-slate-200">
                  <GoogleIcon className="w-4 h-4" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </div>
  );
}

export default GoogleReviewsWidget;
