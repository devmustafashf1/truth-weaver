import { useState } from "react";
import { Search, Link as LinkIcon, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NewsInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const NewsInput = ({ onAnalyze, isLoading }: NewsInputProps) => {
  const [inputType, setInputType] = useState<"text" | "url">("text");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onAnalyze(value.trim());
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-gradient-card rounded-2xl border border-border p-8 card-shadow">
          {/* Input type selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setInputType("text")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                inputType === "text"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <FileText className="w-4 h-4" />
              Paste Article
            </button>
            <button
              onClick={() => setInputType("url")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                inputType === "url"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <LinkIcon className="w-4 h-4" />
              Enter URL
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {inputType === "text" ? (
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Paste the news article or claim you want to verify..."
                className="w-full h-48 bg-muted/50 border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
              />
            ) : (
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="url"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="https://example.com/news-article"
                  className="w-full h-14 bg-muted/50 border border-border rounded-xl pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {value.length > 0 && (
                  <span>{value.length} characters</span>
                )}
              </p>
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={!value.trim() || isLoading}
                className="group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze News
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsInput;
