import { createClient } from "@/lib/supabase/server";
import CourseCard from "@/components/ui/molecules/CourseCard";
import { Course } from "@/types/courses";

export default async function Courses() {
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

  return (
    <>
      <h1 className="text-4xl">This is Course page</h1>
      <h1>in development</h1>
      <div className="mt-6 md:grid md:grid-cols-3 md:gap-6">
        {data?.map((course: Course) => {
          return <CourseCard key={course.course_id} course={course} />;
        })}
      </div>
    </>
  );
}
