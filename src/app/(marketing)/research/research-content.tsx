"use client";

import Link from "next/link";
import * as m from "motion/react-m";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { publications, type Publication } from "@/lib/data/research";
import { researchExperiences } from "@/lib/data/experience";

function getPublicationBadge(type: Publication["type"]) {
  switch (type) {
    case "conference":
      return { label: "Conference", variant: "default" as const };
    case "workshop":
      return { label: "Workshop", variant: "default" as const };
    case "dataset":
      return { label: "Dataset", variant: "default" as const };
    default:
      return { label: type, variant: "secondary" as const };
  }
}

function PublicationCard({ pub }: { pub: Publication }) {
  const badge = getPublicationBadge(pub.type);
  
  return (
    <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={badge.variant}>
                {badge.label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {pub.year}
              </span>
            </div>
            <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
              {pub.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mb-2">
              {pub.authors.join(", ")}
            </p>
            <p className="text-sm font-medium text-primary">
              {pub.venue}
            </p>
          </div>
          {pub.doi && (
            <div className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
            </div>
          )}
        </div>
      </CardHeader>
      {pub.abstract && (
        <CardContent>
          <p className="text-muted-foreground text-sm">
            {pub.abstract}
          </p>
        </CardContent>
      )}
    </Card>
  );
}

export function ResearchContent() {
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
            Research
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Publications, datasets, and academic contributions in AI, NLP, and
            human-computer interaction
          </p>
        </m.div>

        {/* Publications Section */}
        <m.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-6">Publications</h2>
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <m.div
                key={pub.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                {pub.doi ? (
                  <Link href={pub.doi} target="_blank" rel="noopener noreferrer" className="block">
                    <PublicationCard pub={pub} />
                  </Link>
                ) : (
                  <PublicationCard pub={pub} />
                )}
              </m.div>
            ))}
          </div>
        </m.section>

        {/* Research Experience Section */}
        <m.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-heading text-2xl font-bold mb-6">
            Research Experience
          </h2>
          <div className="space-y-4">
            {researchExperiences.map((exp, index) => (
              <m.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl">{exp.company}</CardTitle>
                        <p className="text-primary font-medium">{exp.role}</p>
                        <p className="text-sm text-muted-foreground">
                          {exp.location}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 w-fit">
                        {exp.startDate} - {exp.endDate}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {exp.description}
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </m.div>
            ))}
          </div>
        </m.section>
      </div>
    </div>
  );
}



