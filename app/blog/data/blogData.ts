// Define the blog post data interfaces
export interface BlogPost {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  slug: string;
}

export interface BlogPostDetail extends BlogPost {
  author: string;
  content: {
    sections: {
      title: string;
      content: string;
      points?: string[];
    }[];
  };
  relatedPosts: {
    id: number;
    image: string;
    title: string;
    description: string;
    slug: string;
  }[];
}

// Sample blog posts data for the grid
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: "/images/novice_dull.png",
    title: "From Novice to Notable: Jane's Journey Through Sqwads",
    description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two...",
    date: "May 24, 2025",
    slug: "jane-journey-through-sqwads"
  },
  {
    id: 2,
    image: "/images/novice_dull.png",
    title: "5 Skills Tech Recruiters Actually Look For",
    description: "It's more than just your portfolio. Learn what soft and hard skills truly set tech candidates apart—and...",
    date: "May 23, 2025",
    slug: "skills-tech-recruiters-look-for"
  },
  {
    id: 3,
    image: "/images/novice_dull.png",
    title: "Building a Portfolio That Gets You Hired",
    description: "Struggling with how to present your projects? Here are tips to help you turn your Sqwads experience into...",
    date: "May 24, 2025",
    slug: "building-portfolio-gets-hired"
  },
  {
    id: 4,
    image: "/images/novice_dull.png",
    title: "You Didn't Just Join a Project, You Joined a Movement",
    description: "These stories how he transformed into tech by taking on projects online through the Sqwads platform.",
    date: "May 24, 2025",
    slug: "joined-movement-not-project"
  },
  {
    id: 5,
    image: "/images/novice_dull.png",
    title: "Ctrl + Z That Career Confusion",
    description: "Not sure where you fit in tech? Uncertain? Product design? UX/UI? Design? Undo the confusion by joining real projects, trying roles, and seeing what clicks—with Sqwads.",
    date: "May 24, 2025",
    slug: "ctrl-z-career-confusion"
  },
  {
    id: 6,
    image: "/images/novice_dull.png",
    title: "Meet Tunde: From Graphic Designer to No-Code Builder",
    description: "Tunde shares how he transformed into tech by taking on product roles through the Sqwads platform.",
    date: "May 24, 2025",
    slug: "tunde-graphic-designer-to-no-code"
  },
  {
    id: 7,
    image: "/images/novice_dull.png",
    title: "Team Feedback is Now Live: Here's Why It Matters",
    description: "Feedback can get real messy. Learn how the new feedback system helps you grow with every project.",
    date: "May 22, 2025",
    slug: "team-feedback-now-live"
  },
  {
    id: 8,
    image: "/images/novice_dull.png",
    title: "Tech Portfolios That Actually Get Noticed",
    description: "Beyond GitHub links. Here's how to make your Sqwads experience stand out to employers.",
    date: "May 24, 2025",
    slug: "tech-portfolios-get-noticed"
  }
];

