/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import ComicPanel from "./components/ComicPanel";
import Slideshow from "./components/Slideshow";
import Quiz from "./components/Quiz";
import GeminiAdvisor from "./components/GeminiAdvisor";
import { Monitor, HelpCircle, Compass, Sparkles, BookOpen, Clock, Lightbulb, UserCheck, AlertTriangle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"slides" | "comic" | "quiz" | "ai">("slides");
  const [selectedComicId, setSelectedComicId] = useState<number | null>(null);

  const handleComicSelect = (id: number) => {
    setSelectedComicId(id);
    // Automatically switch to slides to show that specific slide if requested,
    // or just keep them looking at the comic details below
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
