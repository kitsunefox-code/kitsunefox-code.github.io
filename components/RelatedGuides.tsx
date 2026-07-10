import { GUIDES } from "@/data/guides";

// 記事末に「関連記事」を出す内部リンク部品。
// 同カテゴリのガイドを自動表示（現在ページは除外）。静的HTMLに出るのでSEO・回遊に効く。
export default function RelatedGuides({
  currentHref,
  heading = "関連記事",
  max = 4,
}: {
  currentHref: string;
  heading?: string;
  max?: number;
}) {
  const cur = GUIDES.find((g) => g.href === currentHref);
  const pool = GUIDES.filter((g) => g.href !== currentHref);
  // 同カテゴリを優先し、足りなければ他カテゴリで補完
  const sameCat = cur ? pool.filter((g) => g.category === cur.category) : [];
  const others = pool.filter((g) => !sameCat.includes(g));
  const related = [...sameCat, ...others].slice(0, max);
  if (related.length === 0) return null;

  return (
    <section className="related-guides">
      <h2 className="rg-heading">{heading}</h2>
      <div className="rg-list">
        {related.map((g) => (
          <a key={g.href} className="rg-item" href={g.href}>
            <span className="rg-emoji">{g.emoji}</span>
            <span className="rg-body">
              <span className="rg-title">{g.title}</span>
              <span className="rg-desc">{g.description}</span>
            </span>
            <span className="rg-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