// Detailed blog posts data
export const blogPostsDetail: { [key: string]: BlogPostDetail } = {
  "building-portfolio-gets-hired": {
    id: 3,
    image: "/images/novice_dull.png",
    title: "Building a Portfolio that gets you hired",
    description: "Your portfolio isn't just a digital resume, it's proof. Proof that you've learned, built, collaborated, and delivered. And in the tech world, it often speaks louder than your degree, your certifications—or even your job history. But here's the catch: not all portfolios are created equal. At Sqwads, we've seen first-hand how real-world experience can transform a portfolio from a list of personal side projects into a powerful, job-winning tool. Here's how to build one that gets noticed—and gets you hired.",
    date: "May 24, 2025",
    slug: "building-portfolio-gets-hired",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "1. Show, Don't Just Tell",
          content: "Anyone can say they 'built a website' or 'collaborated on a team.' But recruiters and hiring managers want receipts.",
          points: [
            "Add live project links",
            "Include screenshots or screen recordings",
            "Highlight your specific contributions (e.g. 'I handled mobile responsiveness and animation logic using TailwindCSS and Framer Motion')."
          ]
        },
        {
          title: "2. Context Is King",
          content: "Don't just show what you built—tell us why and how.\n\nWhat problem was the project solving? Who were the users? How did your team approach the solution? What tools or frameworks did you choose and why?\n\nThis turns a project into a case study, which is exactly what employers love to see."
        },
        {
          title: "3. Embrace the Power of Collaboration",
          content: "Solo projects are great. But in the real world, tech is a team sport.\n\nIf you've completed projects on Sqwads with others, highlight that! Talk about how you worked with product managers, UI designers, or backend engineers. It shows you understand collaboration—a skill that's often more valuable than technical chops alone.",
          points: [
            "Tip: Include a 'Team Roles' section in each project summary to explain the group dynamic."
          ]
        },
        {
          title: "4. Keep It Clean and Clickable",
          content: "Design matters—even if you're not a designer.\n\nUse simple, modern layouts (Notion, Framer, GitHub Pages, or your own website)\nMake navigation easy: Home → Projects → About\nAvoid long, unformatted paragraphs\nUse visuals to break up text\nThink of your portfolio as a product. If it's hard to use, no one will stay long enough to be impressed."
        },
        {
          title: "5. Include Feedback, Not Just Features",
          content: "One underrated gem? Add feedback you received from teammates or mentors.\n\nWas your communication praised?\nDid a project manager commend your delivery speed?\nWas your bug-fixing process appreciated?\n\nThis kind of insight makes your experience feel alive—and gives employers a peek into how you work with others."
        }
      ]
    },
    relatedPosts: [
      {
        id: 6,
        image: "/images/novice_dull.png",
        title: "Meet Tunde: From Graphic Designer to No-Code Builder",
        description: "Tunde shares how he transformed into tech by taking on product roles through the Sqwads platform.",
        slug: "tunde-graphic-designer-to-no-code"
      },
      {
        id: 7,
        image: "/images/novice_dull.png",
        title: "Team Feedback is Now Live: Here's Why It Matters",
        description: "Feedback can get real messy. Learn how the new feedback system helps you grow with every project.",
        slug: "team-feedback-now-live"
      },
      {
        id: 8,
        image: "/images/novice_dull.png",
        title: "Tech Portfolios That Actually Get Noticed",
        description: "Beyond GitHub links. Here's how to make your Sqwads experience stand out to employers.",
        slug: "tech-portfolios-get-noticed"
      }
    ]
  },
  "jane-journey-through-sqwads": {
    id: 1,
    image: "/images/novice_dull.png",
    title: "From Novice to Notable: Jane's Journey Through Sqwads",
    description: "Discover how Jane, a budding frontend developer, landed her first freelancing gig after completing two projects on Sqwads. Her story shows how real-world experience beats theoretical knowledge every time.",
    date: "May 24, 2025",
    slug: "jane-journey-through-sqwads",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "The Starting Point",
          content: "Jane had completed several online courses and built a few personal projects, but she felt stuck. Despite having technical skills, she lacked the confidence and real-world experience that employers were looking for."
        },
        {
          title: "The Sqwads Experience",
          content: "Through Sqwads, Jane joined two different projects:\n\n1. A fintech startup's mobile app redesign\n2. An e-commerce platform's checkout optimization\n\nWorking alongside experienced developers, designers, and product managers, Jane gained invaluable insights into professional workflows, code reviews, and collaborative problem-solving."
        },
        {
          title: "The Breakthrough",
          content: "After completing her second project, Jane's portfolio transformed from a collection of tutorials to a showcase of real business solutions. The feedback from her teammates became testimonials, and her project contributions became case studies."
        },
        {
          title: "The Result",
          content: "Within three weeks of updating her portfolio with her Sqwads experience, Jane landed her first freelancing contract. The client specifically mentioned being impressed by her collaborative experience and the quality of her project presentations."
        }
      ]
    },
    relatedPosts: [
      {
        id: 3,
        image: "/images/novice_dull.png",
        title: "Building a Portfolio That Gets You Hired",
        description: "Struggling with how to present your projects? Here are tips to help you turn your Sqwads experience into...",
        slug: "building-portfolio-gets-hired"
      },
      {
        id: 5,
        image: "/images/novice_dull.png",
        title: "Ctrl + Z That Career Confusion",
        description: "Not sure where you fit in tech? Uncertain? Product design? UX/UI? Design? Undo the confusion by joining real projects, trying roles, and seeing what clicks—with Sqwads.",
        slug: "ctrl-z-career-confusion"
      },
      {
        id: 6,
        image: "/images/novice_dull.png",
        title: "Meet Tunde: From Graphic Designer to No-Code Builder",
        description: "Tunde shares how he transformed into tech by taking on product roles through the Sqwads platform.",
        slug: "tunde-graphic-designer-to-no-code"
      }
    ]
  },
  // Placeholder entries for the remaining blog posts
  "skills-tech-recruiters-look-for": {
    id: 2,
    image: "/images/novice_dull.png",
    title: "5 Skills Tech Recruiters Actually Look For",
    description: "This is a placeholder description for '5 Skills Tech Recruiters Actually Look For'. You can fill in the full content later.",
    date: "May 23, 2025",
    slug: "skills-tech-recruiters-look-for",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "Placeholder Section 1",
          content: "This is a placeholder content for the first section of this blog post. You can add your actual content here."
        },
        {
          title: "Placeholder Section 2",
          content: "This is a placeholder content for the second section. Continue adding more sections as needed."
        }
      ]
    },
    relatedPosts: [] // Add relevant related posts here later
  },
  "joined-movement-not-project": {
    id: 4,
    image: "/images/novice_dull.png",
    title: "You Didn't Just Join a Project, You Joined a Movement",
    description: "This is a placeholder description for 'You Didn't Just Join a Project, You Joined a Movement'.",
    date: "May 24, 2025",
    slug: "joined-movement-not-project",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "Placeholder Section 1",
          content: "Content for 'You Didn't Just Join a Project, You Joined a Movement'."
        }
      ]
    },
    relatedPosts: []
  },
  "ctrl-z-career-confusion": {
    id: 5,
    image: "/images/novice_dull.png",
    title: "Ctrl + Z That Career Confusion",
    description: "This is a placeholder description for 'Ctrl + Z That Career Confusion'.",
    date: "May 24, 2025",
    slug: "ctrl-z-career-confusion",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "Placeholder Section 1",
          content: "Content for 'Ctrl + Z That Career Confusion'."
        }
      ]
    },
    relatedPosts: []
  },
  "tunde-graphic-designer-to-no-code": {
    id: 6,
    image: "/images/novice_dull.png",
    title: "Meet Tunde: From Graphic Designer to No-Code Builder",
    description: "This is a placeholder description for 'Meet Tunde: From Graphic Designer to No-Code Builder'.",
    date: "May 24, 2025",
    slug: "tunde-graphic-designer-to-no-code",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "Placeholder Section 1",
          content: "Content for 'Meet Tunde: From Graphic Designer to No-Code Builder'."
        }
      ]
    },
    relatedPosts: []
  },
  "team-feedback-now-live": {
    id: 7,
    image: "/images/novice_dull.png",
    title: "Team Feedback is Now Live: Here's Why It Matters",
    description: "This is a placeholder description for 'Team Feedback is Now Live: Here's Why It Matters'.",
    date: "May 22, 2025",
    slug: "team-feedback-now-live",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "Placeholder Section 1",
          content: "Content for 'Team Feedback is Now Live: Here's Why It Matters'."
        }
      ]
    },
    relatedPosts: []
  },
  "tech-portfolios-get-noticed": {
    id: 8,
    image: "/images/novice_dull.png",
    title: "Tech Portfolios That Actually Get Noticed",
    description: "This is a placeholder description for 'Tech Portfolios That Actually Get Noticed'.",
    date: "May 24, 2025",
    slug: "tech-portfolios-get-noticed",
    author: "Admin Sqwads",
    content: {
      sections: [
        {
          title: "Placeholder Section 1",
          content: "Content for 'Tech Portfolios That Actually Get Noticed'."
        }
      ]
    },
    relatedPosts: []
  }
};

// Helper function to get blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPostDetail | null => {
  return blogPostsDetail[slug] || null;
};

// Helper function to get all available slugs
export const getAllBlogSlugs = (): string[] => {
  return Object.keys(blogPostsDetail);
};
