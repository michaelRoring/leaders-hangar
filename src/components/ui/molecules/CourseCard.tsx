"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Badge } from "../shadcn/badge";
import { LuCalendarArrowUp } from "react-icons/lu";
import { Course } from "@/types/courses";

export default function CourseCard({ course }: { course: Course }) {
  const router = useRouter();

  const handleClickCourse = (course_id: string) => {
    router.push(`/courses/${course_id}`);
  };

  return (
    <>
      <div className="mt-6">
        <Card className="">
          <div className="flex ml-6 my-3 gap-3 ">
            {course.courses_categories.map((category) => {
              return (
                <Badge className="" key={category.categories.id}>
                  {category.categories.category_name}
                </Badge>
              );
            })}
          </div>

          <CardContent>
            <img src={course.image_url} alt="blueprint" className="h-52 " />
          </CardContent>
          <CardHeader>
            <CardTitle className="line-clamp-2 h-14">
              {course.course_title}
            </CardTitle>
            <CardDescription className="line-clamp-3 h-16">
              {course.short_description}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between ">
            <img
              src={course.creators.company_logo}
              alt={course.creators.company_name}
              className="w-20 object-cover"
            />
            <div className="flex gap-3 items-center">
              <LuCalendarArrowUp className="h-8 w-8 " />
              <Button
                onClick={() => handleClickCourse(course.course_id)}
                className="whitespace-nowrap"
              >
                Learn
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
