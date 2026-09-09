/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpeechBubble {
  speaker: string;
  text: string;
  position: { x: number; y: number }; // Percentage from top-left, e.g. { x: 10, y: 20 }
  type: "normal" | "thought" | "scream";
}

export interface ComicPanelData {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
  description: string;
  soundEffect: string; // e.g. "드드드...", "촤아아아!", "콰당!"
  soundEffectPos: { x: number; y: number };
  bubbles: SpeechBubble[];
  duality: {
    goodSide: string; // 좋은 점 (하지만 안의 독)
    badSide: string;  // 나쁜 점 (하지만 기회의 씨앗)
    corporateLesson: string; // 직장생활 교훈
  };
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle?: string;
  type: "title" | "comic-overview" | "panel-detail" | "takeaways" | "quiz" | "ai-customizer";
  panelId?: number; // Linked comic panel
  content: string[];
  keyConcept?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number; // Low score = short-term high-reactive (Fast burn), High score = Saeongjima wise master
    insight: string;
  }[];
}

export interface GeminiScriptResponse {
  customSpeech: string;
  corporateInsights: string[];
}
