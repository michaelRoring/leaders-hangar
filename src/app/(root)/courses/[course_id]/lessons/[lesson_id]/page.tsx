"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { LessonWithRelations } from "@/types/lessonDetail";
import { getLesson, startLesson } from "@/lib/data/lessonDetail";
import { ResponsiveMarkdown } from "@/components/ui/molecules/ResponsiveMarkdown";
import { getNextLessonInformation } from "@/lib/data/lessonDetail";
import NextLessonCard from "@/components/ui/molecules/NextLessonCard";
import YouTube from "react-youtube";
import { useAuth } from "@/app/(root)/providers";
import { completeLesson } from "@/lib/data/lessonDetail";
import { ToastContainer, toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function LessonPage() {
  const params = useParams();
  const lessonId = params.lesson_id;
  const { user } = useAuth();

  const [courseId, setCourseId] = useState<string>("");
  const [lesson, setLesson] = useState<LessonWithRelations | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextLesson, setNextLesson] = useState({
    status: "",
    lesson_id: "",
    module_id: "",
    lesson_title: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (lessonId && typeof lessonId === "string") {
          const data = await getLesson(lessonId);

          if (!data) {
            setError("No lesson data returned");
            return;
          }

          if (!data.modules) {
            setError("Lesson module information is missing");
            return;
          }

          if (!data.modules.courses) {
            setError("Course information is missing");
            return;
          }

          setLesson(data);
          setCourseId(data.modules.courses.course_id);
        }
      } catch (error) {
        console.error("Error loading lesson data:", error);
        setError("Failed to load lesson data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  useEffect(() => {
    const fetchNextLesson = async () => {
      try {
        if (lessonId && typeof lessonId === "string") {
          const nextLesson = await getNextLessonInformation(lessonId);
          setNextLesson(nextLesson);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNextLesson();
  }, [lessonId]);

  function getYouTubeVideoId(url: string) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  }

  const handleVideoCompleted = async (event: any) => {
    if (
      !user?.uid ||
      !courseId ||
      !lessonId ||
      typeof courseId !== "string" ||
      typeof lessonId !== "string"
    )
      return;

    try {
      const result = await completeLesson(user.uid, courseId, lessonId);
      toast.success("Lesson completed successfully");
    } catch (error) {
      console.error("Error completing lesson:", error);
    }
  };

  const handleVideoStart = async (event: any) => {
    if (
      !user?.uid ||
      !courseId ||
      !lessonId ||
      typeof courseId !== "string" ||
      typeof lessonId !== "string"
    )
      return;

    try {
      const result = await startLesson(user.uid, courseId, lessonId);
    } catch (error) {
      console.error("Error starting lesson:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 ">Loading lesson details...</span>
      </div>
    );
  }

  if (!lesson) {
    return <div>Lesson not found. Error: {error}</div>;
  }

  return (
    <>
      {/* image/video section */}
      <div className="flex items-center justify-center ">
        {lesson.video_url && getYouTubeVideoId(lesson.video_url) && (
          <YouTube
            videoId={getYouTubeVideoId(lesson.video_url)!}
            opts={{
              width: "100%",
              height: "100%",
              playerVars: {
                autoplay: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
            //   onStateChange={handlePlayerStateChange}
            className="md:w-1/2 aspect-video rounded-xl"
            onPlay={handleVideoStart}
            onEnd={handleVideoCompleted}
          />
        )}
      </div>

      <div className="block md:hidden">
        <NextLessonCard
          status={nextLesson.status}
          nextLessonTitle={nextLesson.lesson_title}
          nextLessonId={nextLesson.lesson_id}
          courseId={nextLesson.module_id}
        />
      </div>
      <div className="flex">
        <div className="md:w-8/12">
          <ResponsiveMarkdown content={lesson?.long_description} />
        </div>
        <div className="hidden md:block md:w-1/12"></div>
        <div className="hidden md:block md:w-3/12">
          <NextLessonCard
            status={nextLesson.status}
            nextLessonTitle={nextLesson.lesson_title}
            nextLessonId={nextLesson.lesson_id}
            courseId={nextLesson.module_id}
          />
        </div>
      </div>
      <ToastContainer className="rounded-2xl" />
    </>
  );
}
