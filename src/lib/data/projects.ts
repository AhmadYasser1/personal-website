export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: "ai-ml" | "data-analysis" | "web-dev" | "research";
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  featuredOrder?: number;
  image?: string;
  isPrivate?: boolean;
}

export const projects: Project[] = [
  // --- BSE AI Agents (most market-relevant) ---
  {
    id: "partnerships-sales-agent",
    title: "Partnerships Sales Agent",
    description:
      "AI Agent for partnerships sales reps to create partnership stories between Brooklyn Sports & Entertainment properties and prospective brands using internal and public data.",
    longDescription:
      "Developed an AI agent that partnerships sales reps at Brooklyn Sports & Entertainment chat with to help create partnership stories between current properties and prospective brands. The agent researches brands and generates stories based on internal and public data.",
    technologies: ["LangGraph", "LangChain", "Slack", "AWS EC2", "Cursor", "Codex", "AWS Athena", "DynamoDB", "AWS Bedrock", "AWS S3"],
    category: "ai-ml",
    featured: true,
    featuredOrder: 1,
    isPrivate: true,
  },
  {
    id: "event-survey-agent",
    title: "Event Survey Intelligence Agent",
    description:
      "AI-powered agent that analyzes post-event survey data across Brooklyn Nets, NY Liberty, and Barclays Center events to surface actionable insights for operations and fan experience teams.",
    longDescription:
      "Built an AI agent that ingests and analyzes post-event survey responses across all Brooklyn Sports & Entertainment properties. The agent surfaces trends, sentiment shifts, and actionable recommendations for operations, marketing, and fan experience teams.",
    technologies: ["LangGraph", "Python", "AWS Bedrock", "AWS Glue", "Snowflake", "React", "TypeScript", "DynamoDB"],
    category: "ai-ml",
    featured: true,
    featuredOrder: 2,
    isPrivate: true,
  },
  {
    id: "crm-enrichment-pipeline",
    title: "CRM Enrichment Pipeline",
    description:
      "Automated MCP integration connecting ZoomInfo and Salesforce to enrich CRM records, deduplicate contacts, and sync account intelligence for Brooklyn Sports & Entertainment partnerships team.",
    longDescription:
      "Built an automated pipeline that connects ZoomInfo's enrichment data with Salesforce CRM via MCP servers. The system enriches prospect records, deduplicates contacts, and syncs account intelligence to help the partnerships team at Brooklyn Sports & Entertainment maintain accurate and up-to-date CRM data.",
    technologies: ["TypeScript", "MCP", "Salesforce", "ZoomInfo", "Claude Code", "REST API"],
    category: "web-dev",
    featured: true,
    featuredOrder: 3,
    isPrivate: true,
  },
  // --- BSE Dashboards ---
  {
    id: "customer-feedback-dashboard",
    title: "Customer Feedback Executive Dashboard",
    description:
      "Tableau dashboard for executives to make data-driven decisions based on customer feedback for Brooklyn Nets games, NY Liberty games, and Barclays Center events.",
    longDescription:
      "Built a comprehensive Tableau dashboard for executive stakeholders at Brooklyn Sports & Entertainment to analyze customer feedback across Brooklyn Nets games, New York Liberty games, and Barclays Center events & concerts, enabling data-driven decision making.",
    technologies: ["Snowflake", "Tableau", "Python", "Monday.com", "Claude Code", "PostgreSQL"],
    category: "data-analysis",
    featured: false,
    isPrivate: true,
  },
  {
    id: "chatgpt-usage-dashboard",
    title: "ChatGPT Usage Analytics Dashboard",
    description:
      "Internal analytics dashboard tracking ChatGPT Enterprise usage patterns across Brooklyn Sports & Entertainment departments to measure AI adoption and optimize licensing.",
    longDescription:
      "Built an internal dashboard for Brooklyn Sports & Entertainment leadership to track ChatGPT Enterprise usage across departments. Provides adoption metrics, usage trends, and cost analysis to optimize AI tool licensing and identify training opportunities.",
    technologies: ["Next.js", "TypeScript", "AWS DynamoDB", "AWS Amplify", "Tailwind CSS"],
    category: "data-analysis",
    featured: false,
    isPrivate: true,
  },
  // --- Modern full-stack projects ---
  {
    id: "mudaris-os",
    title: "Mudaris OS - Educational Operations Platform",
    description:
      "WhatsApp-centric operations platform for Egyptian tutors with student management, QR attendance tracking, InstaPay OCR payment verification, and automated WhatsApp notifications.",
    longDescription:
      "Building a full-stack educational operations platform that helps Egyptian tutors manage their students through WhatsApp. Features include QR-based attendance, OCR-powered InstaPay payment verification, automated WhatsApp notifications, and a comprehensive student management dashboard.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "WhatsApp API"],
    category: "web-dev",
    featured: false,
    isPrivate: true,
  },
  {
    id: "personal-website",
    title: "Personal Portfolio Website",
    description:
      "This website — a modern, animated portfolio built with Next.js 16, Tailwind CSS v4, and Motion. Features auto-scrolling testimonials, animated statistics, and dark mode.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
    category: "web-dev",
    githubUrl: "https://github.com/AhmadYasser1/personal-website",
    liveUrl: "https://ayasser.com",
    featured: false,
  },
  // --- Recent research (CHI 2025, computer vision) ---
  {
    id: "corra",
    title: "C.O.R.R.A - Opioid Overdose Detection",
    description:
      "Research project using Thermal Infrared and RGB cameras to track breathing patterns and identify potential opioid overdoses in public spaces.",
    longDescription:
      "Collaborated with Dr. Lana Yarosh and Minzhu Zhao on the C.O.R.R.A. project at GroupLens, which utilizes Thermal Infrared and RGB cameras to track breathing patterns in public spaces, identifying potential opioid overdoses and triggering alarms for intervention.",
    technologies: ["Python", "Computer Vision", "Thermal Imaging", "Research"],
    category: "research",
    liveUrl: "https://zenodo.org/records/15203352",
    featured: true,
    featuredOrder: 4,
  },
  {
    id: "happi",
    title: "HAPPI - Interactive Wellness Device",
    description:
      "Interactive wellness device designed to enhance emotional wellness and community engagement through interactive messages. Paper accepted at CHI 2025 Student Design Competition.",
    longDescription:
      "Led authorship of 'Fostering Positive Connections Through Interactive Messages: HAPPI', a paper accepted at the CHI 2025 Student Design Competition. Designed and prototyped an interactive device that promotes emotional wellness through community-driven messaging.",
    technologies: ["User Research", "Prototyping", "Academic Writing", "Thematic Analysis"],
    category: "research",
    githubUrl: "https://doi.org/10.1145/3706599.3720296",
    featured: false,
  },
  {
    id: "word2vec-measurements",
    title: "Meaningful Word2Vec Measurements",
    description:
      "NLP research on word embeddings with UMN Carlson School of Management professors, testing new measurements including mahalanobis cosine similarity for semantic relationships.",
    longDescription:
      "Collaborated with professors Russell J. Funk, Thomas Gebhardt, and Alex Reineck at UMN Carlson School of Management on word embedding research to better understand how natural language processing algorithms capture semantic relationships. Analyzed parameter combinations for embedding models to optimize performance metrics.",
    technologies: ["Python", "NLP", "Word2Vec", "Machine Learning"],
    category: "research",
    githubUrl: "https://github.com/rfunklab/Meaningful-Word2Vec-Measurements",
    featured: false,
  },
  // --- ML competitions & data analysis ---
  {
    id: "shrine-bowl",
    title: "Pro Transition Potential Score - Shrine Bowl",
    description:
      "Machine learning model predicting college football players' NFL transition potential for the 2026 Shrine Bowl x SumerSports analytics competition.",
    longDescription:
      "Developed a predictive model for the Shrine Bowl x SumerSports 2026 Analytics Competition. The model analyzes college football player stats, combine metrics, and game film data to generate a Pro Transition Potential (PTP) score predicting NFL success probability.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Data Visualization", "Machine Learning"],
    category: "data-analysis",
    githubUrl: "https://github.com/AhmadYasser1/shrine-bowl-competition",
    featured: false,
  },
  {
    id: "arabic-pile",
    title: "The Arabic Pile Dataset",
    description:
      "Large Arabic language dataset exceeding 300GB for NLP research, collected and cleaned from diverse sources.",
    longDescription:
      "Partnered with Dr. Mohamed Alrefaie and Mahmoud Barbary at Premio.AI to construct The Arabic Pile, a large Arabic language dataset exceeding 300GB. Collected, cleaned, deduplicated, and merged diverse data sources.",
    technologies: ["Python", "NLP", "Data Engineering", "HuggingFace"],
    category: "research",
    liveUrl: "https://huggingface.co/premio-ai",
    featured: false,
  },
  // --- Earlier projects ---
  {
    id: "cinemate",
    title: "Cinemate - Movie Identification System",
    description:
      "Movie identification system using TF-IDF and cosine similarity to search 45,000+ movies based on fragmented memories.",
    longDescription:
      "Developed Cinemate, a movie identification system using Python and Flask, helping users recall titles based on fragmented memories. Utilized TF-IDF and cosine similarity to search a 45,000+ movie dataset with millisecond search speed.",
    technologies: ["Python", "Flask", "SQL", "TF-IDF", "HTML/CSS", "JavaScript"],
    category: "ai-ml",
    githubUrl: "https://github.com/Weiwen58/Cinemate-A_Movie_Identification_System",
    featured: false,
  },
  {
    id: "food-chatbot",
    title: "Mr. Hungry - Food Recommending Chatbot",
    description:
      "Task-oriented food recommendation chatbot helping users find meals based on preferences and dietary restrictions.",
    longDescription:
      "Developed a food recommendation chatbot using OCaml, helping users find meals based on preferences and dietary restrictions. Applied natural language processing for fast and accurate responses to user queries.",
    technologies: ["OCaml", "NLP", "Functional Programming"],
    category: "ai-ml",
    githubUrl: "https://github.com/AhmadYasser1/Food-Recommending-Chatbot",
    featured: false,
  },
  {
    id: "covid-no2",
    title: "COVID-19 NO2 Analysis",
    description:
      "Research analyzing the impact of COVID-19 lockdowns on air quality by studying NO2 levels in Cairo and Lisbon.",
    longDescription:
      "Researched the impact of COVID-19 lockdowns on air quality by analyzing NO2 levels in Cairo and Lisbon. Employed public datasets from Our World in Data and ESA/JRC for COVID-19 cases and NO2 levels.",
    technologies: ["Python", "Data Visualization", "Hypothesis Testing"],
    category: "data-analysis",
    githubUrl: "https://github.com/AhmadYasser1/COVID-NO2-Analysis",
    featured: false,
  },
  {
    id: "mental-health-analysis",
    title: "Mental Health & Physical Appearance Analysis",
    description:
      "Statistical analysis investigating correlations between mental health conditions and physical appearance changes using survey data and hypothesis testing.",
    technologies: ["Python", "Pandas", "Data Visualization", "Hypothesis Testing"],
    category: "data-analysis",
    githubUrl: "https://github.com/AhmadYasser1/Mental-Health-Physical-Appearance-Relation",
    featured: false,
  },
  {
    id: "advanced-tictactoe",
    title: "Advanced Tic-Tac-Toe AI",
    description:
      "Implementation of Tic-Tac-Toe with various AI algorithms including Minimax for strategic decision-making.",
    technologies: ["Python", "AI Algorithms", "Game Theory"],
    category: "ai-ml",
    githubUrl: "https://github.com/AhmadYasser1/Advanced-Tic-Tac-Toe-AI",
    featured: false,
  },
  {
    id: "klondike-solitaire",
    title: "Klondike Solitaire",
    description:
      "Data structures project implementing the classic Klondike Solitaire game with C++ and OOP principles.",
    technologies: ["C++", "OOP", "Data Structures", "FML Graphics"],
    category: "web-dev",
    githubUrl: "https://github.com/AhmadYasser1/Klondike-Solitaire",
    featured: false,
  },
];

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "data-analysis", label: "Data Analysis" },
  { id: "research", label: "Research" },
  { id: "web-dev", label: "Development" },
] as const;

export const getCategoryLabel = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "ai-ml": "AI & ML",
    "data-analysis": "Data Analysis",
    "research": "Research",
    "web-dev": "Development",
  };
  return categoryMap[category] || category;
};
