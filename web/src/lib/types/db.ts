export interface CourseTime {
  weeks: number[];
  day: number;
  start_time: string;
  end_time: string;
}

export interface Course {
  id: string;
  name: string;
  instructor: string;
  room: string;
  time: CourseTime[];
}
