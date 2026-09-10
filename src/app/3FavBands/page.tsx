import BandCard from "@/components/FavBandsCard";
import { bands } from "@/data/FavBandsdata";

import type { Metadata } from "next";
import BandCardExplorer from "@/components/FavBandExplorer";

export default function FavBandsPage() {
  return (
    <main className="page bandsPage">
      <header className="bandsHeader">
        <h1 className="eyebrow">Favorite Bands </h1>
        
      </header>

      <div className="courseGrid">
       <BandCardExplorer  bands={bands} /> 
        
    
      </div>
    </main>
  );
}