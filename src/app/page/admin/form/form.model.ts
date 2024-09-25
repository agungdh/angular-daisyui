export interface Form {
  id: string;
  order: number;
  name: string;
  duration_month: number;
  duration_day: number;
  age_restriction_month: number;
  age_restriction_day: number;
  gender: string;
  description: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}
