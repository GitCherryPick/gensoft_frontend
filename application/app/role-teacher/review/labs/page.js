"use client";
import { useState, useEffect } from "react";
import { getAllSubmissions, getAllTasksLabs } from "@/lib/sandbox/sandbox-service";
import CardTask from "./CardsTasks.jsx"

export default function ReviewLabsPage() {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="text-3xl font-bold px-6 py-4 border-b border-slate-700 shadow-sm">
        Ejercicios de Laboratorio
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 mb-10 mt-4 ">
        <CardTask />
      </div>
    </div>
  );
}
