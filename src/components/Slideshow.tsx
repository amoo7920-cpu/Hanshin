/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { presentationSlides, presenterNotes, comicPanels } from "../data";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Monitor, Minimize2, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

interface SlideshowProps {
  initialSlideId?: number;
}

export default function Slideshow({ initialSlideId = 1 }: SlideshowProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slide = presentationSlides[currentIdx];

  // Map requested slide ID if any
  useEffect(() => {
    if (initialSlideId) {
      const idx = presentationSlides.findIndex((s) => s.id === initialSlideId);
      if (idx !== -1) {
        setCurrentIdx(idx);
      }
    }
  }, [initialSlideId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIdx]);

  // Slideshow Timer stopwatch logic
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive]);

  // Autoplay presentation mode
  useEffect(() => {
    let autoplayInterval: NodeJS.Timeout;
    if (isPlaying) {
      autoplayInterval = setInterval(() => {
        nextSlide();
      }, 7000); // Auto-advance every 7 seconds
    }
    return () => clearInterval(autoplayInterval);
  }, [isPlaying, currentIdx]);

  const nextSlide = () => {
    if (currentIdx < presentationSlides.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsPlaying(false); // Stop at the end
    }
  };

  const prevSlide = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setSeconds(0);
  };

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div id="slideshow-component" className="space-y-6">
      {/* Controls & Presentation Header Toolbar */}
      <div className="flex flex-wrap justify-between items-center gap-4 bg-stone-100 border border-stone-200 px-4 py-3 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
            <Monitor className="w-4 h-4 text-amber-800" />
            슬라이드 제어기
          </span>
          <div className="h-4 w-px bg-stone-300" />
          <span className="text-xs font-semibold text-stone-700 bg-stone-200/60 px-2.5 py-0.5 rounded-full">
            {currentIdx + 1} / {presentationSlides.length} 슬라이드
          </span>
        </div>

        {/* Stopwatch & AutoPlay Control */}
        <div className="flex items-center gap-4">
          {/* Rehearsal Stopwatch */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-stone-200 shadow-sm text-xs text-stone-700">
            <Clock className="w-4 h-4 text-amber-700" />
            <span className="font-mono font-bold tracking-tight">{formatTime(seconds)}</span>
            <button
              onClick={() => setIsTimerActive(!isTimerActive)}
              className="ml-1 text-stone-500 hover:text-stone-800 p-0.5 rounded transition-colors"
              title={isTimerActive ? "타이머 일시정지" : "타이머 시작"}
            >
              {isTimerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
            <button
              onClick={resetTimer}
              className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors"
              title="리셋"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-stone-300" />

          {/* Autoplay toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md shadow-sm transition-all ${
              isPlaying
                ? "bg-amber-800 text-white hover:bg-amber-900"
                : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                자동 재생 중
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-800" />
                7초 자동 재생
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Slide Canvas */}
      <div className="relative bg-stone-900 text-stone-100 border-4 border-stone-950 rounded-xl shadow-2xl overflow-hidden aspect-[16/9] flex flex-col justify-between">
        {/* Progress Bar top indicator */}
        <div className="h-1.5 bg-stone-800 w-full relative">
          <div
            className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / presentationSlides.length) * 100}%` }}
          />
        </div>

        {/* Slide Inner Body */}
        <div className="flex-1 p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-stone-800/10 pointer-events-none border border-stone-800/30" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-amber-500/5 pointer-events-none blur-3xl" />

          {/* Header */}
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest font-extrabold text-amber-400 bg-amber-400/10 px-3 py-1 rounded border border-amber-400/20">
              {slide.keyConcept || "Executive Presentation"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-white mt-4">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-xs sm:text-sm md:text-base text-stone-400 font-medium mt-2 max-w-3xl border-l-2 border-amber-500 pl-3">
                {slide.subtitle}
              </p>
            )}
          </div>

          {/* Content Body - Switch on Slide Types */}
          <div className="my-6 flex-1 flex flex-col justify-center relative z-10">
            {slide.type === "title" && (
              <div className="space-y-4 max-w-4xl">
                {slide.content.map((p, idx) => (
                  <p key={idx} className="text-sm sm:text-base md:text-lg text-stone-300 leading-relaxed font-light">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {slide.type === "comic-overview" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {comicPanels.map((panel, idx) => (
                  <div key={panel.id} className="bg-stone-800/60 border border-stone-700/60 rounded-lg p-3 text-center space-y-2">
                    <div className="aspect-square rounded overflow-hidden relative">
                      <img src={panel.imagePath} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-1 left-1 bg-amber-500 text-stone-900 font-extrabold text-[10px] px-1.5 py-0.5 rounded shadow">
                        Cut {idx + 1}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-200 block truncate">{panel.title.split(":")[1]}</span>
                  </div>
                ))}
              </div>
            )}

            {slide.type === "panel-detail" && slide.panelId && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Embedded comic preview */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative border-4 border-amber-500/20 rounded-lg overflow-hidden max-w-[200px] shadow-lg">
                    <img
                      src={comicPanels[slide.panelId - 1]?.imagePath}
                      alt=""
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <p className="text-[10px] font-extrabold text-amber-400">Comic Cut {slide.panelId}</p>
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <div className="md:col-span-8 space-y-3.5">
                  {slide.content.map((p, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed">
                        {p}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {slide.type === "takeaways" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {slide.content.map((p, idx) => {
                  const parts = p.split(" - ");
                  return (
                    <div key={idx} className="bg-stone-800/40 border-t-4 border-amber-500 rounded p-4 space-y-2">
                      <h4 className="text-sm font-extrabold text-amber-400 font-serif">{parts[0]}</h4>
                      <p className="text-xs text-stone-300 leading-relaxed">{parts[1]}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Branding & Slide Timeline Indicator */}
          <div className="flex justify-between items-center text-[10px] text-stone-500 border-t border-stone-800 pt-4 relative z-10">
            <span>© 임직원 명사 발표회 - 사내 역량 강화 세미나</span>
            <div className="flex gap-1.5">
              {presentationSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-2.5 h-2.5 rounded-full border transition-all ${
                    idx === currentIdx
                      ? "bg-amber-400 border-amber-400 scale-125"
                      : "bg-transparent border-stone-700 hover:border-stone-500"
                  }`}
                  title={`${idx + 1}번 슬라이드`}
                />
              ))}
            </div>
            <span>인생사 새옹지마 : 한신의 교훈</span>
          </div>
        </div>

        {/* Left/Right Absolute Overlay Paddles */}
        <div className="absolute inset-y-0 left-0 w-12 flex items-center justify-start pl-2 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-black/50 to-transparent">
          <button
            onClick={prevSlide}
            disabled={currentIdx === 0}
            className={`p-2 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-12 flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-black/50 to-transparent">
          <button
            onClick={nextSlide}
            disabled={currentIdx === presentationSlides.length - 1}
            className={`p-2 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
