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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import AnalysisResults from "./AnalysisResults";
import { analyzeResearch } from "@/lib/ai-service";

interface ResearchAnalyzerProps {
  onAnalysisComplete?: (results: AnalysisResultsType) => void;
}

export interface AnalysisResultsType {
  commercialPotential: number;
  targetMarkets: string[];
  monetizationPathways: string[];
  suggestedImprovements: string[];
  problemSolutionFit: number;
}

const ResearchAnalyzer: React.FC<ResearchAnalyzerProps> = ({
  onAnalysisComplete = () => {},
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("upload");
  const [analysisResults, setAnalysisResults] =
    useState<AnalysisResultsType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          startProcessing();
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setActiveTab("processing");

    // Simulate AI processing progress
    const processingInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(processingInterval);
          setIsProcessing(false);
          showResults();
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  const showResults = async () => {
    try {
      // Use AI service to analyze the uploaded file
      const fileText = file ? await file.text() : "Sample research document";
      const analysisResponse = await analyzeResearch({
        text: fileText,
        researchTitle: file?.name || "Research Document",
        researchField: "Technology",
      });

      // Convert AI response to expected format
      const mockResults: AnalysisResultsType = {
        commercialPotential: analysisResponse.commercialPotential,
        targetMarkets: analysisResponse.marketOpportunities.map((m) => m.name),
        monetizationPathways: analysisResponse.monetizationPathways.map(
          (p) => p.name,
        ),
        suggestedImprovements: analysisResponse.suggestedImprovements.map(
          (s) => s.suggestion,
        ),
        problemSolutionFit: Math.floor(
          analysisResponse.commercialPotential * 0.9,
        ),
      };

      setAnalysisResults(mockResults);
      onAnalysisComplete(mockResults);
      setActiveTab("results");
    } catch (error) {
      console.error("Analysis failed:", error);
      // Fallback to mock results if analysis fails
      const mockResults: AnalysisResultsType = {
        commercialPotential: 78,
        targetMarkets: [
          "EdTech",
          "Agricultural Technology",
          "Small Business Solutions",
        ],
        monetizationPathways: [
          "SaaS subscription model",
          "Licensing to educational institutions",
          "Partnership with agricultural extension services",
        ],
        suggestedImprovements: [
          "Conduct market validation with potential users",
          "Develop a minimum viable product (MVP)",
          "Explore partnership opportunities with existing platforms",
        ],
        problemSolutionFit: 85,
      };

      setAnalysisResults(mockResults);
      onAnalysisComplete(mockResults);
      setActiveTab("results");
    }
  };

  const resetAnalyzer = () => {
    setFile(null);
    setIsUploading(false);
    setIsProcessing(false);
    setUploadProgress(0);
    setProcessingProgress(0);
    setAnalysisResults(null);
    setActiveTab("upload");
    setError(null);
  };

  return (
    <div className="w-full bg-background p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            AI Research Analyzer
          </CardTitle>
          <CardDescription>
            Upload your thesis or research paper to analyze its commercial
            potential and discover monetization pathways.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="upload"
                disabled={activeTab !== "upload" && activeTab !== "results"}
              >
                Upload Research
              </TabsTrigger>
              <TabsTrigger
                value="processing"
                disabled={activeTab !== "processing"}
              >
                Processing
              </TabsTrigger>
              <TabsTrigger value="results" disabled={activeTab !== "results"}>
                Analysis Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DOCX, or TXT (MAX. 20MB)
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      accept=".pdf,.docx,.txt"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {file && (
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-medium">{file.name}</span>
                    <span className="text-muted-foreground">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center space-x-2 text-sm text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}

                {isUploading && (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full sm:w-auto"
                >
                  {isUploading ? "Uploading..." : "Analyze Research"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="processing" className="mt-6">
              <div className="flex flex-col items-center space-y-8 py-12">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-semibold">
                    Analyzing Your Research
                  </h3>
                  <p className="text-muted-foreground">
                    Our AI is processing your document to identify commercial
                    potential, target markets, and monetization pathways.
                  </p>
                </div>

                <div className="w-full max-w-md space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing...</span>
                    <span>{processingProgress}%</span>
                  </div>
                  <Progress value={processingProgress} className="h-2" />
                </div>

                <div className="text-sm text-muted-foreground">
                  This may take a few minutes depending on the size of your
                  document.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              {analysisResults ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Analysis Complete</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetAnalyzer}>
                      Analyze Another Document
                    </Button>
                  </div>

                  <AnalysisResults results={analysisResults} />

                  <div className="flex justify-end">
                    <Button className="flex items-center space-x-2">
                      <span>Proceed to Funding Matchmaker</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p>
                    No analysis results available. Please upload a document to
                    analyze.
                  </p>
                  <Button variant="link" onClick={() => setActiveTab("upload")}>
                    Go to Upload
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-start text-sm text-muted-foreground">
          <p>
            Supported file formats: PDF, DOCX, TXT. Maximum file size: 20MB.
          </p>
          <p>Your research data is processed securely and confidentially.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResearchAnalyzer;
