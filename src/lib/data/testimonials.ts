export interface Testimonial {
  id: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "jane-sitter",
    name: "Jane Sitter, MA",
    title: "Senior International Career Consultant & Training Facilitator",
    relationship: "Mentor",
    date: "September 2024",
    quote:
      "Ahmed is a committed team member who has demonstrated resilience in overcoming obstacles. He has strong leadership and communication skills, and possesses a positive demeanor when working with others. He is eager to learn and progress in his career. I strongly recommend him for any opportunities within your organization.",
  },
  {
    id: "mohammed-nasser",
    name: "Mohammed Nasser Abdou",
    title: "Senior AI & DS Engineer | Software Engineer",
    relationship: "Colleague",
    date: "February 2024",
    quote:
      "Ahmed consistently demonstrated exceptional intelligence and outstanding communication skills. His ability to solve problems efficiently was also remarkable. Ahmed's dedication to his work and his proficiency in conveying complex ideas make him a valuable asset to any team.",
  },
  {
    id: "mohamed-hisham",
    name: "Mohamed Hisham",
    title: "Orchestrating Corporate Innovation & Startup Growth at Banque Misr",
    relationship: "Mentor",
    date: "February 2024",
    quote:
      "I can't find suitable words to describe the talent of this guy. He is smart, committed, passionate, and has everything you need to formulate a great co-founder, employee, and even a partner.",
  },
  {
    id: "nadeen-galal",
    name: "Nadeen Galal",
    title: "Sports Management Operations | International Referee",
    relationship: "Mentor",
    date: "August 2023",
    quote:
      "He has an entrepreneurial and mature mindset that is rare to find nowadays among people his age. One of Ahmed's best traits is that he knows how to evolve and he always finds creative and innovative ways to solve a problem. Having Ahmed around is a great asset to any organization.",
  },
];
