"use client";

// 「野球ギアメーカー占い」。使っている/好きなメーカーを選ぶだけの低ハードル入口。
// 選んだメーカーの詳しい解説＋“今日の運勢”を表示する。
// 運勢はブラウザの日付（new Date）× メーカーで毎日変わる（＝また来たくなる）。
// 結果はメーカーの楽天アフィリンク＋本格版=野球人間ドックへの導線つき。
import { useState } from "react";
import { rktSearch, SITE_URL } from "@/data/site";
import { renderFortuneCard } from "@/lib/fortuneCard";
import { canvasToBlob } from "@/lib/dockCard";

type Maker = {
  name: string;
  kind: "グローブ" | "バット"; // アフィリ検索の寄せ先
  tagline: string;
  desc: string; // メーカーの特徴（詳しめ）
  persona: string; // このメーカーを選ぶ人は…
};

// 主要な野球ギアメーカー（グローブ／バット）
const MAKERS: Maker[] = [
  { name: "ミズノ", kind: "グローブ", tagline: "王道・総合力No.1", desc: "プロ・アマ問わず国内最大手。グローブ・バット・スパイクまで全部そろう安心感で、迷ったらまず候補になる王道。最高峰ライン「ミズノプロ」は憧れの的。", persona: "基本に忠実で外さないオールラウンダー。周りからの信頼も厚い、チームの軸になる人。" },
  { name: "ミズノプロ", kind: "グローブ", tagline: "頂点を目指す最高峰", desc: "ミズノの最上級ライン。素材・仕立て・型のすべてが一級で、プロも多数使用。「良いものを長く」という価値観の人に響く。", persona: "妥協しない上昇志向。細部までこだわり、常に一つ上を目指すストイックな人。" },
  { name: "ゼット（ZETT）", kind: "グローブ", tagline: "勝負師のプロステイタス", desc: "「プロステイタス」で知られる本格派。硬式グラブに定評があり、勝負どころで頼れる作り。源田モデルなどプロの本人モデルも人気。", persona: "ここぞで力を出す勝負師タイプ。派手さより実戦での強さを重んじる人。" },
  { name: "SSK", kind: "グローブ", tagline: "フィットと捕手の名門", desc: "「プロエッジ」シリーズが人気。手なじみ・捕球性能に定評があり、とくにキャッチャーミットの名門として支持が厚い。", persona: "チームを支える縁の下タイプ。しっかり者で、細やかな気配りができる人。" },
  { name: "久保田スラッガー", kind: "グローブ", tagline: "型の美学・内野の定番", desc: "内野手から絶大な人気を誇る職人ブランド。独特の型と操作性で「守備がうまくなる」と評判。こだわり派の到達点。", persona: "型やスタイルにこだわる求道者。技術で魅せる、玄人肌のプレーヤー。" },
  { name: "ローリングス", kind: "グローブ", tagline: "メジャーの華・HOH", desc: "MLB公式球の名門。「HOH」など華やかでかっこいいデザインが魅力で、メジャー志向の人に人気。岡本モデルなども。", persona: "注目を集める華のあるタイプ。目立つプレーで場を盛り上げるムードメーカー。" },
  { name: "ウィルソン", kind: "グローブ", tagline: "守備の申し子・A2000", desc: "「A2000／A2K」がメジャー内野手の定番。堅牢で型崩れしにくく、守備で魅せたい人の憧れ。玄人からの信頼が厚い。", persona: "守備で真価を発揮する堅実派。地味でも確実な仕事で信頼を勝ち取る人。" },
  { name: "ハタケヤマ", kind: "グローブ", tagline: "捕手ミットの職人", desc: "革の質と仕立てで知られる職人ブランド。とくにキャッチャーミット・ファーストミットの評価が高く、通好みの一品。", persona: "本物を見抜く目を持つ通。流行より質、長く付き合える相棒を選ぶ人。" },
  { name: "ドナイヤ", kind: "グローブ", tagline: "軽さと操作性の本格派", desc: "軽量で操作性の高いグラブが持ち味。知る人ぞ知る本格派で、こだわる草野球プレーヤーからの支持を伸ばしている実力ブランド。", persona: "自分の基準を持つ実力者。派手さはなくても、分かる人には分かる存在。" },
  { name: "アシックス", kind: "グローブ", tagline: "質実剛健・日本の信頼", desc: "「ゴールドステージ」が本格派に人気。日本製ならではの質実剛健な作りで、堅実に良いものを選びたい人向き。スパイクも定評。", persona: "コツコツ努力を積む堅実派。派手さより中身で勝負する、信頼できる人。" },
  { name: "アイピーセレクト", kind: "グローブ", tagline: "感性とデザイン", desc: "デザイン性・個性が光るブランド。人と違う一品でこだわりを表現したい、感性派のプレーヤーに刺さる。", persona: "ひらめきと個性を大事にするクリエイター気質。自分らしさを貫く人。" },
  { name: "ザナックス", kind: "グローブ", tagline: "粘りのトラスト", desc: "「トラスト」シリーズなど、粘り強く堅実な作り。派手さより実直な信頼感で、長く使いたい人に向く実力ブランド。", persona: "簡単には諦めない粘り強さの持ち主。最後まで食らいつく勝負強い人。" },
  { name: "ハイゴールド", kind: "グローブ", tagline: "コスパと本格の両立", desc: "価格を抑えつつ本格的な作り。学生・若手や、コスパよく良いものを揃えたい草野球プレーヤーに人気。", persona: "賢く実利を取るリアリスト。限られた予算で最大の成果を出すのが得意な人。" },
  { name: "ワールドペガサス", kind: "グローブ", tagline: "独自性のグランドデビル", desc: "「グランドデビル」など独自の設計思想が光るブランド。他と違う視点で道具を選びたい人に。", persona: "既成概念にとらわれない独創派。人と違う道を面白がって進める人。" },
  { name: "マルーチ", kind: "バット", tagline: "MLBバットの名門", desc: "メジャーの打者に愛用者が多いバットの名門。打撃にこだわる人、パワーで魅せたい人に響くブランド。", persona: "一発の魅力に惹かれるスラッガー気質。豪快さと勝負強さを併せ持つ人。" },
  { name: "ルイスビルスラッガー", kind: "バット", tagline: "歴史あるカタリスト", desc: "軟式では「カタリスト」が人気の老舗バットブランド。軽く振り抜けて飛びも良く、スイングスピード派に好相性。", persona: "スピードとテクニックで勝負するタイプ。しなやかに、鋭く振り抜く人。" },
  { name: "アンダーアーマー", kind: "グローブ", tagline: "パワーとトレーニング志向", desc: "野球以外のトレーニングウェアでも有名。力強いデザインと機能性で、体づくりから本気の人に人気。柳田モデルなども話題。", persona: "鍛えることを厭わないアスリート気質。パワーで押し切る力強いプレーヤー。" },
  { name: "ナイキ", kind: "グローブ", tagline: "スタイリッシュ", desc: "洗練されたデザインが魅力。スパイクやアパレルで人気が高く、見た目からモチベーションを上げたい人に。", persona: "見た目・気分も大事にするおしゃれ派。かっこよさでテンションを上げる人。" },
  { name: "玉澤（タマザワ）", kind: "グローブ", tagline: "老舗の職人", desc: "創業100年超の老舗。捕手用品を中心に、質実剛健で長く使える作りに定評がある通好みのブランド。", persona: "本物志向で流行に流されない人。歴史や質を重んじる、落ち着いた大人。" },
  { name: "和牛JB", kind: "グローブ", tagline: "高級レザーの本格派", desc: "宮崎製作所の人気ブランド。上質なレザーとこだわりの仕立てで、質にこだわる草野球プレーヤーの支持を集める。", persona: "上質なものを長く使いたい人。細部までこだわる、審美眼のあるプレーヤー。" },
  { name: "ベルガード", kind: "グローブ", tagline: "守りのスペシャリスト", desc: "キャッチャー防具・用品で知られるブランド。守りの要を支える堅実な作りで、専門性を重んじる人に。", persona: "体を張ってチームを守る献身派。縁の下で全体を支える頼れる存在。" },
  { name: "レワード", kind: "グローブ", tagline: "クラシックの味わい", desc: "ユニフォームでも人気。クラシックで味のあるデザインが持ち味で、昔ながらの野球の雰囲気を好む人に。", persona: "王道・伝統を愛するロマンチスト。野球そのものを心から楽しむ人。" },
  { name: "シュアプレイ", kind: "グローブ", tagline: "コスパの実力派", desc: "手頃な価格で本格的な作り。実用性を重視し、賢く良いものを揃えたい草野球プレーヤーに支持される。", persona: "堅実に実を取る現実派。無駄なく賢く、着実に成果を出すタイプ。" },
  { name: "ディマリニ", kind: "バット", tagline: "複合バットの雄", desc: "海外発の人気バットブランド。反発性能の高い複合モデルで、飛距離を求める打者に選ばれている。", persona: "飛距離ロマンを追うパワーヒッター。豪快な一撃で流れを変える人。" },
];

