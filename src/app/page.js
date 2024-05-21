"use client";
import AllForm from "@/components/AllForm";
import Footer from "@/components/Footer";
import React from "react";

const page = () => {
  return (
    <main className="w-full flex flex-col gap-0 overflow-hidden">
      <AllForm />
      <Footer />
    </main>
  );
};

export default page;
