import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import GallerySection from "./components/GallerySection";
import RejestracjaSection from "./components/RejestracjaSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="text-[#1B2C28] font-sans antialiased selection:bg-[#146B5D] selection:text-white flex flex-col relative overflow-x-clip bg-[#FAF9F6]">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <RejestracjaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
