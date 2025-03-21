import CourseCard from "@/components/ui/molecules/CourseCard";
import { Course } from "@/types/courses";
import { getCourses } from "@/lib/data/courses";

export default async function Courses() {
  const data = await getCourses();

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
