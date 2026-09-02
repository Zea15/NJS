import BandCard from "@/components/FavBandsCard";
import { bands } from "@/data/FavBandsdata";

export default function FavBandsPage() {
  return (
    <main className="page bandsPage">
      <header className="bandsHeader">
        <h1 className="eyebrow">Favorite Bands </h1>
        
      </header>

      <div className="courseGrid">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </main>
  );
}