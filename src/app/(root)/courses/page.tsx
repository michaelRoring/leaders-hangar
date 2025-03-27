import CourseCard from "@/components/ui/molecules/CourseCard";
import { Course } from "@/types/courses";
import { getCourses } from "@/lib/data/courses";
import TitleCard from "@/components/ui/molecules/TitleCard";

export default async function Courses() {
  const data = await getCourses();

  return (
    <>
      <TitleCard />
      <h1 className="text-2xl font-bold mt-6">All Courses</h1>
      <div className="mt-6 md:grid md:grid-cols-3 md:gap-6">
        {data?.map((course: Course) => {
          return <CourseCard key={course.course_id} course={course} />;
        })}
      </div>
    </>
  );
}
