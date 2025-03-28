"use client";
import { Button } from "@/components/ui/shadcn/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface NextLessonCardProps {
  status: string;
  nextLessonTitle: string;
  nextLessonId: string;
  courseId: string;
}

export default function NextLessonCard({
  status,
  nextLessonTitle,
  nextLessonId,
  courseId,
}: NextLessonCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/courses/${courseId}/lessons/${nextLessonId}`);
  };

  if (status == "course_completed") {
    return (
      <div className="border border-slate-400 rounded-lg  mt-6">
        <div className="bg-slate-100 text-center rounded-lg py-3">
          <h1 className="font-semibold">End of course</h1>
        </div>
        <div className="text-center py-6">
          <h1 className="text-xl font-bold">Final lesson</h1>
        </div>
        <div className="text-center pb-3"></div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-slate-400 rounded-lg  mt-6">
        <div className="bg-slate-100 text-center rounded-lg py-3">
          <h1 className="font-semibold">Up next</h1>
        </div>
        <div className="text-center py-6">
          <h1 className="text-xl font-bold px-3">{nextLessonTitle}</h1>
        </div>
        <div className="text-center pb-3">
          <Button onClick={handleClick}>
            Next lesson <ChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
}
