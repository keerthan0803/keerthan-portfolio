"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, LayoutDashboard, FolderGit2, MessageSquare, Plus, LogOut, Eye, CheckCircle, Trash2, ArrowLeft } from "lucide-react";
import { ParticleBackground } from "@/components/3d/ParticleBackground";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "feedback">("overview");

  return (
    <main className="relative min-h-screen bg-[#030308] text-slate-100 p-4 sm:p-8">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="glass-card p-6 rounded-3xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-black/90 rounded-[11px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Portfolio Admin Dashboard</h1>
              <p className="text-xs text-zinc-400 font-mono">Status: Authenticated as System Administrator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl glass-pill text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> View Public Site
            </Link>

            <Link
              href="/admin/login"
              className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono hover:bg-rose-500/20 flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 max-w-md">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center justify-center gap-2 ${
              activeTab === "overview"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" /> Overview
          </button>

          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center justify-center gap-2 ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" /> Projects (6)
          </button>

          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex-1 py-2 rounded-xl text-xs font-medium font-mono transition-all flex items-center justify-center gap-2 ${
              activeTab === "feedback"
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Feedback (3)
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                  <span>TOTAL VIEWS</span>
                  <Eye className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">14,820</div>
                <p className="text-xs text-cyan-400">+12% from last week</p>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                  <span>PUBLISHED PROJECTS</span>
                  <FolderGit2 className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">6</div>
                <p className="text-xs text-purple-400">3 Featured 3D projects</p>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                  <span>SUBMITTED FEEDBACK</span>
                  <MessageSquare className="w-4 h-4 text-pink-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">3</div>
                <p className="text-xs text-pink-400">100% Approval Rate</p>
              </div>

              <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                  <span>SYSTEM HEALTH</span>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">99.9%</div>
                <p className="text-xs text-emerald-400">Prisma & Next.js Operational</p>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-lg font-bold text-white">System Activity Log</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>New client contact inquiry received</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">10 mins ago</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Updated Quantum 3D Web Engine project details</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-400" />
                    <span>Approved testimonial from Sophia Chen</span>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS */}
        {activeTab === "projects" && (
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Project Management</h3>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg">
                <Plus className="w-4 h-4" /> Add New Project
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-zinc-300">
                <thead className="text-xs font-mono text-zinc-500 border-b border-white/10 uppercase">
                  <tr>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Quantum 3D Web Engine</td>
                    <td className="py-4 px-4 font-mono text-xs text-cyan-400">3D / WebGL</td>
                    <td className="py-4 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">Published</span></td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-zinc-400 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Nexus SaaS Analytics Platform</td>
                    <td className="py-4 px-4 font-mono text-xs text-purple-400">Fullstack</td>
                    <td className="py-4 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">Published</span></td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-zinc-400 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Aether AI Prompt Assistant</td>
                    <td className="py-4 px-4 font-mono text-xs text-pink-400">AI & Tools</td>
                    <td className="py-4 px-4"><span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">Published</span></td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-zinc-400 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: FEEDBACK */}
        {activeTab === "feedback" && (
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 animate-in fade-in">
            <h3 className="text-lg font-bold text-white">Community Feedback Moderation</h3>
            
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Alexander Wright</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Approved</span>
                </div>
                <p className="text-sm text-zinc-300">"Keerthan transformed our WebGL product viewer..."</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Sophia Chen</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">Approved</span>
                </div>
                <p className="text-sm text-zinc-300">"Outstanding fullstack craftsmanship!"</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
