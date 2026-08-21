import { count } from "console";
import { Main } from "next/document";
import Image from "next/image";

export default function HomePage() {
  const siteName: string = "Student Course Hub"; 
  const courseCount: number = 3; 
  const isOpen: boolean = true; 
  const topics: string[] = [ 
  "HTML", 
  "CSS", 
  "TypeScript", 
  "Next.js", 
]; 
type Course = { 
  id: number; 
  code: string; 
  title: string; 
  credits: number; 
  isOpen: boolean; 
}; 
 
const courses: Course[] = [{ 
  id: 1, 
  code: "10301231", 
  title: "Web Technology", 
  credits: 3, 
  isOpen: true, 
},
{ 
    id: 2, 
    code: "10301232", 
    title: "Database Systems", 
    credits: 3, 
    isOpen: false, 
  },
{ 
    id: 3, 
    code: "10301206", 
    title: "Sys net", 
    credits: 3, 
    isOpen: false, 
  },
{ 
    id: 4, 
    code: "10301207", 
    title: "Data Systems", 
    credits: 3, 
    isOpen: false, 
  },
{ 
    id: 5, 
    code: "10301201", 
    title: " Systems", 
    credits: 3, 
    isOpen: true, 
  },
];
  return (
<main className="page">
  <h1>{siteName}</h1> 
      <p>จำนวนรายวิชา: {courseCount}</p> 
      <p>สถานะระบบ: {isOpen ? "เปิดใช้งาน" : "ปิดใช้งาน"}</p>
      <ul> 
  {topics.map((topic) => ( 
    <li key={topic}>{topic}</li> 
  ))} 
</ul>
{courses.map((course,index) => (
<article key={course.id} className="courseGrid"> 
  <h2>{index+1}{course.title}</h2> 
  <p>รหัสวิชา: {course.code}</p> 
  <p>{course.credits} หน่วยกิต</p> 
  <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p> 
</article>
))}
</main>

  );
}
