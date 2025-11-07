import { Header } from "@/components/Header";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}