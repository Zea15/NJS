"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CoursesCard";

type CourseExplorerProps = {
    courses: Course[];
};

export default function CourseExplorer({ courses }: CourseExplorerProps) {
    const [keyword, setKeyword] = useState("");

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }
    const searchText = keyword.trim().toLowerCase();
    //เก็บผลการค้นหาไว้ที่ตัวแปรใหม่
    const visibleCourses = courses.filter(
        (course) =>
            //ค้นหาตามชื่อวิชา "หรือ" รหัสวิชา
            course.title.toLowerCase().includes(searchText) ||
            course.code.includes(searchText)
    );
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]); 
 
function handleToggleFavorite(id: number) { 
  setFavoriteIds((prevIds) => 
    prevIds.includes(id) 
      ? prevIds.filter((favoriteId) => favoriteId !== id) 
      : [...prevIds, id] 
  ); 
}
    return (
        <div>
            <input
                type="search"
                aria-label="ค้นหารายวิชา"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
            />

            {visibleCourses.length === 0 ? (
                <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
            ) : (
                <section>
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            isFavorite={favoriteIds.includes(course.id)}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    ))}
                </section>
            )}
        </div>
    );
} 