import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResearchAnalyzer from "@/components/research/ResearchAnalyzer";

const ResearchAnalyzerPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Project Launchpad</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Research Analyzer
          </h1>
          <p className="text-muted-foreground">
            Upload your thesis or research paper to analyze its commercial
            potential and discover monetization pathways.
          </p>
        </div>

        <ResearchAnalyzer />
      </main>
    </div>
  );
};

export default ResearchAnalyzerPage;
