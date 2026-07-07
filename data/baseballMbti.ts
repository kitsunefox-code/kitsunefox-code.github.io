// 野球選手MBTI診断（エンタメ）。
// MBTIの4指標（E/I・S/N・T/F・J/P）を野球の性格に置き換えた16タイプ。
// 各タイプに近い実在NPB/MLB選手をマッピング（あくまで遊びの分類）。
import { PLAYERS, type Player } from "./players";

export type Axis = "EI" | "SN" | "TF" | "JP";
export type Pole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export type MbtiQuestion = {
  id: string;
  axis: Axis;
  q: string;
  a: { label: string; pole: Pole };
  b: { label: string; pole: Pole };
};

// 各軸3問ずつ・全12問（A/Bの二択）
export const MBTI_QUESTIONS: MbtiQuestion[] = [
  // E / I（エネルギーの向き）
  { id: "e1", axis: "EI", q: "試合前のベンチでは？", a: { label: "声を出してチームを盛り上げる", pole: "E" }, b: { label: "自分のルーティンに集中する", pole: "I" } },
  { id: "e2", axis: "EI", q: "打席の緊張のほぐし方は？", a: { label: "仲間と話して気を紛らわす", pole: "E" }, b: { label: "ひとりで静かに集中する", pole: "I" } },
  { id: "e3", axis: "EI", q: "練習するなら？", a: { label: "みんなでワイワイやりたい", pole: "E" }, b: { label: "黙々と個人練を積みたい", pole: "I" } },
  // S / N（物事の捉え方）
  { id: "s1", axis: "SN", q: "打撃で大事にするのは？", a: { label: "基本に忠実な再現性", pole: "S" }, b: { label: "その日のひらめき・感覚", pole: "N" } },
  { id: "s2", axis: "SN", q: "好きな作戦は？", a: { label: "セオリー通りの手堅い攻め", pole: "S" }, b: { label: "意表を突く奇策・ギャンブル", pole: "N" } },
  { id: "s3", axis: "SN", q: "上達の仕方は？", a: { label: "今の課題を一つずつ潰す", pole: "S" }, b: { label: "理想の完成形から逆算する", pole: "N" } },
  // T / F（判断の基準）
  { id: "t1", axis: "TF", q: "チームで重視するのは？", a: { label: "勝つための合理性・数字", pole: "T" }, b: { label: "みんなの気持ち・チームの和", pole: "F" } },
  { id: "t2", axis: "TF", q: "ミスした仲間に、まず？", a: { label: "原因を具体的に指摘する", pole: "T" }, b: { label: "とにかく励ます・声をかける", pole: "F" } },
  { id: "t3", axis: "TF", q: "スタメンを決めるなら？", a: { label: "実力・数字でドライに選ぶ", pole: "T" }, b: { label: "調子や気持ちも汲んで選ぶ", pole: "F" } },
  // J / P（外界への接し方）
  { id: "j1", axis: "JP", q: "試合当日は？", a: { label: "段取り・準備をきっちり", pole: "J" }, b: { label: "その場のノリで動く", pole: "P" } },
  { id: "j2", axis: "JP", q: "道具の扱いは？", a: { label: "手入れして定位置にきっちり", pole: "J" }, b: { label: "使えればOK、気分次第", pole: "P" } },
  { id: "j3", axis: "JP", q: "急な予定変更が起きたら？", a: { label: "段取りが崩れて少し苦手", pole: "J" }, b: { label: "むしろ臨機応変に楽しむ", pole: "P" } },
];

export const AXIS_LABELS: Record<Axis, { left: Pole; right: Pole; leftJp: string; rightJp: string }> = {
  EI: { left: "E", right: "I", leftJp: "外向", rightJp: "内向" },
  SN: { left: "S", right: "N", leftJp: "堅実", rightJp: "ひらめき" },
  TF: { left: "T", right: "F", leftJp: "論理", rightJp: "情熱" },
  JP: { left: "J", right: "P", leftJp: "計画", rightJp: "自由" },
};

export type MbtiType = {
  code: string; // 例: ENFP
  nickname: string;
  emoji: string;
  catch: string; // 一言
  long: string; // 解説
  players: string[]; // 近い実在選手（名前）
  advice: string;
  adviceHref: string;
  adviceCta: string;
};

