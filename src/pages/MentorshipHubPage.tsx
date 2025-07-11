import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  Users,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MentorshipHubPage = () => {
  // Mock mentors data
  const availableMentors = [
    {
      name: "Dr. Ngozi Okonjo",
      expertise: "AgriTech & Sustainable Development",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ngozi",
      experience: "15+ years",
      rating: 4.9,
      sessions: 120,
      bio: "Former World Bank executive specializing in agricultural technology and sustainable development in Africa.",
    },
    {
      name: "Tunde Kehinde",
      expertise: "E-commerce & Digital Marketing",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tunde",
      experience: "12+ years",
      rating: 4.8,
      sessions: 95,
      bio: "Co-founder of multiple successful e-commerce platforms across West Africa.",
    },
    {
      name: "Funke Opeke",
      expertise: "Technology & Telecommunications",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=funke",
      experience: "20+ years",
      rating: 5.0,
      sessions: 200,
      bio: "CEO of MainOne, pioneer in submarine cable systems and data center services in West Africa.",
    },
    {
      name: "Adebayo Ogunlesi",
      expertise: "Infrastructure & Investment",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adebayo",
      experience: "25+ years",
      rating: 4.9,
      sessions: 150,
      bio: "Chairman of Global Infrastructure Partners, expert in infrastructure investment and development.",
    },
  ];

  const upcomingSessions = [
    {
      mentor: "Dr. Ngozi Okonjo",
      date: "Tomorrow, 2:00 PM",
      topic: "Market Validation Strategies",
      duration: "60 minutes",
    },
    {
      mentor: "Tunde Kehinde",
      date: "Friday, 10:00 AM",
      topic: "Digital Marketing for Startups",
      duration: "45 minutes",
    },
  ];

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
            Mentorship Hub
          </h1>
          <p className="text-muted-foreground">
            Connect with industry experts who can guide your research
            commercialization journey.
          </p>
        </div>

        <Tabs defaultValue="mentors" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
            <TabsTrigger value="sessions">My Sessions</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="mentors" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {availableMentors.map((mentor, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription className="mb-2">
                          {mentor.expertise}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{mentor.experience}</span>
                          <span>⭐ {mentor.rating}</span>
                          <span>{mentor.sessions} sessions</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {mentor.bio}
                    </p>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                      <Button variant="outline">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>
                    Your scheduled mentorship meetings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingSessions.map((session, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{session.topic}</h4>
                            <Badge variant="outline">{session.duration}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            with {session.mentor}
                          </p>
                          <p className="text-sm font-medium">{session.date}</p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm">Join Session</Button>
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        No upcoming sessions scheduled
                      </p>
                      <Button>Schedule a Session</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                  <CardDescription>
                    Your completed mentorship sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">
                          Business Model Canvas Review
                        </h4>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        with Dr. Ngozi Okonjo
                      </p>
                      <p className="text-sm font-medium">Last week</p>
                      <Button size="sm" variant="outline" className="mt-3">
                        View Notes
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">
                          Funding Strategy Discussion
                        </h4>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        with Tunde Kehinde
                      </p>
                      <p className="text-sm font-medium">2 weeks ago</p>
                      <Button size="sm" variant="outline" className="mt-3">
                        View Notes
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mentorship Goals</CardTitle>
                  <CardDescription>
                    Track your progress towards your goals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Market Validation
                        </span>
                        <span className="text-sm text-muted-foreground">
                          75%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Business Plan
                        </span>
                        <span className="text-sm text-muted-foreground">
                          40%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          Funding Application
                        </span>
                        <span className="text-sm text-muted-foreground">
                          20%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Milestones you've reached</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          First Mentor Connection
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Connected with Dr. Ngozi Okonjo
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-sm">✓</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Research Analysis Complete
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Completed AI analysis of research
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-sm">🎯</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          5 Mentorship Sessions
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Completed 5 sessions (Goal: 10)
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MentorshipHubPage;
