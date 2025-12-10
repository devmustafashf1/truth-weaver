import { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, ExternalLink, FileCheck, TrendingUp, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface Claim {
  text: string;
  status: "verified" | "false" | "unverified";
  source?: string;
}

interface AnalysisResultProps {
  result: {
    verdict: "likely_real" | "likely_fake" | "uncertain";
    confidence: number;
    summary: string;
    claims: Claim[];
    sources: string[];
  } | null;
  isVisible: boolean;
}

const AnalysisResult = ({ result, isVisible }: AnalysisResultProps) => {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);

  useEffect(() => {
    if (result && isVisible) {
      const timer = setTimeout(() => {
        setAnimatedConfidence(result.confidence);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimatedConfidence(0);
    }
  }, [result, isVisible]);

  if (!result || !isVisible) return null;

  const verdictConfig = {
    likely_real: {
      icon: CheckCircle,
      label: "Likely Real",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      barColor: "bg-success",
    },
    likely_fake: {
      icon: XCircle,
      label: "Likely Fake",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      barColor: "bg-destructive",
    },
    uncertain: {
      icon: AlertTriangle,
      label: "Uncertain",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      barColor: "bg-warning",
    },
  };

  const config = verdictConfig[result.verdict];
  const VerdictIcon = config.icon;

  const claimStatusConfig = {
    verified: { icon: CheckCircle, color: "text-success", label: "Verified" },
    false: { icon: XCircle, color: "text-destructive", label: "False" },
    unverified: { icon: AlertTriangle, color: "text-warning", label: "Unverified" },
  };

  return (
    <section className="py-16 px-4 animate-fade-up">
      <div className="container max-w-4xl mx-auto">
        {/* Main verdict card */}
        <div className={cn(
          "rounded-2xl border p-8 mb-6 card-shadow",
          config.bgColor,
          config.borderColor
        )}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Verdict icon with animation */}
            <div className={cn(
              "relative w-24 h-24 rounded-full flex items-center justify-center",
              config.bgColor
            )}>
              <div className={cn("absolute inset-0 rounded-full animate-pulse-glow", config.bgColor)} />
              <VerdictIcon className={cn("w-12 h-12 relative z-10", config.color)} />
            </div>

            {/* Verdict info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className={cn("text-3xl font-bold font-display mb-2", config.color)}>
                {config.label}
              </h2>
              <p className="text-muted-foreground">{result.summary}</p>
            </div>

            {/* Confidence meter */}
            <div className="w-full md:w-48">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <span className={cn("text-2xl font-bold font-display", config.color)}>
                  {Math.round(animatedConfidence)}%
                </span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-1000 ease-out", config.barColor)}
                  style={{ width: `${animatedConfidence}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Claims analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Key claims */}
          <div className="bg-gradient-card rounded-2xl border border-border p-6 card-shadow animate-scale-in">
            <div className="flex items-center gap-2 mb-4">
              <Quote className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold font-display">Key Claims Analyzed</h3>
            </div>
            <div className="space-y-3">
              {result.claims.map((claim, index) => {
                const claimConfig = claimStatusConfig[claim.status];
                const ClaimIcon = claimConfig.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ClaimIcon className={cn("w-5 h-5 mt-0.5 shrink-0", claimConfig.color)} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{claim.text}</p>
                      {claim.source && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Source: {claim.source}
                        </p>
                      )}
                    </div>
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", claimConfig.color, `${claimConfig.color}/10`.replace('text-', 'bg-'))}>
                      {claimConfig.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sources & verification */}
          <div className="bg-gradient-card rounded-2xl border border-border p-6 card-shadow animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 mb-4">
              <FileCheck className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold font-display">Verification Sources</h3>
            </div>
            <div className="space-y-3">
              {result.sources.map((source, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <span className="flex-1 text-sm text-foreground truncate">{source}</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResult;