export const MBTI_TYPES: MbtiType[] = [
  {
    code: "INTJ", nickname: "知将エース", emoji: "♟️",
    catch: "頭脳で試合を支配する、冷静沈着な戦略家。",
    long: "INTJ・知将エース型は、配球・データ・相手の心理まで読み切って試合を組み立てる戦略家タイプ。感情に流されず、勝つための最適解を淡々と実行します。研究を怠らないストイックさが武器で、マウンドでもベンチでも“頭で勝つ”のが持ち味。孤高に見えて、その分析力はチームの生命線です。",
    players: ["ダルビッシュ有", "野村克也", "クレイトン・カーショウ"],
    advice: "スペックで理詰めに選ぶあなたには、素材・重量まで比較できる情報が武器。",
    adviceHref: "/hikaku/", adviceCta: "道具をスペックで比較する",
  },
  {
    code: "INTP", nickname: "探求のクラフトマン", emoji: "🔬",
    catch: "技術を突き詰める、理論派の職人。",
    long: "INTP・探求のクラフトマン型は、フォームや理論を突き詰めるのが大好きな研究者タイプ。「なぜそうなるか」を理解して初めて納得し、独自の理屈で技術を磨き上げます。マイペースで探究心旺盛。ハマれば誰も真似できない領域に達する、玄人好みの実力者です。",
    players: ["落合博満", "山本由伸", "ザック・ギャレン"],
    advice: "理屈で選ぶあなたには、素材や構造まで納得して選べる道具比較がぴったり。",
    adviceHref: "/hikaku/", adviceCta: "道具の特徴を比較する",
  },
  {
    code: "ENTJ", nickname: "常勝の名将", emoji: "👑",
    catch: "チームを勝利へ導く、生まれながらの指揮官。",
    long: "ENTJ・常勝の名将型は、目標に向けてチーム全体を動かすリーダータイプ。決断が速く、勝つために何をすべきかを的確に示せる統率者です。要求は高いけれど、その分だけ結果もついてくる。中心にいるだけで場が締まる、勝てるチームの象徴のような存在です。",
    players: ["王貞治", "デレク・ジーター", "アレックス・ブレグマン"],
    advice: "チームを率いるなら、まず自分のギアに妥協しない姿勢が手本になります。",
    adviceHref: "/hikaku/", adviceCta: "道具・ユニフォーム比較を見る",
  },
  {
    code: "ENTP", nickname: "型破りの革命児", emoji: "💡",
    catch: "常識を覆す、発想力のトリックスター。",
    long: "ENTP・型破りの革命児型は、誰も思いつかないアイデアで試合を動かすアイデアマン。セオリーにとらわれず、新しい球種・戦術・魅せ方をどんどん試します。飽きっぽい一面もあるけれど、ハマったときの爆発力は随一。チームに新しい風を吹き込む変革者です。",
    players: ["ブライス・ハーパー", "千賀滉大", "フェルナンド・タティスJr."],
    advice: "新しもの好きのあなたには、最新モデルや個性的なオーダーが好相性。",
    adviceHref: "/bat-shindan/", adviceCta: "最新バットを診断で探す",
  },
  {
    code: "INFJ", nickname: "静かなる理想家", emoji: "🌙",
    catch: "理想を胸に、黙々と道を極める求道者。",
    long: "INFJ・静かなる理想家型は、確固たる理想像を持ち、それに向かって静かに努力し続けるタイプ。多くを語らずとも背中で示し、チームから深い信頼を集めます。完璧主義で自分に厳しい一方、内に秘めた情熱は誰よりも熱い。孤高の求道者として一時代を築く器です。",
    players: ["イチロー", "上原浩治", "桑田真澄"],
    advice: "こだわり派のあなたには、長く付き合える“相棒”を選ぶ視点が大切。",
    adviceHref: "/guide/glove-care/", adviceCta: "道具を育てるお手入れガイド",
  },
  {
    code: "INFP", nickname: "夢追いロマンチスト", emoji: "🌈",
    catch: "野球を愛し、夢を追い続ける純粋な理想家。",
    long: "INFP・夢追いロマンチスト型は、勝ち負け以上に「好き」を大事にする純粋なプレーヤー。人と比べず、自分の理想の野球を追い求めます。穏やかでマイペースに見えて、譲れない信念は誰より強い。その一途さが人を惹きつけ、時に常識を超えたスケールの夢を実現します。",
    players: ["大谷翔平", "ロナルド・アクーニャJr.", "松井秀喜"],
    advice: "投打どちらも楽しむあなたには、オールラウンドに使える道具選びを。",
    adviceHref: "/tools/", adviceCta: "あなた向けの道具を診断",
  },
  {
    code: "ENFJ", nickname: "熱血の兄貴分", emoji: "🔥",
    catch: "情でチームをまとめる、頼れるリーダー。",
    long: "ENFJ・熱血の兄貴分型は、仲間思いで面倒見のよい人情派リーダー。プレーと言葉の両方でチームを鼓舞し、みんなの力を引き出します。困っている仲間を放っておけない優しさが持ち味。そのアツい姿勢がチームの一体感を生み、勝負どころで大きな力になります。",
    players: ["金本知憲", "新井貴浩", "ムーキー・ベッツ"],
    advice: "みんなの手本になるあなたは、信頼できるギアで背中を見せましょう。",
    adviceHref: "/hikaku/", adviceCta: "道具・ユニフォーム比較を見る",
  },
  {
    code: "ENFP", nickname: "チームの太陽", emoji: "☀️",
    catch: "いるだけで場が明るくなるムードメーカー。",
    long: "ENFP・チームの太陽型は、明るさとノリでチームを元気にするムードメーカー。好奇心旺盛でどんな場面も楽しみ、逆境すら笑いに変えるポジティブさが魅力です。感情豊かで人との距離を縮めるのが得意。あなたがベンチにいるだけで、チームの雰囲気がぐっと良くなります。",
    players: ["川崎宗則", "アレックス・ラミレス", "ランディ・アロザレーナ"],
    advice: "魅せるあなたには、カラーオーダーなど気分の上がる道具がぴったり。",
    adviceHref: "/hikaku/", adviceCta: "道具・ユニフォーム比較を見る",
  },
  {
    code: "ISTJ", nickname: "堅実な鉄壁職人", emoji: "🛡️",
    catch: "ミスをしない、信頼度No.1の堅実派。",
    long: "ISTJ・堅実な鉄壁職人型は、基本に忠実で決してサボらない責任感の塊タイプ。派手さより「当たり前のことを確実に」を徹底し、守備でも生活態度でもチームの土台になります。地道な反復を苦にせず、積み上げた実力は本物。監督が最も信頼して送り出せる選手です。",
    players: ["源田壮亮", "宮本慎也", "ノーラン・アレナード"],
    advice: "守備の要は操作性の高いグローブ。ポジションに合った型えらびを。",
    adviceHref: "/glove-shindan/", adviceCta: "グローブ診断をやってみる",
  },
  {
    code: "ISFJ", nickname: "縁の下の女房役", emoji: "🤝",
    catch: "チームを陰で支える、献身の司令塔。",
    long: "ISFJ・縁の下の女房役型は、目立たなくてもチームのために尽くす献身的なタイプ。仲間の状態に気を配り、投手を立て、守備をまとめる縁の下の力持ちです。堅実で面倒見がよく、周囲からの信頼は絶大。あなたの支えがあるからこそ、チームは安心して戦えます。",
    players: ["甲斐拓也", "會澤翼", "J.T.リアルミュート"],
    advice: "キャッチャーミットは扱いやすさと衝撃吸収が命。手に合う一枚を。",
    adviceHref: "/glove/", adviceCta: "キャッチャーミットを見る",
  },
  {
    code: "ESTJ", nickname: "鉄の統率者", emoji: "🏛️",
    catch: "規律でチームを束ねる、頼れる大黒柱。",
    long: "ESTJ・鉄の統率者型は、責任感が強く、規律とルールでチームをまとめる大黒柱タイプ。やるべきことを明確にし、自らが先頭に立って実行する頼れる存在です。曲がったことが嫌いで面倒見もよい。あなたがいるとチームが引き締まり、勝負どころで崩れない強さが生まれます。",
    players: ["田中将大", "ジャスティン・バーランダー", "谷繁元信"],
    advice: "長く戦う相棒には、耐久性と信頼性を重視した道具選びを。",
    adviceHref: "/hikaku/", adviceCta: "道具・ユニフォーム比較を見る",
  },
  {
    code: "ESFJ", nickname: "みんなの兄貴", emoji: "🍚",
    catch: "面倒見抜群、チームの潤滑油。",
    long: "ESFJ・みんなの兄貴型は、気配り上手でチームの輪を大切にする社交派。後輩の面倒をよく見て、場の空気を和ませる潤滑油のような存在です。人に喜んでもらうことが原動力で、チームの結束を自然に高めます。あなたのおかげで、チームはいつも居心地のよい雰囲気に包まれます。",
    players: ["里崎智也", "サルバドール・ペレス", "中村悠平"],
    advice: "みんなを支えるあなたは、まず自分の道具をきちんと整えるのが吉。",
    adviceHref: "/tools/", adviceCta: "あなた向けの道具を診断",
  },
  {
    code: "ISTP", nickname: "クールな技巧派", emoji: "🧊",
    catch: "無駄のない動きで魅せる、寡黙な達人。",
    long: "ISTP・クールな技巧派型は、多くを語らずプレーで示す寡黙な達人タイプ。無駄のない合理的な動きと高い技術で、難しいプレーもさらりとこなします。感情を表に出さず淡々としていますが、勝負勘は鋭い。“職人”と呼ぶのがふさわしい、玄人が唸るタイプです。",
    players: ["菊池涼介", "前田健太", "マット・チャップマン"],
    advice: "技術で勝負するあなたには、操作性重視の軽量ギアが好相性。",
    adviceHref: "/glove-shindan/", adviceCta: "グローブ診断をやってみる",
  },
  {
    code: "ISFP", nickname: "感性の巧打者", emoji: "🎨",
    catch: "天性のセンスで打つ、感覚派アーティスト。",
    long: "ISFP・感性の巧打者型は、理屈より感覚で打つ天才肌のタイプ。言葉で説明しづらい“間”やタイミングを体で掴み、美しいスイングで魅せます。控えめで穏やかな性格ながら、プレーには確かな個性が光る。感性を信じて振り抜くとき、誰にも真似できない打撃を見せます。",
    players: ["吉田正尚", "前田智徳", "ルイス・ロバートJr."],
    advice: "感覚で振るあなたには、芯でとらえやすい扱いやすいバットを。",
    adviceHref: "/bat-shindan/", adviceCta: "バット相性診断をやってみる",
  },
  {
    code: "ESTP", nickname: "勝負師ギャンブラー", emoji: "🎲",
    catch: "大舞台で燃える、度胸満点の勝負師。",
    long: "ESTP・勝負師ギャンブラー型は、大きな場面ほどワクワクする度胸抜群のタイプ。細かい理屈より本能と勢いで勝負し、ここぞでリスクを取れる強心臓です。行動力があり注目を浴びるのも大好き。ピンチもチャンスに変える勝負度胸で、試合の流れを一気に引き寄せます。",
    players: ["藤川球児", "ハビアー・バエズ", "山川穂高"],
    advice: "勝負を仕掛けるあなたには、思い切り振れる相棒バットを一本。",
    adviceHref: "/bat-shindan/", adviceCta: "バット相性診断をやってみる",
  },
  {
    code: "ESFP", nickname: "魅せるエンターテイナー", emoji: "✨",
    catch: "スタンドを沸かせる、天性のスター。",
    long: "ESFP・魅せるエンターテイナー型は、注目を浴びるほど輝く天性のスタータイプ。派手なプレーとサービス精神でスタンドを沸かせ、野球を“ショー”に変えます。ノリがよく明るく、チームのアイドル的存在。あなたの一挙手一投足が、観る人を楽しませる最高のエンターテインメントです。",
    players: ["清原和博", "ジャズ・チゾムJr.", "長嶋茂雄"],
    advice: "魅せるあなたには、見た目にもこだわったデザイン性の高い道具を。",
    adviceHref: "/hikaku/", adviceCta: "道具・ユニフォーム比較を見る",
  },
];

