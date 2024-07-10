export interface CourseTime {
  weeks: number[];
  day: number;
  start_time: string;
  end_time: string;
}

export interface Course {
  _id: string; // mongodb id
  id: string; // course id
  name: string;
  instructor: string;
  room: string;
  time: CourseTime[];
}
