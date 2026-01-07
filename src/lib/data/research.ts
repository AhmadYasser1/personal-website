export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  abstract?: string;
  type: "conference" | "journal" | "dataset";
}

export const publications: Publication[] = [
  {
    id: "happi-chi-2025",
    title: "Fostering Positive Connections Through Interactive Messages: HAPPI",
    authors: ["Ahmed Yasser Hassanein", "et al."],
    venue: "CHI 2025 Student Design Competition",
    year: 2025,
    doi: "https://doi.org/10.1145/3706599.3720296",
    abstract:
      "An interactive wellness device designed to enhance emotional wellness and community engagement through interactive messages.",
    type: "conference",
  },
  {
    id: "arabic-pile",
    title: "The Arabic Pile",
    authors: ["Premio.AI Team", "Ahmed Yasser Hassanein"],
    venue: "HuggingFace Datasets",
    year: 2024,
    doi: "https://huggingface.co/premio-ai",
    abstract:
      "A large Arabic language dataset exceeding 300GB, encompassing dialects, song lyrics, books, articles, translations, social media, and more.",
    type: "dataset",
  },
];

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  gpa: string;
  location: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

export const education: Education[] = [
  {
    id: "umn",
    institution: "University of Minnesota Twin-Cities",
    degree: "Bachelor of Science",
    field: "Computer Science",
    gpa: "4.0",
    location: "Minneapolis, MN",
    startDate: "August 2023",
    endDate: "May 2025",
    achievements: [
      "Full-Ride Scholarship Recipient",
      "Maximillian Lando Scholarship ($1,900)",
    ],
  },
  {
    id: "eui",
    institution: "Egypt University of Informatics",
    degree: "Bachelor of Science",
    field: "Computer Science",
    gpa: "3.8",
    location: "Cairo, Egypt",
    startDate: "September 2021",
    endDate: "May 2025",
    achievements: [
      "Ranked 6th in Faculty of Computing & Information Sciences",
      "Certificate of Appreciation for extracurricular activities",
    ],
  },
];

export interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description?: string;
}

export const awards: Award[] = [
  {
    id: "lando-scholarship",
    title: "Maximillian Lando Scholarship",
    organization: "University of Minnesota Twin-Cities",
    date: "June 2024",
    description: "Awarded $1,900 scholarship for academic excellence in Computer Science",
  },
  {
    id: "full-ride",
    title: "Full-Ride Scholarship",
    organization: "University of Minnesota Twin-Cities",
    date: "July 2023",
    description: "Awarded full financial support to complete senior year abroad with dual degrees",
  },
  {
    id: "top-achiever",
    title: "Top Achiever at Egypt University of Informatics",
    organization: "Egypt University of Informatics",
    date: "October 2023",
    description: "Ranked 6th in the Faculty of Computing & Information Sciences' Class of 2025",
  },
  {
    id: "salutatorian",
    title: "Salutatorian",
    organization: "Dr. Nermien Ismail Schools",
    date: "June 2021",
    description: "Ranked 2nd graduate and graduation speaker",
  },
];

export const skills = {
  programming: ["Python", "C/C++", "OCaml", "TypeScript", "SQL"],
  frameworks: ["React", "Next.js", "Flask", "ASP.NET"],
  dataScience: ["Pandas", "NumPy", "Scikit-Learn", "PySpark", "Matplotlib"],
  tools: ["Git", "GitHub", "Jira", "Power BI", "Tableau"],
  concepts: ["Machine Learning", "NLP", "Data Analytics", "Agile/SCRUM", "OOP"],
};

export const socialLinks = {
  github: "https://github.com/AhmadYasser1",
  linkedin: "https://linkedin.com/in/ahmedyhassanein",
  email: "ahmadyasser03@outlook.com",
  orcid: "https://orcid.org/0009-0000-8643-4747",
  medium: "https://medium.com/@ahmadyasser03",
  portfolio: "https://www.datascienceportfol.io/ahmedyhassanein",
};


