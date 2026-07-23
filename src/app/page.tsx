import React from "react";
import { ParticleBackground } from "@/components/3d/ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { FeedbackSection } from "@/components/sections/FeedbackSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030308] text-slate-100 selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* Ambient 3D Particle Space & Glow Grid */}
      <ParticleBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Core Page Sections */}
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <SkillsSection />
      <FeedbackSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
