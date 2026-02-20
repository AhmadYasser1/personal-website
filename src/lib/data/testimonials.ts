export interface Testimonial {
  id: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  quote: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "darolyn-pierce",
    name: "Darolyn Pierce",
    title: "VP of Data Analytics & Insights",
    relationship: "Colleague",
    date: "February 2026",
    quote:
      "I've had the privilege of working alongside Ahmad and can confidently say he is one of the most driven and high-character professionals I know. Ahmad brings a true growth mindset to everything he does. He is constantly pushing boundaries — not for the sake of disruption, but in pursuit of better outcomes, smarter solutions, and meaningful impact. He isn't afraid to challenge assumptions, explore new ideas, or lean into complexity. Beyond his strong work ethic and high intellectual capacity, what truly sets Ahmad apart is his character. He cares deeply about people. He shows up with kindness, integrity, and a genuine desire to see others succeed. That combination of sharp thinking and authentic care makes him both an exceptional professional and an outstanding teammate. Any team would be fortunate to have Ahmad's energy, discipline, and leadership.",
    image: "/testimonials/darolyn-pierce.jpg",
  },
  {
    id: "jane-sitter",
    name: "Jane Sitter, MA",
    title: "Senior International Career Consultant & Training Facilitator",
    relationship: "Mentor",
    date: "September 2024",
    quote:
      "Ahmad is a committed team member who has demonstrated resilience in overcoming obstacles. He has strong leadership and communication skills, and possesses a positive demeanor when working with others. He is eager to learn and progress in his career. I strongly recommend him for any opportunities within your organization.",
    image: "/testimonials/jane-sitter.jpg",
  },
  {
    id: "mohammed-nasser",
    name: "Mohammed Nasser",
    title: "Senior AI & DS Engineer | Software Engineer",
    relationship: "Colleague",
    date: "February 2024",
    quote:
      "Ahmad consistently demonstrated exceptional intelligence and outstanding communication skills. His ability to solve problems efficiently was also remarkable. Ahmad's dedication to his work and his proficiency in conveying complex ideas make him a valuable asset to any team.",
    image: "/testimonials/mohammed-nasser.jpg",
  },
  {
    id: "mohamed-hisham",
    name: "Mohamed Hisham",
    title: "Corporate Innovation & Startup Growth | Banque Misr",
    relationship: "Mentor",
    date: "February 2024",
    quote:
      "I can't find suitable words to describe the talent of this guy. He is smart, committed, passionate, and has everything you need to formulate a great co-founder, employee, and even a partner.",
    image: "/testimonials/mohamed-hisham.jpg",
  },
  {
    id: "nadeen-galal",
    name: "Nadeen Galal",
    title: "Sports Management Operations | International Referee",
    relationship: "Mentor",
    date: "August 2023",
    quote:
      "He has an entrepreneurial and mature mindset that is rare to find nowadays among people his age. One of Ahmad's best traits is that he knows how to evolve and he always finds creative and innovative ways to solve a problem. Having Ahmad around is a great asset to any organization.",
    image: "/testimonials/nadeen-galal.jpg",
  },
];
