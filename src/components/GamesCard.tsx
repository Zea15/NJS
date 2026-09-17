import {  GameBackLog } from "@/types/games";
import Link from "next/link";
 

type GamesCardProps = {
  game: GameBackLog;
  description?: string;
  //isFavorite: boolean; 
  //onToggleFavorite: (id: number) => void; 
  onEdit: () => void;
  onDelete: () => void;
};

export default function GamesCard( 
  { game, onEdit, onDelete }: GamesCardProps 
) { 

  return (
    <article key={game.id} className="gameCard">
      <div className="gameCardTopline">
        <span className="gamePlatform">{game.platform}</span>
        <span className="gameId">#{game.id}</span>
      </div>
      <h2><Link href={`/games/${game.id}`}>{game.nameg}</Link></h2>
      <div className="gameCardMeta">
        <p><span>เวลาเล่น</span>{game.time} ชั่วโมง</p>
        <p><span>สถานะ</span><strong className="gameStatus">{game.status}</strong></p>
      </div>
      <div className="gameCardActions">
        <button type="button" onClick={onEdit}>แก้ไข</button>
        <button type="button" className="gameDeleteButton" onClick={onDelete}>ลบ</button>
      </div>

    </article>
  );
}