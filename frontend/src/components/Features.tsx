import { Brain, Database, Zap, Shield, BarChart3, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "Semantic Analysis",
    description: "Advanced NLP powered by OpenAI to understand context, tone, and linguistic patterns.",
  },
  {
    icon: Database,
    title: "RAG Pipeline",
    description: "Retrieval-Augmented Generation using vector embeddings for fact verification.",
  },
  {
    icon: Zap,
    title: "Real-time Results",
    description: "Get instant verification results with detailed confidence scores.",
  },
  {
    icon: Shield,
    title: "Source Verification",
    description: "Cross-references claims against trusted news sources and fact-checkers.",
  },
  {
    icon: BarChart3,
    title: "Confidence Scoring",
    description: "Transparent scoring system showing exactly why content is flagged.",
  },
  {
    icon: Globe,
    title: "Multi-language",
    description: "Supports news articles and claims in multiple languages worldwide.",
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 bg-gradient-hero">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Powered by <span className="text-gradient">Advanced AI</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our multi-layered verification system combines the latest in AI technology 
            to deliver accurate, reliable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group p-6 rounded-2xl bg-gradient-card border border-border",
                "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                "transition-all duration-500 cursor-default"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
