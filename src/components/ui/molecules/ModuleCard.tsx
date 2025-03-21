import { Module } from "@/types/courses";
import { Badge } from "../shadcn/badge";
import { ChevronRight } from "lucide-react";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
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
          {/* <div className="h-48"> */}
          <h1 className="mt-3 line-clamp-5 md:line-clamp-3">
            {module.short_description}
          </h1>
          {/* </div> */}
          {module.lessons.map((lesson) => {
            return (
              <div
                key={lesson.lesson_id}
                className="bg-slate-800 mt-3 px-3 py-1 rounded-md"
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
