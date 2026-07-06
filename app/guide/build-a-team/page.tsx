import type { Metadata } from "next";
import AdSlot from "@/components/AdSlot";
import GoodsLinks from "@/components/GoodsLinks";
import { LAST_UPDATED } from "@/data/makers";
import { SITE_URL } from "@/data/site";

export const metadata: Metadata = {
  title: "草野球チームの作り方【立ち上げ完全マニュアル】メンバー集め・球場・連盟・保険まで7ステップ",
  description:
    "「よし、チームを作ろう」——その一歩を、迷わせません。発起人のコンセプト決めから、メンバー集め、グラウンド確保、リーグ加入、保険・会計、連絡ツールの整備、そして初試合まで。草野球チームをゼロから立ち上げる手順を、幹事目線の7ステップで完全マニュアル化しました。",
  alternates: { canonical: `${SITE_URL}/guide/build-a-team/` },
  openGraph: {
    title: "草野球チームの作り方【立ち上げ完全マニュアル】",
    description:
      "コンセプト決め→メンバー集め→球場→連盟→保険・会計→連絡ツール→初試合。ゼロから作る7ステップ。",
    type: "article",
  },
};

function StructuredData() {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      "草野球チームの作り方【立ち上げ完全マニュアル】メンバー集め・球場・連盟・保険まで7ステップ",
    inLanguage: "ja",
    dateModified: "2026-07-06",
    author: { "@type": "Organization", name: "草野球ナビ" },
  };
  const howto = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "草野球チームの作り方（7ステップ）",
    step: [
      { "@type": "HowToStep", name: "発起人になり、チームのコンセプトを決める" },
      { "@type": "HowToStep", name: "メンバーを集める" },
      { "@type": "HowToStep", name: "チーム名とユニフォームを決める" },
      { "@type": "HowToStep", name: "グラウンドを確保する" },
      { "@type": "HowToStep", name: "リーグ・連盟に加入し、対戦相手を見つける" },
      { "@type": "HowToStep", name: "保険と会計のしくみを整える" },
      { "@type": "HowToStep", name: "連絡・出欠ツールを用意して初試合へ" },
    ],
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "草野球チームは最低何人いれば作れますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "試合をするには最低9人ですが、欠席や助っ人を考えると常時12〜15人の登録メンバーがいると安定します。まずは発起人＋気心の知れた数人で始め、あとから助っ人募集で増やしていくのが現実的です。",
        },
      },
      {
        "@type": "Question",
        name: "チームを作るのにお金はどれくらいかかりますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "立ち上げ時に必ずかかるのは連盟登録費（年1〜3万円／チーム）とスポーツ保険（1人年1,850円ほど）程度。ユニフォームや共用道具は後から少しずつでもOKです。詳しくは年間費用の記事で解説しています。",
        },
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}

