export interface Student {
  id: string;
  name: string;
  cohort_id: string;
  date_joined: string;
  last_login: string;
  status: boolean;
  courses: Course[];
}

export interface Course {
  id: string;
  name: string;
}

export interface Cohort {
  id: string;
  name: string;
}

export interface StudentFormData {
  name: string;
  cohort_id: string;
  course_ids: string[];
}