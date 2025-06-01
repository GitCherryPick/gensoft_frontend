"use client";
import { useState, useEffect } from "react";
import { getAllSubmissions, getAllTasksLabs } from "@/lib/sandbox/sandbox-service";
import CardTask from "./CardsTasks.jsx"

export default function ReviewLabsPage() {

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="text-2xl font-bold p-4">Ejercicios de Laboratorio</div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 mb-10">
        <CardTask />
      </div>
    </div>
  )
}