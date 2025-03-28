"use client";

import { Module } from "@/types/courses";
import { Badge } from "../shadcn/badge";
import { ChevronRight, CheckCheck, NotebookPen } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { LessonProgress } from "@/types/courses";

interface ModuleCardProps {
  module: Module;
  lessonProgress?: LessonProgress[];
}

export default function ModuleCard({
  module,
  lessonProgress,
}: ModuleCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (lessonId: string) => {
    router.push(`${pathname}/lessons/${lessonId}`);
  };

  return (
    <>
      <div className="border border-slate-200 rounded-xl p-6 flex mt-6">
        <img
          src={module.image_url}
          alt={module.module_title}
          className=" object-cover rounded-2xl shadow-2xl mr-6 w-32 h-48 md:w-48 md:h-48 object-left"
        />
        {/* module information */}
        <div>
          {/* badge information */}
          <div className="flex gap-3">
            <Badge>Module {module.sequence}</Badge>
            <Badge variant="secondary">{module.duration} minutes</Badge>
          </div>
          <h1 className="text-xl font-bold mt-3">{module.module_title}</h1>
          <h1 className="mt-3 line-clamp-5 md:line-clamp-3">
            {module.short_description}
          </h1>
          {module.lessons.map((lesson) => {
            const isCompleted = lessonProgress?.find(
              (progress) => progress.lesson_id === lesson.lesson_id
            );

            if (isCompleted?.status === "completed") {
              return (
                <div
                  key={lesson.lesson_id}
                  className="bg-slate-400 mt-3 px-3 py-1 rounded-md hover:bg-slate-500 cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => handleClick(lesson.lesson_id)}
                >
                  <div className="flex md:justify-between">
                    <div className="flex gap-3">
                      <CheckCheck className="text-white" />
                      <h1 className="text-white">{lesson.lesson_title}</h1>
                    </div>
                    <ChevronRight className="text-white" />
                  </div>
                </div>
              );
            }

            if (isCompleted?.status === "in_progress") {
              return (
                <div
                  key={lesson.lesson_id}
                  className="bg-green-500 mt-3 px-3 py-1 rounded-md hover:bg-green-600 cursor-pointer transition-all duration-300 ease-in-out"
                  onClick={() => handleClick(lesson.lesson_id)}
                >
                  <div className="flex md:justify-between">
                    <div className="flex gap-3">
                      <NotebookPen className="text-white" />
                      <h1 className="text-white">{lesson.lesson_title}</h1>
                    </div>
                    <ChevronRight className="text-white" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={lesson.lesson_id}
                className="bg-slate-800 mt-3 px-3 py-1 rounded-md hover:bg-slate-500 cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => handleClick(lesson.lesson_id)}
              >
                <div className="flex md:justify-between">
                  <h1 className="text-white">{lesson.lesson_title}</h1>
                  <ChevronRight className="text-white" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