const BY_CODE = new Map(MBTI_TYPES.map((t) => [t.code, t]));
export const mbtiByCode = (code: string): MbtiType | undefined => BY_CODE.get(code);

// 名前 → Player の解決（Jr./中黒/空白ゆらぎを吸収）
const norm = (s: string) => s.replace(/Jr\.?/g, "").replace(/[・.\s]/g, "");
const BY_NAME = new Map<string, Player>();
PLAYERS.forEach((p) => {
  BY_NAME.set(p.name, p);
  BY_NAME.set(norm(p.name), p);
});
export function resolvePlayers(names: string[]): Player[] {
  return names.map((n) => BY_NAME.get(n) || BY_NAME.get(norm(n))).filter(Boolean) as Player[];
}

// 回答（pole配列）から4文字コードを算出
export function computeCode(answers: Record<string, Pole>): string {
  const axes: Axis[] = ["EI", "SN", "TF", "JP"];
  let code = "";
  for (const ax of axes) {
    const qs = MBTI_QUESTIONS.filter((q) => q.axis === ax);
    const counts: Record<string, number> = {};
    for (const q of qs) {
      const p = answers[q.id];
      if (p) counts[p] = (counts[p] || 0) + 1;
    }
    const { left, right } = AXIS_LABELS[ax];
    code += (counts[left] || 0) >= (counts[right] || 0) ? left : right;
  }
  return code;
}
