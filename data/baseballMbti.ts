// 野球選手MBTI診断（エンタメ）。
// MBTIの4指標（E/I・S/N・T/F・J/P）を野球の性格に置き換えた16タイプ。
// 各タイプに近い実在NPB/MLB選手をマッピング（あくまで遊びの分類）。
import { PLAYERS, type Player } from "./players";

export type Axis = "EI" | "SN" | "TF" | "JP";

// 7段階同意スケールの設問。dir=「そう思う」がどちらの極に効くか（L=E/S/T/J、R=I/N/F/P）。
// 逆転項目（dir:"R"）を混ぜるのは実際の心理検査と同じ作法。設問はすべて野球向けオリジナル。
export type Statement = { id: string; axis: Axis; dir: "L" | "R"; text: string };

export const AXIS_META: Record<
  Axis,
  { left: string; right: string; leftJp: string; rightJp: string; label: string }
> = {
  EI: { left: "E", right: "I", leftJp: "外向", rightJp: "内向", label: "エネルギー" },
  SN: { left: "S", right: "N", leftJp: "堅実", rightJp: "ひらめき", label: "プレーの発想" },
  TF: { left: "T", right: "F", leftJp: "論理", rightJp: "情熱", label: "判断のしかた" },
  JP: { left: "J", right: "P", leftJp: "計画", rightJp: "自由", label: "野球への向き合い方" },
};

// 各軸9問×4軸＝全36問。軸が交互に来るよう配列（6問×6画面）。
export const MBTI_STATEMENTS: Statement[] = [
  { id: "q01", axis: "EI", dir: "L", text: "試合中は、ベンチにいても自然と声が出ている" },
  { id: "q02", axis: "SN", dir: "L", text: "練習でいちばん大事なのは、基本の反復だと思う" },
  { id: "q03", axis: "TF", dir: "L", text: "采配や起用は、情より数字や相性で決めるべきだ" },
  { id: "q04", axis: "JP", dir: "L", text: "試合当日の持ち物は、前日の夜までに準備しておく" },
  { id: "q05", axis: "EI", dir: "R", text: "試合前は、仲間と話すより一人で静かに集中したい" },
  { id: "q06", axis: "SN", dir: "R", text: "奇策やトリックプレーを考えるとワクワクする" },
  { id: "q07", axis: "TF", dir: "R", text: "エラーした仲間には、原因の指摘より先に「ドンマイ」と声をかける" },
  { id: "q08", axis: "JP", dir: "R", text: "急な予定変更やダブルヘッダーも、その場のノリで楽しめる" },
  { id: "q09", axis: "EI", dir: "L", text: "初めて組むチームとの試合でも、すぐに打ち解けられる" },
  { id: "q10", axis: "SN", dir: "L", text: "作戦は、データや過去の実績をもとに立てたい" },
  { id: "q11", axis: "TF", dir: "L", text: "負けた原因は、感情を抜きにして冷静に分析したい" },
  { id: "q12", axis: "JP", dir: "L", text: "道具は使ったら必ず手入れをして、決まった場所に戻す" },
  { id: "q13", axis: "EI", dir: "L", text: "野球のあとの打ち上げも、試合と同じくらい楽しみだ" },
  { id: "q14", axis: "SN", dir: "R", text: "「次はこの球が来る」という直感を信じて構えることがある" },
  { id: "q15", axis: "TF", dir: "R", text: "勝ち負けよりも、全員が楽しめたかどうかが大事だ" },
  { id: "q16", axis: "JP", dir: "R", text: "本番が近づいてから、一気に集中力を発揮するタイプだ" },
  { id: "q17", axis: "EI", dir: "R", text: "素振りや壁当てなど、一人でやる練習の時間が好きだ" },
  { id: "q18", axis: "SN", dir: "L", text: "一発逆転を狙うより、確実に一点を取りにいく野球が好きだ" },
  { id: "q19", axis: "TF", dir: "L", text: "正しい指摘なら、相手に耳が痛いことでも伝えるべきだ" },
  { id: "q20", axis: "JP", dir: "L", text: "練習メニューや打順は、事前にきっちり決めておきたい" },
  { id: "q21", axis: "EI", dir: "L", text: "チームの輪の中心で、ムードを作るのは自分の役割だと思う" },
  { id: "q22", axis: "SN", dir: "R", text: "新しい打撃理論や練習法を見つけると、すぐ試したくなる" },
  { id: "q23", axis: "TF", dir: "R", text: "メンバーを選ぶなら、実力だけでなく頑張ってきた過程も評価したい" },
  { id: "q24", axis: "JP", dir: "R", text: "かっちりした型にはめられるより、自由にやらせてほしい" },
  { id: "q25", axis: "EI", dir: "R", text: "大事な試合のあとは、一人になってゆっくり振り返りたい" },
  { id: "q26", axis: "SN", dir: "L", text: "上達のコツは、今の課題をひとつずつ着実に潰していくことだ" },
  { id: "q27", axis: "TF", dir: "L", text: "話し合いでは、筋が通っているかどうかをいちばん重視する" },
  { id: "q28", axis: "JP", dir: "L", text: "集合時間より、かなり早めに球場へ着いていないと落ち着かない" },
  { id: "q29", axis: "EI", dir: "L", text: "見ている人が多いほど、プレーに気合が入る" },
  { id: "q30", axis: "SN", dir: "R", text: "自分の理想のプレースタイルを、頭の中でよく思い描く" },
  { id: "q31", axis: "TF", dir: "R", text: "チームメイトの気持ちの変化には、わりとすぐ気づく方だ" },
  { id: "q32", axis: "JP", dir: "R", text: "思い立ったら、計画を立てる前にまず動いてしまう" },
  { id: "q33", axis: "EI", dir: "R", text: "にぎやかな練習より、黙々と集中できる練習のほうが伸びる気がする" },
  { id: "q34", axis: "SN", dir: "L", text: "その日のひらめきよりも、再現性のあるフォームを信じている" },
  { id: "q35", axis: "TF", dir: "L", text: "自分がスタメンを外れても、チームが勝つための采配なら納得できる" },
  { id: "q36", axis: "JP", dir: "L", text: "シーズンや月ごとの目標を立てて、達成度を確かめるのが好きだ" },
];

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

