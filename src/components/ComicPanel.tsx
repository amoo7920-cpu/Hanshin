/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { comicPanels } from "../data";
import { ComicPanelData } from "../types";
import { Info, HelpCircle, AlertTriangle, ArrowRight, Award, Zap, HelpCircle as HelpIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ComicPanelProps {
  onSelectPanel?: (panelId: number) => void;
}

export default function ComicPanel({ onSelectPanel }: ComicPanelProps) {
  const [selectedPanelId, setSelectedPanelId] = useState<number | null>(null);
  const [hoveredPanelId, setHoveredPanelId] = useState<number | null>(null);

  const activePanel = comicPanels.find((p) => p.id === selectedPanelId) || null;

  return (
    <div id="comic-section" className="space-y-8">
      {/* Comic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {comicPanels.map((panel, idx) => {
          const isHovered = hoveredPanelId === panel.id;
          return (
            <motion.div
              key={panel.id}
              id={`comic-card-${panel.id}`}
              className="bg-stone-50 border border-stone-200 shadow-sm hover:shadow-md transition-all rounded-lg overflow-hidden flex flex-col justify-between cursor-pointer"
              onMouseEnter={() => setHoveredPanelId(panel.id)}
              onMouseLeave={() => setHoveredPanelId(null)}
              onClick={() => {
                setSelectedPanelId(panel.id);
                if (onSelectPanel) onSelectPanel(panel.id);
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Header Indicator */}
              <div className="bg-stone-100 border-b border-stone-200 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs font-bold tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  Cut {idx + 1}
                </span>
                <span className="text-sm font-semibold text-stone-700 font-serif">
                  {panel.title.split(":")[1]}
                </span>
              </div>

              {/* Comic Panel Canvas */}
              <div className="relative aspect-square overflow-hidden bg-white group flex items-center justify-center">
                <img
                  src={panel.imagePath}
                  alt={panel.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                />

                {/* Comical Sound Effect Tag */}
                <motion.div
                  className="absolute bg-red-500 text-white font-extrabold text-sm px-3 py-1.5 rounded-full shadow-lg border-2 border-white select-none pointer-events-none"
                  style={{
                    left: `${panel.soundEffectPos.x}%`,
                    top: `${panel.soundEffectPos.y}%`,
                    transform: "translate(-50%, -50%) rotate(-10deg)",
                  }}
                  animate={isHovered ? { scale: [1, 1.2, 1], rotate: [-10, -5, -15, -10] } : {}}
                  transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
                >
                  {panel.soundEffect}
                </motion.div>

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/95 text-stone-800 text-xs font-semibold px-4 py-2 rounded-full shadow flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-700" />
                    클릭하여 상세 교훈 보기
                  </div>
                </div>
              </div>

              {/* Comical Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-stone-800 line-clamp-1">
                    {panel.subtitle}
                  </h4>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-3 leading-relaxed">
                    {panel.description}
                  </p>
                </div>

                {/* Duality Quick Tag */}
                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Zap className="w-3.5 h-3.5" /> 새옹 (복)
                  </span>
                  <span className="flex items-center gap-1 text-red-600">
                    <AlertTriangle className="w-3.5 h-3.5" /> 지마 (화)
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Inspector Area */}
      <AnimatePresence mode="wait">
        {activePanel && (
          <motion.div
            key={activePanel.id}
            id="panel-inspector"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white border-2 border-amber-900/20 rounded-xl shadow-md p-6 overflow-hidden relative"
          >
            {/* Top Close indicator or badge */}
            <div className="absolute top-4 right-4">
              <button
                id="close-inspector-btn"
                onClick={() => setSelectedPanelId(null)}
                className="text-stone-400 hover:text-stone-600 text-xs font-medium px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                닫기 ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Comic Left Section: Image and speech bubbles */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative border-4 border-stone-800 rounded-lg shadow-lg overflow-hidden bg-white max-w-sm w-full">
                  <img
                    src={activePanel.imagePath}
                    alt={activePanel.title}
                    referrerPolicy="no-referrer"
                    className="w-full object-cover aspect-square"
                  />

                  {/* Speech Bubbles Overlay */}
                  {activePanel.bubbles.map((bubble, bIdx) => (
                    <div
                      key={bIdx}
                      className="absolute max-w-[65%] pointer-events-none"
                      style={{
                        left: `${bubble.position.x}%`,
                        top: `${bubble.position.y}%`,
                      }}
                    >
                      <div
                        className={`p-2 rounded-lg text-[10px] sm:text-xs font-semibold leading-snug shadow-md border ${
                          bubble.type === "scream"
                            ? "bg-red-50 text-red-900 border-red-300 animate-pulse font-extrabold"
                            : bubble.type === "thought"
                            ? "bg-sky-50 text-sky-900 border-sky-200 border-dashed"
                            : "bg-amber-50 text-stone-900 border-amber-200"
                        }`}
                      >
                        <div className="text-[9px] uppercase tracking-wider text-stone-500 mb-0.5 font-bold">
                          {bubble.speaker}
                        </div>
                        {bubble.text}
                      </div>
                      {/* Speech bubble small triangle */}
                      <div
                        className={`w-3 h-3 rotate-45 border-r border-b mx-auto -mt-1.5 bg-inherit ${
                          bubble.type === "scream"
                            ? "border-red-300"
                            : bubble.type === "thought"
                            ? "border-sky-200 border-dashed"
                            : "border-amber-200"
                        }`}
                        style={{ marginLeft: "20%" }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-stone-500 mt-3 italic text-center">
                  * 컷 내부 대사는 임직원 발표용 코믹 각색 버전입니다
                </p>
              </div>

              {/* Comic Right Section: Deep Corporate Lesson & Duality */}
              <div className="lg:col-span-7 space-y-5">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                    상세 인스펙터
                  </span>
                  <h3 className="text-xl font-serif font-extrabold text-stone-800 mt-2.5">
                    {activePanel.title} : {activePanel.subtitle}
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed mt-2 bg-stone-50 p-3.5 rounded-lg border border-stone-200/60">
                    {activePanel.description}
                  </p>
                </div>

                {/* Duality Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Good Duality */}
                  <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                      <Zap className="w-4.5 h-4.5 text-emerald-600" />
                      <span>새옹의 복 (좋은 면)</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {activePanel.duality.goodSide}
                    </p>
                  </div>

                  {/* Bad Duality */}
                  <div className="bg-red-50/70 border border-red-100 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-red-800 font-bold text-sm mb-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-red-500" />
                      <span>지마의 화 (나쁜 면)</span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {activePanel.duality.badSide}
                    </p>
                  </div>
                </div>

                {/* Corporate Lesson Banner */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 flex gap-3">
                  <div className="shrink-0">
                    <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      Q
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                      현대 비즈니스 임직원 시사점
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed mt-1 font-medium">
                      {activePanel.duality.corporateLesson}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
