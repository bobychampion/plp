import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Circle, Clock, ArrowRight } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface ProjectStatusCardProps {
  projectName?: string;
  progress?: number;
  milestones?: Milestone[];
  nextTasks?: Task[];
}

const ProjectStatusCard = ({
  projectName = "Research Commercialization Project",
  progress = 35,
  milestones = [
    { id: "1", title: "Research Upload", completed: true },
    { id: "2", title: "AI Analysis", completed: true },
    {
      id: "3",
      title: "Market Validation",
      completed: false,
      dueDate: "2023-07-15",
    },
    { id: "4", title: "Business Model", completed: false },
    { id: "5", title: "Funding Application", completed: false },
  ],
  nextTasks = [
    {
      id: "1",
      title: "Complete Market Validation",
      description: "Validate your research findings with potential customers",
      priority: "high",
    },
    {
      id: "2",
      title: "Review Mentor Feedback",
      description: "Check comments on your business model canvas",
      priority: "medium",
    },
    {
      id: "3",
      title: "Prepare for Pitch Session",
      description: "Create slides for upcoming investor pitch",
      priority: "low",
    },
  ],
}: ProjectStatusCardProps) => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">{projectName}</CardTitle>
            <CardDescription>Project Status Overview</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            View Details <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Overall Progress</h3>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Separator />

          {/* Milestones Section */}
          <div className="space-y-3">
            <h3 className="font-medium">Project Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-2">
                  {milestone.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300" />
                  )}
                  <div className="flex-1">
                    <p
                      className={`text-sm ${milestone.completed ? "text-gray-700" : "text-gray-600"}`}
                    >
                      {milestone.title}
                    </p>
                    {milestone.dueDate && !milestone.completed && (
                      <p className="text-xs text-amber-600 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Due {milestone.dueDate}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Next Tasks Section */}
          <div className="space-y-3">
            <h3 className="font-medium">Recommended Next Steps</h3>
            <div className="space-y-3">
              {nextTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 rounded-md bg-gray-50 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {task.priority.charAt(0).toUpperCase() +
                        task.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {task.description}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs h-7">
                      Start Task
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;