// “今日の運勢”テンプレ（メーカー×日付で選ばれる）
const POOL: { catch: string; sougou: string; batting: string; fielding: string; advice: string }[] = [
  {
    catch: "攻めの姿勢が実を結ぶ日",
    sougou: "気持ちが前向きで、思い切った判断が良い方へ転がりやすい一日。迷ったら積極策が吉。",
    batting: "初球から振っていける日。狙い球を絞れば長打も期待できる。",
    fielding: "一歩目のスタートが good。前に出る守備で好プレーが生まれそう。",
    advice: "考えすぎず、まず動く。あなたの積極性がチームの流れを引き寄せる。",
  },
  {
    catch: "コツコツが報われる日",
    sougou: "派手さはないが、丁寧な準備と地道な積み重ねがしっかり実る堅実運。",
    batting: "無理に長打を狙わず、確実にミートで出塁を。四球も立派な仕事。",
    fielding: "基本に忠実な守備が光る。当たり前のプレーを確実に決めよう。",
    advice: "焦らず自分のリズムで。小さな good プレーの積み重ねが勝利を呼ぶ。",
  },
  {
    catch: "勝負強さが冴える日",
    sougou: "プレッシャーのかかる場面ほど力が出る、クラッチな一日。ここぞで頼られる。",
    batting: "チャンスに強い日。ランナーを還す一打を任されそう。集中していこう。",
    fielding: "大事な場面での落ち着きが光る。ピンチを断ち切る守備に期待。",
    advice: "痺れる場面こそ楽しむ気持ちで。あなたの勝負度胸が輝く日。",
  },
  {
    catch: "守備で流れを呼ぶ日",
    sougou: "攻撃より守りで真価を発揮。地味な貢献がチームを助ける縁の下の運気。",
    batting: "打撃は水物。1本出ればラッキー、くらいの気楽さでいこう。",
    fielding: "好守備の予感。難しい打球ほどあなたのグラブに収まりそう。",
    advice: "声を出して守備位置を整えると吉。あなたの一声が失点を防ぐ。",
  },
  {
    catch: "スピードが武器になる日",
    sougou: "足と機動力で流れを作れる一日。素早い判断がチャンスを広げる。",
    batting: "内野安打・バント安打も狙える。とにかく全力疾走が実を結ぶ。",
    fielding: "広い守備範囲でカバー運◎。一歩多く動いた分だけ好結果に。",
    advice: "迷ったら次の塁へ。あなたの積極走塁が相手の隙を突く。",
  },
  {
    catch: "仲間との連携が光る日",
    sougou: "個より和。チームプレーがかみ合い、みんなで勝ちに行ける協調運。",
    batting: "進塁打・犠打など、つなぐ意識が good。次の打者を信じよう。",
    fielding: "連係プレーが決まりやすい。カットや中継で堅実にアウトを重ねよう。",
    advice: "ベンチも含めて声かけを。あなたのムードメイクがチームを一つにする。",
  },
  {
    catch: "ひらめきが当たる日",
    sougou: "直感が冴える一日。いつもと違う選択が意外な好結果を生みそう。",
    batting: "狙い球のヤマが当たりやすい。感じたままに振ってみよう。",
    fielding: "守備位置の勘が good。「ここに来る」と思った所に打球が来るかも。",
    advice: "理屈より感覚を信じて。あなたのセンスが試合を動かす。",
  },
  {
    catch: "粘りが実を結ぶ日",
    sougou: "簡単には倒れない粘り強さが吉。しぶとく食らいつくほど運が向く。",
    batting: "ファウルで粘って四球、が理想。簡単に打ち取られない打席を。",
    fielding: "最後まで諦めない姿勢が好プレーに直結。全力で追いかけよう。",
    advice: "苦しい時こそ笑顔で。あなたの粘りがチームに勇気を与える。",
  },
  {
    catch: "華のあるプレーが飛び出す日",
    sougou: "注目を集める運気。思い切ったプレーが決まり、周りを沸かせられそう。",
    batting: "長打の予感。振り切る勇気が大きな一打を呼ぶ。狙っていこう。",
    fielding: "ファインプレーのチャンス。難しい打球に思い切って飛び込もう。",
    advice: "遠慮は禁物。あなたの魅せるプレーが試合の空気を変える。",
  },
  {
    catch: "頭脳派の作戦が冴える日",
    sougou: "読みと段取りが光る一日。先を見た判断が good な結果につながる。",
    batting: "配球を読んで一球で仕留める意識を。ヤマを張るなら今日。",
    fielding: "打者・カウントから守備位置を調整すると吉。準備が実を結ぶ。",
    advice: "一歩先を読んで動こう。あなたの野球脳がチームの武器になる。",
  },
  {
    catch: "初心に返ると良い日",
    sougou: "基本を見直すと調子が整う日。当たり前を丁寧にやるほど運が上向く。",
    batting: "力まず、centerへ返す意識で。シンプルなスイングが好結果を生む。",
    fielding: "捕って投げるの基本を確実に。丁寧なプレーがミスを防ぐ。",
    advice: "気負わず、いつも通りを大切に。基本の徹底が最大の武器。",
  },
  {
    catch: "救世主になれる日",
    sougou: "ピンチにこそ強い救援運。困っている場面であなたの出番が来そう。",
    batting: "代打・勝負どころで一発の予感。任された時こそ集中を。",
    fielding: "ここ一番の守備で試合を救えそう。最後まで気を抜かないで。",
    advice: "誰かの穴を埋める働きが吉。あなたの一肌脱ぐ姿勢が報われる。",
  },
  {
    catch: "リーダーシップが輝く日",
    sougou: "まとめ役として力を発揮する日。あなたの一声でチームが動く統率運。",
    batting: "自分が繋ぐ意識で。先頭を切って塁に出ると流れを作れる。",
    fielding: "内野・外野に声をかけて陣形を整えると good。中心になって守ろう。",
    advice: "背中で引っ張るのもよし、声で盛り上げるのもよし。今日は主役。",
  },
];

