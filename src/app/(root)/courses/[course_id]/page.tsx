"use client";

import { useParams } from "next/navigation";
import {
  getCourse,
  checkCourseRegistration,
  enrollCourse,
} from "@/lib/data/courseDetail";
import { Button } from "@/components/ui/shadcn/button";
import { useState, useEffect } from "react";
import { Course } from "@/types/courses";
import CreatorInformation from "@/components/ui/molecules/CreatorInformation";
import StudyProgress from "@/components/ui/molecules/StudyProgress";
import ModuleCard from "@/components/ui/molecules/ModuleCard";
import { useAuth } from "../../providers";
import { Loader2 } from "lucide-react";

export default function CourseOverview() {
  const params = useParams();
  const courseId = params.course_id;
  const [data, setData] = useState<Course | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isEnrolled, setEnrolled] = useState(false);
  const [isLoadingEnrollment, setIsLoadingEnrollment] = useState(false);
  // Add a new state to track if enrollment should be triggered
  const [shouldEnroll, setShouldEnroll] = useState(false);
  const { user } = useAuth();

  if (!courseId || courseId instanceof Array) {
    return <div>Course not found</div>;
  }

  // First useEffect to load course data and check enrollment status
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCourse(courseId);
        setData(data);

        if (user?.uid) {
          const enrolled = await checkCourseRegistration(courseId, user.uid);
          setEnrolled(enrolled);
        }
      } catch (error) {
        console.error("Error loading course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, user?.uid]);

  // Second useEffect specifically for enrollment process
  useEffect(() => {
    // Only run if shouldEnroll is true and we're not already enrolled
    if (!shouldEnroll || isEnrolled || !user?.uid) return;

    const performEnrollment = async () => {
      try {
        setIsLoadingEnrollment(true);
        const enrollStatus = await enrollCourse(courseId, user.uid);

        if (enrollStatus) {
          setEnrolled(true);
        }
      } catch (err) {
        console.error("Enrollment failed:", err);
      } finally {
        setIsLoadingEnrollment(false);
        // Reset the enrollment trigger
        setShouldEnroll(false);
      }
    };

    performEnrollment();
  }, [shouldEnroll, isEnrolled, user?.uid, courseId]);

  // Function to trigger enrollment
  const triggerEnrollment = () => {
    if (!user?.uid || isLoadingEnrollment) return;
    setShouldEnroll(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading course details...</span>
      </div>
    );
  }

  if (!data) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <div className="md:px-12 w-auto">
        <div className="flex justify-center">
          <img
            src={data.image_url}
            alt={data.course_title}
            className="w-auto"
          />
        </div>
        <CreatorInformation
          profile_picture={data.creators.profile_picture}
          first_name={data.creators.first_name}
          last_name={data.creators.last_name}
          job_title={data.creators.job_title}
          company_name={data.creators.company_name}
        />
        <div className="md:flex md:justify-between">
          {/* course information */}
          <div className="md:w-2/6 md:pr-6">
            <h1 className="text-3xl font-extrabold mt-6">
              {data.course_title}
            </h1>
            <h1 className="mt-3 ">{data.short_description}</h1>

            {isEnrolled ? (
              <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
                <svg
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                You are enrolled in this course
              </div>
            ) : (
              <Button
                className="mt-3"
                variant={"default"}
                onClick={triggerEnrollment}
                disabled={isLoadingEnrollment || !user?.uid}
              >
                {isLoadingEnrollment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  "Enroll on course"
                )}
              </Button>
            )}

            {!user && (
              <p className="text-sm text-muted-foreground mt-2">
                Please sign in to enroll in this course.
              </p>
            )}
          </div>
          <div className="md:w-4/6 ">
            <StudyProgress
              // progress={data.progress}
              course_title={data.course_title}
            />
            {data.modules.map((module) => {
              return <ModuleCard key={module.module_id} module={module} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
