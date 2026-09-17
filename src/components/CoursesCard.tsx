import { Course } from "@/types/course";
import Link from "next/link";
 

type CourseCardProps = {
  course: Course;
  description?: string;
  //isFavorite: boolean; 
  //onToggleFavorite: (id: number) => void; 
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard( 
  { course, onEdit, onDelete }: CourseCardProps 
) { 

  return (
    <article key={course.id} className="courseCard">
      <h2>{course.name}</h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credit} หน่วยกิต</p>
      <p>ผู้สอน: {course.instructor}</p>
      
      
      <h2> 
        <Link href={`/courses/${course.id}`}>{course.name}</Link> 
      </h2> 
      <p>{course.code}</p> 
      <button type="button" onClick={onEdit}>แก้ไข</button> 
      <button type="button" onClick={onDelete}>ลบ</button> 

    </article>
  );
}