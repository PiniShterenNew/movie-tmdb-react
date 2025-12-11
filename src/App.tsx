import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { SearchPage } from "@/features/search";
import { MovieModalFullScreen } from "@/features/movie-details";
import { DiscoveryPage } from "@/features/discovery";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0e0e0f] text-[#f2f2f2] font-sans antialiased rtl text-right">
      {/* Modern Header */}
      <Header />

      <Routes>
        <Route path="/" element={<DiscoveryPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>

      {/* Full Screen Movie Modal */}
      <MovieModalFullScreen />
    </div>
  );
}
