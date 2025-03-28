import { createClient } from "../supabase/client";
import { LessonWithRelations } from "@/types/lessonDetail";

export async function getLesson(
  lesson_id: string
): Promise<LessonWithRelations | null> {
  const supabase = await createClient();

  try {
    const { data: rawLesson, error } = await supabase
      .from("lessons")
      .select(
        `
      lesson_id,
      lesson_title,
      sequence,
      long_description,
      image_url,
      video_url,
      module_id,
      modules!inner (
        module_id,
        module_title,
        sequence,
        course_id,
        courses!inner (
          course_id,
          course_title
        )
      )
  
    `
      )
      .eq("lesson_id", lesson_id)
      .single();

    if (error) {
      throw error;
    }

    // Transform the data to match your interface

    // const lesson: LessonWithRelations = {
    //   ...rawLesson,
    //   // If you want to keep the array structure:
    //   // modules: rawLesson.modules,

    //   // OR if you want to extract just the first module/course:
    //   // module: rawLesson.modules[0] ? {
    //   //   ...rawLesson.modules[0],
    //   //   course: rawLesson.modules[0].courses[0] || undefined
    //   // } : undefined
    // };
    return rawLesson;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getNextLessonInformation(currentLessonId: string) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("get_next_lesson", {
      current_lesson_id: currentLessonId,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function completeLesson(
  userId: string,
  courseId: string,
  lessonId: string
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("users_lessons").upsert(
      {
        user_id: userId,
        course_id: courseId,
        lesson_id: lessonId,
        modified_at: new Date().toISOString(),
        status: "completed",
      },
      {
        onConflict: "user_id, lesson_id",
      }
    );

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function startLesson(
  userId: string,
  courseId: string,
  lessonId: string
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("users_lessons").upsert({
      user_id: userId,
      course_id: courseId,
      lesson_id: lessonId,
      modified_at: new Date().toISOString(),
      status: "in_progress",
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
