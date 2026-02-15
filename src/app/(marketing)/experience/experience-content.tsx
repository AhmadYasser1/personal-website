"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as m from "motion/react-m";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";
import { gsap, useGSAP } from "@/lib/gsap/plugins";
import { experiences } from "@/lib/data/experience";

// Skill icons mapping - using simple-icons CDN for tech logos
const skillIcons: Record<string, string> = {
  // Programming
  Python: "https://cdn.simpleicons.org/python",
  "C/C++": "https://cdn.simpleicons.org/cplusplus",
  "C#": "https://cdn.simpleicons.org/csharp",
  TypeScript: "https://cdn.simpleicons.org/typescript",
  SQL: "https://cdn.simpleicons.org/mysql",
  // Frameworks & Libraries
  React: "https://cdn.simpleicons.org/react",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs",
  Flask: "https://cdn.simpleicons.org/flask",
  "ASP.NET": "https://cdn.simpleicons.org/dotnet",
  LangChain: "https://cdn.simpleicons.org/langchain",
  LangGraph: "https://cdn.simpleicons.org/langchain",
  Flutter: "https://cdn.simpleicons.org/flutter",
  // Data Science & ML
  Pandas: "https://cdn.simpleicons.org/pandas",
  NumPy: "https://cdn.simpleicons.org/numpy",
  "Scikit-Learn": "https://cdn.simpleicons.org/scikitlearn",
  PySpark: "https://cdn.simpleicons.org/apachespark",
  Matplotlib: "https://cdn.simpleicons.org/plotly",
  "Machine Learning": "https://cdn.simpleicons.org/tensorflow",
  NLP: "https://cdn.simpleicons.org/openai",
  Word2Vec: "https://cdn.simpleicons.org/openai",
  "Computer Vision": "https://cdn.simpleicons.org/opencv",
  // Tools & Platforms
  Git: "https://cdn.simpleicons.org/git",
  GitHub: "https://cdn.simpleicons.org/github",
  Jira: "https://cdn.simpleicons.org/jira",
  "Monday.com": "https://cdn.simpleicons.org/mondaydotcom",
  "Power BI": "https://cdn.simpleicons.org/microsoftpowerbi",
  Snowflake: "https://cdn.simpleicons.org/snowflake",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql",
  HuggingFace: "https://cdn.simpleicons.org/huggingface",
  // AWS
  "Amazon S3": "https://cdn.simpleicons.org/amazons3",
  "AWS Athena": "https://cdn.simpleicons.org/amazonwebservices",
  "AWS Glue": "https://cdn.simpleicons.org/amazonwebservices",
  DynamoDB: "https://cdn.simpleicons.org/amazondynamodb",
  AppFlow: "https://cdn.simpleicons.org/amazonwebservices",
  EC2: "https://cdn.simpleicons.org/amazonec2",
  ECS: "https://cdn.simpleicons.org/amazonecs",
  Lambda: "https://cdn.simpleicons.org/awslambda",
  "AWS Bedrock": "https://cdn.simpleicons.org/amazonwebservices",
  "Bedrock AgentCore": "https://cdn.simpleicons.org/amazonwebservices",
  "API Gateway": "https://cdn.simpleicons.org/amazonapigateway",
  // Development Tools
  Cursor: "https://cdn.simpleicons.org/cursor",
  "Claude Code": "https://cdn.simpleicons.org/anthropic",
  Linux: "https://cdn.simpleicons.org/linux",
  SSH: "https://cdn.simpleicons.org/gnubash",
  // Methodologies
  SCRUM: "https://cdn.simpleicons.org/scrumalliance",
  "Project Management": "https://cdn.simpleicons.org/trello",
  "Business Strategy": "https://cdn.simpleicons.org/trello",
  "Data Analysis": "https://cdn.simpleicons.org/plotly",
  "System Administration": "https://cdn.simpleicons.org/linux",
  // Research
  "User Research": "https://cdn.simpleicons.org/usertesting",
  Design: "https://cdn.simpleicons.org/figma",
  "Academic Writing": "https://cdn.simpleicons.org/overleaf",
  "Data Engineering": "https://cdn.simpleicons.org/apachespark",
  "Data Visualization": "https://cdn.simpleicons.org/plotly",
  "Thermal Imaging": "https://cdn.simpleicons.org/opencv",
  "Healthcare AI": "https://cdn.simpleicons.org/tensorflow",
};

export function ExperienceContent() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const line = lineRef.current;
      const timeline = timelineRef.current;
      if (!line || !timeline) return;

      // Timeline line grows with scroll using matchMedia for desktop only
      gsap.matchMedia().add("(min-width: 768px)", () => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timeline,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          },
        );
      });

      // Timeline dots scale in on scroll
      gsap.utils.toArray<HTMLElement>("[data-timeline-dot]", timeline).forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 75%",
            once: true,
          },
        });
      });
    },
    { scope: timelineRef },
  );

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            <SplitTextReveal
              as="span"
              trigger="load"
            >
              Experience
            </SplitTextReveal>
            <span className="text-emerald-500">.</span>
          </h1>
          <m.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            My professional journey across technology, data science, and
            education
          </m.p>
        </div>

        {/* Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent my-6" />

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line - scroll-driven */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-transparent -translate-x-1/2 hidden md:block origin-top"
            style={{ transform: "scaleY(0)" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <m.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative md:w-[calc(50%-1rem)] ${
                  index % 2 === 0
                    ? "md:mr-auto"
                    : "md:ml-auto"
                }`}
              >
                {/* Timeline dot - GSAP scroll-driven */}
                <div
                  data-timeline-dot
                  className={`absolute top-8 w-4 h-4 bg-emerald-500 rounded-full hidden md:flex items-center justify-center shadow-lg shadow-emerald-500/50 ${
                    index % 2 === 0
                      ? "left-[calc(100%+0.5rem)]"
                      : "right-[calc(100%+0.5rem)]"
                  }`}
                />

                <ExperienceCard experience={exp} />
              </m.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

interface ExperienceCardProps {
  experience: (typeof experiences)[number];
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="transition-transform duration-200 hover:-translate-y-1.5 hover:scale-[1.02]">
      <Card className="hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/5 group">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <CardTitle className="text-xl">{experience.company}</CardTitle>
              <p className="text-emerald-500 font-medium">{experience.role}</p>
              <p className="text-sm text-muted-foreground">
                {experience.location}
              </p>
            </div>
            <Badge variant="outline" className="shrink-0">
              {experience.startDate} - {experience.endDate}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{experience.description}</p>

          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Key Achievements</h4>
            <ul className="list-disc list-outside pl-5 text-sm text-muted-foreground space-y-1">
              {experience.achievements.map((achievement, i) => (
                <m.li 
                  key={achievement}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {achievement}
                </m.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, i) => {
              const iconUrl = skillIcons[tech];
              return (
                <m.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  {iconUrl ? (
                    <Link
                      href={`https://www.google.com/search?q=${encodeURIComponent(tech)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Badge variant="secondary" className="text-xs flex items-center gap-1.5 cursor-pointer group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                        <Image
                          src={iconUrl}
                          alt={tech}
                          width={12}
                          height={12}
                          unoptimized
                          className="w-3 h-3"
                          style={{ filter: "brightness(0) saturate(100%) invert(1)" }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        {tech}
                      </Badge>
                    </Link>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  )}
                </m.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