// ── 相性（エンタメ）: 全4軸が逆＝ベストの相棒／T・F と J・P だけ逆＝衝突しがちな相手 ──
// どちらも「実在選手ペア」ではなく16タイプ同士の組み合わせで、双方向に成立する。
const BEST_PAIRS: [string, string, string][] = [
  ["INTJ", "ENFP", "戦略と閃きが噛み合う名コンビ。緻密な作戦と自由な発想が、想定外の勝ち筋を生み出す。"],
  ["INTP", "ENFJ", "理屈と情熱の好バランス。技術を突き詰める探究心と、チームを鼓舞する熱さで、個の力とチーム力が両立する。"],
  ["ENTJ", "INFP", "統率力と理想が補い合う。決断力が夢を形にし、想いが采配に深みを与える名コンビ。"],
  ["ENTP", "INFJ", "発想とビジョンが響き合う。斬新なアイデアを、深い洞察が正しい方向へ導く名参謀コンビ。"],
  ["ISTJ", "ESFP", "堅実さと華やかさの黄金比。安定感が自由な魅力を支え、明るさが緊張をほぐす好相性。"],
  ["ISFJ", "ESTP", "献身と度胸のいいコンビ。支える力が大胆な勝負を後押しし、勢いが勇気を分けてくれる。"],
  ["ESTJ", "ISFP", "統率と感性の好相性。規律が才能を活かす舞台を作り、繊細さがチームに彩りを添える。"],
  ["ESFJ", "ISTP", "気配りと職人技の名コンビ。気遣いが支え、確かな技術が安心につながる。"],
];
// 全4軸フリップ済み集合から「T/F・J/Pだけ逆」の相手を導出
const TOUGH_PAIRS: [string, string, string][] = [
  ["INTJ", "INFP", "理屈と気持ちで判断基準がずれやすい。でも歩み寄れば、冷静さと熱意を兼ね備えた最強コンビになれる。"],
  ["INTP", "INFJ", "淡々とした分析派と繊細な理想派。ペースの違いに戸惑うことも、理解し合えば深い信頼関係に。"],
  ["ENTJ", "ENFP", "どちらも周囲を引っ張るタイプ同士。方向性がぶつかることもあるが、噛み合えば最強のコンビになれる。"],
  ["ENTP", "ENFJ", "自由に動きたい方と、まとめたい方。ペースにズレを感じやすいが、噛み合えばチームに新しい風を吹き込める。"],
  ["ISTJ", "ISFP", "型を大事にする方と、感覚で動く方。最初は噛み合わなくても、互いのペースを認め合えば良いコンビに。"],
  ["ISFJ", "ISTP", "気配り型と一人黙々型。距離感の取り方に工夫がいるが、無理せず付き合えば頼れる相棒になる。"],
  ["ESTJ", "ESFP", "規律派と自由派。ルールへの温度差はあるが、明るさが緊張をほぐす良い刺激にもなる。"],
  ["ESFJ", "ESTP", "慎重派と勢い派。ペースの違いに驚くこともあるが、噛み合えば行動力と気配りが揃う頼れるコンビに。"],
];

function buildPairMap(pairs: [string, string, string][]): Map<string, { code: string; note: string }> {
  const m = new Map<string, { code: string; note: string }>();
  for (const [a, b, note] of pairs) {
    m.set(a, { code: b, note });
    m.set(b, { code: a, note });
  }
  return m;
}
const BEST_MAP = buildPairMap(BEST_PAIRS);
const TOUGH_MAP = buildPairMap(TOUGH_PAIRS);

export type MatchInfo = { type: MbtiType; note: string };
export function getCompat(code: string): { best: MatchInfo | null; tough: MatchInfo | null } {
  const b = BEST_MAP.get(code);
  const t = TOUGH_MAP.get(code);
  return {
    best: b ? { type: mbtiByCode(b.code)!, note: b.note } : null,
    tough: t ? { type: mbtiByCode(t.code)!, note: t.note } : null,
  };
}

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

// 回答（-3〜+3の7段階）から4文字コード＋軸別の強さ(%)を算出
export type AxisScore = {
  axis: Axis;
  letter: string; // 勝った側の文字
  pct: number; // 勝った側の強さ（50〜100）
  leftPct: number; // 左極（E/S/T/J）側の割合
  rightPct: number;
};
export type MbtiResult = { code: string; axes: AxisScore[] };

export function computeResult(ans: Record<string, number>): MbtiResult {
  const axes = (Object.keys(AXIS_META) as Axis[]).map((axis) => {
    const qs = MBTI_STATEMENTS.filter((s) => s.axis === axis);
    let sum = 0; // 正の値＝左極（E/S/T/J）寄り
    for (const s of qs) {
      const v = ans[s.id] ?? 0;
      sum += s.dir === "L" ? v : -v;
    }
    const max = qs.length * 3;
    const leftPct = Math.round(((sum + max) / (2 * max)) * 100);
    const m = AXIS_META[axis];
    const letter = sum >= 0 ? m.left : m.right;
    const pct = sum >= 0 ? leftPct : 100 - leftPct;
    return { axis, letter, pct, leftPct, rightPct: 100 - leftPct };
  });
  return { code: axes.map((a) => a.letter).join(""), axes };
}
