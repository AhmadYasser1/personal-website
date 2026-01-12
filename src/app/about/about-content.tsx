"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, awards, skills } from "@/lib/data/research";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

// Skill icons mapping - using simple-icons CDN for tech logos
const skillIcons: Record<string, string> = {
  // Programming
  Python: "https://cdn.simpleicons.org/python",
  "C/C++": "https://cdn.simpleicons.org/cplusplus",
  OCaml: "https://cdn.simpleicons.org/ocaml",
  TypeScript: "https://cdn.simpleicons.org/typescript",
  SQL: "https://cdn.simpleicons.org/mysql",
  // Frameworks
  React: "https://cdn.simpleicons.org/react",
  "Next.js": "https://cdn.simpleicons.org/nextdotjs",
  Flask: "https://cdn.simpleicons.org/flask",
  LangChain: "https://cdn.simpleicons.org/langchain",
  LangGraph: "https://cdn.simpleicons.org/langchain",
  // Data Science
  Pandas: "https://cdn.simpleicons.org/pandas",
  NumPy: "https://cdn.simpleicons.org/numpy",
  "Scikit-Learn": "https://cdn.simpleicons.org/scikitlearn",
  PySpark: "https://cdn.simpleicons.org/apachespark",
  Matplotlib: "https://cdn.simpleicons.org/plotly",
  // Tools & Platforms
  Git: "https://cdn.simpleicons.org/git",
  GitHub: "https://cdn.simpleicons.org/github",
  Jira: "https://cdn.simpleicons.org/jira",
  "Monday.com": "https://cdn.simpleicons.org/mondaydotcom",
  "Power BI": "https://cdn.simpleicons.org/microsoftpowerbi",
  Tableau: "https://cdn.simpleicons.org/tableau",
  Snowflake: "https://cdn.simpleicons.org/snowflake",
  PostgreSQL: "https://cdn.simpleicons.org/postgresql",
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
  Cursor: "https://cdn.simpleicons.org/cursor",
  "Claude Code": "https://cdn.simpleicons.org/anthropic",
};

export function AboutContent() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
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
        </motion.div>

        {/* Passions Section - 3 Boxes */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.15}>
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Driving Change & Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Passionate about creating technology that makes a real difference in people&apos;s lives and communities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Fast-Paced Environments</h3>
                    <p className="text-sm text-muted-foreground">
                      Thrive in dynamic, high-energy settings where quick thinking and adaptability lead to innovation.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="h-full text-center hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4Z" />
                        <circle cx="12" cy="14" r="2" />
                        <path d="M12 16v2" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg mb-2">Building with AI</h3>
                    <p className="text-sm text-muted-foreground">
                      Leveraging artificial intelligence to build intelligent systems that solve complex real-world problems.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </motion.section>

        {/* Education Section */}
        <motion.section
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
                <motion.div 
                  whileHover={{ y: -3 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                >
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
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Badge variant="secondary" className="text-lg px-3">
                              {edu.gpa} GPA
                            </Badge>
                          </motion.div>
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
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-6">
            Technical Skills
          </h2>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            <StaggerItem>
              <SkillCategory title="Programming Languages" skills={skills.programming} />
            </StaggerItem>
            <StaggerItem>
              <SkillCategory title="Frameworks & Libraries" skills={skills.frameworks} />
            </StaggerItem>
            <StaggerItem>
              <SkillCategory title="Data Science" skills={skills.dataScience} />
            </StaggerItem>
            <StaggerItem>
              <SkillCategory title="Tools & Platforms" skills={skills.tools} />
            </StaggerItem>
          </StaggerContainer>
        </motion.section>

        {/* Awards Section */}
        <motion.section
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
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
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
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </motion.section>
      </div>
    </div>
  );
}

function SkillCategory({ title, skills: skillList }: { title: string; skills: string[] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full min-h-[200px] hover:border-primary/50 transition-colors flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex flex-wrap gap-2">
            {skillList.map((skill, index) => {
              const iconUrl = skillIcons[skill];
              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {iconUrl ? (
                    <Link
                      href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Badge variant="secondary" className="flex items-center gap-1.5 cursor-pointer hover:bg-primary/20 transition-colors">
                        <img
                          src={iconUrl}
                          alt={skill}
                          className="w-3.5 h-3.5 dark:invert"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        {skill}
                      </Badge>
                    </Link>
                  ) : (
                    <Badge variant="secondary">{skill}</Badge>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
