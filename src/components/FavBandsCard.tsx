import Image from "next/image";
import { Bands } from "@/types/bands";

type BandsCardProps = {
  band: Bands;
  description?: string;
  isSubscribed: boolean; 
  onToggleSubscribe: (id: number) => void; 
  likeCount: number;
  onLike: (id: number) => void;
};

export default function BandsCard({
  band,
  description,
  isSubscribed,
  onToggleSubscribe,
  likeCount,
  onLike,
}: BandsCardProps) {
  const members = band.members ?? [];

  return (
    <article className="bandCard" key={band.id}>
      <div className="bandCoverWrap">
        <Image
          src={band.image}
          alt={band.title}
          width={400}
          height={300}
          className="bandCover"
        />
      </div>

      <div className="bandContent">
        <div className="bandHeader">
          <span className="bandBadge">Favorite</span>
          <h2>{band.title}</h2>
        </div>

        <div className="memberSection">
          <p className="sectionLabel">สมาชิกวง</p>

          {members.length > 0 ? (
            <ul className="memberList">
              {members.map((member, index) => (
                <li key={`${member.name}-${index}`} className="memberItem">
                  <div className="memberAvatarWrap">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="memberAvatar"
                    />
                  </div>
                  <span>{member.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="memberText">{band.member}</p>
          )}
        </div>

        <p className="songsText">
          <strong>3 เพลงฮิต:</strong> {band.songs}
        </p>

        {description && <p className="descriptionText">{description}</p>}
        <div className="bandActions">
          <button
            type="button"
            className="likeButton"
            onClick={() => onLike(band.id)}
          >
            Like ({likeCount})
          </button>
          <button
            type="button"
            className="subscribeButton"
            aria-pressed={isSubscribed}
            onClick={() => onToggleSubscribe(band.id)}
          >
            {isSubscribed ? "ติดตามอยู่" : "ติดตาม"}
          </button>
        </div>

      </div>
    </article>
  );
}