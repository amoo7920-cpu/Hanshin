/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { quizQuestions } from "../data";
import { Award, RotateCcw, ShieldCheck, CheckCircle2, ChevronRight, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Quiz() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const handleOptionSelect = (score: number) => {
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setQuizFinished(false);
  };

  const getResult = (totalScore: number) => {
    if (totalScore <= 4) {
      return {
        title: "🔥 초고속 폭주 한신형 (Maverick Racer)",
        subtitle: "성과 창출 속도 시속 300km, 리스크 제어율 10%",
        desc: "당신은 압도적인 지혜와 능력으로 엄청난 성과를 신속하게 뽑아내는 초천재 인재입니다! 하지만 승부욕이 너무 불타올라 가끔 동료의 지적을 참아내기 힘들어하며(가랑이 밑 기어가는 훈련 필요), 엄청난 성과를 달성했을 때 공을 혼자 독식하는 경향이 있어 주변의 원망과 시샘을 살 수 있습니다. 역사적 교훈: 이 상태로 계속 직진하면 토사구팽 가마솥행 특급 열차에 탑승할 수 있으니 겸손과 속도조절 패드를 장착하십시오!",
        checklist: [
          "회의 시간에 타 부서가 반박하면 속으로 '아, 가랑이 밑을 기어갈 때구나' 3번 되새기기.",
          "프로젝트 대성공 시, 보너스로 반드시 동료들에게 거하게 커피 쏘고 '님 덕분입니다' 메신저 보내기.",
          "급할수록 속도보단 아군과 조력자들의 얼라인먼트를 체크하기.",
        ],
        colorClass: "border-red-200 bg-red-50 text-red-900",
        badgeClass: "bg-red-100 text-red-800 border-red-300",
      };
    } else if (totalScore <= 7) {
      return {
        title: "🛡️ 현명한 커리어 지휘관형 (Balanced Strategist)",
        subtitle: "성과와 관계의 황금비율, 직장생활 1등급 처세술",
        desc: "당신은 한신의 명석한 전술 능력과 변방 새옹의 여유를 완벽하게 버무린 하이브리드 지혜의 소유자입니다. 좌절할 만한 피드백도 유연하게 수용하고, 성공의 영광 뒤에는 언제나 아군의 안전지대를 만들 줄 아는 세련된 사내 정치가이기도 합니다. 위기가 곧 기회가 되고, 영광 뒤에 경계심을 늦추지 않는 평정심 마스터 후보입니다.",
        checklist: [
          "지금의 평정심과 사내 신망을 유지하되, 지나치게 신중하여 핵심 승부 타이밍을 놓치지 않기.",
          "성과 독점을 방지하기 위해 정기적으로 협업 기여도 매트릭스 공유하기.",
          "팀원들에게 새옹지마의 리더십을 발휘하여 전파하기.",
        ],
        colorClass: "border-amber-200 bg-amber-50 text-amber-900",
        badgeClass: "bg-amber-100 text-amber-850 border-amber-300",
      };
    } else {
      return {
        title: "🧘 새옹지마 신선 대부형 (Saeongjima Grandmaster)",
        subtitle: "어떤 실적 압박과 사내 정치에도 타격감 0%, 득도의 경지",
        desc: "당신은 사실상 마음속에 유유히 웃으며 달리는 야생마 한 마리를 키우는 신선입니다! 실적이 잘 나와도 '뭐 내년엔 떨어지겠지', 실적이 망해도 '내년엔 올라가겠지'라며 무소유와 득도의 멘탈을 지녔습니다. 사장님의 꾸지람도 '기회구만!', 대성공도 '조심해야 할 독수리구만!' 하고 해석합니다. 회사의 정신적 평정 수호자!",
        checklist: [
          "지나치게 평온하여 가끔 동료들이 '이 사람은 열정이 식었나?' 하고 오해할 수 있으니 발표할 땐 열띤 리액션 좀 해주기.",
          "신선 같은 조언으로 슬럼프에 허덕이는 후배들의 커리어 멘토링 자처하기.",
          "새옹지마의 지혜를 슬라이드로 만들어 사내 세미나에서 수시로 낭독하기.",
        ],
        colorClass: "border-emerald-200 bg-emerald-50 text-emerald-900",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);

  return (
    <div id="quiz-wrapper" className="max-w-3xl mx-auto bg-stone-50 border border-stone-200 rounded-xl p-6 md:p-8 shadow-md">
      <div className="text-center space-y-2 pb-6 border-b border-stone-200">
        <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-flex items-center gap-1.5">
          <Compass className="w-4.5 h-4.5" /> 임직원 특별 인터랙티브 코너
        </span>
        <h3 className="text-xl md:text-2xl font-serif font-extrabold text-stone-800">
          나의 직장생활 새옹지마 지수(Saeongjima Index) 측정기
        </h3>
        <p className="text-xs sm:text-sm text-stone-600">
          한신의 교훈에 빗대어 보는 내 마인드 건강과 롱런 커리어 내구성 테스트!
        </p>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key={currentQuestionIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Question Progress */}
              <div className="flex justify-between items-center text-xs font-bold text-stone-500">
                <span>질문 {currentQuestionIdx + 1} / {quizQuestions.length}</span>
                <span className="text-amber-700">진행도 {Math.round(((currentQuestionIdx) / quizQuestions.length) * 100)}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>

              {/* Question text */}
              <h4 className="text-base sm:text-lg font-bold text-stone-800 leading-relaxed font-serif">
                {quizQuestions[currentQuestionIdx].question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {quizQuestions[currentQuestionIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionSelect(opt.score)}
                    className="w-full text-left bg-white border border-stone-200 hover:border-amber-700 hover:bg-amber-50/20 p-4 rounded-lg shadow-sm hover:shadow transition-all group flex items-start gap-3.5"
                  >
                    <div className="w-6 h-6 rounded-full bg-stone-100 group-hover:bg-amber-100 group-hover:text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 transition-colors">
                      {String.fromCharCode(65 + oIdx)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-stone-700 font-semibold group-hover:text-stone-900 leading-relaxed">
                        {opt.text}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              {/* Result Badge Card */}
              <div className={`border-2 p-6 rounded-xl ${result.colorClass} shadow-inner space-y-4`}>
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${result.badgeClass}`}>
                    진단 결과 리포트
                  </span>
                  <span className="text-xs font-semibold text-stone-500">
                    획득 점수: {totalScore}점 (최대 9점)
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-serif font-extrabold tracking-tight">
                    {result.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold tracking-wide opacity-80 border-b border-stone-300 pb-2.5">
                    {result.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed font-medium">
                  {result.desc}
                </p>

                {/* Practical Action Checklist */}
                <div className="bg-white/80 rounded-lg p-4 border border-stone-200 shadow-sm space-y-3">
                  <h5 className="text-xs font-extrabold text-stone-800 uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    새옹지마 커리어 롱런 실천 행동지침 (Action Plan)
                  </h5>
                  <ul className="space-y-2.5 text-xs text-stone-700">
                    {result.checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reset Section */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4.5 py-2 rounded-lg shadow-sm transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  지수 다시 측정하기
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
