import { useState } from "react";
import API from "../api/axios";

export default function AddApplicationModal({ onClose, onSuccess }: any) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jd, setJd] = useState("");

  // 🧠 NEW AI STATES
  const [skills, setSkills] = useState("");
  const [summary, setSummary] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState(0);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  // 🚀 AI PARSE
  const handleParse = async () => {
    if (!jd) {
      alert("Paste job description first ⚠️");
      return;
    }

    try {
      setLoadingAI(true);

      const res = await API.post("/ai/parse", {
        text: jd,
        userSkills: ["React", "Node.js"], // optional demo
      });

      const data = res.data;

      // 🔥 Autofill
      setCompany(data.company || "");
      setRole(data.role || "");
      setSkills((data.requiredSkills || []).join(", "));
      setSummary(data.summary || "");

      setBullets(data.resumeSuggestions || []);
      setMatchScore(data.matchScore || 0);
      setMissingSkills(data.missingSkills || []);

    } catch (err) {
      console.error(err);
      alert("AI parsing failed ❌");
    } finally {
      setLoadingAI(false);
    }
  };

  // 💾 SAVE
  const handleSubmit = async () => {
    if (!company || !role) {
      alert("Please fill all fields ⚠️");
      return;
    }

    try {
      setLoading(true);

      await API.post("/applications", {
        company,
        role,
        skills,
        summary,
        status: "Applied",
      });

      onSuccess();
      onClose();

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

  <div className="bg-white/90 backdrop-blur-lg p-6 rounded-3xl w-[480px] shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">

    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
      🚀 Add Application
    </h2>

    {/* JD INPUT */}
    <textarea
      placeholder="Paste job description..."
      className="w-full p-3 border rounded-xl mb-3 focus:ring-2 focus:ring-purple-400 outline-none"
      value={jd}
      onChange={(e) => setJd(e.target.value)}
    />

    {/* AI BUTTON */}
    <button
      onClick={handleParse}
      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-xl mb-4 hover:scale-[1.02] transition"
    >
      {loadingAI ? "🧠 Thinking..." : "✨ Parse with AI"}
    </button>

    {/* COMPANY + ROLE */}
    <div className="grid grid-cols-2 gap-2 mb-3">
      <input
        placeholder="Company"
        className="p-2 border rounded-xl"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        placeholder="Role"
        className="p-2 border rounded-xl"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
    </div>

    {/* SKILLS AS CHIPS */}
    {skills && (
      <div className="mb-3">
        <h3 className="text-sm font-semibold mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.split(",").map((skill: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* SUMMARY */}
    {summary && (
      <div className="mb-3">
        <h3 className="text-sm font-semibold mb-1">Summary</h3>
        <p className="text-sm text-gray-600">{summary}</p>
      </div>
    )}

    {/* MATCH SCORE BAR */}
    {matchScore > 0 && (
      <div className="mb-3">
        <h3 className="text-sm font-semibold mb-1">
          Match Score: {matchScore}%
        </h3>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${matchScore}%` }}
          />
        </div>
      </div>
    )}

    {/* SUGGESTED SKILLS */}
    {missingSkills.length > 0 && (
      <div className="mb-3">
        <h3 className="text-sm font-semibold mb-1">
          Suggested Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingSkills.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-red-100 text-red-500 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* AI BULLETS */}
    {bullets.length > 0 && (
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-1">
          ✨ Resume Suggestions
        </h3>
        <ul className="text-sm list-disc pl-5 text-gray-700 space-y-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    )}

    {/* ACTIONS */}
    <div className="flex justify-end gap-2">
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-300 rounded-xl"
      >
        Cancel
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </div>

  </div>
</div>
  );
}