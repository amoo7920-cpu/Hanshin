/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import ComicPanel from "./components/ComicPanel";
import Slideshow from "./components/Slideshow";
import Quiz from "./components/Quiz";
import GeminiAdvisor from "./components/GeminiAdvisor";
import { Monitor, HelpCircle, Compass, Sparkles, BookOpen, Clock, Lightbulb, UserCheck, AlertTriangle, Download, Presentation } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"slides" | "comic" | "quiz" | "ai" | "ppt">("slides");
  const [selectedComicId, setSelectedComicId] = useState<number | null>(null);

  const handleComicSelect = (id: number) => {
    setSelectedComicId(id);
  };

  // Function to generate and download offline standalone HTML presentation
  const handleDownloadOfflineHTML = () => {
    const preUrl = "https://ais-pre-zzbsjikyec7x5jxjsaijma-52506271263.asia-northeast1.run.app";
    const img1 = `${preUrl}/src/assets/images/han_xin_humiliation_1788942833745.jpg`;
    const img2 = `${preUrl}/src/assets/images/han_xin_general_1788942855621.jpg`;
    const img3 = `${preUrl}/src/assets/images/han_xin_jealousy_1788942869406.jpg`;
    const img4 = `${preUrl}/src/assets/images/han_xin_lesson_1788942882962.jpg`;

    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>한신의 교훈: 인생사 새옹지마 발표 자료 (오프라인 용)</title>
  <style>
    :root {
      --stone-50: #f5f5f4;
      --stone-100: #e7e5e4;
      --stone-200: #d6d3d1;
      --stone-300: #a8a29e;
      --stone-700: #44403c;
      --stone-800: #292524;
      --stone-900: #1c1917;
      --amber-50: #fffbeb;
      --amber-100: #fef3c7;
      --amber-500: #f59e0b;
      --amber-800: #92400e;
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background-color: var(--stone-50);
      color: var(--stone-800);
      margin: 0;
      padding: 40px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .card-slides {
      max-width: 960px;
      width: 100%;
      background: var(--stone-900);
      color: var(--stone-100);
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      aspect-ratio: 16/9;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 50px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }
    .slide-page {
      display: none;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .slide-page.active {
      display: flex;
    }
    .badge {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--amber-500);
      background: rgba(245, 158, 11, 0.1);
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid rgba(245, 158, 11, 0.2);
      width: fit-content;
    }
    h2 {
      font-size: 32px;
      font-weight: 800;
      margin: 15px 0 10px 0;
      color: white;
    }
    .subtitle {
      font-size: 16px;
      color: var(--stone-300);
      border-left: 3px solid var(--amber-500);
      padding-left: 10px;
      margin-bottom: 30px;
    }
    .bullet-list {
      margin: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .bullet-item {
      display: flex;
      align-items: start;
      gap: 10px;
      font-size: 16px;
      line-height: 1.6;
      color: var(--stone-200);
    }
    .bullet-dot {
      width: 8px;
      height: 8px;
      background: var(--amber-500);
      border-radius: 50%;
      margin-top: 8px;
      flex-shrink: 0;
    }
    .footer-bar {
      border-top: 1px solid #2d2a29;
      padding-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #57534e;
    }
    .nav-btn {
      background: var(--stone-800);
      border: 1px solid var(--stone-700);
      color: white;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .nav-btn:hover {
      background: var(--stone-700);
    }
    .nav-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
    .toolbar-bottom {
      margin-top: 20px;
      display: flex;
      gap: 10px;
    }
    .script-box {
      max-width: 960px;
      width: 100%;
      background: var(--amber-50);
      border: 1px solid var(--amber-100);
      padding: 20px;
      border-radius: 12px;
      box-sizing: border-box;
      margin-top: 25px;
    }
    .script-title {
      font-size: 12px;
      font-weight: bold;
      color: var(--amber-800);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .script-text {
      font-size: 14px;
      line-height: 1.6;
      color: var(--stone-700);
      white-space: pre-line;
      margin: 0;
    }
    .comic-grid {
      display: grid;
      grid-template-cols: repeat(4, 1fr);
      gap: 15px;
      width: 100%;
      margin: 20px 0;
    }
    .comic-cell {
      background: #1f1d1c;
      border: 1px solid #3d3a38;
      border-radius: 8px;
      padding: 10px;
      text-align: center;
    }
    .comic-img {
      width: 100%;
      aspect-ratio: 1/1;
      object-cover: cover;
      border-radius: 4px;
    }
    .comic-title {
      font-size: 12px;
      font-weight: bold;
      color: white;
      margin-top: 8px;
      display: block;
    }
    .flex-row-cols {
      display: flex;
      gap: 20px;
      align-items: center;
    }
    .flex-row-cols img {
      width: 220px;
      border-radius: 8px;
      border: 4px solid rgba(245,158,11,0.2);
    }
    .card-takeaways {
      display: grid;
      grid-template-cols: repeat(3, 1fr);
      gap: 20px;
      width: 100%;
    }
    .takeaway-col {
      background: rgba(41,37,36,0.5);
      border-top: 4px solid var(--amber-500);
      padding: 15px;
      border-radius: 4px;
    }
    .takeaway-title {
      color: var(--amber-500);
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 10px;
    }
    .takeaway-body {
      font-size: 13px;
      color: var(--stone-200);
      line-height: 1.5;
    }
  </style>
</head>
<body>

  <div style="text-align: center; margin-bottom: 20px;">
    <h3 style="margin:0; font-size: 20px;">인생사 새옹지마 : 한신의 교훈</h3>
    <p style="margin:5px 0 0 0; font-size: 13px; color: var(--stone-700);">PowerPoint 발표용 단일 파일 슬라이드 덱 (웹 브라우저에서 바로 구동 가능)</p>
  </div>

  <div class="card-slides">
    <!-- Slide 1 -->
    <div class="slide-page active" id="slide-0">
      <div>
        <span class="badge">Saeongjima Wisdom</span>
        <h2>인생사 새옹지마 (塞翁之馬)</h2>
        <div class="subtitle">초한지 한신(韓信)의 초고속 성공과 비극이 주는 커리어의 지혜</div>
        <div class="bullet-list">
          <div class="bullet-item"><div class="bullet-dot"></div>실패는 성공의 어머니이고, 때론 성공이 실패의 방아쇠가 됩니다.</div>
          <div class="bullet-item"><div class="bullet-dot"></div>한나라 최고 명장 한신의 일대기를 통해 조명하는 성공의 명암.</div>
          <div class="bullet-item"><div class="bullet-dot"></div>임직원 여러분과 공유하고 싶은 비즈니스 평정심과 속도 조절의 법칙.</div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>1 / 7</span>
      </div>
    </div>

    <!-- Slide 2 -->
    <div class="slide-page" id="slide-1">
      <div>
        <span class="badge">4컷 웹툰 요약</span>
        <h2>한신의 드라마: 4컷 만화 한눈에 보기</h2>
        <div class="subtitle">과하지욕에서 토사구팽까지, 한 장으로 요약하는 새옹지마</div>
        <div class="comic-grid">
          <div class="comic-cell">
            <img class="comic-img" src="${img1}">
            <span class="comic-title">1컷: 과하지욕 (가랑이 굴욕)</span>
          </div>
          <div class="comic-cell">
            <img class="comic-img" src="${img2}">
            <span class="comic-title">2컷: 국사무쌍 (대장군 임명)</span>
          </div>
          <div class="comic-cell">
            <img class="comic-img" src="${img3}">
            <span class="comic-title">3컷: 토사구팽 (비극적 강등)</span>
          </div>
          <div class="comic-cell">
            <img class="comic-img" src="${img4}">
            <span class="comic-title">4컷: 새옹지마 (우주의 진리)</span>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>2 / 7</span>
      </div>
    </div>

    <!-- Slide 3 -->
    <div class="slide-page" id="slide-2">
      <div>
        <span class="badge">인내와 생존력</span>
        <h2>1단계: 자존심을 누른 장기적 혜안</h2>
        <div class="subtitle">과하지욕(跨下之辱) - 가랑이 밑을 기어가는 굴욕</div>
        <div class="flex-row-cols">
          <img src="${img1}">
          <div class="bullet-list">
            <div class="bullet-item"><div class="bullet-dot"></div>당장의 건달과의 승부는 이겨도 감옥, 지면 개죽음인 루즈-루즈 게임이었습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>더 큰 대업을 위해 일시적인 조롱을 묵묵히 받아들이고 힘을 비축했습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>비즈니스 교훈: 소모적인 감정 싸움이나 갈등을 피하는 것도 핵심 전략입니다.</div>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>3 / 7</span>
      </div>
    </div>

    <!-- Slide 4 -->
    <div class="slide-page" id="slide-3">
      <div>
        <span class="badge">초고속 성장과 부작용</span>
        <h2>2단계: 기회와 고속 승진의 명암</h2>
        <div class="subtitle">국사무쌍(國士無雙) - 대체 불가한 독보적 인재</div>
        <div class="flex-row-cols">
          <img src="${img2}">
          <div class="bullet-list">
            <div class="bullet-item"><div class="bullet-dot"></div>소하의 추천으로 창고지기에서 일약 전군 총사령관(대장군)으로 수직 상승했습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>최고의 실력으로 천하를 공략했으나, 독점적 성공은 동료들의 질투를 불렀습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>비즈니스 교훈: 빠른 성과 창출 뒤에는 동료들과의 겸손한 얼라인먼트가 필요합니다.</div>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>4 / 7</span>
      </div>
    </div>

    <!-- Slide 5 -->
    <div class="slide-page" id="slide-4">
      <div>
        <span class="badge">속도 조절과 관계 정치</span>
        <h2>3단계: 제어되지 않은 성공의 최후</h2>
        <div class="subtitle">토사구팽(兎死狗烹) - 화려함 뒤에 숨은 시기와 경계</div>
        <div class="flex-row-cols">
          <img src="${img3}">
          <div class="bullet-list">
            <div class="bullet-item"><div class="bullet-dot"></div>전쟁이 끝나자, 한신의 위대한 힘은 군주 유방에게 큰 정서적 위협이 되었습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>쓸모가 다하자 숙청당하는 비극적인 최후(토사구팽)를 마주하고 말았습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>비즈니스 교훈: 성과가 독보적일수록 자만하지 않고 상사와 팀에 심리적 안정감을 제공해야 합니다.</div>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>5 / 7</span>
      </div>
    </div>

    <!-- Slide 6 -->
    <div class="slide-page" id="slide-5">
      <div>
        <span class="badge">비즈니스 평정심 (Equanimity)</span>
        <h2>4단계: 인생사 새옹지마</h2>
        <div class="subtitle">塞翁之馬 - 인생은 음양의 조화이며 돌고 도는 것</div>
        <div class="flex-row-cols">
          <img src="${img4}">
          <div class="bullet-list">
            <div class="bullet-item"><div class="bullet-dot"></div>치욕은 영광의 씨앗이 되었고, 영광은 도리어 몰락의 빌미를 제공했습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>좋은 것이 영원한 행복이 아니고, 나쁜 일이 영원한 절망이 아님을 깨닫습니다.</div>
            <div class="bullet-item"><div class="bullet-dot"></div>비즈니스 교훈: 분기 성과에 일희일비하지 않는 정신적 유연함이 롱런의 핵심입니다.</div>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>6 / 7</span>
      </div>
    </div>

    <!-- Slide 7 -->
    <div class="slide-page" id="slide-6">
      <div>
        <span class="badge">실천 행동양식</span>
        <h2>임직원 핵심 행동 양식 제안</h2>
        <div class="subtitle">한신이 오늘날 우리 임직원 발표회에 던지는 3가지 질문</div>
        <div class="card-takeaways">
          <div class="takeaway-col">
            <div class="takeaway-title">1. 과하지욕의 기운</div>
            <div class="takeaway-body">지금 마주한 어려움은 다음 대장군 비상을 위한 축적과 성찰의 기간입니다.</div>
          </div>
          <div class="takeaway-col">
            <div class="takeaway-title">2. 성과와 겸손의 균형</div>
            <div class="takeaway-body">빠른 프로젝트 성과를 얻었다면 겸손히 동료들에게 공을 나누어 나의 내실을 견고히 합시다.</div>
          </div>
          <div class="takeaway-col">
            <div class="takeaway-title">3. 상호 정서적 얼라인</div>
            <div class="takeaway-body">나의 전문성을 뽐내기 전에 이것이 조직 전체의 조화와 위기 정서에 잘 녹아드는지 매칭합시다.</div>
          </div>
        </div>
      </div>
      <div class="footer-bar">
        <span>© 사내 세미나 발표 자료</span>
        <span>7 / 7</span>
      </div>
    </div>

  </div>

  <div class="toolbar-bottom">
    <button class="nav-btn" id="prev-btn" onclick="moveSlide(-1)">이전 슬라이드</button>
    <button class="nav-btn" id="next-btn" onclick="moveSlide(1)">다음 슬라이드 (또는 키보드 우측키)</button>
  </div>

  <!-- Teleprompter script -->
  <div class="script-box">
    <div class="script-title">📢 발표자 대본 (Teleprompter)</div>
    <p class="script-text" id="script-target">대본 로딩 중...</p>
  </div>

  <script>
    let activeIndex = 0;
    const totalSlides = 7;
    const scripts = {
      0: "[발표 시작 멘트]\\n여러분 안녕하십니까. 오늘 임직원 발표회에서 제가 나누고 싶은 주제는 바로 '인생사 새옹지마'입니다. 오늘은 특별히 초한지의 전설적인 명장 '한신'의 일대기를 통해, 직장인으로서 성공과 좌절을 어떻게 다스려야 하는지에 대해 이야기하려 합니다.",
      1: "[4컷 만화 개요 슬라이드]\\n이 슬라이드는 한신의 일대기를 한눈에 요약한 만화입니다. 가랑이 밑을 기어가던 치욕(과하지욕)부터 전군 총사령관 등극(국사무쌍), 평화 국면 속 쓸쓸한 최후(토사구팽)와 이 모든 삶을 관통하는 새옹의 진리를 한 장으로 모아 유쾌하게 시사점을 전달합니다.",
      2: "[1컷 상세 슬라이드 - 과하지욕]\\n첫 컷인 '과하지욕'입니다. 한신은 일시적인 자존심을 버리고 가랑이 밑을 기었습니다. 홧김에 건달을 해쳐 살인범이 되는 최악의 루즈-루즈(Lose-Lose) 게임을 피한 현명함이었습니다. 때론 불필요한 감정 소모를 피하는 것이 비즈니스 대업 완수의 기초 체력입니다.",
      3: "[2컷 상세 슬라이드 - 국사무쌍]\\n두 번째 컷 '국사무쌍'입니다. 창고지기에서 하루아침에 대장군으로 파격 등극하여 압도적인 승리를 거머쥐었습니다. 하지만 너무 빠른 성공 독식은 주변의 시기를 불러 모았고 이로 인해 새옹지마의 반전 위협이 도사리기 시작하는 발단이 되었습니다.",
      4: "[3컷 상세 슬라이드 - 토사구팽]\\n세 번째 컷은 숙청을 상징하는 '토사구팽'입니다. 한신은 군사적으로는 천재였지만, 공적에 취해 황제 유방에게 '안전한 동료'라는 정서적 신뢰를 주는 데는 실패했습니다. 독단적 실적 질주가 지닌 무서운 위험성과 겸손의 소중함을 절절히 배웁니다.",
      5: "[4컷 상세 슬라이드 - 새옹지마]\\n네 번째 컷은 본질을 조명합니다. 과거의 굴욕(나쁨)은 미래의 영광(좋음)을 낳았고, 영광의 정점(좋음)은 파멸(나쁨)로 이어졌습니다. 인생과 업무 성과 역시 파도처럼 흐를 뿐입니다. 어떠한 단기 실적이나 후퇴에도 영원히 주저앉거나 자만하지 않는 마인드의 평정심이 핵심입니다.",
      6: "[마무리 행동 양식]\\n끝으로 우리 구성원 여러분께 3가지 제안을 드립니다. 일시적인 성과 악화나 피드백을 '가랑이 인내의 시간'으로 전환해 내고, 성과 달성 뒤에는 공을 나누며, 조직의 정서와 늘 싱크를 맞춥시다. 경청해 주셔서 감사합니다."
    };

    function updateView() {
      // Hide all pages
      for (let i = 0; i < totalSlides; i++) {
        document.getElementById("slide-" + i).classList.remove("active");
      }
      // Show active page
      document.getElementById("slide-" + activeIndex).classList.add("active");
      
      // Update buttons
      document.getElementById("prev-btn").disabled = (activeIndex === 0);
      document.getElementById("next-btn").disabled = (activeIndex === totalSlides - 1);
      
      // Update teleprompter script
      document.getElementById("script-target").innerText = scripts[activeIndex] || "";
    }

    function moveSlide(offset) {
      const nextIndex = activeIndex + offset;
      if (nextIndex >= 0 && nextIndex < totalSlides) {
        activeIndex = nextIndex;
        updateView();
      }
    }

    // Keyboard controls
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") moveSlide(1);
      if (e.key === "ArrowLeft") moveSlide(-1);
    });

    // Initialize
    updateView();
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "han_xin_saeongjima_presentation.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans flex flex-col justify-between">
      {/* Top Header Section */}
      <header className="bg-white border-b border-stone-200 py-6 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 inline-flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> 임직원 명사 발표회 자료
              </span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 inline-flex items-center gap-1">
                코믹 4컷 만화 수록
              </span>
            </div>
            <h1 className="text-xl md:text-3xl font-serif font-extrabold tracking-tight text-stone-900">
              인생사 새옹지마 : 한신(韓信)의 교훈
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              좋지 않은 일은 기회의 기틀이 되고, 너무 빠른 성공은 파국을 품는다. 현대 직장인의 마인드 수호를 위한 프레젠테이션
            </p>
          </div>

          {/* Quick Summary card */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 max-w-sm flex items-start gap-2.5 shadow-inner">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed text-stone-700 font-medium">
              <span className="font-bold text-amber-900 block mb-0.5">핵심 메시지 (Executive Note)</span>
              한신의 빠른 대장군 영전(성공)은 동료의 시기와 유방의 경계를 불러와 비극(죽음)을 재촉했습니다. 속도보다 조율과 겸손이 핵심입니다.
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 overflow-x-auto pb-px scrollbar-none">
          <button
            id="tab-slides"
            onClick={() => setActiveTab("slides")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "slides"
                ? "border-amber-800 text-amber-950 bg-amber-50/30"
                : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
            }`}
          >
            <Monitor className="w-4 h-4" />
            발표용 슬라이드 덱
          </button>
          <button
            id="tab-comic"
            onClick={() => setActiveTab("comic")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "comic"
                ? "border-amber-800 text-amber-950 bg-amber-50/30"
                : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            4컷 만화 보기
          </button>
          <button
            id="tab-quiz"
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "quiz"
                ? "border-amber-800 text-amber-950 bg-amber-50/30"
                : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
            }`}
          >
            <Compass className="w-4 h-4" />
            새옹지마 지수 측정기 (자가진단)
          </button>
          <button
            id="tab-ai"
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "ai"
                ? "border-amber-800 text-amber-950 bg-amber-50/30"
                : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            AI 맞춤 원고 메이커
          </button>
          <button
            id="tab-ppt"
            onClick={() => setActiveTab("ppt")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "ppt"
                ? "border-amber-800 text-amber-950 bg-amber-50/30"
                : "border-transparent text-stone-500 hover:text-stone-800 hover:border-stone-300"
            }`}
          >
            <Presentation className="w-4 h-4 text-orange-700" />
            PPT 연동 & 다운로드
          </button>
        </div>

        {/* Tab Contents */}
        <div className="min-h-[450px]">
          {activeTab === "slides" && (
            <div className="space-y-6">
              <Slideshow initialSlideId={selectedComicId ? selectedComicId + 2 : 1} />
              {/* Extra context help */}
              <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 flex gap-3 items-start">
                <Lightbulb className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                <div className="text-xs text-stone-600 leading-relaxed space-y-1">
                  <p className="font-bold text-stone-800">💡 연습용 툴팁</p>
                  <p>이 발표 도구는 임직원 여러분이 사내 발표회 자리에서 곧바로 활용할 수 있도록 정밀 각색되었습니다. <strong>[슬라이드 제어기]</strong>를 통해 비밀 발표 대본(스크립트)을 활성화하여 읽으면서 스피치 연습을 해보세요. 우측 상단의 타이머를 활성화하면 시간 초과를 실시간 모니터링할 수 있습니다.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "comic" && (
            <div className="space-y-6">
              <div className="border-b border-stone-200 pb-4">
                <h3 className="text-lg font-serif font-extrabold text-stone-900">
                  한신의 4컷 만화 탐색기 (Comical Webtoon Panel)
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  각 컷을 클릭하시면 말풍선 상세 대화내용과 <strong>[새옹의 복]</strong>, <strong>[지마의 화]</strong> 이중성 상세 매트릭스가 나타납니다.
                </p>
              </div>
              <ComicPanel onSelectPanel={handleComicSelect} />
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="space-y-6">
              <Quiz />
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-6">
              <GeminiAdvisor />
            </div>
          )}

          {activeTab === "ppt" && (
            <div className="space-y-6 bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
              <div className="border-b border-stone-200 pb-4 space-y-1">
                <h3 className="text-lg font-serif font-extrabold text-stone-900 flex items-center gap-2">
                  <Presentation className="w-5 h-5 text-amber-800" />
                  파워포인트(PowerPoint) 연동 및 오프라인 패키지 다운로드
                </h3>
                <p className="text-xs text-stone-600">
                  사내 보안 정책과 파워포인트의 동작 환경에 적합한 두 가지 초간편 발표 연동 방식을 안내해 드립니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Option 1: Standalone HTML Downloader */}
                <div className="border border-stone-200 rounded-xl p-5 bg-stone-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-white bg-amber-800 px-2 py-0.5 rounded tracking-widest uppercase">
                      가장 추천 (보안 우회)
                    </span>
                    <h4 className="text-sm font-bold text-stone-800">오프라인 단일 파일 HTML 다운로드 (.html)</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      별도의 설치나 복잡한 권한 없이, 더블클릭만으로 언제 어디서나 즉시 실행 가능한 <strong>오프라인 발표 자료</strong>를 생성합니다. 파워포인트 슬라이드 내에 하이퍼링크를 걸어두고 발표 중 클릭 한 번으로 실행할 수 있습니다.
                    </p>
                    <ul className="text-[11px] text-stone-500 space-y-1 list-disc pl-4 leading-relaxed">
                      <li>인터넷 연결이 불안정해도 발표용 슬라이드와 4컷 만화가 즉시 로드됩니다.</li>
                      <li>각 슬라이드 하단에 <strong>발표자용 비밀 대본</strong>이 함께 내장되어 연단에서 든든하게 참고할 수 있습니다.</li>
                      <li>보안 솔루션에 걸리는 `.exe` 실행 파일보다 훨씬 안전하고 직관적인 규격입니다.</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleDownloadOfflineHTML}
                    className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-2.5 rounded-lg text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    오프라인 전용 HTML 슬라이드 다운로드
                  </button>
                </div>

                {/* Option 2: Live PPT Embedding Guide */}
                <div className="border border-stone-200 rounded-xl p-5 bg-stone-50 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-white bg-emerald-700 px-2 py-0.5 rounded tracking-widest uppercase">
                      라이브 임베딩
                    </span>
                    <h4 className="text-sm font-bold text-stone-800">파워포인트 안에 라이브 앱 직접 삽입하기</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      이 웹 애플리케이션의 <strong>공유 링크(Shared URL)</strong>를 파워포인트 슬라이드 템플릿 내부에 직접 임베드하여, PPT 프레젠테이션 흐름을 깨지 않고 슬라이드 안에서 웹 브라우저처럼 마우스 클릭과 만화 상세보기를 바로 작동시키는 정석적인 기법입니다.
                    </p>
                    <ol className="text-[11px] text-stone-500 space-y-1.5 list-decimal pl-4 leading-relaxed">
                      <li>PowerPoint 상단 메뉴에서 <strong>[삽입] &gt; [추가 기능 가져오기]</strong>를 누릅니다.</li>
                      <li>검색창에 <strong>Web Viewer</strong>를 검색한 뒤 추가합니다.</li>
                      <li>슬라이드에 생성된 Web Viewer 입력칸에 아래의 라이브 주소를 붙여넣습니다:</li>
                      <li className="bg-white p-2 rounded border border-stone-200 font-mono text-[10px] text-amber-900 break-all select-all font-bold">
                        https://ais-pre-zzbsjikyec7x5jxjsaijma-52506271263.asia-northeast1.run.app
                      </li>
                    </ol>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("https://ais-pre-zzbsjikyec7x5jxjsaijma-52506271263.asia-northeast1.run.app");
                      alert("라이브 주소가 클립보드에 복사되었습니다! PPT Web Viewer 주소창에 붙여넣어(Ctrl+V) 사용하세요.");
                    }}
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-lg text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    공유 라이브 URL 주소 복사하기
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Block */}
      <footer className="bg-stone-900 text-stone-400 py-10 border-t border-stone-950 mt-12 text-center text-xs space-y-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left space-y-1">
            <p className="font-serif font-extrabold text-stone-200">인생사 새옹지마 : 한신의 교훈</p>
            <p className="text-[11px] text-stone-500">본 자료는 임직원 세미나 및 사내 발표회 역량 함양 세션 교재로 제작되었습니다.</p>
          </div>
          <div className="flex gap-4 text-stone-500 text-[11px]">
            <span className="hover:text-stone-300 cursor-pointer">이용약관</span>
            <span>|</span>
            <span className="hover:text-stone-300 cursor-pointer">개인정보처리방침</span>
            <span>|</span>
            <span className="hover:text-stone-300 cursor-pointer">사내 인트라넷 문의</span>
          </div>
        </div>
        <p className="text-[10px] text-stone-600">
          Powered by Gemini 3.8 Flash • Developed for Google AI Studio Builder
        </p>
      </footer>
    </div>
  );
}
