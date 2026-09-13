"use client";

import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  dotPosition: "top-right" | "bottom-right";
  offset: "up" | "down";
}

const stats: StatItem[] = [
  {
    id: "experience",
    value: 12,
    suffix: "",
    label: "Years Experience",
    dotPosition: "bottom-right",
    offset: "down",
  },
  {
    id: "retention",
    value: 97,
    suffix: "%",
    label: "Retention Rate",
    dotPosition: "top-right",
    offset: "up",
  },
  {
    id: "completed",
    value: 8,
    suffix: "k",
    label: "Tour Completed",
    dotPosition: "bottom-right",
    offset: "down",
  },
  {
    id: "travellers",
    value: 19,
    suffix: "k",
    label: "Happy Travellers",
    dotPosition: "top-right",
    offset: "up",
  },
];

function CounterNumber({ targetValue, suffix = "" }: { targetValue: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(easeOut * targetValue);
            setCount(currentVal);

            if (frame >= totalFrames) {
              setCount(targetValue);
              clearInterval(timer);
            }
          }, frameDuration);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [targetValue, hasAnimated]);

  return (
    <span ref={ref} className="font-bold tracking-tight text-[#0a1b2a]">
      {hasAnimated ? count : targetValue}
      {suffix}
    </span>
  );
}

export function TrustSection() {
  return (
    <section className="py-10 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="container px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 sm:gap-6 lg:gap-8 items-center justify-items-center py-4 min-h-[320px] sm:min-h-[380px]">
          {stats.map((stat, idx) => {
            const isUp = stat.offset === "up";
            const isTopRight = stat.dotPosition === "top-right";

            return (
              <div
                key={stat.id}
                style={{
                  animation: `trustBounce 3.5s ease-in-out infinite ${idx * 0.45}s`,
                }}
                className={`transition-all duration-700 ease-out ${
                  isUp ? "lg:-translate-y-8" : "lg:translate-y-8"
                }`}
              >
                {/* Outer Ring Wrapper */}
                <div className="group relative flex items-center justify-center w-[150px] h-[150px] sm:w-[210px] sm:h-[210px] md:w-[230px] md:h-[230px] lg:w-[225px] lg:h-[225px] xl:w-[255px] xl:h-[255px] cursor-pointer">
                  {/* Deep Green Outer Orbit Line */}
                  <div className="absolute inset-0 rounded-full border border-[#064e3b]/30 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg] pointer-events-none">
                    {/* Glowing Node Dot placed precisely on the ring perimeter (45 deg angle) */}
                    <div
                      className={`absolute flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#d97706]/25 z-20 ${
                        isTopRight
                          ? "top-[14.6%] right-[14.6%] -translate-y-1/2 translate-x-1/2"
                          : "bottom-[14.6%] right-[14.6%] translate-y-1/2 translate-x-1/2"
                      }`}
                    >
                      <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#d97706] shadow-sm animate-pulse" />
                    </div>
                  </div>

                  {/* Inner Soft Circle (Forest green tint -> Soft gold tint on hover) */}
                  <div className="flex flex-col items-center justify-center text-center w-[116px] h-[116px] sm:w-[165px] sm:h-[165px] md:w-[180px] md:h-[180px] lg:w-[178px] lg:h-[178px] xl:w-[205px] xl:h-[205px] rounded-full bg-[#f0fdf4] shadow-xs px-2 sm:px-4 transition-colors duration-300 group-hover:bg-[#fef3c7]">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[46px] font-black leading-tight mb-0.5 sm:mb-1 text-[#0a1b2a]">
                      <CounterNumber targetValue={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-[11px] sm:text-[13px] md:text-sm lg:text-[15px] font-semibold text-[#1e293b] leading-tight sm:leading-snug max-w-[100px] sm:max-w-none">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes trustBounce {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}

export default TrustSection;
