import { Course } from "@/types/course";

type CourseCardProps = {
  course: Course;
  description?: string;
  isFavorite: boolean; 
  onToggleFavorite: (id: number) => void; 

};

export default function CoursesCard({ course, description, isFavorite, onToggleFavorite, }: CourseCardProps) {
  return (
    <article key={course.id} className="courseCard">
      <h2>{course.title}</h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credits} หน่วยกิต</p>
      <p>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
      {description && <p>{description}</p>}
      <button 
        type="button" 
        aria-pressed={isFavorite} 
        onClick={() => onToggleFavorite(course.id)} 
      > 
        {isFavorite ? "อยู่ในรายการโปรด" : "เพิ่มเป็นรายการโปรด"} 
      </button> 

    </article>
  );
}