"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import Solutions from "@/components/home/Solutions";
import PayAsYouGo from "@/components/home/PayAsYouGo";
import Patents from "@/components/home/Patents";
import Testimonials from "@/components/home/Testimonials";
import MadeInIndia from "@/components/home/MadeInIndia";
import NewsSection from "@/components/home/NewsSection";
import CareersCTA from "@/components/home/CareersCTA";
import ContactCTA from "@/components/home/ContactCTA";



// Heavy components - lazy load (ssr: false needs "use client")
const MissionPin = dynamic(() => import("@/components/home/MissionPin"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), { ssr: false });
const Industries = dynamic(() => import("@/components/home/Industries"), { ssr: false });

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <MissionPin />
      <Solutions />
      <HowItWorks />
      <Industries />
      <PayAsYouGo />
      <Patents />
      <Testimonials />
      <MadeInIndia />
      <NewsSection />
      <CareersCTA />
      <ContactCTA />
    </>
  );
}
