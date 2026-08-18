"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "ai";
  content: string;
  options?: string[];
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hello! I am your AI Tutor. I can help explain difficult concepts in simple terms with examples. What would you like to learn about today? You can ask things like 'What is photosynthesis?' or 'How do fractions work?'"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("photosynthesis")) {
      return "Photosynthesis is how plants make their own food! 🌿\n\n1. **Sunlight:** Plants capture light from the sun.\n2. **Water & Air:** They take water from the soil and carbon dioxide from the air.\n3. **Food Production:** Inside their leaves, they use the sunlight's energy to turn water and carbon dioxide into sugar (their food) and release oxygen into the air for us to breathe!\n\nSimply put: **Sunlight + Water + CO2 = Food + Oxygen**.";
    }
    if (q.includes("fraction")) {
      return "A fraction represents a part of a whole. 🍕\n\nImagine a pizza cut into 4 equal slices:\n- If you eat 1 slice, you have eaten **1/4** of the pizza.\n- The top number (1) is the **numerator** (how many parts we have).\n- The bottom number (4) is the **denominator** (total parts the whole is cut into).";
    }
    if (q.includes("gravity")) {
      return "Gravity is the invisible force that pulls objects toward each other! 🌍\n\n- It's what keeps your feet on the ground and causes an apple to fall from a tree instead of floating away.\n- The bigger an object is (like Earth), the stronger its gravity pulls.";
    }
    return "That's a great question! Let's break it down in simple terms. Can you tell me which subject this is for (Math, Science, or English)? That will help me give you the best examples!";
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, type: "tutor" })
      });

      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      
      setMessages((prev) => [...prev, {
        role: "ai",
        content: data.content,
        options: ["Explain more simply", "Give me an example", "Quiz me on this"]
      }]);
    } catch (e) {
      // Fallback to offline mock responses
      setTimeout(() => {
        const responseText = getAIResponse(text);
        setMessages((prev) => [...prev, {
          role: "ai",
          content: responseText,
          options: ["Explain more simply", "Give me an example", "Quiz me on this"]
        }]);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = async (option: string, lastMessageContent: string) => {
    let followUpQuery = "";
    if (option === "Explain more simply") {
      followUpQuery = `Regarding the previous concept: "${lastMessageContent}". Can you explain that more simply?`;
    } else if (option === "Give me an example") {
      followUpQuery = `Regarding the previous concept: "${lastMessageContent}". Give me a real-life example of that.`;
    } else if (option === "Quiz me on this") {
      followUpQuery = `Regarding the previous concept: "${lastMessageContent}". Quiz me on what we just discussed!`;
    }

    if (!followUpQuery) return;

    const userMessage: Message = { role: "user", content: option };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: followUpQuery, type: "tutor" })
      });

      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      
      setMessages((prev) => [...prev, {
        role: "ai",
        content: data.content,
        options: ["Explain more simply", "Give me an example", "Quiz me on this"]
      }]);
    } catch (e) {
      // Fallback to offline mock responses
      setTimeout(() => {
        let aiResponse = "";
        if (option === "Explain more simply") {
          aiResponse = "Sure! Imagine it like a recipe. Plants use sunlight like an oven to bake water and air into sweet food. Simple as that!";
        } else if (option === "Give me an example") {
          aiResponse = "Think of a tree outside. Its leaves are tiny food factories absorbing sunshine to help the tree grow bigger and produce oxygen!";
        } else if (option === "Quiz me on this") {
          aiResponse = "Let's see! What do plants release into the air during photosynthesis that humans need to breathe?\n\nA) Water\nB) Carbon Dioxide\nC) Oxygen";
        }
        setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-indigo-600 text-white p-6 flex items-center gap-3">
        <div className="bg-white/20 p-2.5 rounded-2xl">
          <Sparkles className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Ask Your AI Tutor</h1>
          <p className="text-xs text-indigo-100 font-medium">Get instant, simple explanations for any concept</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="h-10 w-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
            )}
            <div className="space-y-3 max-w-[80%]">
              <div className={`p-5 rounded-3xl ${
                msg.role === "user" 
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none"
              }`}>
                <p className="whitespace-pre-line text-sm md:text-base leading-relaxed">{msg.content}</p>
              </div>

              {/* Quick Actions (only for AI messages) */}
              {msg.role === "ai" && msg.options && (
                <div className="flex flex-wrap gap-2">
                  {msg.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionClick(opt, msg.content)}
                      className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-full border border-indigo-100 transition-colors shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 animate-pulse">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-3xl rounded-tl-none p-5 text-gray-500 text-sm font-medium animate-pulse">
              AI Tutor is thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t bg-slate-50 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything... (e.g., What is photosynthesis?)"
          onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
          className="flex-1 px-5 py-3 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        />
        <Button onClick={() => handleSend(input)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 h-12 w-12 flex items-center justify-center shadow-md">
          <svg
            className="h-5 w-5 transform rotate-45"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
