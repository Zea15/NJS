import type { Metadata } from "next";

import { gameBackLog } from "@/data/Gamedata";
import GamesExplorer from "@/components/GamesExplorer";
export const metadata: Metadata = {
  title: "เกมทั้งหมด",

};
export default function GamePage() {




  return (
    <main className="page gamePage">
      <header className="gamePageHeader">
        <p className="gameEyebrow">PLAY LOG / COLLECTION</p>
        <h1>เกมทั้งหมด</h1>
        <p>รวมเกมที่กำลังเล่น เกมที่เล่นจบแล้ว และเกมที่รอเริ่มต้นการผจญภัย</p>
      </header>
      <GamesExplorer initialgames={gameBackLog} />


      {/*<div className="courseGrid">
            {courses.map((course, index) => (
              <CoursesCard key={index} course={course}/>
            ))}
        </div>*/}
    </main>
  );
}