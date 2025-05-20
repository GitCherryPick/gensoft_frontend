"use client";
import TaskHeader from "./TaskHeader";
import ReplicatorBody from "./ReplicatorBody";
import { getAllTaskCodes } from "@/lib/tasks-teacher/task-service";
import { useEffect, useState } from "react";

export default function CodeTask({
  task_id = 4
}) {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  useEffect(()=>{
    getAllTaskCodes().then((data)=>{
      console.log(data);
      setTask(data.find((task) => task.id === task_id));
    });
  }, []);

  return (
    <div className="flex flex-col w-full h-screen overflow-auto">
      <div className="p-6">
        <TaskHeader title={task.title} description={task.description} />
      </div>
      <ReplicatorBody task_id={task_id} />
      
    </div>
  );
}
