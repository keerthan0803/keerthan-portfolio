"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Sparkles, ArrowRight, Download, Code2, Layers, Cpu } from "lucide-react";

// Client-only dynamic import of Three.js Canvas to avoid SSR issues
const DynamicHeroCanvas = dynamic(
  () => import("../3d/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] lg:h-[550px] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
      </div>
    ),
  }
);

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono backdrop-blur-md shadow-lg shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Fullstack & 3D Interactive Web Developer</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Architecting <br />
              <span className="text-gradient-cyan">3D Visuals & Next-Gen</span> Digital Experiences.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Hi, I'm <strong className="text-white">Keerthan</strong> — a passionate engineer crafting high-performance web applications, immersive 3D graphics, and responsive UI design systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#work"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-semibold flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
              >
                <span>View My Work</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-pill text-zinc-200 font-semibold flex items-center justify-center gap-3 hover:text-cyan-400 transition-all"
              >
                <span>Get In Touch</span>
              </Link>

              <a
                href="#"
                className="p-4 rounded-2xl glass-pill text-zinc-400 hover:text-white transition-colors"
                title="Download Resume"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-cyan-400 font-bold text-2xl sm:text-3xl font-mono">
                  <Code2 className="w-5 h-5" /> 20+
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Projects Built</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-purple-400 font-bold text-2xl sm:text-3xl font-mono">
                  <Layers className="w-5 h-5" /> 3D
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Three.js / WebGL</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-pink-400 font-bold text-2xl sm:text-3xl font-mono">
                  <Cpu className="w-5 h-5" /> 100%
                </div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Clean Code</div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Interactive Canvas */}
          <div className="lg:col-span-5 relative">
            <DynamicHeroCanvas />
          </div>

        </div>
      </div>
    </section>
  );
}
