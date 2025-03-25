export interface LessonWithRelations {
  lesson_id: string;
  lesson_title: string;
  sequence: number;
  long_description: string;
  image_url?: string;
  video_url?: string;
  module_id: string;

  // Extract first element from arrays
  module?: {
    module_id: string;
    module_title: string;
    sequence: number;
    course_id: string;
    course?: {
      course_id: string;
      course_title?: string;
    };
  };
}
