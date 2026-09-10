//"use client"; 
import CoursesCard from "@/components/CoursesCard";
import { Course } from "@/types/course";
import { courses } from "@/data/coursesdata";

import type { Metadata } from "next";
import CourseExplorer from "@/components/CourseExplorer";
export const metadata: Metadata = { 
  title: "รายวิชาทั้งหมด",
 
}; 
export default function CoursesPage() {


 

    return (
    <main className="page">
      <h1>รายวิชาทั้งหมด</h1>
      <CourseExplorer courses={courses} />
       

        {/*<div className="courseGrid">
            {courses.map((course, index) => (
              <CoursesCard key={index} course={course}/>
            ))}
        </div>*/}
    </main>
    );
}