export default function BuildATeamPage() {
  return (
    <main className="container">
      <StructuredData />
      <article className="article">
        <h1>
          草野球チームの作り方【立ち上げ完全マニュアル】メンバー集め・球場・連盟・保険まで7ステップ
        </h1>
        <p className="meta">最終更新：{LAST_UPDATED} ｜ 読了目安：約9分</p>

        <p>
          「気の合う仲間と、自分たちのチームでやりたい」——
          そう思い立った瞬間から、あなたはもう発起人です。
          でも、いざ動こうとすると分からないことだらけ。何人集めればいい？
          グラウンドはどうやって取る？ 連盟って入らなきゃダメ？ 保険は？ お金は？
        </p>
        <p>
          この記事は、その「?」をひとつずつ潰していく
          <strong>立ち上げの完全マニュアル</strong>です。
          チームがゼロから初試合を迎えるまでを、順番どおりに進められる
          <strong>7つのステップ</strong>に整理しました。上から順にこなせば、
          あなたのチームは形になります。
        </p>

        <nav className="toc-box" aria-label="目次">
          <p className="toc-title">📋 立ち上げ7ステップ</p>
          <ol>
            <li><a href="#step1">① コンセプトを決める</a></li>
            <li><a href="#step2">② メンバーを集める</a></li>
            <li><a href="#step3">③ チーム名とユニフォーム</a></li>
            <li><a href="#step4">④ グラウンドを確保する</a></li>
            <li><a href="#step5">⑤ リーグ・連盟に加入する</a></li>
            <li><a href="#step6">⑥ 保険と会計を整える</a></li>
            <li><a href="#step7">⑦ 連絡ツールを用意して初試合へ</a></li>
          </ol>
        </nav>

        <AdSlot id="article-top" />

        <h2 id="step1">① 発起人になり、コンセプトを決める</h2>
        <p>
          最初にやるべきは、メンバー集めでも球場探しでもありません。
          <strong>「どんなチームにするか」を言葉にすること</strong>です。
          ここがブレると、後から集まった人との温度差でチームが空中分解します。
        </p>
        <p>決めておきたいのは、次の3つ。</p>
        <table>
          <thead>
            <tr>
              <th>決めること</th>
              <th>例</th>
              <th>なぜ大事か</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>本気度</td>
              <td>エンジョイ／勝ちにこだわる</td>
              <td>ここが合わないと一番モメる。最初に旗を立てる</td>
            </tr>
            <tr>
              <td>活動頻度・曜日</td>
              <td>月2回・日曜午前／隔週</td>
              <td>参加できる人の顔ぶれが決まる</td>
            </tr>
            <tr>
              <td>エリア</td>
              <td>◯◯市周辺のグラウンド</td>
              <td>集まりやすさと球場確保に直結</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>ひとことコンセプトを作る：</strong>
          「30代中心・日曜午前・とにかく楽しく、勝ち負けは二の次」——
          このくらい具体的な<strong>一文</strong>があると、募集のときにそのまま使えて、
          集まる人のミスマッチも激減します。まずはこの一文から。
        </div>

        <h2 id="step2">② メンバーを集める</h2>
        <p>
          コンセプトが決まったら、いよいよ人集め。
          いきなり大人数を狙わず、<strong>まず発起人＋2〜3人のコアメンバー</strong>を固めるのが鉄則です。
          コアがいれば、そこから輪が広がります。
        </p>
        <p>集め方は、大きく次の順で当たっていくのが効率的です。</p>
        <ol>
          <li><strong>友人・職場・元チームの仲間</strong>：一番早くて確実。まずは声かけから</li>
          <li><strong>その人の紹介</strong>：「野球やりたい人いない？」の連鎖が最強</li>
          <li><strong>助っ人募集サイト・アプリ・SNS</strong>：知り合いで足りなければ外へ</li>
        </ol>
        <p>
          「試合はしたいけど人数が足りない」——草野球チーム最大の悩みです。
          募集チャネルの選び方や、集まる募集文の書き方は専用記事にまとめました。
        </p>
        <a className="cta-inline" href="/guide/helper-recruit/">
          → 助っ人・メンバーの集め方 完全ガイドを読む
        </a>

        <h2 id="step3">③ チーム名とユニフォームを決める</h2>
        <p>
          人が集まってきたら、チームに<strong>「名前」と「顔」</strong>を。
          名前が決まると一気にチームらしくなり、メンバーの帰属意識も高まります。
          焦って作る必要はありませんが、名前だけは早めにあると連絡もしやすい。
        </p>
        <p>
          チーム名のアイデアに詰まったら、かっこいい系・面白い系・和風まで
          100連発でまとめた記事があります。ユニフォームは、名前とロゴが固まってからで十分間に合います。
        </p>
        <ul>
          <li><a href="/guide/team-name-ideas/">チーム名の決め方＆アイデア100連発</a></li>
          <li><a href="/guide/uniform-how-to/">草野球ユニフォームの作り方【7ステップ】</a></li>
          <li><a href="/shindan/">写真からぴったりのメーカーを探す「ぴったり診断」</a></li>
        </ul>

        <AdSlot id="article-mid" />

        <h2 id="step4">④ グラウンドを確保する</h2>
        <p>
          活動場所がなければ、チームは動けません。
          そして<strong>球場確保は、立ち上げで一番の難関</strong>でもあります。
          選択肢は大きく2つ。
        </p>
        <table>
          <thead>
            <tr>
              <th>種別</th>
              <th>料金の目安</th>
              <th>特徴</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>公共グラウンド（市区町村）</td>
              <td>1枠 2,000〜6,000円</td>
              <td>安い。ただし抽選・先着予約で競争率が高い</td>
            </tr>
            <tr>
              <td>民間・河川敷など</td>
              <td>無料〜数千円</td>
              <td>河川敷は無料の所も。設備は簡素なことが多い</td>
            </tr>
          </tbody>
        </table>
        <div className="point-box">
          <strong>予約は「団体登録」から：</strong>
          多くの自治体は、公共施設を予約するのに
          <strong>スポーツ団体としての登録</strong>が必要です。
          まずは市区町村の「スポーツ施設予約システム」や体育協会のサイトを確認し、
          団体登録を済ませておきましょう。人気枠は抽選なので、
          <strong>複数候補を出す・早めに動く</strong>のがコツです。
        </div>

        <h2 id="step5">⑤ リーグ・連盟に加入し、対戦相手を見つける</h2>
        <p>
          チーム内で紅白戦をするだけでも野球はできますが、
          やはり<strong>他チームとの対戦</strong>があってこそ盛り上がります。相手の見つけ方は主に3つ。
        </p>
        <ul>
          <li>
            <strong>地域の軟式野球連盟・リーグに加入する</strong>：
            年会費（1〜3万円／チーム）で、リーグ戦や大会に参加できる。対戦相手に困らないのが最大の利点
          </li>
          <li>
            <strong>対戦相手募集サイト・アプリでマッチング</strong>：
            連盟に入らず、単発の練習試合を組む。ゆるく始めたいチーム向き
          </li>
          <li>
            <strong>知り合いのチームと組む</strong>：
            発起人の人脈で1〜2チームつながっていると、立ち上げ初期はとても楽
          </li>
        </ul>
        <p>
          最初は「連盟に入らず練習試合から」で十分。
          慣れてきて「公式戦で勝ちたい」となったら、連盟加入を検討する——という順番で問題ありません。
        </p>

        <h2 id="step6">⑥ 保険と会計のしくみを整える</h2>
        <p>
          ここは地味ですが、<strong>チームを長く続けるための土台</strong>。
          特に保険は、ケガや事故が起きてからでは遅いので、活動前に必ず。
        </p>
        <h3>スポーツ保険は必ず加入を</h3>
        <p>
          スポーツ安全保険なら<strong>1人年1,850円ほど</strong>で、ケガの補償に加えて
          対人・対物の賠償責任までカバーできます。
          打球や送球が人に当たる事故は草野球でも起こりえます。チーム単位でまとめて加入しましょう。
        </p>
        <h3>会費のルールを最初に決める</h3>
        <p>
          お金は、あとから決めるとモメる原因No.1。
          <strong>「月会費制」か「都度参加費制」か</strong>を立ち上げ時に決め、
          集金と支出を透明にしておきます。相場や集金方法は年間費用の記事で詳しく解説しています。
        </p>
        <a className="cta-inline" href="/guide/annual-cost/">
          → 草野球の年間費用のリアル（会費相場・集金のしかた）
        </a>

        <AdSlot id="article-bottom" />

        <h2 id="step7">⑦ 連絡・出欠ツールを用意して、初試合へ</h2>
        <p>
          最後の仕上げは、<strong>チームの「連絡インフラ」</strong>。
          人数が増えるほど、LINEだけでは出欠管理が破綻します。
          最初から出欠・会計・戦績をまとめられるツールを入れておくと、運営がぐっと楽になります。
        </p>
        <ul>
          <li><strong>連絡</strong>：LINEグループ／オープンチャット（大人数向け）</li>
          <li><strong>出欠・会計・戦績</strong>：チーム管理アプリ（無料あり）</li>
        </ul>
        <a className="cta-inline" href="/guide/team-apps/">
          → チーム管理・スコアアプリおすすめ7選【無料あり】
        </a>

        <h2>初試合までの最終チェックリスト</h2>
        <div className="point-box">
          <ul style={{ margin: 0 }}>
            <li>✅ チームのコンセプト（一文）が言える</li>
            <li>✅ 試合が組める人数（最低9人・できれば12人〜）が集まった</li>
            <li>✅ チーム名が決まっている</li>
            <li>✅ グラウンドを1枠押さえた</li>
            <li>✅ 対戦相手 or 紅白戦の段取りができた</li>
            <li>✅ スポーツ保険に加入した</li>
            <li>✅ 会費のルールを決めた</li>
            <li>✅ 連絡・出欠ツールを用意した</li>
          </ul>
        </div>
        <p>
          8つ全部にチェックが付いたら、あとはプレイボールを待つだけ。
          完璧を目指さなくて大丈夫です。<strong>足りないものは、走りながら揃えればいい</strong>。
          動き出したチームは、自然と形になっていきます。
        </p>

        <h2>よくある質問</h2>
        <h3>Q. 野球未経験でもチームを作れますか？</h3>
        <p>
          作れます。むしろ「未経験・初心者歓迎」を掲げたチームは、
          同じ立場の仲間が集まりやすく、立ち上げがスムーズなことも。
          プレーの上手さより、<strong>連絡をマメに回す運営力</strong>のほうがチーム作りには効きます。
        </p>
        <h3>Q. 発起人がやることが多すぎて不安です</h3>
        <p>
          全部を一人で抱えないのがコツです。
          <strong>会計係・連絡係・球場予約係</strong>のように、コアメンバーで役割を分担しましょう。
          「発起人＝全部やる人」ではなく「発起人＝旗を立てる人」でOKです。
        </p>

        <a className="cta-inline" href="/guide/how-to-start/">
          → まだ迷っている人は「草野球の始め方 完全ガイド」から
        </a>
      </article>
      <GoodsLinks />
      <div style={{ height: 30 }} />
    </main>
  );
}
