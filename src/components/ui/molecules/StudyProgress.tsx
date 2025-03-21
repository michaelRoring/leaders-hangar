interface StudyProgressProps {
  progress?: number;
  course_title: string;
}

export default function StudyProgress({
  course_title,
  progress,
}: StudyProgressProps) {
  return (
    <>
      <div className=" bg-blue-100 rounded-xl ">
        <div className="mt-6 p-3">
          {/* heading */}
          <h1 className="text-xl font-bold">
            Your Study Progress{" "}
            <a className="text-blue-500">{progress ?? 0}%</a>
          </h1>
          {/* progress bar */}
          <div className="w-full bg-white rounded-full h-4 my-3">
            <div
              className="bg-blue-700 h-4 rounded-full"
              style={{ width: `${progress ?? 0}%` }}
            ></div>
          </div>
          {/* subheading */}
          <div className="bg-white rounded-xl shadow-xl p-3">
            {progress ? (
              <h1>
                Great Job 🥳 You’re on the path to becoming a master at{" "}
                <a>{course_title}</a>. Your dedication to learning is impressive
                Finish Strong!
              </h1>
            ) : (
              <h1>
                Enroll to get deeper understanding of <a>{course_title}</a>{" "}
                provided by our experts.
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
