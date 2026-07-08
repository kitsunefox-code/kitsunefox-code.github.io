import { iconFor } from "@/data/icons";

export default function TypeIcon({
  icon,
  className,
  title,
}: {
  icon: string;
  className?: string;
  title?: string;
}) {
  const def = iconFor(icon);
  if (!def) return null;
  return (
    <svg
      className={className}
      viewBox={def.viewBox}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={def.d} />
    </svg>
  );
}
