import { createClient } from "../supabase/client";
import { LessonWithRelations } from "@/types/lessonDetail";

export async function getLesson(
  lesson_id: string
): Promise<LessonWithRelations | null> {
  const supabase = await createClient();

  try {
    const { data: rawLessonData, error } = await supabase
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

    if (!rawLessonData) {
      console.log(`Lesson with id ${lesson_id} not found.`);
      return null;
    }

    const moduleData = rawLessonData.modules as any;
    const courseData = moduleData ? (moduleData.courses as any) : undefined;

    const lesson: LessonWithRelations = {
      lesson_id: rawLessonData.lesson_id,
      lesson_title: rawLessonData.lesson_title,
      sequence: rawLessonData.sequence,
      long_description: rawLessonData.long_description,
      image_url: rawLessonData.image_url,
      video_url: rawLessonData.video_url,
      module_id: rawLessonData.module_id,

      modules: moduleData
        ? {
            module_id: moduleData.module_id,
            module_title: moduleData.module_title,
            sequence: moduleData.sequence,
            course_id: moduleData.course_id,
            courses: courseData
              ? {
                  course_id: courseData.course_id,
                  course_title: courseData.course_title,
                }
              : undefined,
          }
        : undefined,
    };

    return lesson;
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
