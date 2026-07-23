"use client";

import React from "react";
import { Cpu, Layout, Box, Database, Terminal, Shield, Sparkles } from "lucide-react";

const skillGroups = [
  {
    title: "Frontend Engineering",
    icon: Layout,
    color: "from-cyan-500 to-blue-600",
    skills: [
      { name: "React 19 / Next.js 16", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS v4", level: 95 },
      { name: "Framer Motion", level: 88 },
      { name: "State Management (Zustand/Redux)", level: 85 },
    ],
  },
  {
    title: "3D & Graphic Design",
    icon: Box,
    color: "from-purple-500 to-pink-600",
    skills: [
      { name: "Three.js / WebGL", level: 90 },
      { name: "React Three Fiber (R3F)", level: 88 },
      { name: "GLSL Shaders", level: 75 },
      { name: "Blender 3D Modeling", level: 80 },
      { name: "UI/UX & Figma", level: 90 },
    ],
  },
  {
    title: "Backend & Databases",
    icon: Database,
    color: "from-pink-500 to-rose-600",
    skills: [
      { name: "Node.js / Express", level: 90 },
      { name: "Prisma ORM", level: 88 },
      { name: "PostgreSQL & PG Vector", level: 85 },
      { name: "REST & GraphQL APIs", level: 90 },
      { name: "NextAuth / Authentication", level: 88 },
    ],
  },
  {
    title: "DevOps & Tooling",
    icon: Terminal,
    color: "from-emerald-500 to-teal-600",
    skills: [
      { name: "Git / GitHub Actions", level: 92 },
      { name: "Vercel / Cloudflare", level: 90 },
      { name: "Docker Containerization", level: 80 },
      { name: "Cloudinary Asset Management", level: 85 },
      { name: "Unit & E2E Testing", level: 80 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mastered <span className="text-gradient-cyan">Technologies & Tools</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A comprehensive overview of my core technical competencies, 3D graphics stack, and software engineering tools.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <div
                key={idx}
                className="glass-card p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${group.color} p-[1px]`}>
                    <div className="w-full h-full bg-black/90 rounded-[15px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{group.title}</h3>
                    <span className="text-xs font-mono text-zinc-500">Domain Mastery</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-200 font-medium">{skill.name}</span>
                        <span className="text-xs font-mono text-cyan-400">{skill.level}%</span>
                      </div>
                      
                      {/* Skill Bar */}
                      <div className="w-full h-2 rounded-full bg-white/5 border border-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
