export type Courses = Course[];

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
}
