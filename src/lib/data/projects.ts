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
  {
    id: "corra",
    title: "C.O.R.R.A - Opioid Overdose Detection",
    description:
      "Research project using Thermal Infrared and RGB cameras to track breathing patterns and identify potential opioid overdoses in public spaces.",
    longDescription:
      "Collaborated with Dr. Lana Yarosh and Minzhu Zhao on the C.O.R.R.A. project at GroupLens, which utilizes Thermal Infrared and RGB cameras to track breathing patterns in public spaces, identifying potential opioid overdoses and triggering alarms for intervention.",
    technologies: ["Python", "Computer Vision", "Thermal Imaging", "Research"],
    category: "research",
    githubUrl: "https://github.com/AhmadYasser1/C.O.R.R.A",
    featured: true,
    featuredOrder: 1,
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
    featured: true,
    featuredOrder: 2,
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
    featured: true,
    featuredOrder: 3,
  },
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
    featured: true,
    featuredOrder: 4,
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
    id: "klondike-solitaire",
    title: "Klondike Solitaire",
    description:
      "Data structures project implementing the classic Klondike Solitaire game with C++ and OOP principles.",
    technologies: ["C++", "OOP", "Data Structures", "FML Graphics"],
    category: "web-dev",
    githubUrl: "https://github.com/AhmadYasser1/Klondike-Solitaire",
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
    id: "partnerships-sales-agent",
    title: "Partnerships Sales Agent",
    description:
      "AI Agent for partnerships sales reps to create partnership stories between Brooklyn Sports & Entertainment properties and prospective brands using internal and public data.",
    longDescription:
      "Developed an AI agent that partnerships sales reps at Brooklyn Sports & Entertainment chat with to help create partnership stories between current properties and prospective brands. The agent researches brands and generates stories based on internal and public data.",
    technologies: ["LangGraph", "LangChain", "Slack", "AWS EC2", "Cursor", "Codex", "AWS Athena", "DynamoDB", "AWS Bedrock", "AWS S3"],
    category: "ai-ml",
    featured: false,
    isPrivate: true,
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