const LUCKY_POS = ["投手", "捕手", "一塁手", "二塁手", "三塁手", "遊撃手", "左翼手", "中堅手", "右翼手"];

// 今日が「その年の何日目か」（1-366）
function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

function stars(n: number): string {
  return "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
}

export default function MakerFortune() {
  const [idx, setIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [cardState, setCardState] = useState<"idle" | "busy" | "done">("idle");
  const [cardUrl, setCardUrl] = useState<string | null>(null);

  const m = idx !== null ? MAKERS[idx] : null;

  // 選んだメーカー × 今日の日付で運勢を確定（クリック後＝クライアントでのみ計算）
  const fortune =
    idx !== null
      ? (() => {
          const doy = dayOfYear(new Date());
          const seed = idx * 7 + doy;
          const p = POOL[seed % POOL.length];
          const rank = 1 + ((idx * 3 + doy * 2) % 5);
          const luckyNo = ((idx * 13 + doy * 7) % 99) + 1;
          const luckyPos = LUCKY_POS[(idx + doy) % LUCKY_POS.length];
          const dateLabel = (() => {
            const d = new Date();
            return `${d.getMonth() + 1}月${d.getDate()}日`;
          })();
          return { p, rank, luckyNo, luckyPos, dateLabel };
        })()
      : null;

  // 結果を1枚のカード画像にして保存／シェア
  const saveCard = async () => {
    if (!m || !fortune || cardState === "busy") return;
    setCardState("busy");
    try {
      const canvas = await renderFortuneCard({
        maker: m.name,
        tagline: m.tagline,
        dateLabel: fortune.dateLabel,
        catch: fortune.p.catch,
        rank: fortune.rank,
        sougou: fortune.p.sougou,
        batting: fortune.p.batting,
        fielding: fortune.p.fielding,
        luckyPos: fortune.luckyPos,
        luckyNo: fortune.luckyNo,
      });
      setCardUrl(canvas.toDataURL("image/png"));
      const blob = await canvasToBlob(canvas);
      if (!blob) throw new Error("blob failed");
      const fileName = `ギア占い_${m.name}_${fortune.dateLabel}.png`;
      const file = new File([blob], fileName, { type: "image/png" });
      const nav = navigator as Navigator & { canShare?: (d: { files: File[] }) => boolean };
      const shareText = `⚾今日のギアメーカー占い⚾ 私は【${m.name}】タイプ！`;
      if (nav.canShare && nav.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({ files: [file], text: shareText });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      }
      setCardState("done");
      setTimeout(() => setCardState("idle"), 2500);
    } catch {
      setCardState("idle");
    }
  };

  return (
    <div className="mf-band">
      <div className="mf-head">
        <span className="mf-en">Gear Fortune</span>
        <h2 className="mf-title">
          ⚾ 今日の<span className="hl">ギアメーカー占い</span>
        </h2>
        <p className="mf-sub">
          あなたが<strong>使っている（または好きな）野球メーカー</strong>を選んでください。
          そのメーカーの人物像と、<strong>今日の運勢</strong>を詳しく占います（無料・登録不要・毎日変わります）。
        </p>
      </div>

      {!m && (
        <div className="mf-makers" role="group" aria-label="メーカーを選ぶ">
          {MAKERS.map((mk, i) => (
            <button
              key={mk.name}
              className="mf-maker-btn"
              onClick={() => {
                setIdx(i);
                setCardUrl(null);
                setCardState("idle");
              }}
            >
              {mk.name}
            </button>
          ))}
        </div>
      )}

      {m && fortune && (
        <div className="mf-result">
          {/* メーカー像 */}
          <p className="mf-result-label">あなたが選んだのは……</p>
          <p className="mf-maker">
            <span className="mf-maker-name">{m.name}</span>
            <span className="mf-maker-catch">「{m.tagline}」</span>
          </p>
          <p className="mf-maker-desc">{m.desc}</p>
          <p className="mf-persona">
            <strong>{m.name}を選ぶあなたは…</strong>
            {m.persona}
          </p>

          {/* 今日の運勢 */}
          <div className="mf-fortune">
            <p className="mf-fortune-date">{fortune.dateLabel}・今日の運勢</p>
            <p className="mf-fortune-catch">
              {fortune.p.catch} <span className="mf-stars">{stars(fortune.rank)}</span>
            </p>
            <dl className="mf-fortune-list">
              <div>
                <dt>総合運</dt>
                <dd>{fortune.p.sougou}</dd>
              </div>
              <div>
                <dt>打撃運</dt>
                <dd>{fortune.p.batting}</dd>
              </div>
              <div>
                <dt>守備運</dt>
                <dd>{fortune.p.fielding}</dd>
              </div>
              <div>
                <dt>アドバイス</dt>
                <dd>{fortune.p.advice}</dd>
              </div>
            </dl>
            <div className="mf-lucky">
              <span className="mf-lucky-item">
                ラッキーポジション<b>{fortune.luckyPos}</b>
              </span>
              <span className="mf-lucky-item">
                ラッキー背番号<b>{fortune.luckyNo}</b>
              </span>
            </div>
          </div>

          {/* SNSシェア（拡散） */}
          {(() => {
            const shareUrl = `${SITE_URL}/uranai/`;
            const shareText = `⚾今日のギアメーカー占い⚾\n私は【${m.name}】タイプ（${m.tagline}）！\n今日の運勢は「${fortune.p.catch}」${stars(fortune.rank)}\nラッキーポジションは${fortune.luckyPos}／背番号${fortune.luckyNo}✨\nあなたのメーカーは？↓`;
            const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent("草野球ナビ,ギアメーカー占い")}`;
            const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
            const copyShare = async () => {
              try {
                await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* noop */
              }
            };
            return (
              <div className="mf-share">
                <span className="mf-share-label">結果をシェアする</span>
                <button className="dock-save-btn" onClick={saveCard} disabled={cardState === "busy"}>
                  {cardState === "busy"
                    ? "画像を作成中…"
                    : cardState === "done"
                      ? "画像を保存しました！"
                      : "🖼 結果を画像で保存／シェアする"}
                </button>
                {cardUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="dock-card-preview" src={cardUrl} alt="今日のギアメーカー占い" />
                )}
                <div className="mf-share-btns">
                  <a className="share-btn share-x" href={xUrl} target="_blank" rel="noopener noreferrer">
                    𝕏 でシェア
                  </a>
                  <a className="share-btn share-line" href={lineUrl} target="_blank" rel="noopener noreferrer">
                    LINEで送る
                  </a>
                  <button className="share-btn share-copy" onClick={copyShare}>
                    {copied ? "コピーしました！" : "結果をコピー"}
                  </button>
                </div>
              </div>
            );
          })()}

          <div className="mf-actions">
            <a
              className="mf-cta-buy"
              href={rktSearch(m.name.replace(/（.*/, ""), m.kind)}
              target="_blank"
              rel="nofollow sponsored noopener"
            >
              🛒 {m.name}の{m.kind}を見る
            </a>
            <a className="mf-cta-dock" href="/baseball-dock/">
              本格派は「野球人間ドック」（全45問）で似ているプロ選手まで診断 →
            </a>
          </div>
          <button
            className="mf-again"
            onClick={() => {
              setIdx(null);
              setCardUrl(null);
              setCardState("idle");
            }}
          >
            ← 別のメーカーで占う
          </button>
          <p className="mf-disc">
            ※ エンタメ占いです。運勢はメーカーと日付から算出しており、毎日変わります。
            メーカー名のリンクは楽天市場のおすすめ一覧（広告）が開きます。
          </p>
        </div>
      )}
    </div>
  );
}
