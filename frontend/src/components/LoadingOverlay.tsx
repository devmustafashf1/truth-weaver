import { cn } from "@/lib/utils";
import { Brain, Database, Shield, CheckCircle, Sparkles, Search, FileSearch, Cpu } from "lucide-react";
import { useState, useEffect } from "react";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const loadingSteps = [
  { 
    icon: FileSearch, 
    label: "Reading Content", 
    description: "Extracting text and metadata from your article...",
    duration: 1200 
  },
  { 
    icon: Brain, 
    label: "Semantic Analysis", 
    description: "AI is analyzing language patterns and sentiment...",
    duration: 1500 
  },
  { 
    icon: Database, 
    label: "Knowledge Retrieval", 
    description: "Searching vector database for related facts...",
    duration: 1800 
  },
  { 
    icon: Search, 
    label: "Source Verification", 
    description: "Cross-referencing with trusted news sources...",
    duration: 1500 
  },
  { 
    icon: Cpu, 
    label: "RAG Processing", 
    description: "Generating evidence-based verification...",
    duration: 1200 
  },
  { 
    icon: CheckCircle, 
    label: "Finalizing Results", 
    description: "Preparing your comprehensive analysis report...",
    duration: 800 
  },
];

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    let totalDuration = loadingSteps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 98);
      setProgress(newProgress);
    }, 50);

    const runSteps = () => {
      if (stepIndex < loadingSteps.length - 1) {
        const timer = setTimeout(() => {
          stepIndex++;
          setCurrentStep(stepIndex);
          runSteps();
        }, loadingSteps[stepIndex].duration);
        return () => clearTimeout(timer);
      }
    };

    runSteps();

    return () => clearInterval(progressInterval);
  }, [isLoading]);

  if (!isLoading) return null;

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md">
      {/* Background animated grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4">
        {/* Main card */}
        <div className="bg-gradient-card rounded-3xl border border-border p-8 card-shadow">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <h2 className="text-xl font-bold font-display text-foreground">AI Analysis in Progress</h2>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>

          {/* Central icon with rings */}
          <div className="relative flex items-center justify-center mb-8">
            {/* Animated rings */}
            <div className="absolute w-32 h-32 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-28 h-28 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            <div className="absolute w-24 h-24 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
            
            {/* Icon container */}
            <div className="relative w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center glow animate-scale-in" key={currentStep}>
              <CurrentIcon className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Current step info */}
          <div className="text-center mb-8 min-h-[80px]">
            <p className="text-lg font-semibold text-foreground mb-2 animate-fade-up" key={`label-${currentStep}`}>
              {loadingSteps[currentStep].label}
            </p>
            <p className="text-sm text-muted-foreground animate-fade-up" key={`desc-${currentStep}`} style={{ animationDelay: '0.1s' }}>
              {loadingSteps[currentStep].description}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-mono text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps indicator */}
          <div className="grid grid-cols-6 gap-2">
            {loadingSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-300",
                    isActive && "bg-primary/10",
                    isComplete && "opacity-60"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                    isActive ? "bg-primary text-primary-foreground scale-110" : 
                    isComplete ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                  )}>
                    {isComplete ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] text-center leading-tight hidden sm:block",
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {step.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scanning line effect at bottom */}
          <div className="mt-6 h-1 bg-muted/50 rounded-full overflow-hidden">
            <div className="h-full w-1/4 bg-primary/50 rounded-full animate-shimmer" />
          </div>
        </div>

        {/* Bottom tip */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          <Shield className="w-3 h-3 inline mr-1" />
          Your data is processed securely and never stored
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
