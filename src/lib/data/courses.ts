import { createClient } from "../supabase/server";
import { Courses, Course } from "@/types/courses";

export async function getCourses(): Promise<Courses | null> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("courses").select(`
    *,
    courses_categories (
      categories (
        *
      )
    ),
    creators (
      company_logo,
      company_name
    )
    
  `);

  if (error) {
    console.log(error);
  }

  return data;
}
