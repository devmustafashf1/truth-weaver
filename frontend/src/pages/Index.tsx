import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsInput from "@/components/NewsInput";
import AnalysisResult from "@/components/AnalysisResult";
import LoadingOverlay from "@/components/LoadingOverlay";
import Features from "@/components/Features";

// Mock analysis function - in production this would call your OpenAI + RAG backend
const mockAnalyze = async (text: string) => {
  await new Promise((resolve) => setTimeout(resolve, 6000));
  
  // Simulate different results based on content
  const isSuspicious = text.toLowerCase().includes("shocking") || 
                       text.toLowerCase().includes("you won't believe") ||
                       text.toLowerCase().includes("secret");
  
  return {
    verdict: isSuspicious ? "likely_fake" : "likely_real" as "likely_fake" | "likely_real" | "uncertain",
    confidence: isSuspicious ? 78 : 92,
    summary: isSuspicious 
      ? "Multiple claims in this article could not be verified against trusted sources. Language patterns suggest sensationalism."
      : "The primary claims in this article are consistent with verified reporting from multiple credible sources.",
    claims: [
      {
        text: "Primary claim about the main event",
        status: isSuspicious ? "false" : "verified" as "verified" | "false" | "unverified",
        source: "Associated Press, Reuters",
      },
      {
        text: "Statistical data mentioned in the article",
        status: "verified" as "verified" | "false" | "unverified",
        source: "Official government records",
      },
      {
        text: "Quote attributed to official spokesperson",
        status: "unverified" as "verified" | "false" | "unverified",
      },
    ],
    sources: [
      "Associated Press - Primary Source",
      "Reuters Fact Check Database",
      "PolitiFact Archives",
      "Snopes Verification Network",
    ],
  };
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setShowResult(false);
    
    try {
      const analysisResult = await mockAnalyze(text);
      setResult(analysisResult);
      setShowResult(true);
    } catch (error) {
      console.error("Analysis failed:", error);
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
