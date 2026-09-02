import CoursesCard from "@/components/CoursesCard";
import { Course } from "@/types/course";
import { courses } from "@/data/coursesdata";


export default function CoursesPage() {


 

    return (
    <main className="page"> 
      <h1>รายวิชาทั้งหมด</h1> 

        <div className="courseGrid">
            {courses.map((course, index) => (
              <CoursesCard key={index} course={course}/>
            ))}
        </div>
    </main>
    );
}