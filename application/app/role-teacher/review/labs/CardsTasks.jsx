"use client";
import { useState, useEffect } from "react";
import { getAllSubmissions, getAllTasksLabs } from "@/lib/sandbox/sandbox-service";
import CardCollapse from './CardCollapse';

export default function CardTask() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const obtainAllTasks = async () => {
      const allTasks = await getAllTasksLabs();
      setTasks(allTasks);
      console.log(allTasks);
    }
    obtainAllTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className="bg-gradient-to-br from-slate-800 to-indigo-900 border border-slate-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300" 
        >
          <CardCollapse element={task} />
        </div>
      ))}
    </div>
  )
}