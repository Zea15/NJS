"use client";

// 1 import ทั้งหมด 
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { GameBackLog } from "@/types/games";

// 2 type ของ Props และ type ของข้อมูลในฟอร์ม 
export type GameDraft = {
  id: string;
  nameg: string;
  platform: string;
  time: number;
  status: string;
};

const emptyDraft: GameDraft = {
  id: "",
  nameg: "",
  platform: "",
  time: 0,
  status: "",
};

type GameFormProps = {
  initialGame?: GameBackLog;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(game?: GameBackLog): GameDraft {
  if (!game) {
    return emptyDraft;
  }
  return {
    id: game.id,
    nameg: game.nameg,
    platform: game.platform,
    time: game.time,
    status: game.status,
  };
}

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));

  type FormErrors = Partial<Record<keyof GameDraft, string>>;
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(value: GameDraft): FormErrors {
    const nextErrors: FormErrors = {};

    if (value.id.trim() === "") {
      nextErrors.id = "กรุณาระบุรหัสเกม";
    }

    // เติม: เมธอดที่ตัดช่องว่างหัวท้ายของข้อความออก (.trim())
    if (value.nameg.trim() === "") {
      nextErrors.nameg = "กรุณาระบุชื่อเกม";
    }

    if (value.platform.trim() === "") {
      nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
    }

    const time = Number(value.time);
    if (!Number.isInteger(time) || time < 1 || time > 10000) {
      nextErrors.time = "เวลาต้องเป็นจำนวนเต็มบวก (1-10000)";
    }

    if (value.status.trim() === "") {
      nextErrors.status = "กรุณาระบุสถานะเกม";
    }

    return nextErrors;
  }

  // 5 ฟังก์ชัน handle สำหรับเหตุการณ์ต่าง ๆ 
  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ 
      ...prev, 
      [name]: name === "time" ? Number(value) : value 
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);

    // เติม: เมธอดของ Object ที่คืนอาร์เรย์ของชื่อคีย์ทั้งหมด (Object.keys)
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft); // เรียกใช้ฟังก์ชัน onSave ที่ส่งมาจาก Props
    setDraft(emptyDraft);
    setErrors({});
  }

  // 6 return ส่วนแสดงผล 
  return (
    <form className="gameForm" onSubmit={handleSubmit} noValidate>
      <div className="gameFormHeader">
        <p className="gameSectionKicker">{initialGame ? "UPDATE ENTRY" : "NEW ENTRY"}</p>
        <h2>{initialGame ? "แก้ไขข้อมูลเกม" : "เพิ่มเกมในคลัง"}</h2>
        <p>{initialGame ? "ปรับข้อมูลเกมของคุณให้เป็นปัจจุบัน" : "กรอกข้อมูลสั้น ๆ เพื่อเพิ่มเกมใหม่ลงในคลัง"}</p>
      </div>
      {/* รหัสเกม */}
      <div className="gameField">
        <label htmlFor="id">รหัสเกม</label>
        <input
          id="id"
          name="id"
          type="text"
          value={draft.id}
          onChange={handleChange}
          // !! ฟังก์ชันที่แปลงค่าใด ๆ ให้เป็นค่าตรรกะ 
          aria-invalid={!!errors.id}
          aria-describedby={errors.id ? "id-error" : undefined}
        />
        {errors.id ? <p className="gameFieldError" id="id-error">{errors.id}</p> : null}
      </div>

      {/* ชื่อเกม */}
      <div className="gameField">
        <label htmlFor="nameg">ชื่อเกม</label>
        {/* เติม: ชื่อฟิลด์ใน GameDraft ที่ช่องนี้รับผิดชอบ (name="nameg") */}
        <input
          id="nameg"
          name="nameg"
          type="text"
          value={draft.nameg}
          onChange={handleChange}
          aria-invalid={!!errors.nameg}
          aria-describedby={errors.nameg ? "nameg-error" : undefined}
        />
        {errors.nameg ? <p className="gameFieldError" id="nameg-error">{errors.nameg}</p> : null}
      </div>

      {/* แพลตฟอร์ม */}
      <div className="gameField">
        <label htmlFor="platform">แพลตฟอร์ม</label>
        <select
          id="platform"
          name="platform"
          value={draft.platform}
          onChange={handleChange}
          aria-invalid={!!errors.platform}
          aria-describedby={errors.platform ? "platform-error" : undefined}
        >
          <option value="">-- เลือกแพลตฟอร์ม --</option>
          <option value="PC">PC</option>
          <option value="Console">Console</option>
          <option value="Mobile">Mobile</option>
          <option value="Playstation">Playstation</option>
        </select>
        {errors.platform ? <p className="gameFieldError" id="platform-error">{errors.platform}</p> : null}
      </div>

      {/* เวลา */}
      <div className="gameField">
        <label htmlFor="time">เวลา (ชั่วโมง)</label>
        <input
          id="time"
          name="time"
          type="number"
          inputMode="numeric"
          min="1"
          value={draft.time}
          onChange={handleChange}
          aria-invalid={!!errors.time}
          aria-describedby={errors.time ? "time-error" : undefined}
        />
        {errors.time ? <p className="gameFieldError" id="time-error">{errors.time}</p> : null}
      </div>

      {/* สถานะ */}
      <div className="gameField">
        <label htmlFor="status">สถานะ</label>
        <select
          id="status"
          name="status"
          value={draft.status}
          onChange={handleChange}
          aria-invalid={!!errors.status}
          aria-describedby={errors.status ? "status-error" : undefined}
        >
          <option value="">-- เลือกสถานะ --</option>
          <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
          <option value="กำลังเล่น">กำลังเล่น</option>
          <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
        </select>
        {errors.status ? <p className="gameFieldError" id="status-error">{errors.status}</p> : null}
      </div>

      {/* ปุ่มกด */}
      <div className="gameFormActions">
      <button type="submit">บันทึก</button>
      {initialGame ? (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      ) : null}
      </div>
    </form>
  );
}