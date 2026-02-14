"use client";

import { useState } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects, projectCategories, getCategoryLabel } from "@/lib/data/projects";

export function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <m.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
            Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of my work in AI, machine learning, data science, and
            software development
          </p>
        </m.div>

        {/* Filter Tabs */}
        <m.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {projectCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className="transition-all"
            >
              {category.label}
            </Button>
          ))}
        </m.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <m.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <m.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">
              No projects found in this category.
            </p>
          </m.div>
        )}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
}

function ProjectCard({ project }: ProjectCardProps) {
  const projectUrl = project.githubUrl || project.liveUrl;
  const isPrivate = project.isPrivate;

  const cardContent = (
    <Card className="h-full flex flex-col group border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            {project.featured && (
              <Badge className="text-xs">Featured</Badge>
            )}
            <Badge variant="outline" className="text-xs">
              {getCategoryLabel(project.category)}
            </Badge>
            {isPrivate && (
              <Badge variant="secondary" className="text-xs flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Private
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {project.githubUrl && !isPrivate && (
              <span
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View on GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
            )}
            {project.liveUrl && (
              <span
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="View live"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" x2="21" y1="14" y2="3" />
                </svg>
              </span>
            )}
          </div>
        </div>
        <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors mt-4">
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col grow">
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <m.div
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {projectUrl && !isPrivate ? (
        <Link href={projectUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </m.div>
  );
}



