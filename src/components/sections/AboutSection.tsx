"use client";

import React from "react";
import { User, Sparkles, Compass, ShieldCheck, Zap, Laptop, Rocket, GraduationCap } from "lucide-react";

const milestones = [
  {
    year: "2024 - Present",
    role: "Senior Fullstack & 3D Web Engineer",
    company: "Freelance & Creative Labs",
    desc: "Architecting WebGL 3D web applications, Next.js fullstack platforms, and microservices for global clients.",
    icon: Rocket,
  },
  {
    year: "2022 - 2024",
    role: "Frontend & UI/UX Developer",
    company: "Tech Innovations Inc.",
    desc: "Built scalable frontend component libraries, integrated real-time state management, and optimized rendering speeds.",
    icon: Laptop,
  },
  {
    year: "2020 - 2022",
    role: "B.Tech Computer Science & Engineering",
    company: "Anurag University",
    desc: "Specialized in Software Engineering, Algorithms, Database Systems, and Graphic Algorithms.",
    icon: GraduationCap,
  },
];

const pillars = [
  {
    title: "Designer Precision",
    desc: "Pixel-perfect layouts with vibrant color palettes, sleek micro-interactions, and glassmorphic depth.",
    icon: Compass,
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "3D & Graphic Realism",
    desc: "Custom WebGL, Three.js & R3F canvas shaders to create engaging interactive visual dimensions.",
    icon: Zap,
    color: "from-purple-500 to-pink-600",
  },
  {
    title: "Fullstack Integrity",
    desc: "Robust backend architectures with Next.js, Prisma ORM, PostgreSQL, and secure API endpoints.",
    icon: ShieldCheck,
    color: "from-pink-500 to-rose-600",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <User className="w-3.5 h-3.5" />
            <span>ABOUT MY JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Bridging <span className="text-gradient-cyan">Design & Code</span> Engineering.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            I combine modern design aesthetics with clean computer science fundamentals to create web products that feel like magic.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card p-8 rounded-3xl relative overflow-hidden group hover:border-cyan-500/40"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${pillar.color} p-[1px] mb-6 shadow-lg`}>
                  <div className="w-full h-full bg-black/80 rounded-[15px] flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Timeline Section */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-cyan-400" /> Experience & Milestones
          </h3>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-pink-500">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative pl-14 sm:pl-20 group">
                  {/* Icon Node */}
                  <div className="absolute left-2 sm:left-4 top-1 -translate-x-1/2 w-9 h-9 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </div>

                  <div className="glass-pill p-6 rounded-2xl space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        {item.year}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">{item.company}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
