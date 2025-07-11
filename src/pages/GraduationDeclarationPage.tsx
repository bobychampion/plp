import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import GraduationDeclarationGenerator from "@/components/graduation/GraduationDeclarationGenerator";

const GraduationDeclarationPage = () => {
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
            Graduation Declaration Generator
          </h1>
          <p className="text-muted-foreground">
            Create a comprehensive statement linking your research to practical,
            real-world impact for your graduation submission.
          </p>
        </div>

        <GraduationDeclarationGenerator />
      </main>
    </div>
  );
};

export default GraduationDeclarationPage;
