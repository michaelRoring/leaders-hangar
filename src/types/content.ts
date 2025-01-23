export interface Content {
  content_id: string;
  content_title: string;
  published_year: number;
  short_description: string;
  long_description: string;
  download_url: string;
  is_blueprint: boolean;
  image_url: string;
  is_premium: boolean;
  minutes_read: number;
  features: any[];
  previews: any[];
  creator_id: string;
  created_at: string;
  updated_at: string;
  category_id: string;
  categories: Category;
  creators: Creator;
  thumbnail_image: string;
}

export interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  category_name: string;
}

export interface Creator {
  uid: string;
  job_title: string;
  last_name: string;
  created_at: string;
  first_name: string;
  updated_at: string;
  company_logo: string;
  company_name: string;
  email_address: string;
  profile_picture: string;
}
