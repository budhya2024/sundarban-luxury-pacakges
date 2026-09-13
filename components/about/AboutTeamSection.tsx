"use client";

import React from "react";
import Image from "next/image";
import { FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa6";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

const team: TeamMember[] = [
  {
    id: "subhashish",
    name: "Capt. Subhashish Roy",
    role: "Chief Cruise Master",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    bio: "Over 20 years navigating the estuarine mangrove channels of the Sundarbans with zero safety incidents.",
  },
  {
    id: "ananya",
    name: "Dr. Ananya Mukherjee",
    role: "Lead Tiger Naturalist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    bio: "Wildlife ecologist specializing in Royal Bengal Tiger territorial tracking and mangrove fauna protection.",
  },
  {
    id: "rajesh",
    name: "Rajesh Mondal",
    role: "Senior Safari Leader",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    bio: "Native of Godkhali, expert in bird watching, watchtower expeditions, and local estuarine history.",
  },
  {
    id: "soma",
    name: "Soma Das",
    role: "Guest Experience Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
    bio: "Ensures every passenger receives 5-star personalized hospitality, chef dining, and luxury comfort on board.",
  },
];

export function AboutTeamSection() {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="font-montez text-3xl sm:text-4xl text-[#d97706] mb-1">
            Our Experts
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight">
            Meet Our Leadership & Cruise Masters
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 font-normal">
            Guided by veteran captains, certified forest naturalists, and hospitality leaders dedicated to your safety and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="group rounded-sm bg-[#f8fcfe] border border-slate-100/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Member Photo */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex items-center gap-2 text-white">
                    <span className="p-2.5 rounded-full bg-white/20 hover:bg-[#064e3b] transition-colors cursor-pointer">
                      <FaLinkedinIn className="w-3.5 h-3.5" />
                    </span>
                    <span className="p-2.5 rounded-full bg-white/20 hover:bg-[#064e3b] transition-colors cursor-pointer">
                      <FaTwitter className="w-3.5 h-3.5" />
                    </span>
                    <span className="p-2.5 rounded-full bg-white/20 hover:bg-[#064e3b] transition-colors cursor-pointer">
                      <FaEnvelope className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-[#0f172a] mb-0.5 group-hover:text-[#064e3b] transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#d97706] mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutTeamSection;
