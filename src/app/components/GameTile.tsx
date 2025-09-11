interface Props {
  title: string;
  platform: string;
  img?: string;
}

export default function GameTile({ title, platform, img }: Props) {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[2/3] bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img ?? 'https://placehold.co/600x900/png'} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="font-semibold">{title}</div>
        <div className="text-xs opacity-70">{platform}</div>
      </div>
    </div>
  );
}
