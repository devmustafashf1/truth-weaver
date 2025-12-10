import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsInput from "@/components/NewsInput";
import AnalysisResult from "@/components/AnalysisResult";
import LoadingOverlay from "@/components/LoadingOverlay";
import Features from "@/components/Features";

// Call backend API for analysis
const apiAnalyze = async (text: string) => {
  const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:5000/api/verify-news";

  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`API error: ${resp.status} - ${body}`);
  }

  const json = await resp.json();

  // Server returns { result: { ... } }
  return json.result ?? json;
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setShowResult(false);

    try {
      const analysisResult = await apiAnalyze(text);
      setResult(analysisResult);
      setShowResult(true);
    } catch (error) {
      console.error("Analysis failed:", error);
      setResult({
        verdict: "uncertain",
        confidence: 0,
        summary: "Failed to analyze. See console for details.",
        claims: [],
        sources: [],
      });
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <Hero />
        <NewsInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        <AnalysisResult result={result} isVisible={showResult} />
        <Features />
      </main>
      <LoadingOverlay isLoading={isLoading} />
      
      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Built with OpenAI & RAG Technology • Verify Before You Share
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
