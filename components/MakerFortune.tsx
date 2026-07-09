"use client";

// 「野球ギアメーカー占い」。使っている/好きなメーカーを選ぶだけの低ハードル入口。
// 選んだメーカーの詳しい解説＋“今日の運勢”を表示する。
// 運勢はブラウザの日付（new Date）× メーカーで毎日変わる（＝また来たくなる）。
// 結果はメーカーの楽天アフィリンク＋本格版=野球人間ドックへの導線つき。
import { useState } from "react";
import { rktSearch } from "@/data/site";

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
            <button key={mk.name} className="mf-maker-btn" onClick={() => setIdx(i)}>
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
          <button className="mf-again" onClick={() => setIdx(null)}>
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
