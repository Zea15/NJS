"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "@/types/course";
import CourseCard from "@/components/CoursesCard";
import CourseForm, { type CourseDraft } from "@/components/CourseForm";
type CourseExplorerProps = {
    initialcourses: Course[];
};



export default function CourseExplorer({ initialcourses }: CourseExplorerProps) {
    const [keyword, setKeyword] = useState("");
    const [courses, setCourses] = useState<Course[]>(initialcourses);
    const [editingId, setEditingId] = useState<string | null>(null);


    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }
    function handleCreate(draft: CourseDraft) {
        // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID
        const newCourse: Course = {
            id: crypto.randomUUID(),
            code: draft.code.trim(),
            name: draft.name.trim(),
            credit: Number(draft.credit),
            instructor: draft.instructor.trim(),
        };

        setCourses([...courses, newCourse]);
    }
    function handleDelete(id: string) {
        // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข 
        setCourses(courses.filter((course) => course.id !== id));
    }
    function handleUpdate(id: string, draft: CourseDraft) {
        setCourses(
            courses.map((course) =>
                course.id === id
                    ? {
                        ...course,
                        code: draft.code.trim(),
                        name: draft.name.trim(),
                        credit: Number(draft.credit),
                        instructor: draft.instructor.trim(),
                    }
                    : course
            )
        );

        setEditingId(null);
    }
    function handleSave(draft: CourseDraft) {
        if (editingId === null) {
            handleCreate(draft);
            return;
        }

        handleUpdate(editingId, draft);
    }

    const editingCourse = courses.find((course) => course.id === editingId);
    const searchText = keyword.trim().toLowerCase();
    //เก็บผลการค้นหาไว้ที่ตัวแปรใหม่
    const visibleCourses = courses.filter(
        (course) =>
            //ค้นหาตามชื่อวิชา "หรือ" รหัสวิชา
            course.name.toLowerCase().includes(searchText) ||
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
            {/* Cards Loop */}
            {visibleCourses.length === 0 ? (
                <p>ไม่พบรายวิชาที่ตรงกับเงื่อนไข</p>
            ) : (
                <section>
                    {visibleCourses.map((course) => (
                        <CourseCard
                            key={course.id}
                            course={course}
                            //isFavorite={favoriteIds.includes(course.id)}
                            //onToggleFavorite={handleToggleFavorite}
                            onEdit={() => setEditingId(course.id)} 
                            onDelete={() => handleDelete(course.id)}
                        />
                    ))}
                </section>
            )}
            <CourseForm
                key={editingId ?? "new"}
                initialCourse={editingCourse}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
            />
        </div>
    );
} 
