"use client";

import { TypographyH3 } from "./TypographyH3";
import { Button } from "../shadcn/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/(root)/providers";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface LastProgress {
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
}

export default function TitleCard() {
  const { user } = useAuth();
  const router = useRouter();

  const [lastProgress, setLastProgress] = useState<LastProgress | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchLastProgress = async () => {
      try {
        const { data, error } = await supabase
          .from("users_lessons")
          .select(
            `
          courses (course_id, course_title),
          lessons (lesson_id, lesson_title)            
          `
          )
          .eq("user_id", user?.uid)
          .order("created_at", { ascending: false })
          .limit(1);

        if (error) {
          console.error("Supabase error fetching progress:", error);
          throw new Error("Error fetching progress");
        }

        const latestProgress = data[0];

        const courseData = Array.isArray(latestProgress.courses)
          ? latestProgress.courses[0]
          : latestProgress.courses;
        const lessonData = Array.isArray(latestProgress.lessons)
          ? latestProgress.lessons[0]
          : latestProgress.lessons;

        if (data) {
          setLastProgress({
            courseId: courseData?.course_id ?? null,
            courseTitle: courseData?.course_title ?? null,
            lessonId: lessonData?.lesson_id ?? null,
            lessonTitle: lessonData?.lesson_title ?? null,
          });
        }

        user?.name
          ? setFirstName(user?.name.split(" ")[0])
          : setFirstName(null);
      } catch (error) {
        console.error("Unexpected error fetching progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLastProgress();
  }, []);

  const handleLastLesson = async () => {
    router.push(
      `/courses/${lastProgress?.courseId}/lessons/${lastProgress?.lessonId}`
    );
  };

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="w-auto">
        <div className="mt-4 p-4 bg-slate-50 rounded-xl  w-auto">
          <TypographyH3>
            Welcome back{" "}
            <a className="text-blue-700">{firstName ?? user?.name}</a>, continue
            where you left off?
          </TypographyH3>
          <div className="md:flex mt-4">
            <div className="md:px-3 block md:hidden ">
              <h1 className="font-bold">{lastProgress?.courseTitle}</h1>
              <h1 className="font-bold text-blue-700">
                {lastProgress?.lessonTitle}
              </h1>
            </div>
            <Button className="cursor-pointer" onClick={handleLastLesson}>
              Continue course{" "}
            </Button>
            <div className="px-3 hidden md:block">
              <h1 className="font-bold">{lastProgress?.courseTitle}</h1>
              <h1 className="font-bold text-blue-700">
                {lastProgress?.lessonTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
