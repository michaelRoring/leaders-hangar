import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";

type LessonProgress = {
  courseId: string | null;
  courseTitle: string | null;
  lessonId: string | null;
  lessonTitle: string | null;
} | null;

type UserStoreState = {
  lessonLastViewed: LessonProgress;
  isLoading: boolean;
  error: any | null;
  fetchLastLessonProgress: (userId: string) => Promise<void>;
  clearProgress: () => void;
};

export const useUserStore = create((set) => ({
  lessonLastViewed: null,
  isLoading: false,
  error: null,

  fetchLastLessonProgress: async (userId: string) => {
    if (!userId) {
      console.warn("fetchLastLessonProgress called without userId.");
      return;
    }

    const supabase = createClient();
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase
        .from("users_lessons")
        .select(
          `
            courses (course_id, course_title),
            lessons (lesson_id, lesson_title)            
            `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1);

      if (error) {
        console.error("Supabase error fetching progress:", error);
        set({ error: error, isLoading: false });
        return;
      }

      if (data && data.length > 0) {
        const latestProgress = data[0];

        const courseData = Array.isArray(latestProgress.courses)
          ? latestProgress.courses[0]
          : latestProgress.courses;
        const lessonData = Array.isArray(latestProgress.lessons)
          ? latestProgress.lessons[0]
          : latestProgress.lessons;

        set({
          lessonLastViewed: {
            courseId: courseData?.course_id ?? null,
            courseTitle: courseData?.course_title ?? null,
            lessonId: lessonData?.lesson_id ?? null,
            lessonTitle: lessonData?.lesson_title ?? null,
          },
          isLoading: false,
          error: null,
        });
      } else {
        set({ lessonLastViewed: null, isLoading: false, error: null });
      }
    } catch (error) {
      console.error("Unexpected error fetching progress:", error);
      set({
        error:
          error instanceof Error
            ? error
            : new Error("An unknown error occurred"),
        isLoading: false,
      });
    }
  },
}));
