import { Router } from "express";
import {
  parseJobDescription,
  generateBullets,
  matchScore,
} from "../services/ai.service";

const router = Router();

// ✅ Health check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI route working 🚀",
  });
});

// ✅ AI Parse Route (DEPLOYMENT SAFE)
router.post("/parse", async (req, res) => {
  try {
    const { text, userSkills = [] } = req.body;

    // 🛑 Validation
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        error: "Valid job description text is required ❌",
      });
    }

    const lower = text.toLowerCase();

    let parsed;

    // 🔥 STEP 1: Check OpenAI key
    if (!process.env.OPENAI_API_KEY) {
      console.log("⚠️ No OpenAI key → using FULL fallback");

      parsed = {
        company: lower.includes("google")
          ? "Google"
          : lower.includes("amazon")
          ? "Amazon"
          : "Unknown Company",

        role: lower.includes("engineer")
          ? "Software Engineer"
          : lower.includes("intern")
          ? "Intern"
          : "Developer",

        requiredSkills: ["React", "Node.js", "MongoDB"],
        niceToHaveSkills: ["AWS", "Docker"],
        seniority: "Mid-Level",
        location: "Remote",
        summary: "Fallback AI response (no API key)",
      };
    } else {
      // 🔥 STEP 2: Try real AI
      try {
        parsed = await parseJobDescription(text);
      } catch (err) {
        console.log("⚠️ AI parse failed → fallback");

        parsed = {
          company: "Unknown Company",
          role: "Software Engineer",
          requiredSkills: ["React", "Node.js"],
          niceToHaveSkills: ["AWS"],
          seniority: "Mid-Level",
          location: "Remote",
          summary: "Fallback due to AI failure",
        };
      }
    }

    // 🧠 STEP 3: Safe defaults
    const requiredSkills = parsed.requiredSkills || [];

    // 🧠 STEP 4: Resume bullets
    let bullets: string[] = [];

    if (!process.env.OPENAI_API_KEY) {
      bullets = [
        "Developed scalable web applications using modern frameworks",
        "Optimized performance and improved system efficiency",
        "Collaborated with teams to deliver production-ready features",
      ];
    } else {
      try {
        bullets = await generateBullets(parsed.role);
      } catch {
        bullets = [
          "Built scalable features",
          "Improved performance",
          "Worked with cross-functional teams",
        ];
      }
    }

    // 🧠 STEP 5: Match score
    const match = matchScore(userSkills, requiredSkills);

    // 🎯 FINAL RESPONSE
    res.json({
      company: parsed.company,
      role: parsed.role,
      requiredSkills,
      niceToHaveSkills: parsed.niceToHaveSkills || [],
      seniority: parsed.seniority,
      location: parsed.location,
      summary: parsed.summary,
      resumeSuggestions: bullets,
      ...match,
    });

  } catch (err: any) {
    console.error("🔥 FINAL AI ERROR:", err.message);

    res.status(500).json({
      error: "AI parsing failed ❌",
    });
  }
});

export default router;