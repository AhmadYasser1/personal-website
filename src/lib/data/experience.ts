export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "work" | "research" | "teaching";
}

export const experiences: Experience[] = [
  {
    id: "bse-global",
    company: "Brooklyn Sports & Entertainment Global",
    role: "Digital Fellow",
    location: "Brooklyn, NY",
    startDate: "June 2025",
    endDate: "Present",
    description:
      "Building AI agents and data pipelines for the Brooklyn Nets, Barclays Center, and New York Liberty.",
    achievements: [
      "Built internal AI agents connected to third-party tools to automate workflows across multiple departments",
      "Engineered data pipelines to streamline data optimally and sustainably",
      "Built Tableau dashboards for executive stakeholders to take more data-driven decisions",
    ],
    technologies: ["AI Agents", "Data Pipelines", "Tableau", "Python"],
    type: "work",
  },
  {
    id: "cascaid-health",
    company: "Cascaid Health",
    role: "AI Research & Development Intern",
    location: "Remote",
    startDate: "February 2025",
    endDate: "May 2025",
    description:
      "Developed AI prototypes for healthcare risk detection at an early-stage startup.",
    achievements: [
      "Automated technical workflows to help set up the startup's initial AI infrastructure",
      "Developed AI prototypes for risk detection by analyzing complex health datasets",
    ],
    technologies: ["Python", "Machine Learning", "Healthcare AI"],
    type: "work",
  },
  {
    id: "umn-cse-it",
    company: "University of Minnesota",
    role: "CSE-IT Service Desk Student Worker",
    location: "Minneapolis, MN",
    startDate: "August 2024",
    endDate: "May 2025",
    description:
      "Provided IT support and system administration for the College of Science and Engineering.",
    achievements: [
      "Utilized Linux commands, SSH, and TDX to optimize system operations",
      "Performed data backups, restorations, and network troubleshooting",
    ],
    technologies: ["Linux", "SSH", "TDX", "Networking"],
    type: "work",
  },
  {
    id: "ischool",
    company: "iSchool",
    role: "Coding Instructor",
    location: "Cairo, Egypt",
    startDate: "April 2024",
    endDate: "June 2024",
    description:
      "Conducted live coding classes teaching programming and AI concepts to students aged 6-18.",
    achievements: [
      "Delivered Mobile App Development training using Flutter in over 60 one-on-one sessions",
      "Designed engaging, student-centered learning experiences",
      "Earned high favor from students' parents for teaching quality",
    ],
    technologies: ["Flutter", "Python", "AI Fundamentals", "Mobile Development"],
    type: "teaching",
  },
  {
    id: "dajin-pm",
    company: "Dajin Platform",
    role: "Project Management Intern",
    location: "Cairo, Egypt",
    startDate: "July 2023",
    endDate: "February 2024",
    description:
      "Led project coordination and chatbot development at a Shark Tank Egypt featured startup.",
    achievements: [
      "Directed WhatsApp & Messenger Chatbot Project, enhancing customer support by 80%",
      "Coordinated between CTOs & engineers for platform development",
      "Led intern team effectively through SCRUM methodology",
      "Developed project schedules streamlining development follow-up by 15%",
    ],
    technologies: ["SCRUM", "Chatbots", "Project Management", "Jira"],
    type: "work",
  },
  {
    id: "defi-ml",
    company: "Digital Egypt for Investment Co.",
    role: "Machine Learning Intern",
    location: "Cairo, Egypt",
    startDate: "August 2023",
    endDate: "September 2023",
    description:
      "Developed machine learning models and led data analysis projects.",
    achievements: [
      "Developed ML models using Python, Pandas, PySpark, NumPy, Scikit Learn",
      "Led a data analysis project and presented insights to senior professionals",
      "Exceeded expectations through independent research",
    ],
    technologies: ["Python", "Pandas", "PySpark", "Scikit-Learn", "Matplotlib"],
    type: "work",
  },
  {
    id: "crossworkers",
    company: "CrossWorkers Egypt",
    role: "ASP.Net Backend Intern",
    location: "Cairo, Egypt",
    startDate: "August 2022",
    endDate: "October 2022",
    description:
      "Developed backend solutions enhancing platform functionality.",
    achievements: [
      "Enhanced platform functionality by 25% through backend development",
      "Updated 3 existing features and implemented 4 new ones",
      "Contributed to SCRUM meetings and feature development",
    ],
    technologies: ["C#", "ASP.NET", "MVC", "REST API"],
    type: "work",
  },
];

export const researchExperiences: Experience[] = [
  {
    id: "funk-lab",
    company: "Russell J. Funk Lab - Carlson School of Management",
    role: "Undergraduate Research Assistant",
    location: "Minneapolis, MN",
    startDate: "January 2025",
    endDate: "May 2025",
    description:
      "Conducted word embedding research with professors Russell J. Funk, Thomas Gebhardt, and Alex Reineck.",
    achievements: [
      "Analyzed parameter combinations for embedding models to optimize performance metrics",
      "Created visualization dashboards identifying effective approaches for word similarity",
    ],
    technologies: ["Python", "NLP", "Word2Vec", "Data Visualization"],
    type: "research",
  },
  {
    id: "grouplens",
    company: "GroupLens - Human-Centered Computing Research Center",
    role: "Student Researcher",
    location: "Minneapolis, MN",
    startDate: "September 2024",
    endDate: "May 2025",
    description:
      "Collaborated on the C.O.R.R.A project for opioid overdose detection using thermal cameras.",
    achievements: [
      "Worked with Dr. Lana Yarosh and Minzhu Zhao on thermal infrared breathing detection",
      "Conducted street surveys with 200+ participants on the Light Rail Transit",
    ],
    technologies: ["Python", "Computer Vision", "Thermal Imaging", "User Research"],
    type: "research",
  },
  {
    id: "chi-2025",
    company: "CHI Student Design Competition 2025",
    role: "Project Lead",
    location: "Minneapolis, MN",
    startDate: "September 2024",
    endDate: "May 2025",
    description:
      "Led authorship of the HAPPI interactive wellness device paper accepted at CHI 2025.",
    achievements: [
      "Led authorship of 'Fostering Positive Connections Through Interactive Messages: HAPPI'",
      "Paper accepted and presented at CHI 2025",
      "Conducted qualitative user research and thematic analysis",
    ],
    technologies: ["User Research", "Design", "Academic Writing"],
    type: "research",
  },
  {
    id: "premio-ai",
    company: "Premio.AI",
    role: "Research Assistant",
    location: "Remote",
    startDate: "January 2024",
    endDate: "June 2024",
    description:
      "Constructed The Arabic Pile, a 300GB+ Arabic language dataset for NLP research.",
    achievements: [
      "Partnered with Dr. Mohamed Alrefaie and Mahmoud Barbary",
      "Collected, cleaned, and deduplicated diverse Arabic data sources",
      "Dataset published on HuggingFace",
    ],
    technologies: ["Python", "NLP", "Data Engineering", "HuggingFace"],
    type: "research",
  },
];


