"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { experiences } from "@/lib/data/experience";

export function ExperienceContent() {
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
            Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey across technology, data science, and
            education
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line - animated */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative md:w-1/2 ${
                  index % 2 === 0
                    ? "md:pr-8 md:ml-0"
                    : "md:pl-8 md:ml-auto"
                }`}
              >
                {/* Timeline dot - animated */}
                <motion.div
                  className={`absolute top-8 w-4 h-4 bg-primary rounded-full hidden md:block shadow-lg shadow-primary/50 ${
                    index % 2 === 0
                      ? "right-0 translate-x-1/2 md:-right-2"
                      : "left-0 -translate-x-1/2 md:-left-2"
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 500 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>

                <ExperienceCard experience={exp} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ExperienceCardProps {
  experience: (typeof experiences)[0];
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <motion.div 
                className="flex items-center gap-2 mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Badge
                  variant={
                    experience.type === "work"
                      ? "default"
                      : experience.type === "research"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {experience.type === "work"
                    ? "Work"
                    : experience.type === "research"
                    ? "Research"
                    : "Teaching"}
                </Badge>
              </motion.div>
              <CardTitle className="text-xl">{experience.company}</CardTitle>
              <p className="text-primary font-medium">{experience.role}</p>
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
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {experience.achievements.map((achievement, i) => (
                <motion.li 
                  key={achievement}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Badge variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
