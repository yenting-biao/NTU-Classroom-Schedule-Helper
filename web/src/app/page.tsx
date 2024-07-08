import csvParser from "csv-parser";
import fs from "fs";
import path from "path";

interface Course {
  id: string;
  name: string;
  instructor: string;
  room: string;
  time: string;
}

export default async function Home() {
  // Read csv file

  const getCourseData = async () => {
    return new Promise<Course[]>((resolve, reject) => {
      let data: Course[] = [];
      const filePath = path.join(process.cwd(), "public", "courses.csv");
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => {
          data.push({
            id: row["ID"],
            name: row["CourseName"],
            instructor: row["Instructor"],
            room: row["Building"],
            time: row["Time"],
          });
        })
        .on("end", () => {
          console.log("CSV file successfully processed");
          resolve(data); // Resolve the promise with the data once the stream is finished
        })
        .on("error", (error) => {
          console.error(error);
          reject(error); // Reject the promise if an error occurs
        });
    });
  };

  const courses = await getCourseData();
  // console.log("courses", courses);

  return (
    <main className="flex min-h-screen flex-col p-5 gap-5">
      {courses.map((course, i) => (
        <div
          key={i}
          className="p-5 border-2 border-gray-300 rounded-xl flex flex-col md:flex-row gap-3"
        >
          <h2 className="text-xl font-bold">{course.name}</h2>
          <p>{course.id}</p>
          <p>{course.instructor}</p>
          <p>{course.room}</p>
          <p>{course.time}</p>
        </div>
      ))}
    </main>
  );
}
