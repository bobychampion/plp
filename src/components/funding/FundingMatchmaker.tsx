import React, { useState } from "react";
import { Search, Filter, Calendar, ArrowUpRight, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FundingOpportunity {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
  eligibility: string[];
  description: string;
  matchScore: number;
  logoUrl: string;
}

const FundingMatchmaker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for funding opportunities
  const fundingOpportunities: FundingOpportunity[] = [
    {
      id: "1",
      title: "Nigeria Startup Act Innovation Fund",
      organization: "Federal Ministry of Communications & Digital Economy",
      amount: "₦5,000,000 - ₦15,000,000",
      deadline: "2023-12-15",
      category: "government",
      eligibility: [
        "Registered business",
        "Under 5 years old",
        "Tech-enabled solution",
      ],
      description:
        "Seed funding for early-stage startups developing innovative solutions in priority sectors including agriculture, healthcare, and education.",
      matchScore: 92,
      logoUrl:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80",
    },
    {
      id: "2",
      title: "Tony Elumelu Foundation Grant",
      organization: "Tony Elumelu Foundation",
      amount: "$5,000",
      deadline: "2023-11-30",
      category: "private",
      eligibility: [
        "African entrepreneur",
        "Business idea or early-stage",
        "For-profit venture",
      ],
      description:
        "Entrepreneurship program providing seed capital, mentorship, and business training to African entrepreneurs.",
      matchScore: 85,
      logoUrl:
        "https://images.unsplash.com/photo-1614315517650-3771cf72d18a?w=200&q=80",
    },
    {
      id: "3",
      title: "NITDA Technology Innovation & Entrepreneurship Support Scheme",
      organization: "National Information Technology Development Agency",
      amount: "₦3,000,000 - ₦10,000,000",
      deadline: "2024-01-20",
      category: "government",
      eligibility: [
        "ICT-focused solution",
        "Nigerian citizen",
        "Prototype developed",
      ],
      description:
        "Supporting indigenous tech startups and innovation-driven enterprises with funding and technical assistance.",
      matchScore: 78,
      logoUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80",
    },
    {
      id: "4",
      title: "Lagos State Science Research & Innovation Council Grant",
      organization: "Lagos State Government",
      amount: "₦5,000,000 - ₦10,000,000",
      deadline: "2023-12-05",
      category: "government",
      eligibility: [
        "Lagos-based",
        "Science/tech innovation",
        "Prototype stage",
      ],
      description:
        "Supporting research and innovation projects that address Lagos State development challenges.",
      matchScore: 73,
      logoUrl:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=200&q=80",
    },
    {
      id: "5",
      title: "African Development Bank Youth Innovation Lab",
      organization: "African Development Bank",
      amount: "$10,000 - $25,000",
      deadline: "2024-02-28",
      category: "international",
      eligibility: [
        "18-35 years old",
        "African citizen",
        "Sustainable development focus",
      ],
      description:
        "Supporting young African innovators developing solutions for sustainable development challenges.",
      matchScore: 68,
      logoUrl:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80",
    },
  ];

  // Filter opportunities based on search query and category
  const filteredOpportunities = fundingOpportunities
    .filter(
      (opportunity) =>
        opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.organization
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        opportunity.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    )
    .filter(
      (opportunity) =>
        selectedCategory === "all" || opportunity.category === selectedCategory,
    )
    .sort((a, b) => b.matchScore - a.matchScore);

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate days remaining until deadline
  const getDaysRemaining = (dateString: string) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="w-full bg-background p-4 md:p-6 lg:p-8 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Funding Matchmaker
        </h1>
        <p className="text-muted-foreground">
          Discover grants, seed funds, and startup programs matched to your
          research project
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search for funding opportunities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="government">Government</SelectItem>
              <SelectItem value="private">Private Sector</SelectItem>
              <SelectItem value="international">International</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recommended" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="deadline">Upcoming Deadlines</TabsTrigger>
          <TabsTrigger value="amount">Highest Amount</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-4">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={opportunity.logoUrl}
                          alt={opportunity.organization}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {opportunity.title}
                        </CardTitle>
                        <CardDescription>
                          {opportunity.organization}
                        </CardDescription>
                      </div>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                            <span className="text-sm font-medium">
                              {opportunity.matchScore}%
                            </span>
                            <span className="text-xs text-muted-foreground">
                              match
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Match score based on your research profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Amount
                      </p>
                      <p className="font-medium">{opportunity.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Deadline
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">
                          {formatDate(opportunity.deadline)}
                        </p>
                        {getDaysRemaining(opportunity.deadline) <= 14 && (
                          <Badge variant="destructive" className="text-xs">
                            {getDaysRemaining(opportunity.deadline)} days left
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {opportunity.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{opportunity.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Eligibility Requirements
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.eligibility.map((item, index) => (
                        <Badge key={index} variant="secondary">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {opportunity.matchScore >= 80
                        ? "Highly recommended for your project"
                        : opportunity.matchScore >= 60
                          ? "Good match for your project"
                          : "Potential match with some adjustments"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Save</Button>
                    <Button>
                      Apply Now
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No funding opportunities match your criteria.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="deadline" className="space-y-4">
          {filteredOpportunities
            .sort(
              (a, b) =>
                getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline),
            )
            .map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={opportunity.logoUrl}
                          alt={opportunity.organization}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {opportunity.title}
                        </CardTitle>
                        <CardDescription>
                          {opportunity.organization}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-right">
                        <p className="font-medium">
                          {formatDate(opportunity.deadline)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {getDaysRemaining(opportunity.deadline)} days left
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Amount
                      </p>
                      <p className="font-medium">{opportunity.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {opportunity.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{opportunity.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    {getDaysRemaining(opportunity.deadline) <= 7 && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                    {getDaysRemaining(opportunity.deadline) <= 14 &&
                      getDaysRemaining(opportunity.deadline) > 7 && (
                        <Badge variant="secondary">Soon</Badge>
                      )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Save</Button>
                    <Button>
                      Apply Now
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="amount" className="space-y-4">
          {filteredOpportunities
            .sort((a, b) => {
              const getAmount = (amountStr: string) => {
                const match = amountStr.match(/([\d,]+)/g);
                if (match) {
                  const maxAmount = Math.max(
                    ...match.map((num) => parseInt(num.replace(/,/g, ""))),
                  );
                  return maxAmount;
                }
                return 0;
              };
              return getAmount(b.amount) - getAmount(a.amount);
            })
            .map((opportunity) => (
              <Card key={opportunity.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={opportunity.logoUrl}
                          alt={opportunity.organization}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {opportunity.title}
                        </CardTitle>
                        <CardDescription>
                          {opportunity.organization}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {opportunity.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Funding Amount
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Deadline
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">
                          {formatDate(opportunity.deadline)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {opportunity.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{opportunity.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                            <span className="text-sm font-medium">
                              {opportunity.matchScore}%
                            </span>
                            <span className="text-xs text-muted-foreground">
                              match
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Match score based on your research profile</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Save</Button>
                    <Button>
                      Apply Now
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {/* Mock saved opportunities */}
          {[fundingOpportunities[0], fundingOpportunities[2]].map(
            (opportunity) => (
              <Card
                key={opportunity.id}
                className="overflow-hidden border-primary/20"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className="h-12 w-12 rounded-md overflow-hidden">
                        <img
                          src={opportunity.logoUrl}
                          alt={opportunity.organization}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {opportunity.title}
                        </CardTitle>
                        <CardDescription>
                          {opportunity.organization}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Saved</Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                              <span className="text-sm font-medium">
                                {opportunity.matchScore}%
                              </span>
                              <span className="text-xs text-muted-foreground">
                                match
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Match score based on your research profile</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Amount
                      </p>
                      <p className="font-medium">{opportunity.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Deadline
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">
                          {formatDate(opportunity.deadline)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Category
                      </p>
                      <Badge variant="outline" className="capitalize">
                        {opportunity.category}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{opportunity.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                  >
                    Remove from Saved
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline">View Details</Button>
                    <Button>
                      Apply Now
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ),
          )}
          {[fundingOpportunities[0], fundingOpportunities[2]].length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                You haven't saved any funding opportunities yet.
              </p>
              <Button variant="outline">Browse Opportunities</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Your Application Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Nigeria Startup Act Innovation Fund
              </CardTitle>
              <CardDescription>Application in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Next step: Upload business plan
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Continue Application
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Tony Elumelu Foundation Grant
              </CardTitle>
              <CardDescription>Application submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>100%</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Status: Under review
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Application
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FundingMatchmaker;
