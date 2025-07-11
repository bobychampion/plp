import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  BookOpen,
  ChevronRight,
  FileText,
  Lightbulb,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react";
import ProjectStatusCard from "./dashboard/ProjectStatusCard";
import ResearchAnalyzer from "./research/ResearchAnalyzer";
import FundingMatchmaker from "./funding/FundingMatchmaker";

const Home = () => {
  // Mock user data
  const user = {
    name: "Adebayo Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adebayo",
    university: "University of Lagos",
    researchTitle:
      "Sustainable Agricultural Practices in Nigerian Rural Communities",
    progress: 65,
    notifications: 3,
  };

  // Mock recommended resources
  const recommendedResources = [
    {
      title: "Business Model Canvas Workshop",
      type: "Workshop",
      date: "Tomorrow, 2:00 PM",
    },
    {
      title: "Grant Writing Essentials",
      type: "Guide",
      date: "New Resource",
    },
    {
      title: "Market Validation Techniques",
      type: "Video",
      date: "Added Recently",
    },
  ];

  // Mock mentors
  const availableMentors = [
    {
      name: "Dr. Ngozi Okonjo",
      expertise: "AgriTech",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ngozi",
    },
    {
      name: "Tunde Kehinde",
      expertise: "E-commerce",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tunde",
    },
    {
      name: "Funke Opeke",
      expertise: "Technology",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=funke",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="flex items-center gap-2 mb-8">
          <Lightbulb className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">Project Launchpad</h1>
        </div>

        <nav className="space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-md bg-primary/10 px-3 py-2 text-primary font-medium"
          >
            <FileText className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/research"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <BookOpen className="h-5 w-5" />
            Research Analyzer
          </Link>
          <Link
            to="/funding"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <MessageSquare className="h-5 w-5" />
            Funding Matchmaker
          </Link>
          <Link
            to="/mentorship"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Users className="h-5 w-5" />
            Mentorship Hub
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <div className="mt-auto pt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/20 p-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Low-bandwidth Mode</h3>
                  <p className="text-xs text-muted-foreground">
                    Save data while browsing
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-3 text-xs">
                Enable
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:hidden">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Project Launchpad</h1>
            </div>
            <div className="relative w-full max-w-md hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search resources, mentors, grants..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-4 py-2 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-muted-foreground" />
                {user.notifications > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    {user.notifications}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.university}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back, {user.name.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground">
              Track your research commercialization journey and explore
              opportunities.
            </p>
          </div>

          {/* Project Status Card */}
          <ProjectStatusCard
            title={user.researchTitle}
            progress={user.progress}
            university={user.university}
          />

          {/* Main Tabs */}
          <Tabs defaultValue="dashboard" className="mt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="research">Research Analyzer</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks to move your project forward
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Upload Research Paper
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Browse Funding Opportunities
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      Connect with Mentors
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Link to="/graduation-declaration">
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        Generate Graduation Declaration
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Recommended Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Resources</CardTitle>
                    <CardDescription>
                      Tailored to your research focus
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedResources.map((resource, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="rounded-md bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">
                              {resource.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {resource.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Available Mentors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Available Mentors</CardTitle>
                    <CardDescription>Experts in your field</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {availableMentors.map((mentor, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={mentor.avatar}
                              alt={mentor.name}
                            />
                            <AvatarFallback>
                              {mentor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-sm font-medium">
                              {mentor.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {mentor.expertise}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="ml-auto"
                          >
                            Connect
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="research">
              <ResearchAnalyzer />
            </TabsContent>

            <TabsContent value="funding">
              <FundingMatchmaker />
            </TabsContent>

            <TabsContent value="mentorship">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-xl font-semibold mb-4">Mentorship Hub</h2>
                <p className="text-muted-foreground mb-6">
                  Connect with industry experts who can guide your research
                  commercialization journey.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Find a Mentor</CardTitle>
                      <CardDescription>
                        Browse experts in your field
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {availableMentors.map((mentor, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={mentor.avatar}
                                alt={mentor.name}
                              />
                              <AvatarFallback>
                                {mentor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="text-sm font-medium">
                                {mentor.name}
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                {mentor.expertise}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="ml-auto"
                            >
                              View Profile
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4">
                        Browse All Mentors
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Sessions</CardTitle>
                      <CardDescription>
                        Your scheduled mentorship meetings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-40 border rounded-md border-dashed">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-2">
                            No upcoming sessions
                          </p>
                          <Button variant="outline">Schedule a Session</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Home;
