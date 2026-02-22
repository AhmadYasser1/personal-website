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
    id: "darolyn-pierce",
    name: "Darolyn Pierce",
    title: "VP of Data Analytics & Insights",
    relationship: "Manager",
    date: "February 2026",
    quote:
      "I've had the privilege of working alongside Ahmad and can confidently say he is one of the most driven and high-character professionals I know. Ahmad brings a true growth mindset to everything he does. He is constantly pushing boundaries — not for the sake of disruption, but in pursuit of better outcomes, smarter solutions, and meaningful impact. He isn't afraid to challenge assumptions, explore new ideas, or lean into complexity. Beyond his strong work ethic and high intellectual capacity, what truly sets Ahmad apart is his character. He cares deeply about people. He shows up with kindness, integrity, and a genuine desire to see others succeed. That combination of sharp thinking and authentic care makes him both an exceptional professional and an outstanding teammate. Any team would be fortunate to have Ahmad's energy, discipline, and leadership.",
    image: "/testimonials/darolyn-pierce.jpg",
  },
  {
    id: "sohaib-hegazy",
    name: "Sohaib Hegazy",
    title: "Corporate Governance & Business Consultant | PGESCO",
    relationship: "Mentor",
    date: "February 2026",
    quote:
      "I've had the privilege of mentoring Ahmad Yasser and observing his growth over time, and I can confidently say he is an exceptional individual with strong technical ability and an impressive professional mindset. Ahmad brings a rare combination of intellectual curiosity, discipline, and genuine care for building meaningful, human-centered technology. Throughout our interactions, Ahmad consistently demonstrated the ability to think critically, ask the right questions, and translate complex ideas into well-structured, practical solutions. His work in areas such as AI, data systems, and applied research reflects not only technical competence, but also a thoughtful and responsible approach to innovation. He is receptive to feedback, eager to learn, and quick to apply insights in a way that meaningfully improves his work. What stands out most is Ahmad's character. He is reliable, reflective, and driven by a strong growth mindset. As a mentor, it has been rewarding to see him take initiative, develop confidence in his decision-making, and steadily elevate the quality and impact of his contributions. He approaches challenges with maturity and professionalism well beyond his years. I highly recommend Ahmad to any team or organization seeking someone with strong technical foundations, leadership potential, and a principled approach to collaboration and problem-solving. He has a very promising path ahead of him.",
    image: "/testimonials/sohaib-hegazy.jpg",
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
