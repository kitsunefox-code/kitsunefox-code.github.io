// グローブのウェブ（網）の種類データ。専門店の解説をもとに構造化。
// 診断・比較・ガイドで共用する。
export type WebType = {
  id: string;
  name: string;
  positions: string; // 向いているポジション
  feature: string; // 特徴
  note: string; // 補足・トレードオフ
};

export const WEB_TYPES: WebType[] = [
  {
    id: "h",
    name: "Hウェブ",
    positions: "内野手（二塁・遊撃）",
    feature: "紐でつながる構造でしなりが出やすく、軽さと操作性が高い。握り替えが速い。",
    note: "深く包み込む感覚は控えめ。素早くさばきたい選手向き。",
  },
  {
    id: "cross",
    name: "クロスウェブ",
    positions: "内野手（三塁）・オールラウンド",
    feature: "縦横が交差し剛性と一体感。壁感が出て強い打球にも安定。ポケットが安定。",
    note: "Hウェブとバスケットの“中間解”。ポジション未定の人にも合わせやすい。",
  },
  {
    id: "i",
    name: "Iウェブ",
    positions: "外野手（軽快に動きたい）",
    feature: "先端が軽く、大きめグラブでも操作しやすい。一歩目・振り抜きが軽い。",
    note: "先端の壁感はTネットに譲る。軽さ重視の中堅・両翼向き。",
  },
  {
    id: "tnet",
    name: "Tネット",
    positions: "外野手（確実に捕りたい）",
    feature: "先端が強く、伸びるライナーや強い打球も受け止めやすい。深めで安定。",
    note: "操作性はIウェブにやや劣る。安心感重視の外野向き。",
  },
  {
    id: "basket",
    name: "バスケットウェブ",
    positions: "投手（内野でも可）",
    feature: "編み込みで握りを隠しやすく、硬さも残しやすい。ポケットが深くなりすぎない。",
    note: "軽快な開閉は控えめ。握りを隠したい投手に好相性。",
  },
  {
    id: "closed",
    name: "ワンピース／ツーピース",
    positions: "投手",
    feature: "隙間の少ない“閉じたウェブ”。球種の握りを隠しやすい投手用の定番。",
    note: "ワンピース=一体感、ツーピース=縦長め。野手には他ウェブが向く。",
  },
  {
    id: "shock",
    name: "ショック系ウェブ",
    positions: "内野（浅め）・複数ポジション",
    feature: "細かい編み込みで衝撃吸収・型崩れしにくい。浅く使いつつ引っかけたい人に。",
    note: "紐が多く修理の手間は増えやすい。デザイン性でも人気。",
  },
];

// ポジション×捕球スタイルから、おすすめウェブを引くマップ
// style: "quick"(軽快・握り替え重視) / "solid"(しっかり受け止める) / "auto"(おまかせ)
export type WebStyle = "quick" | "solid" | "auto";

export function recommendWeb(
  pos: "pitcher" | "infield" | "outfield" | "catcher" | "first" | "allround",
  style: WebStyle
): { web: WebType; reason: string } {
  const byId = (id: string) => WEB_TYPES.find((w) => w.id === id)!;
  switch (pos) {
    case "pitcher":
      return {
        web: style === "solid" ? byId("basket") : byId("closed"),
        reason: "握りを隠せる“閉じたウェブ”が投手の最優先ポイント。",
      };
    case "infield":
      return style === "solid"
        ? { web: byId("cross"), reason: "強い打球にも壁感で安定。三塁や受け止め重視に。" }
        : { web: byId("h"), reason: "しなりと軽さで握り替えが速い。二塁・遊撃の定番。" };
    case "outfield":
      return style === "quick"
        ? { web: byId("i"), reason: "先端が軽く、大きめでも一歩目・振り抜きが軽快。" }
        : { web: byId("tnet"), reason: "先端が強く、フライ・ライナーを確実に受け止める。" };
    case "catcher":
      return {
        web: byId("closed"),
        reason: "捕手は専用ミット。ウェブより捕球音とポケットの決まりを重視。",
      };
    case "first":
      return {
        web: byId("closed"),
        reason: "一塁は専用ミット。すくいやすさ重視で少し大きめが安心。",
      };
    case "allround":
    default:
      return {
        web: byId("cross"),
        reason: "内野〜外野を無難にこなす“中間解”。ポジション未定にも合う。",
      };
  }
}

// ── 性格・価値観ベースのグローブ診断 ──────────────
// 「どのポジションをやりたいか」ではなく、道具に対する気質から
// あなたに合うグローブの“性格（型）”を導く。
export type GloveCharacter = "quick" | "solid" | "hide" | "range" | "allround";
export type GloveByStyle = {
  character: GloveCharacter;
  charLabel: string; // グローブの性格ラベル
  web: WebType;
  posHint: string; // 商品検索・傾向用のゆるいポジション
  reason: string;
};

export function recommendGloveByStyle(scores: {
  light: number; // 軽快・操作性を重視
  solid: number; // しっかり受け止める安心感を重視
  hide: number; // 狙い・手の内を隠したい
  range: number; // 広く守って魅せたい
}): GloveByStyle {
  const byId = (id: string) => WEB_TYPES.find((w) => w.id === id)!;
  const entries: { k: GloveCharacter; v: number }[] = [
    { k: "hide", v: scores.hide },
    { k: "range", v: scores.range },
    { k: "solid", v: scores.solid },
    { k: "quick", v: scores.light },
  ];
  const top = entries.reduce((a, b) => (b.v > a.v ? b : a), { k: "allround" as GloveCharacter, v: 0 });
  switch (top.k) {
    case "hide":
      return {
        character: "hide",
        charLabel: "隠して操る・技巧派グラブ",
        web: byId("basket"),
        posHint: "投手",
        reason: "狙いや手の内を悟らせたくないあなたには、握りを隠せる“閉じたウェブ”が武器になります。",
      };
    case "range":
      return {
        character: "range",
        charLabel: "広く守って魅せる・大型グラブ",
        web: byId("tnet"),
        posHint: "外野",
        reason: "広くカバーして魅せたいあなたには、先端が強く打球を受け止める大きめのグラブを。",
      };
    case "solid":
      return {
        character: "solid",
        charLabel: "がっちり受け止める・安心グラブ",
        web: byId("cross"),
        posHint: "内野",
        reason: "安心感を大事にするあなたには、壁感が出て強い打球にも動じないクロスウェブを。",
      };
    case "quick":
      return {
        character: "quick",
        charLabel: "軽快にさばく・スピードグラブ",
        web: byId("h"),
        posHint: "内野",
        reason: "軽さと素早さが命のあなたには、しなって握り替えが速いHウェブを。",
      };
    default:
      return {
        character: "allround",
        charLabel: "何でもこなす・オールラウンドグラブ",
        web: byId("cross"),
        posHint: "オールラウンド",
        reason: "こだわりすぎないあなたには、内野〜外野を無難にこなす“中間解”のクロスウェブを。",
      };
  }
}
