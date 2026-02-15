"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, awards, skills } from "@/lib/data/research";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";
import {
  Code2,
  Database,
  Globe,
  BarChart3,
  Cloud,
  GitBranch,
  Server,
  Brain,
  MessageSquare,
  PieChart,
  Users,
  Zap,
  Package,
  Target,
  Layers,
  Activity,
  GitPullRequest,
  Terminal,
  Braces,
  Paintbrush,
  Eye,
  Workflow,
  Shield,
  Smartphone,
  Search,
  type LucideIcon,
} from "lucide-react";

// Icon mapping using Lucide React icons
const skillIcons: Record<string, LucideIcon> = {
  // Programming
  Python: Code2,
  TypeScript: Code2,
  JavaScript: Code2,
  "C/C++": Terminal,
  "C#": Code2,
  OCaml: Braces,
  SQL: Database,
  "HTML/CSS": Globe,
  // Frameworks
  React: Globe,
  "Next.js": Layers,
  Flask: Package,
  LangChain: Brain,
  LangGraph: Brain,
  "ASP.NET": Server,
  Flutter: Smartphone,
  "Tailwind CSS": Paintbrush,
  "shadcn/ui": Layers,
  "Framer Motion": Activity,
  // Data Science
  Pandas: BarChart3,
  NumPy: BarChart3,
  "Scikit-Learn": Brain,
  PySpark: Activity,
  Matplotlib: PieChart,
  Word2Vec: MessageSquare,
  "TF-IDF": Search,
  "Data Visualization": PieChart,
  // Cloud
  "Amazon S3": Cloud,
  EC2: Server,
  ECS: Server,
  Lambda: Zap,
  Snowflake: Cloud,
  Vercel: Cloud,
  // Databases
  PostgreSQL: Database,
  DynamoDB: Database,
  "AWS Athena": Server,
  "AWS Glue": Server,
  // Development Tools
  Git: GitBranch,
  GitHub: GitPullRequest,
  Jira: Target,
  "Monday.com": Users,
  Cursor: Code2,
  "Claude Code": Brain,
  Codex: Brain,
  Linux: Terminal,
  ESLint: Shield,
  // Analytics
  "Power BI": PieChart,
  Tableau: BarChart3,
  AppFlow: Zap,
  // AI Services
  "AWS Bedrock": Brain,
  "Bedrock AgentCore": Brain,
  "API Gateway": Server,
  HuggingFace: Brain,
  // Concepts
  "Machine Learning": Brain,
  NLP: MessageSquare,
  "Computer Vision": Eye,
  "Data Engineering": Workflow,
  "Data Analytics": BarChart3,
  "REST API": Server,
  "Agile/SCRUM": Users,
  OOP: Code2,
};

export function AboutContent() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            About Me
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A versatile technologist with diverse skills across industries, driven by a passion to make meaningful change in the world.
          </p>
        </m.div>

        {/* Passions Section - 3 Boxes */}
        <m.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            <StaggerItem className="h-full">
              <div className="h-full transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1.5">
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Target className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">Driving Change & Impact</h3>
                  </CardContent>
                </Card>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="h-full transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1.5">
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">Fast-Paced Environments</h3>
                  </CardContent>
                </Card>
              </div>
            </StaggerItem>
            <StaggerItem className="h-full">
              <div className="h-full transition-transform duration-200 hover:scale-[1.03] hover:-translate-y-1.5">
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6 pb-6 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Brain className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg">Building with AI</h3>
                  </CardContent>
                </Card>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </m.section>

        {/* Education Section */}
        <m.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-6">Education</h2>
          <StaggerContainer className="space-y-4" staggerDelay={0.15}>
            {education.map((edu) => (
              <StaggerItem key={edu.id}>
                <div className="transition-transform duration-200 hover:-translate-y-1">
                  <Card className="overflow-hidden relative hover:border-primary/50 transition-colors">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/50" />
                    <CardHeader className="pl-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">
                            {edu.institution}
                          </CardTitle>
                          <p className="text-muted-foreground">
                            {edu.degree} in {edu.field}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="text-lg px-3 transition-transform duration-200 hover:scale-110">
                            {edu.gpa} GPA
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-5">
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {edu.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </m.section>

        {/* Skills Section */}
        <m.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-6">
            Technical Skills
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
            <StaggerItem className="h-full">
              <SkillCategory title="Programming Languages" skills={skills.programming} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Frameworks & Libraries" skills={skills.frameworks} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Data Science" skills={skills.dataScience} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Cloud Services" skills={skills.cloud} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Databases" skills={skills.databases} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Development Tools" skills={skills.devTools} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Analytics & BI" skills={skills.analytics} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="AI Services" skills={skills.aiServices} />
            </StaggerItem>
            <StaggerItem className="h-full">
              <SkillCategory title="Concepts" skills={skills.concepts} />
            </StaggerItem>
          </StaggerContainer>
        </m.section>

        {/* Awards Section */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-6">
            Awards & Recognition
          </h2>
          <StaggerContainer className="space-y-4" staggerDelay={0.1}>
            {awards.map((award) => (
              <StaggerItem key={award.id}>
                <div className="transition-transform duration-200 hover:scale-[1.02] hover:translate-x-1">
                  <Card className="overflow-hidden hover:border-primary/50 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{award.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {award.organization}
                          </p>
                          {award.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {award.description}
                            </p>
                          )}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {award.date}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </m.section>
      </div>
    </div>
  );
}

function SkillCategory({ title, skills: skillList }: { title: string; skills: string[] }) {
  return (
    <Card className="h-full min-h-[200px] hover:border-primary/50 transition-colors flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-2">
          {skillList.map((skill) => {
            const IconComponent = skillIcons[skill];
            return (
              <Link
                key={skill}
                href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Badge variant="secondary" className="flex items-center gap-1.5 cursor-pointer hover:bg-primary/20 hover:scale-105 transition-all">
                  {IconComponent && (
                    <IconComponent
                      className="w-3.5 h-3.5 text-current"
                      strokeWidth={2}
                    />
                  )}
                  {skill}
                </Badge>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
