import { createClient } from "../supabase/client";
import { Course } from "@/types/courses";

export async function getCourse(course_id: string): Promise<Course | null> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("courses")
      .select(
        `
      *,
      courses_categories (
        categories (
          *
        )
      ),
      creators (
        *
      ),
    modules (
      module_title,
      short_description,
      image_url,
      duration,
      sequence,
        lessons (
          lesson_id,
          lesson_title,
          short_description,
          sequence
        )
      )
    `
      )
      .eq("course_id", course_id)
      .order("sequence", { foreignTable: "modules" })
      .order("sequence", { foreignTable: "modules.lessons" })
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function checkCourseRegistration(
  course_id: string,
  user_id: string
): Promise<boolean> {
  if (!user_id || !course_id) {
    return false;
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .eq("course_id", course_id)
      .eq("user_id", user_id)
      .single();

    if (error) {
      throw error;
    }
    return data ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function enrollCourse(
  course_id: string,
  user_id: string
): Promise<boolean> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("enrollments")
      .insert({
        course_id: course_id,
        user_id: user_id,
      })
      .select()
      .single();

    return !!data;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getCourseCompletionPercentage(
  userId: string,
  courseId: string
): Promise<number> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_course_completion_percentage",
    { p_user_id: userId, p_course_id: courseId }
  );

  const integerPercentage = Math.floor(data);

  if (error) {
    console.error("Error getting completion percentage:", error);
    return 0;
  }

  return integerPercentage;
}

export async function like(
  userId: string,
  contentId: string,
  contentType: string
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("likes")
      .upsert({
        user_id: userId,
        content_id: contentType === "content" ? contentId : null,
        course_id: contentType === "course" ? contentId : null,
      })
      .single();

    if (error) throw error;

    console.log("data :", data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function bookmark(
  userId: string,
  contentId: string,
  contentType: string
) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("bookmarks")
      .upsert({
        user_id: userId,
        content_id: contentType === "content" ? contentId : null,
        course_id: contentType === "course" ? contentId : null,
      })
      .single();

    if (error) throw error;

    console.log("data :", data);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
