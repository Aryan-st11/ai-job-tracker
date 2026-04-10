// CENTRALIZED AI LOGIC

export const parseJobDescription = async (text: string) => {
  if (!text) throw new Error("Empty input");

  const lower = text.toLowerCase();

  return {
    company: lower.includes("google")
      ? "Google"
      : lower.includes("amazon")
      ? "Amazon"
      : "Unknown",

    role: lower.includes("engineer")
      ? "Software Engineer"
      : lower.includes("developer")
      ? "Developer"
      : "Unknown Role",

    requiredSkills: ["JavaScript", "Node.js"],
    niceToHaveSkills: ["React", "MongoDB"],

    seniority: lower.includes("senior") ? "Senior" : "Mid",
    location: "Remote"
  };
};

// ✅ Resume Suggestions
export const generateBullets = async (role: string) => {
  return [
    `Developed scalable features for ${role}`,
    "Improved performance by 30%",
    "Collaborated with cross-functional teams",
    "Built REST APIs and optimized backend logic"
  ];
};

// ✅ Match Score
export const matchScore = (userSkills: string[], jobSkills: string[]) => {
  const match = userSkills.filter(s => jobSkills.includes(s));

  return {
    matchScore: Math.round((match.length / jobSkills.length) * 100),
    missingSkills: jobSkills.filter(s => !userSkills.includes(s)),
    strengths: match
  };
};