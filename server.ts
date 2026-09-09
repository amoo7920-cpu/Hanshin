/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // Server-Side API endpoint for AI personalized presentation scripts
  app.post("/api/generate-script", async (req, res) => {
    try {
      const { role, teamContext, customGoal } = req.body;
      if (!role) {
        return res.status(400).json({ error: "역할/부서 정보를 제공해야 합니다." });
      }

      const prompt = `
당신은 대기업 임원 및 직장인을 대상으로 하는 기업 전문 프레젠테이션 코치이자 역사 경영학 전문가입니다.
사용자가 입력한 직장 생활 컨텍스트를 기반으로, 한나라 장수 한신의 이야기(인생사 새옹지마, 빠른 성공의 명암, 토사구팽)에 비추어 사내 발표용 맞춤형 스피치 대본과 시사점을 도출해 주세요.

[요청 컨텍스트]
- 대상자 부서/역할: ${role}
- 현재 조직 환경 및 업무 맥락: ${teamContext || "일반적인 협업과 성장 지향적 환경"}
- 발표에서 특별히 강조하고 싶은 목표: ${customGoal || "인생사 새옹지마의 지혜와 빠른 성과 속에서도 겸손과 평정심 유지하기"}

[출력 요구사항 - 반드시 JSON 형식으로만 응답해 주세요]
JSON 스키마:
{
  "customSpeech": "사내 발표 자리에서 바로 낭독할 수 있는, 신뢰감 있고 위트 있는 한국어 스피치 대본 (약 3~4문단, 한신의 가랑이 밑 굴욕과 대장군 승진, 토사구팽을 해당 부서의 맥락과 오버랩하여 작성)",
  "corporateInsights": [
    "해당 부서에 딱 맞춘 구체적이고 실천적인 행동 행동 지침 1",
    "해당 부서에 딱 맞춘 구체적이고 실천적인 행동 행동 지침 2",
    "해당 부서에 딱 맞춘 구체적이고 실천적인 행동 행동 지침 3"
  ]
}

주의사항: 마크다운 코드 블록(\`\`\`json ...) 없이 순수 JSON만 반환되도록 하십시오. responseMimeType을 "application/json"으로 설정하여 안전하게 파싱될 수 있도록 하세요.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const result = JSON.parse(responseText.trim());
      res.json(result);
    } catch (error: any) {
      console.error("Gemini API Error in Server Side:", error);
      res.status(500).json({ error: "Gemini AI 스크립트 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요." });
    }
  });

  // Serve static assets in production, otherwise mount Vite as development middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
