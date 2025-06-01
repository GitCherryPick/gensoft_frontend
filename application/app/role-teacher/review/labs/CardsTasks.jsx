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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
      {tasks.map((task) => (
        <div key={task.id} className="border border-gray-600 bg-slate-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow" >
          <CardCollapse element={task} />
        </div>
      ))}
    </div>
  )
}