import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ChevronRight,
  Download,
  TrendingUp,
  Target,
  Lightbulb,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResultsProps {
  commercialPotential?: number;
  marketOpportunities?: Array<{
    name: string;
    score: number;
    description: string;
  }>;
  monetizationPathways?: Array<{
    name: string;
    viability: number;
    description: string;
  }>;
  suggestedImprovements?: Array<{
    area: string;
    suggestion: string;
    priority: "high" | "medium" | "low";
  }>;
  researchTitle?: string;
}

const AnalysisResults = ({
  commercialPotential = 75,
  marketOpportunities = [
    {
      name: "Agricultural Technology",
      score: 85,
      description:
        "High potential for implementation in Nigerian farming communities to improve crop yields.",
    },
    {
      name: "Educational Sector",
      score: 70,
      description:
        "Moderate potential for adoption in educational institutions across Nigeria.",
    },
    {
      name: "Healthcare Solutions",
      score: 65,
      description:
        "Potential applications in rural healthcare delivery systems.",
    },
  ],
  monetizationPathways = [
    {
      name: "SaaS Model",
      viability: 80,
      description: "Subscription-based service for agricultural businesses.",
    },
    {
      name: "Licensing",
      viability: 75,
      description:
        "Technology licensing to established agricultural companies.",
    },
    {
      name: "Direct Sales",
      viability: 60,
      description:
        "Product development and direct sales to farming cooperatives.",
    },
  ],
  suggestedImprovements = [
    {
      area: "Market Research",
      suggestion:
        "Conduct field studies with potential customers in rural farming communities.",
      priority: "high",
    },
    {
      area: "Technical Validation",
      suggestion:
        "Develop a minimum viable product to test core functionality.",
      priority: "high",
    },
    {
      area: "Business Model",
      suggestion: "Refine pricing strategy for the Nigerian market context.",
      priority: "medium",
    },
  ],
  researchTitle = "Smart Irrigation System for Small-Scale Nigerian Farmers",
}: AnalysisResultsProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{researchTitle}</h2>
        <p className="text-gray-500 text-sm">
          Analysis completed on {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-primary" />
              Commercial Potential
            </CardTitle>
            <CardDescription>Overall viability assessment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">
                  {commercialPotential}%
                </span>
                <Badge
                  variant={
                    commercialPotential > 70
                      ? "default"
                      : commercialPotential > 40
                        ? "secondary"
                        : "outline"
                  }
                >
                  {commercialPotential > 70
                    ? "High"
                    : commercialPotential > 40
                      ? "Medium"
                      : "Low"}
                </Badge>
              </div>
              <Progress value={commercialPotential} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Top Market
            </CardTitle>
            <CardDescription>Highest potential market</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {marketOpportunities[0]?.name}
                </span>
                <Badge>{marketOpportunities[0]?.score}%</Badge>
              </div>
              <p className="text-sm text-gray-500">
                {marketOpportunities[0]?.description}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Best Monetization
            </CardTitle>
            <CardDescription>Recommended approach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">
                  {monetizationPathways[0]?.name}
                </span>
                <Badge variant="secondary">
                  {monetizationPathways[0]?.viability}%
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                {monetizationPathways[0]?.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="markets" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="markets">Market Opportunities</TabsTrigger>
          <TabsTrigger value="monetization">Monetization Pathways</TabsTrigger>
          <TabsTrigger value="improvements">Suggested Improvements</TabsTrigger>
        </TabsList>

        <TabsContent value="markets" className="space-y-4">
          {marketOpportunities.map((market, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{market.name}</h3>
                  <Badge variant={market.score > 75 ? "default" : "secondary"}>
                    {market.score}% Match
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{market.description}</p>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${market.score}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="monetization" className="space-y-4">
          {monetizationPathways.map((pathway, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{pathway.name}</h3>
                  <Badge
                    variant={pathway.viability > 75 ? "default" : "secondary"}
                  >
                    {pathway.viability}% Viable
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{pathway.description}</p>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${pathway.viability}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="improvements" className="space-y-4">
          {suggestedImprovements.map((improvement, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{improvement.area}</h3>
                  <Badge
                    variant={
                      improvement.priority === "high"
                        ? "destructive"
                        : improvement.priority === "medium"
                          ? "default"
                          : "outline"
                    }
                  >
                    {improvement.priority.charAt(0).toUpperCase() +
                      improvement.priority.slice(1)}{" "}
                    Priority
                  </Badge>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">{improvement.suggestion}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center border-t pt-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <p className="text-sm text-gray-600">
            Next step: Review the suggested improvements and begin market
            validation
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download Report
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            Continue <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
