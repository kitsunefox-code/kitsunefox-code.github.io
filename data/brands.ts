// 各メーカーのユニフォームイメージ図（SVG）用のブランドカラー。
// ※実物のユニフォーム写真ではなく、各社のイメージカラーで描いた「型」のイラストです。
//   著作権フリーで掲載でき、ランキングのビジュアルを補強する目的で使用します。
// primary=本体色 / secondary=襟・前立ての差し色 / text=胸マークの文字色 / mark=胸に入れる略号

export type Brand = {
  primary: string;
  secondary: string;
  text: string;
  mark: string;
};

export const BRANDS: Record<string, Brand> = {
  fungo: { primary: "#16264a", secondary: "#e23b2e", text: "#ffffff", mark: "F" },
  "ilb-max": { primary: "#c62828", secondary: "#ffffff", text: "#ffffff", mark: "ILB" },
  wakkuon: { primary: "#1565c0", secondary: "#ffffff", text: "#ffffff", mark: "W" },
  uniformlab: { primary: "#2e7d32", secondary: "#ffffff", text: "#ffffff", mark: "UL" },
  sork: { primary: "#2b2f36", secondary: "#f4c430", text: "#f4c430", mark: "SK" },
  zett: { primary: "#d32f2f", secondary: "#16264a", text: "#ffffff", mark: "Z" },
  ssk: { primary: "#16305c", secondary: "#d81f2a", text: "#ffffff", mark: "SSK" },
  unio: { primary: "#00838f", secondary: "#ffffff", text: "#ffffff", mark: "U" },
  reward: { primary: "#7c1a2e", secondary: "#d4af37", text: "#f0d78a", mark: "R" },
  mizuno: { primary: "#0067b8", secondary: "#ffffff", text: "#ffffff", mark: "M" },
  eugene: { primary: "#5e35b1", secondary: "#ffffff", text: "#ffffff", mark: "E" },
  bwos: { primary: "#ef6c00", secondary: "#16264a", text: "#ffffff", mark: "BW" },
  asics: { primary: "#001a5c", secondary: "#d81f2a", text: "#ffffff", mark: "A" },
};

export const DEFAULT_BRAND: Brand = {
  primary: "#334155",
  secondary: "#ffffff",
  text: "#ffffff",
  mark: "⚾",
};
