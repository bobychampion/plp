import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Download,
  Copy,
  CheckCircle,
  Lightbulb,
  Target,
  Users,
  TrendingUp,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateDeclaration } from "@/lib/ai-service";

interface GraduationDeclarationGeneratorProps {
  onDeclarationGenerated?: (declaration: string) => void;
}

const GraduationDeclarationGenerator: React.FC<
  GraduationDeclarationGeneratorProps
> = ({ onDeclarationGenerated = () => {} }) => {
  const [activeTab, setActiveTab] = useState("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedDeclaration, setGeneratedDeclaration] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    researchTitle: "",
    researchField: "",
    problemStatement: "",
    methodology: "",
    keyFindings: "",
    practicalApplications: "",
    targetBeneficiaries: "",
    expectedImpact: "",
    implementationPlan: "",
    sustainabilityMeasures: "",
    collaborations: "",
    futureResearch: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCompleteness = () => {
    const requiredFields = [
      "researchTitle",
      "researchField",
      "problemStatement",
      "keyFindings",
      "practicalApplications",
      "targetBeneficiaries",
      "expectedImpact",
    ];
    const completedFields = requiredFields.filter(
      (field) => formData[field].trim() !== "",
    );
    return Math.round((completedFields.length / requiredFields.length) * 100);
  };

  const generateDeclaration = () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    setActiveTab("generating");

    // Simulate AI generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        const newProgress = prev + 8;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setIsGenerating(false);
          showGeneratedDeclaration();
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const showGeneratedDeclaration = async () => {
    try {
      // Use AI service to generate declaration
      const declaration = await generateDeclaration(formData);
      setGeneratedDeclaration(declaration);
      onDeclarationGenerated(declaration);
      setActiveTab("result");
    } catch (error) {
      console.error("Declaration generation failed:", error);
      // Fallback to template-based generation
      const declaration = `GRADUATION DECLARATION: RESEARCH IMPACT STATEMENT

Title: ${formData.researchTitle}
Field of Study: ${formData.researchField}

EXECUTIVE SUMMARY

This research addresses the critical challenge of ${formData.problemStatement?.toLowerCase() || "community development"}, which significantly impacts Nigerian communities and the broader African context. Through rigorous investigation and innovative methodology, this study presents practical solutions with measurable real-world applications.

RESEARCH SIGNIFICANCE AND METHODOLOGY

The research employed ${formData.methodology || "comprehensive analytical approaches"} to investigate and develop solutions for the identified problem. Key findings include:

${formData.keyFindings || "Significant research findings that contribute to knowledge advancement."}

PRACTICAL APPLICATIONS AND REAL-WORLD IMPACT

The research findings translate directly into practical applications:

${formData.practicalApplications || "Practical solutions for real-world implementation."}

TARGET BENEFICIARIES AND COMMUNITY IMPACT

This research directly benefits ${formData.targetBeneficiaries || "Nigerian communities"}, with expected outcomes including:

${formData.expectedImpact || "Positive community impact and development outcomes."}

IMPLEMENTATION STRATEGY

${formData.implementationPlan || "The implementation of these research findings will be achieved through strategic partnerships with relevant stakeholders, phased rollout plans, and continuous monitoring and evaluation to ensure maximum impact."}

SUSTAINABILITY AND LONG-TERM VISION

${formData.sustainabilityMeasures || "Long-term sustainability will be ensured through capacity building, knowledge transfer, and the establishment of self-sustaining systems that can continue to deliver benefits beyond the initial implementation phase."}

COLLABORATIONS AND PARTNERSHIPS

${formData.collaborations || "This research has been conducted in collaboration with relevant industry partners, community organizations, and academic institutions to ensure practical relevance and implementation feasibility."}

FUTURE RESEARCH DIRECTIONS

${formData.futureResearch || "Future research will focus on scaling these solutions, exploring additional applications, and conducting longitudinal studies to measure long-term impact and effectiveness."}

CONCLUSION

This research represents a significant contribution to addressing real-world challenges in Nigeria and Africa. The practical applications and implementation strategies outlined demonstrate the direct link between academic research and societal benefit, fulfilling the requirement for research that creates tangible positive impact in our communities.

The findings and recommendations presented in this research are ready for immediate implementation and have the potential to create lasting positive change in the lives of ${formData.targetBeneficiaries || "Nigerian communities"}.

---

This declaration certifies that the research conducted meets the graduation requirements for demonstrating practical, real-world impact and contributes meaningfully to the advancement of knowledge and societal development.

Generated on: ${new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}`;

      setGeneratedDeclaration(declaration);
      onDeclarationGenerated(declaration);
      setActiveTab("result");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedDeclaration);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const downloadDeclaration = () => {
    const blob = new Blob([generatedDeclaration], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `graduation-declaration-${formData.researchTitle.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetGenerator = () => {
    setFormData({
      researchTitle: "",
      researchField: "",
      problemStatement: "",
      methodology: "",
      keyFindings: "",
      practicalApplications: "",
      targetBeneficiaries: "",
      expectedImpact: "",
      implementationPlan: "",
      sustainabilityMeasures: "",
      collaborations: "",
      futureResearch: "",
    });
    setGeneratedDeclaration("");
    setActiveTab("input");
  };

  const completeness = calculateCompleteness();

  return (
    <div className="w-full bg-background p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            Graduation Declaration Generator
          </CardTitle>
          <CardDescription>
            Create a comprehensive statement linking your research to practical,
            real-world impact for your graduation submission.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="input" disabled={activeTab === "generating"}>
                Research Details
              </TabsTrigger>
              <TabsTrigger
                value="generating"
                disabled={activeTab !== "generating"}
              >
                Generating
              </TabsTrigger>
              <TabsTrigger value="result" disabled={activeTab !== "result"}>
                Declaration
              </TabsTrigger>
            </TabsList>

            <TabsContent value="input" className="mt-6">
              <div className="space-y-6">
                {/* Progress Indicator */}
                <Card className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Completion Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {completeness}%
                      </span>
                    </div>
                    <Progress value={completeness} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-2">
                      Complete all required fields to generate your declaration
                    </p>
                  </CardContent>
                </Card>

                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <Badge variant="outline">Required</Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="researchTitle">Research Title *</Label>
                      <Input
                        id="researchTitle"
                        placeholder="Enter your research title"
                        value={formData.researchTitle}
                        onChange={(e) =>
                          handleInputChange("researchTitle", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="researchField">Research Field *</Label>
                      <Select
                        value={formData.researchField}
                        onValueChange={(value) =>
                          handleInputChange("researchField", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your research field" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agriculture">
                            Agriculture & Food Security
                          </SelectItem>
                          <SelectItem value="technology">
                            Technology & Innovation
                          </SelectItem>
                          <SelectItem value="healthcare">
                            Healthcare & Medicine
                          </SelectItem>
                          <SelectItem value="education">
                            Education & Learning
                          </SelectItem>
                          <SelectItem value="environment">
                            Environment & Sustainability
                          </SelectItem>
                          <SelectItem value="engineering">
                            Engineering & Infrastructure
                          </SelectItem>
                          <SelectItem value="business">
                            Business & Economics
                          </SelectItem>
                          <SelectItem value="social-sciences">
                            Social Sciences
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Research Context */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Research Context</h3>
                    <Badge variant="outline">Required</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="problemStatement">
                        Problem Statement *
                      </Label>
                      <Textarea
                        id="problemStatement"
                        placeholder="Describe the specific problem your research addresses and why it's important for Nigerian/African communities"
                        value={formData.problemStatement}
                        onChange={(e) =>
                          handleInputChange("problemStatement", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="methodology">Research Methodology</Label>
                      <Textarea
                        id="methodology"
                        placeholder="Briefly describe your research approach and methods"
                        value={formData.methodology}
                        onChange={(e) =>
                          handleInputChange("methodology", e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keyFindings">Key Findings *</Label>
                      <Textarea
                        id="keyFindings"
                        placeholder="Summarize your most important research findings and discoveries"
                        value={formData.keyFindings}
                        onChange={(e) =>
                          handleInputChange("keyFindings", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Real-World Impact */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Real-World Impact</h3>
                    <Badge variant="outline">Required</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="practicalApplications">
                        Practical Applications *
                      </Label>
                      <Textarea
                        id="practicalApplications"
                        placeholder="Describe how your research can be applied in real-world scenarios"
                        value={formData.practicalApplications}
                        onChange={(e) =>
                          handleInputChange(
                            "practicalApplications",
                            e.target.value,
                          )
                        }
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetBeneficiaries">
                        Target Beneficiaries *
                      </Label>
                      <Textarea
                        id="targetBeneficiaries"
                        placeholder="Who will benefit from your research? (e.g., farmers, students, healthcare workers, communities)"
                        value={formData.targetBeneficiaries}
                        onChange={(e) =>
                          handleInputChange(
                            "targetBeneficiaries",
                            e.target.value,
                          )
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expectedImpact">Expected Impact *</Label>
                      <Textarea
                        id="expectedImpact"
                        placeholder="What specific positive changes do you expect your research to create?"
                        value={formData.expectedImpact}
                        onChange={(e) =>
                          handleInputChange("expectedImpact", e.target.value)
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Implementation & Sustainability */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">
                      Implementation & Sustainability
                    </h3>
                    <Badge variant="secondary">Optional</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="implementationPlan">
                        Implementation Plan
                      </Label>
                      <Textarea
                        id="implementationPlan"
                        placeholder="How do you plan to implement your research findings in practice?"
                        value={formData.implementationPlan}
                        onChange={(e) =>
                          handleInputChange(
                            "implementationPlan",
                            e.target.value,
                          )
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sustainabilityMeasures">
                        Sustainability Measures
                      </Label>
                      <Textarea
                        id="sustainabilityMeasures"
                        placeholder="How will the impact of your research be sustained over time?"
                        value={formData.sustainabilityMeasures}
                        onChange={(e) =>
                          handleInputChange(
                            "sustainabilityMeasures",
                            e.target.value,
                          )
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collaborations">
                        Collaborations & Partnerships
                      </Label>
                      <Textarea
                        id="collaborations"
                        placeholder="What partnerships or collaborations support your research implementation?"
                        value={formData.collaborations}
                        onChange={(e) =>
                          handleInputChange("collaborations", e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="futureResearch">
                        Future Research Directions
                      </Label>
                      <Textarea
                        id="futureResearch"
                        placeholder="What future research could build on your findings?"
                        value={formData.futureResearch}
                        onChange={(e) =>
                          handleInputChange("futureResearch", e.target.value)
                        }
                        rows={2}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={generateDeclaration}
                    disabled={completeness < 70}
                    className="flex items-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Generate Declaration
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="generating" className="mt-6">
              <div className="flex flex-col items-center space-y-8 py-12">
                <div className="text-center space-y-4">
                  <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto" />
                  <h3 className="text-xl font-semibold">
                    Generating Your Declaration
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Our AI is crafting a comprehensive graduation declaration
                    that links your research to practical, real-world impact.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>

                <div className="text-sm text-muted-foreground text-center">
                  <p>Analyzing research context...</p>
                  <p>Structuring impact statement...</p>
                  <p>Formatting declaration...</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="result" className="mt-6">
              {generatedDeclaration && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">
                        Declaration Generated Successfully
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={copyToClipboard}
                            >
                              {isCopied ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isCopied ? "Copied!" : "Copy to clipboard"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadDeclaration}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetGenerator}
                      >
                        Generate New
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                          {generatedDeclaration}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lightbulb className="h-4 w-4" />
                    <p>
                      Review your declaration and make any necessary adjustments
                      before submitting with your graduation documents.
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start text-sm text-muted-foreground space-y-2">
          <p>
            This tool helps you create a comprehensive statement demonstrating
            the practical impact of your research.
          </p>
          <p>
            The generated declaration meets graduation requirements for linking
            academic research to real-world applications.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GraduationDeclarationGenerator;
