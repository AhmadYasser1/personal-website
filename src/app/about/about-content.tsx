"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, awards, skills } from "@/lib/data/research";
import { StaggerContainer, StaggerItem } from "@/components/ui/animated-section";

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
            A passionate technologist bridging the gap between innovative
            research and real-world applications
          </p>
        </motion.div>

        {/* Bio Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed">
                    I&apos;m a dual-degree Computer Science graduate from both the{" "}
                    <strong>University of Minnesota Twin-Cities</strong> (4.0 GPA)
                    and <strong>Egypt University of Informatics</strong> (3.8
                    GPA), combining American innovation with global perspectives.
                  </p>
                  <p className="leading-relaxed">
                    Currently making waves at{" "}
                    <strong>Brooklyn Sports & Entertainment (Brooklyn Nets/Barclays Center)</strong> as
                    a Digital Fellow, where I get to merge my love for sports,
                    technology, and data. My journey spans multiple domains - from
                    developing machine learning models to researching word
                    embeddings with professors at UMN&apos;s Carlson School, and
                    even teaching AI concepts to kids aged 6-18.
                  </p>
                  <p className="leading-relaxed">
                    I thrive at the intersection of technical expertise and human
                    connection. What drives me: Creating technology that brings
                    people together, just like sports taught me growing up.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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
                  whileHover={{ scale: 1.02, x: 5 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/50" />
                    <CardHeader>
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
                    <CardContent>
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

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="secondary">{skill}</Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
