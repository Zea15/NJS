"use client";

import { useState, type ChangeEvent } from "react";
import type { GameBackLog } from "@/types/games";
import GamesCard from "@/components/GamesCard";
import GamesForm, { type GameDraft } from "@/components/GamesForm";

type GamesExplorerProps = {
    initialgames: GameBackLog[];
};



export default function GamesExplorer({ initialgames }: GamesExplorerProps) {
    const [keyword, setKeyword] = useState("");
    const [games, setGames] = useState<GameBackLog[]>(initialgames);
    const [editingId, setEditingId] = useState<string | null>(null);


    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }
    function handleCreate(draft: GameDraft) {
        // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID
        const newGame: GameBackLog = {
            id: crypto.randomUUID(),
            nameg: draft.nameg.trim(),
            platform: draft.platform.trim(),
            time: Number(draft.time),
            status: draft.status.trim(),
        };

        setGames([...games, newGame]);
    }
    function handleDelete(id: string) {
        // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข 
        setGames(games.filter((game) => game.id !== id));
    }
    function handleUpdate(id: string, draft: GameDraft) {
        setGames(
            games.map((game) =>
                game.id === id
                    ? {
                        ...game,
                        nameg: draft.nameg.trim(),
                        platform: draft.platform.trim(),
                        time: Number(draft.time),
                        status: draft.status.trim(),
                    }
                    : game
            )
        );

        setEditingId(null);
    }
    function handleSave(draft: GameDraft) {
        if (editingId === null) {
            handleCreate(draft);
            return;
        }

        handleUpdate(editingId, draft);
    }

    const editingGame = games.find((game) => game.id === editingId);
    const searchText = keyword.trim().toLowerCase();
    //เก็บผลการค้นหาไว้ที่ตัวแปรใหม่
    const visibleGames = games.filter(
        (game) =>

            game.nameg.toLowerCase().includes(searchText) ||
            game.id.includes(searchText)
    );
    
    return (
        <div className="gameExplorer">
            <div className="gameSearchBar">
                <div>
                    <p className="gameSectionKicker">YOUR LIBRARY</p>
                    <h2>คลังเกมของฉัน</h2>
                    <p>ค้นหาเกมจากชื่อหรือรหัสเกม</p>
                </div>
            <input
                type="search"
                aria-label="ค้นหาชื่อเกม"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อเกมหรือรหัสเกม"
            />
            </div>
            {/* Cards Loop */}
            {visibleGames.length === 0 ? (
                <p className="gameEmptyState">ไม่พบเกมที่ตรงกับเงื่อนไข</p>
            ) : (
                <section className="gameGrid" aria-label="รายการเกม">
                    {visibleGames.map((game) => (
                        <GamesCard
                            key={game.id}
                            game={game}
                            //isFavorite={favoriteIds.includes(game.id)}
                            //onToggleFavorite={handleToggleFavorite}
                            onEdit={() => setEditingId(game.id)} 
                            onDelete={() => handleDelete(game.id)}
                        />
                    ))}
                </section>
            )}
            <GamesForm
                key={editingId ?? "new"}
                initialGame={editingGame}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
            />
        </div>
    );
} 
