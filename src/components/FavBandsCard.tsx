import Image from "next/image";
import { Bands } from "@/types/bands";

type BandsCardProps = {
  band: Bands;
  description?: string;
};

export default function BandsCard({ band, description }: BandsCardProps) {
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
      </div>
    </article>
  );
}