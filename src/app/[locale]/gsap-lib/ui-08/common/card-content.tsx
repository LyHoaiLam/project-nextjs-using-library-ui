import Image from "next/image";

type CardContentProps = {
  idx: number;
  reflection: boolean;
  PICS: string[];
  TITLES: string[];
  TYPE: string[];
};

function pickTypeByIdx(TYPE: string[], idx: number) {
  // deterministic (pure) thay cho Math.random()
  const h = (idx * 2654435761) >>> 0; // Knuth multiplicative hash
  return TYPE[h % TYPE.length];
}

export default function CardContent({
  idx,
  reflection,
  PICS,
  TITLES,
  TYPE,
}: CardContentProps) {
  const pic = PICS[idx % PICS.length];
  const title = TITLES[idx % TITLES.length];
  const type = pickTypeByIdx(TYPE, idx);

  return (
    <div className="card__content">
      <Image
        width={500}
        height={500}
        className="card__image object-cover"
        src={pic}
        alt=""
      />
      <div className="card__details">
        <div className="card__type">{type}</div>
        <h2 className="card__title">{title}</h2>
      </div>
      <div
        className={`card__overlay ${reflection ? "card__overlay--reflection" : ""}`}
      />
    </div>
  );
}
