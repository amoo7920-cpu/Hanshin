/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, Loader2, ArrowRight, CheckCircle, AlertCircle, HelpCircle, FileText, Briefcase } from "lucide-react";
import { GeminiScriptResponse } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function GeminiAdvisor() {
  const [role, setRole] = useState<string>("영업 본부 매니저");
  const [teamContext, setTeamContext] = useState<string>(
    "최근 수개월간 시장 침체로 극심한 실적 압박과 슬럼프를 겪었으나, 어제 기적적으로 대기업과의 초대형 납품 계약을 단 한 번의 프레젠테이션만으로 따냈습니다."
  );
  const [customGoal, setCustomGoal] = useState<string>(
    "일시적인 단 한 번의 성공에 심취하여 자만하거나 방심하지 않고, 장기적인 롱런 전략의 기조를 유지하도록 격려 및 겸손 촉구하기"
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<GeminiScriptResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role.trim()) {
      setError("부서 및 역할 정보를 입력해 주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          teamContext,
          customGoal,
        }),
      });

      if (!res.ok) {
        throw new Error("서버와의 통신에 실패했습니다. Gemini API 키 설정을 확인해 주세요.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setResponse(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "스크립트를 자동 작성하는 도중 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const loadPreset = (presetType: "sales" | "tech" | "hr") => {
    if (presetType === "sales") {
      setRole("영업 본부 매니저");
      setTeamContext("최근 시장 침체로 극심한 실적 슬럼프를 겪었으나, 어제 초대형 우량 고객사와의 대형 독점 계약을 기적적으로 따냈습니다. 팀원들 분위기가 하늘을 찌르고 있습니다.");
      setCustomGoal("일시적인 단 한 번의 성공에 심취하여 자만하거나 방심하지 않고, 연말까지 안정적인 실적의 영양 상태를 유지하도록 경계심과 겸손 촉구하기");
    } else if (presetType === "tech") {
      setRole("R&D 신기술 개발 연구원");
      setTeamContext("몇 주 동안 밤을 새워 초스피드로 신규 베타 시스템을 출시하는 데 성공하여 임원진의 극찬을 받았습니다. 하지만 정작 세부 코드 리뷰와 테스트는 건너뛰어 대형 장애 위기가 도사리고 있습니다.");
      setCustomGoal("빠른 출시(성공)에 도취해 장기적인 기술 품질 부채를 잊지 말고, 한신의 급성장 후 몰락을 교훈 삼아 즉각적인 품질 전수조사 및 코드 안정화 작업에 착수할 것을 부드럽게 권유하기");
    } else if (presetType === "hr") {
      setRole("인사 교육 및 조직문화 리더");
      setTeamContext("신규 인사 고과 제도 개편을 서둘러 공표했다가, 사내 비공식 노조 및 경력 사원 중심의 격렬한 대립과 갈등을 맞닥뜨려 난관에 부딪혔습니다.");
      setCustomGoal("지금의 극심한 사내 갈등과 반발은 한신의 가랑이 밑을 기어가는 '축적의 훈련 시간(과하지욕)'일 뿐이니 좌절하지 말고, 구성원의 다양한 목소리를 반영하는 계기로 삼자고 격려하기");
    }
  };

  return (
    <div id="gemini-advisor-section" className="space-y-6">
      {/* Introduction */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="space-y-1.5 max-w-2xl">
          <h4 className="text-sm md:text-base font-bold text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-5 h-5 text-amber-700 fill-amber-700/10 animate-pulse" />
            AI 프레젠테이션 스피치 코파일럿 (Gemini API 구동)
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            한신의 역사적 비극과 새옹지마의 교훈은 부서마다 적용되는 방식이 다릅니다. 귀하의 직책과 우리 조직이 마주한 구체적인 위기/기회 맥락을 입력하시면, 발표 자리에서 활용할 수 있는 <strong>나만의 맞춤형 스피치 원고</strong>와 <strong>부서 맞춤 행동강령</strong>을 1초 만에 빌드해 드립니다.
          </p>
        </div>

        {/* Rapid presets */}
        <div className="flex flex-wrap gap-2 shrink-0 pt-2 md:pt-0">
          <button
            onClick={() => loadPreset("sales")}
            className="text-[10px] sm:text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:border-amber-700 px-2.5 py-1.5 rounded-md shadow-sm transition-colors"
          >
            📊 영업 슬럼프 극복 예시
          </button>
          <button
            onClick={() => loadPreset("tech")}
            className="text-[10px] sm:text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:border-amber-700 px-2.5 py-1.5 rounded-md shadow-sm transition-colors"
          >
            💻 개발 스피드 부작용 예시
          </button>
          <button
            onClick={() => loadPreset("hr")}
            className="text-[10px] sm:text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:border-amber-700 px-2.5 py-1.5 rounded-md shadow-sm transition-colors"
          >
            👥 갈등 관리 리더십 예시
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form panel */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-5 md:p-6 shadow-sm space-y-4">
          <h4 className="text-sm font-extrabold text-stone-800 uppercase tracking-widest border-b border-stone-200 pb-2 flex items-center gap-1.5">
            <Briefcase className="w-4.5 h-4.5 text-amber-800" />
            발표자 컨텍스트 입력
          </h4>

          {/* Role input */}
          <div className="space-y-1.5">
            <label htmlFor="role-input" className="text-xs font-bold text-stone-700 flex items-center gap-1">
              발표자 직무 / 소속 부서
            </label>
            <input
              id="role-input"
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="예: 영업 본부 매니저, 백엔드 개발자, 인사 교육 리더"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800 font-medium"
              required
            />
          </div>

          {/* Context input */}
          <div className="space-y-1.5">
            <label htmlFor="context-input" className="text-xs font-bold text-stone-700">
              현재 조직 상황 및 극복사례 (위기 혹은 기회)
            </label>
            <textarea
              id="context-input"
              rows={4}
              value={teamContext}
              onChange={(e) => setTeamContext(e.target.value)}
              placeholder="우리 부서가 최근 겪은 가장 고통스러운 좌절이나 뜻밖의 엄청난 성과 스토리를 적어주세요. (구체적일수록 고품질 스피치가 나옵니다)"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800 font-medium leading-relaxed resize-none"
            />
          </div>

          {/* Goal input */}
          <div className="space-y-1.5">
            <label htmlFor="goal-input" className="text-xs font-bold text-stone-700">
              이 스피치 대본을 통해 강조하고 싶은 핵심 철학
            </label>
            <input
              id="goal-input"
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="예: 실패 속에서 기회 찾기, 대성공 직후 자만심 누르고 품질 챙기기"
              className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-800 text-stone-800 font-medium"
            />
          </div>

          {/* Action Button */}
          <button
            id="generate-script-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-amber-800 hover:bg-amber-900 disabled:bg-stone-400 text-white font-bold py-2.5 rounded-lg text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Gemini가 맞춤 원고 집필 중...
              </>
            ) : (
              <>
                <Sparkles className="w-4.5 h-4.5 fill-white/10" />
                부서 맞춤형 발표 대본 자동 작성
              </>
            )}
          </button>
        </form>

        {/* Output view panel */}
        <div className="lg:col-span-7 bg-stone-50 border border-stone-200 rounded-xl p-5 md:p-6 shadow-sm min-h-[350px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border-4 border-amber-800/10 border-t-amber-800 animate-spin" />
                <div className="space-y-1.5">
                  <p className="text-sm font-extrabold text-stone-800">서버측 Gemini 3.8 모델 구동 중</p>
                  <p className="text-xs text-stone-500 max-w-sm">
                    한신의 극적인 초한지 서사(과하지욕, 토사구팽)를 기반으로 귀하의 조직 상황과 시사점을 정밀 융합하는 중입니다...
                  </p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center p-8 text-red-800 space-y-3"
              >
                <AlertCircle className="w-10 h-10 text-red-500" />
                <div>
                  <h5 className="font-extrabold text-sm">에러가 발생했습니다</h5>
                  <p className="text-xs text-stone-600 mt-1 max-w-md">{error}</p>
                </div>
              </motion.div>
            ) : response ? (
              <motion.div
                key="response-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col justify-between space-y-6"
              >
                {/* Speech transcript */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2">
                    <FileText className="w-4.5 h-4.5 text-amber-800" />
                    <h5 className="text-xs font-bold uppercase tracking-widest text-stone-500">
                      나만을 위한 발표 스피치 최종 대본
                    </h5>
                  </div>
                  <div className="bg-white p-4.5 rounded-lg border border-stone-200/80 shadow-inner max-h-[300px] overflow-y-auto">
                    <p className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line font-medium">
                      {response.customSpeech}
                    </p>
                  </div>
                </div>

                {/* Corporate insights */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-700" />
                    <h5 className="text-xs font-bold uppercase tracking-widest text-stone-500">
                      부서 맞춤 실천 행동 지침 (Action Items)
                    </h5>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {response.corporateInsights.map((insight, idx) => (
                      <div key={idx} className="bg-emerald-50/50 border border-emerald-100 p-3.5 rounded-lg flex items-start gap-2">
                        <span className="w-4.5 h-4.5 rounded-full bg-emerald-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          {idx + 1}
                        </span>
                        <p className="text-[11px] font-bold text-stone-700 leading-relaxed">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div key="empty-box" className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center shadow-inner">
                  <Sparkles className="w-6 h-6 text-stone-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-stone-800">프레젠테이션 코파일럿 대기 중</p>
                  <p className="text-xs text-stone-500 max-w-sm">
                    왼쪽 양식에 직책과 현 상황을 기재한 뒤 아래 버튼을 눌러주세요. 한신의 흥망성쇠 교훈이 담긴 고품격 스피치 원고를 Gemini가 즉석에서 생성합니다.
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
