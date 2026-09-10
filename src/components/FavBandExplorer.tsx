"use client";
import { useState, type ChangeEvent } from "react";
import type { Bands } from "@/types/bands";
import FavBandsCard from "@/components/FavBandsCard";


type FavBandExplorerProps = {
    bands: Bands[];
    
};

export default function FavBandExplorer({ bands }: FavBandExplorerProps) {
    const [keyword, setKeyword] = useState("");

    function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
        setKeyword(event.target.value);
    }
    const searchText = keyword.trim().toLowerCase();
    //เก็บผลการค้นหาไว้ที่ตัวแปรใหม่
    const visibleBands = bands.filter(
        (band) =>
            band.title.toLowerCase().includes(searchText) ||
            band.songs.toLowerCase().includes(searchText) ||
            band.id.toString().includes(searchText) ||
            band.members?.some((member) =>
                member.name.toLowerCase().includes(searchText)
            )

    );
    const [subscribeIds, setSubscribeIds] = useState<number[]>([]); 
 
function handleToggleSubscribe(id: number) { 
  setSubscribeIds((prevIds) => 
    prevIds.includes(id) 
      ? prevIds.filter((subscribeId) => subscribeId !== id) 
      : [...prevIds, id] 
  ); 
}
        const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

        function handleLike(id: number) {
                setLikeCounts((prevCounts) => ({
                        ...prevCounts,
                        [id]: (prevCounts[id] ?? 0) + 1,
                }));
        }

    return (
        <div className="bandExplorer">
            <div className="bandSearchBar">
                <div>
                    <p className="searchKicker">ค้นพบเสียงที่ใช่</p>
                    <h2>วงโปรดของคุณ</h2>
                </div>
            <input
                type="search"
                aria-label="ค้นหาวงดนตรี"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="ค้นหาชื่อวงดนตรี"
            />
            <p className="subscribeSummary">
                        จำนวนวงที่ติดตามแล้ว {subscribeIds.length} 
                    </p>
            </div>

            {visibleBands.length === 0 ? (
                <p className="emptyBands">ไม่พบวงดนตรีที่ตรงกับเงื่อนไข</p>
            ) : (
                <section className="bandResults" aria-label="รายการวงดนตรี">
                    {visibleBands.map((band) => (
                        <FavBandsCard
                            key={band.id}
                            band={band}
                            isSubscribed={subscribeIds.includes(band.id)}
                            onToggleSubscribe={handleToggleSubscribe}
                            likeCount={likeCounts[band.id] ?? 0}
                            onLike={handleLike}
                        />
                    ))}
                </section>
            )}
        </div>
    );
} 