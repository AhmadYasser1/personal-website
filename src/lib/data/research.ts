export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  abstract?: string;
  type: "conference" | "journal" | "dataset" | "workshop";
}

export const publications: Publication[] = [
  {
    id: "happi-chi-2025",
    title: "Fostering Positive Connections Through Interactive Messages: HAPPI",
    authors: [
      "Ahmad Yasser Hassanein",
      "Christopher A.M. Johnson",
      "Justin V. Mehes",
      "SrinivasPreetham Addepalli",
      "Aarussh Vaid",
    ],
    venue: "CHI 2025 Student Design Competition",
    year: 2025,
    doi: "https://doi.org/10.1145/3706599.3720296",
    abstract:
      "An interactive wellness device designed to enhance emotional wellness and community engagement through interactive messages.",
    type: "conference",
  },
  {
    id: "corra-workshop",
    title:
      "C.O.R.R.A.: Feasibility of Community Overdose Response Respiratory Alert",
    authors: ["Minzhu Zhao", "Ahmad Yasser Hassanein", "Svetlana Yarosh"],
    venue:
      "CHI '25 Workshop on Envisioning the Future of Interactive Health, Yokohama, Japan",
    year: 2025,
    doi: "https://zenodo.org/records/15203352/preview/Zhao%20et%20al%20-%20C.O.R.R.A.-%20Feasibility%20of%20Community%20Overdose%20Response%20Respiratory%20Alert.pdf?include_deleted=0",
    abstract:
      "A workshop paper exploring the feasibility of using thermal infrared and RGB cameras to detect opioid overdoses through respiratory pattern monitoring.",
    type: "workshop",
  },
  {
    id: "arabic-pile",
    title: "The Arabic Pile",
    authors: [
      "Mohamed Taher Alrefaie",
      "Ahmad Yasser Hassanein",
      "Mahmoud Ibrahim Barbary",
    ],
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
    institution: "University of Minnesota - Twin Cities",
    degree: "Bachelor of Science",
    field: "Computer Science",
    gpa: "4.0",
    location: "Minneapolis, MN",
    startDate: "September 2023",
    endDate: "May 2025",
    achievements: [
      "Dean's List - Fall 2024",
      "Full-Ride Scholarship Recipient",
      "Maximillian Lando Scholarship ($1,900)",
      "Co-founded UMN IT Student Group",
    ],
  },
  {
    id: "eui",
    institution: "Egypt University of Informatics",
    degree: "Bachelor of Science",
    field: "Computer Science",
    gpa: "3.8",
    location: "Cairo, Egypt",
    startDate: "October 2021",
    endDate: "May 2025",
    achievements: [
      "Ranked 6th in Faculty of Computing & Information Sciences",
      "Founder & President of EUI Competitive Programming Community",
      "Co-lead at Google Developer Student Club EUI",
      "Head of Project Management for Enactus EUI",
      "Certificate of Appreciation for Outstanding Performance in Extracurricular Activities",
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
    id: "deans-list",
    title: "Dean's List",
    organization: "University of Minnesota - Twin Cities",
    date: "Fall 2024",
    description:
      "Recognized for academic excellence in the College of Science and Engineering",
  },
  {
    id: "lando-scholarship",
    title: "Maximillian Lando Scholarship",
    organization: "University of Minnesota - Twin Cities",
    date: "June 2024",
    description:
      "Awarded $1,900 scholarship for academic excellence in Computer Science",
  },
  {
    id: "full-ride",
    title: "Full-Ride Scholarship",
    organization: "University of Minnesota - Twin Cities",
    date: "July 2023",
    description:
      "Awarded full financial support to complete senior year abroad with dual degrees",
  },
  {
    id: "top-achiever",
    title: "Top Achiever at Egypt University of Informatics",
    organization: "Egypt University of Informatics",
    date: "October 2023",
    description:
      "Ranked 6th in the Faculty of Computing & Information Sciences' Class of 2025",
  },
  {
    id: "salutatorian",
    title: "Salutatorian & Graduation Speaker",
    organization: "Dr. Nermien Ismail Schools",
    date: "June 2021",
    description: "Ranked 2nd graduate and delivered the graduation speech",
  },
];

export const skills = {
  programming: [
    "Python",
    "TypeScript",
    "JavaScript",
    "C/C++",
    "C#",
    "OCaml",
    "SQL",
    "HTML/CSS",
  ],
  frameworks: [
    "React",
    "Next.js",
    "Flask",
    "LangChain",
    "LangGraph",
    "ASP.NET",
    "Flutter",
    "Tailwind CSS",
    "shadcn/ui",
    "Framer Motion",
  ],
  dataScience: [
    "Pandas",
    "NumPy",
    "Scikit-Learn",
    "PySpark",
    "Matplotlib",
    "Word2Vec",
    "TF-IDF",
    "Data Visualization",
  ],
  cloud: ["Amazon S3", "EC2", "ECS", "Lambda", "Snowflake", "Vercel"],
  databases: ["PostgreSQL", "DynamoDB", "AWS Athena", "AWS Glue"],
  devTools: [
    "Git",
    "GitHub",
    "Jira",
    "Monday.com",
    "Cursor",
    "Claude Code",
    "Codex",
    "Linux",
    "ESLint",
  ],
  analytics: ["Power BI", "Tableau", "AppFlow"],
  aiServices: [
    "AWS Bedrock",
    "Bedrock AgentCore",
    "API Gateway",
    "HuggingFace",
  ],
  concepts: [
    "Machine Learning",
    "NLP",
    "Computer Vision",
    "Data Engineering",
    "Data Analytics",
    "REST API",
    "Agile/SCRUM",
    "OOP",
  ],
};

export const socialLinks = {
  twitter: "https://x.com/ahmaadyaasser1",
  github: "https://github.com/AhmadYasser1",
  linkedin: "https://www.linkedin.com/in/ahmadyasserhassanein/",
  email: "hey@ayasser.com",
  orcid: "https://orcid.org/0009-0000-8643-4747",
  medium: "https://medium.com/@ahmadyasser03",
  portfolio: "https://www.datascienceportfol.io/ahmedyhassanein",
  googleScholar:
    "https://scholar.google.com/citations?view_op=list_works&hl=en&hl=en&user=4U1cgDEAAAAJ",
};
