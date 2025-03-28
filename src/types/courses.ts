export type Courses = Course[];
export type Modules = Module[];
export type Lessons = Lesson[];

export interface Lesson {
  lesson_id: string;
  lesson_title: string;
  short_description?: string;
  long_description?: string;
  image_url?: string;
  video_url?: string;
  sequence: number;
  module_id?: string;
  modules?: Module;
}

export interface LessonProgress {
  lesson_id: string;
  status: string;
}

export interface Module {
  module_id: string;
  lessons: Lesson[];
  duration: number;
  module_title: string;
  short_description: string;
  image_url: string;
  sequence: number;
  courses?: Course;
}

export interface Course {
  course_id: string;
  course_title: string;
  published_year: number;
  short_description: string;
  long_description: any;
  image_url: any;
  is_premium: boolean;
  intro_video_url: any;
  creator_id: string;
  created_at: string;
  updated_at: string;
  courses_categories: CoursesCategory[];
  creators: Creator;
  modules: Module[];
  users_lessons: LessonProgress[];
}

export interface CoursesCategory {
  categories: Categories;
}

export interface Categories {
  id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
}

export interface Creator {
  company_logo: string;
  company_name: string;
  first_name: string;
  last_name: string;
  job_title: string;
  profile_picture: string;
}
