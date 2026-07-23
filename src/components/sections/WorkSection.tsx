"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Sparkles, Layers, Box, Cpu } from "lucide-react";
import { Project } from "@/types";

const projectsData: Project[] = [
  {
    id: "1",
    title: "Quantum 3D Web Engine",
    description: "Interactive WebGL product visualizer with real-time materials, physical lighting, and custom GLSL shaders.",
    category: "3d",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["Three.js", "React Three Fiber", "GLSL", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "2",
    title: "Nexus SaaS Analytics Platform",
    description: "Fullstack enterprise dashboard featuring real-time telemetry, PostgreSQL Prisma database, and NextAuth authentication.",
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js 16", "Prisma", "PostgreSQL", "Tailwind CSS"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "3",
    title: "Aether AI Prompt Assistant",
    description: "Generative AI workspace integrating LLM streaming, code execution preview, and custom vector search.",
    category: "ai",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "OpenAI API", "Vector DB", "Framer Motion"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
  },
  {
    id: "4",
    title: "Cosmic Metaverse Gallery",
    description: "3D virtual exhibition hall enabling users to walk through curated digital art pieces with spatial audio.",
    category: "3d",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    tags: ["Three.js", "R3F", "Drei", "Tailwind"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "5",
    title: "Pulse Crypto Portfolio Tracker",
    description: "Real-time cryptocurrency analytics suite with interactive Chart.js graphs and live WebSocket updates.",
    category: "fullstack",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "TypeScript", "WebSockets", "Node.js"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
  {
    id: "6",
    title: "Vision Mobile Companion App",
    description: "Cross-platform mobile application built with React Native for managing smart IoT devices remotely.",
    category: "mobile",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    tags: ["React Native", "Expo", "Redux Toolkit", "Node.js"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
  },
];

const categories = [
  { id: "all", label: "All Projects", icon: Layers },
  { id: "3d", label: "3D & WebGL", icon: Box },
  { id: "fullstack", label: "Fullstack", icon: FolderGit2 },
  { id: "ai", label: "AI & Tools", icon: Cpu },
];

export function WorkSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Selected <span className="text-gradient-cyan">Featured Projects</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Explore a collection of interactive 3D WebGL experiences, fullstack web applications, and AI integrations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25 border border-transparent"
                    : "glass-pill text-zinc-400 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-3xl overflow-hidden group flex flex-col justify-between border border-white/10 hover:border-cyan-500/40"
            >
              {/* Image Preview Container */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-cyan-300 font-mono text-xs backdrop-blur-md">
                    {project.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Source</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
