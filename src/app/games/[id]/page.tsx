import { gameBackLog } from "@/data/Gamedata";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type GamePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: GamePageProps
): Promise<Metadata> {
  // เติม: คำสั่งที่ใช้รอค่าจาก Promise (await)
  const { id } = await params;
  const game = gameBackLog.find((item) => item.id === id);

  return {
    title: game ? game.nameg : "ไม่พบเกม",
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  // เติม: เมธอดของ Array ที่คืนสมาชิกตัวแรกที่ผ่านเงื่อนไข (.find())
  const game = gameBackLog.find((item) => item.id === id);

  // เติม: ฟังก์ชันที่สั่งให้แสดงหน้า 404 (notFound())
  if (!game) {
    notFound();
  }

  return (
    <article className="page gameDetailPage">
      <p className="gameEyebrow">GAME DETAILS / #{game.id}</p>
      <h1>{game.nameg}</h1>
      <div className="gameDetailGrid">
        <p><span>แพลตฟอร์ม</span><strong>{game.platform}</strong></p>
        <p><span>เวลาเล่น</span><strong>{game.time} ชั่วโมง</strong></p>
        <p><span>สถานะ</span><strong className="gameStatus">{game.status}</strong></p>
      </div>
    </article>
  );
}