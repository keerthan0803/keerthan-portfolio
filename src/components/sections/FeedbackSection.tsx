"use client";

import React, { useState } from "react";
import { MessageSquare, Star, Send, CheckCircle2, User, Quote } from "lucide-react";
import { FeedbackItem } from "@/types";

const initialFeedback: FeedbackItem[] = [
  {
    id: "1",
    name: "Alexander Wright",
    role: "Product Lead",
    company: "Metaverse Studios",
    content: "Keerthan transformed our WebGL product viewer. His attention to 3D lighting, physics, and smooth FPS optimization was incredible!",
    rating: 5,
    createdAt: "2026-06-15",
  },
  {
    id: "2",
    name: "Sophia Chen",
    role: "Engineering Director",
    company: "Aether AI Labs",
    content: "Outstanding fullstack craftsmanship! Keerthan delivered our Next.js dashboard ahead of schedule with flawless Prisma database integration.",
    rating: 5,
    createdAt: "2026-05-20",
  },
  {
    id: "3",
    name: "Marcus Vance",
    role: "Founder & CTO",
    company: "Vance Media",
    content: "The level of designer precision Keerthan brings to web development is unmatched. The 3D animations blew our users away.",
    rating: 5,
    createdAt: "2026-04-10",
  },
];

export function FeedbackSection() {
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>(initialFeedback);
  const [formData, setFormData] = useState({ name: "", role: "", company: "", content: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;

    setSubmitting(true);
    setTimeout(() => {
      const newItem: FeedbackItem = {
        id: Date.now().toString(),
        name: formData.name,
        role: formData.role || "Client",
        company: formData.company || "Independent",
        content: formData.content,
        rating: formData.rating,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setFeedbackList([newItem, ...feedbackList]);
      setFormData({ name: "", role: "", company: "", content: "", rating: 5 });
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }, 600);
  };

  return (
    <section id="feedback" className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>CLIENT & COMMUNITY FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            What Clients <span className="text-gradient-cyan">Say About My Work</span>.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Real feedback from collaborators, engineering leads, and clients across 3D & web projects.
          </p>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {feedbackList.map((item) => (
            <div
              key={item.id}
              className="glass-card p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/40 relative group"
            >
              <Quote className="w-10 h-10 text-cyan-500/20 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                  <div className="w-full h-full bg-black rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-zinc-400 font-mono">{item.role} • {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Feedback Form */}
        <div className="max-w-2xl mx-auto glass-card p-8 sm:p-10 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Send className="w-5 h-5 text-cyan-400" /> Leave Your Feedback
          </h3>
          <p className="text-xs text-zinc-400 mb-6">
            Worked with me or explored my projects? Share your feedback below!
          </p>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              Thank you! Your feedback has been posted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Role & Company</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Founder @ Startup"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Feedback Content *</label>
              <textarea
                required
                rows={3}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Share your experience or thoughts..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white font-semibold text-sm hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
