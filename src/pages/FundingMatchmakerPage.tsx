import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import FundingMatchmaker from "@/components/funding/FundingMatchmaker";

const FundingMatchmakerPage = () => {
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
      <main className="max-w-7xl mx-auto">
        <FundingMatchmaker />
      </main>
    </div>
  );
};

export default FundingMatchmakerPage;
