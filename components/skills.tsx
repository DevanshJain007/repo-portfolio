"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Code2,
  Database,
  Globe,
  Layout,
  Server,
  Smartphone,
  Terminal,
  Workflow,
  Figma,
  GitBranch,
  Cpu,
  Cloud,
  Layers,
  Palette,
  Zap,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Skills() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState("all")

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    })

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        ".category-button",
        {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".skill-card",
        {
          y: 50,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )

    // Add hover animations for skill cards
    const skillCards = document.querySelectorAll(".skill-card")

    skillCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          borderColor: "rgba(59, 130, 246, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      skillCards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  // Animation for filtering
  useEffect(() => {
    const cards = document.querySelectorAll(".skill-card")

    cards.forEach((card) => {
      const category = card.getAttribute("data-category")

      if (activeCategory === "all" || category === activeCategory) {
        gsap.to(card, {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          display: "block",
        })
      } else {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            card.style.display = "none"
          },
        })
      }
    })
  }, [activeCategory])

  const skills = [
    {
      category: "frontend",
      title: "Frontend Development",
      icon: <Layout className="h-6 w-6" />,
      technologies: [
        { name: "React", level: 95 },
        { name: "JavaScript", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "GSAP", level: 85 },
        { name: "HTML5", level: 98 },
        { name: "CSS3", level: 92 },
        { name: "Material UI", level: 85 },
        { name: "Redux", level: 88 },
        { name: "Framer Motion", level: 80 },
        { name: "TypeScript", level: 85 },
        { name: "Three.js", level: 75 },
        { name: "Next.js", level: 90 },
        { name: "WebGL", level: 70 },
        { name: "Responsive Design", level: 95 },
        { name: "PWA", level: 80 },
      ],
      description:
        "Building immersive, responsive, and performant user interfaces with modern frameworks and libraries.",
    },
    {
      category: "backend",
      title: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      technologies: [
        { name: "Node.js", level: 92 },
        { name: "Express.js", level: 90 },
        { name: "RESTful APIs", level: 95 },
        { name: "Java", level: 85 },
        { name: "Spring Boot", level: 80 },
        { name: "GraphQL", level: 85 },
        { name: "Microservices", level: 80 },
        { name: "Authentication", level: 90 },
        { name: "WebSockets", level: 85 },
        { name: "Serverless", level: 80 },
        { name: "API Gateway", level: 75 },
        { name: "Message Queues", level: 70 },
        { name: "Socket.io", level: 85 },
      ],
      description: "Developing robust server-side applications with focus on scalability, security, and performance.",
    },
    {
      category: "database",
      title: "Database",
      icon: <Database className="h-6 w-6" />,
      technologies: [
        { name: "MongoDB", level: 95 },
        { name: "MySQL", level: 90 },
        { name: "Mongoose", level: 95 },
        { name: "Firebase", level: 90 },
        { name: "Redis", level: 80 },
        { name: "SQL", level: 90 },
        { name: "NoSQL", level: 95 },
        { name: "Database Design", level: 90 },
        { name: "PostgreSQL", level: 85 },
        { name: "Data Modeling", level: 85 },
        { name: "Indexing", level: 80 },
        { name: "Caching", level: 85 },
        { name: "Sharding", level: 75 },
      ],
      description:
        "Designing and implementing efficient database schemas, queries, and data models for various applications.",
    },
    // {
    //   category: "devops",
    //   title: "DevOps & Tools",
    //   icon: <Terminal className="h-6 w-6" />,
    //   technologies: [
    //     { name: "Git", level: 95 },
    //     { name: "GitHub Actions", level: 80 },
    //     { name: "AWS", level: 80 },
    //     { name: "Docker", level: 85 },
    //     { name: "CI/CD", level: 85 },
    //     { name: "Jest", level: 90 },
    //     { name: "Webpack", level: 85 },
    //     { name: "Linux", level: 90 },
    //     { name: "Nginx", level: 80 },
    //     { name: "Kubernetes", level: 75 },
    //     { name: "Terraform", level: 70 },
    //     { name: "Monitoring", level: 80 },
    //     { name: "Logging", level: 85 },
    //   ],
    //   description:
    //     "Implementing continuous integration and deployment pipelines, containerization, and cloud infrastructure.",
    // },
    // {
    //   category: "mobile",
    //   title: "Mobile Development",
    //   icon: <Smartphone className="h-6 w-6" />,
    //   technologies: [
    //     { name: "React Native", level: 90 },
    //     { name: "Flutter", level: 75 },
    //     { name: "Android (Java)", level: 80 },
    //     { name: "Expo", level: 85 },
    //     { name: "Mobile UI/UX", level: 90 },
    //     { name: "App Store Deployment", level: 85 },
    //     { name: "Push Notifications", level: 80 },
    //     { name: "Offline Storage", level: 85 },
    //     { name: "Mobile Authentication", level: 90 },
    //     { name: "Responsive Design", level: 95 },
    //   ],
    //   description:
    //     "Not an expert yet, but soon I'll be crafting cross-platform apps—because why stop at one platform when I can debug them all?",
    // },
    {
      category: "webservices",
      title: "Web Services",
      icon: <Globe className="h-6 w-6" />,
      technologies: [
        { name: "JWT", level: 95 },
        { name: "RESTful APIs", level: 95 },
        { name: "CORS", level: 95 },
        { name: "OAuth", level: 90 },
        { name: "API Documentation", level: 90 },
        { name: "WebSockets", level: 85 },
        { name: "GraphQL", level: 90 },
        { name: "Swagger", level: 85 },
        { name: "API Testing", level: 90 },
        { name: "API Security", level: 85 },
        { name: "Rate Limiting", level: 80 },
      ],
      description:
        "Building and integrating web services and APIs with focus on security, documentation, and usability.",
    },
    {
      category: "languages",
      title: "Programming Languages",
      icon: <Code2 className="h-6 w-6" />,
      technologies: [
        { name: "JavaScript", level: 98 },
        { name: "Java", level: 85 },
        { name: "Python", level: 80 },
        { name: "C", level: 75 },
        { name: "HTML/CSS", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "SQL", level: 90 },
        { name: "Bash", level: 80 },
        { name: "PHP", level: 70 },
        { name: "Rust", level: 60 },
        { name: "Go", level: 65 },
      ],
      description:
        "Proficient in multiple programming languages with strong understanding of programming concepts and paradigms.",
    },
    {
      category: "design",
      title: "UI/UX Design",
      icon: <Figma className="h-6 w-6" />,
      technologies: [
        { name: "Responsive Design", level: 95 },
        { name: "Typography", level: 85 },
        { name: "Figma", level: 90 },
        { name: "Adobe XD", level: 85 },
        { name: "Wireframing", level: 95 },
        { name: "Prototyping", level: 90 },
        { name: "User Research", level: 80 },
        { name: "Design Systems", level: 85 },
        { name: "Color Theory", level: 90 },
        { name: "Accessibility", level: 90 },
        { name: "User Testing", level: 80 },
      ],
      description:
        "Creating intuitive user interfaces and experiences with focus on accessibility, usability, and aesthetics.",
    },
    {
      category: "other",
      title: "Version Control",
      icon: <GitBranch className="h-6 w-6" />,
      technologies: [
        { name: "Git", level: 98 },
        { name: "GitHub", level: 95 },
        { name: "GitLab", level: 90 },
        { name: "Bitbucket", level: 85 },
        { name: "Branching Strategies", level: 95 },
        { name: "Code Reviews", level: 90 },
        { name: "Pull Requests", level: 95 },
        { name: "Merge Conflict Resolution", level: 90 },
        { name: "Git Hooks", level: 85 },
        { name: "Git Flow", level: 90 },
      ],
      description: "Managing code versions, collaborating with teams, and implementing effective branching strategies.",
    },
    // {
    //   category: "performance",
    //   title: "Performance Optimization",
    //   icon: <Zap className="h-6 w-6" />,
    //   technologies: [
    //     { name: "Web Vitals", level: 90 },
    //     { name: "Lazy Loading", level: 95 },
    //     { name: "Code Splitting", level: 90 },
    //     { name: "Caching", level: 85 },
    //     { name: "Image Optimization", level: 95 },
    //     { name: "Lighthouse", level: 90 },
    //     { name: "Bundle Size Optimization", level: 85 },
    //     { name: "Memory Management", level: 80 },
    //     { name: "Network Optimization", level: 85 },
    //     { name: "Rendering Optimization", level: 90 },
    //   ],
    //   description:
    //     "Optimizing web applications for speed, efficiency, and better user experience across different devices.",
    // },
    {
      category: "cloud",
      title: "Cloud Services",
      icon: <Cloud className="h-6 w-6" />,
      technologies: [
        { name: "AWS", level: 85 },
        { name: "Netlify", level: 95 },
        { name: "Vercel", level: 95 },
        { name: "EC2", level: 85 },
        { name: "S3", level: 90 },
        { name: "Firebase", level: 90 },
        { name: "AWS Lambda", level: 85 },
        { name: "CloudFront", level: 80 },
        { name: "Route 53", level: 85 },
        { name: "Digital Ocean", level: 80 },
        { name: "Heroku", level: 90 },
      ],
      description:
        "Deploying and managing applications on various cloud platforms with focus on scalability and reliability.",
    },
    {
      category: "other",
      title: "Project Management",
      icon: <Workflow className="h-6 w-6" />,
      technologies: [
        { name: "Time Management", level: 90 },
        { name: "Notion", level: 90 },
        { name: "User Stories", level: 90 },
        { name: "Agile", level: 95 },
        { name: "Sprint Planning", level: 90 },
        { name: "Scrum", level: 90 },
        { name: "Jira", level: 85 },
        { name: "Trello", level: 95 },
        { name: "Asana", level: 80 },
        { name: "Backlog Management", level: 85 },
        { name: "Kanban", level: 95 },
      ],
      description: "Managing software development projects using agile methodologies and collaboration tools.",
    },
    {
      category: "ai",
      title: "Artificial Intelligence Soon",
      icon: <Cpu className="h-6 w-6" />,
      technologies: [
        { name: "AI Integration", level: 85 },
        { name: "Chatbot Development", level: 90 },
        { name: "Recommendation Systems", level: 75 },
        { name: "Sentiment Analysis", level: 80 },
        { name: "OpenAI API", level: 15 },
        { name: "Machine Learning", level: 15 },
        { name: "TensorFlow.js", level: 10 },
        { name: "Natural Language Processing", level: 10 },
        { name: "Data Analysis", level: 80 },
        { name: "Computer Vision", level: 70 },
      ],
      description:
        "Not into AI yet, but soon making apps smarter—so users can think even less.",
    },
    // {
    //   category: "other",
    //   title: "Blockchain Development",
    //   icon: <Layers className="h-6 w-6" />,
    //   technologies: [
    //     { name: "Ethereum", level: 80 },
    //     { name: "Solidity", level: 75 },
    //     { name: "Web3.js", level: 85 },
    //     { name: "Smart Contracts", level: 80 },
    //     { name: "DApps", level: 75 },
    //     { name: "NFTs", level: 85 },
    //     { name: "Cryptocurrency", level: 80 },
    //     { name: "Blockchain Architecture", level: 75 },
    //     { name: "Consensus Mechanisms", level: 70 },
    //     { name: "Tokenomics", level: 75 },
    //   ],
    //   description: "Building decentralized applications and implementing blockchain solutions for various use cases.",
    // },
    {
      category: "testing",
      title: "Testing & QA",
      icon: <BookOpen className="h-6 w-6" />,
      technologies: [
        { name: "Jest", level: 90 },
        { name: "React Testing Library", level: 85 },
        // { name: "Cypress", level: 80 },
        // { name: "Selenium", level: 75 },
        // { name: "Mocha", level: 85 },
        // { name: "Chai", level: 85 },
        // { name: "TDD", level: 90 },
        // { name: "BDD", level: 85 },
        // { name: "Unit Testing", level: 95 },
        // { name: "Integration Testing", level: 90 },
        // { name: "E2E Testing", level: 85 },
        // { name: "Performance Testing", level: 80 },
      ],
      description:
        "Implementing comprehensive testing strategies to ensure application quality, reliability, and performance.",
    },
    {
      category: "creative",
      title: "Creative Coding",
      icon: <Palette className="h-6 w-6" />,
      technologies: [
        { name: "GSAP", level: 95 },
        { name: "Three.js", level: 80 },
        { name: "SVG Animation", level: 90 },
        { name: "WebGL", level: 75 },
        { name: "Canvas API", level: 85 },
        { name: "Particle Systems", level: 85 },
        { name: "Shader Programming", level: 70 },
        { name: "Generative Art", level: 80 },
        { name: "Interactive Installations", level: 75 },
        { name: "Audio Visualization", level: 80 },
      ],
      description:
        "Creating immersive digital experiences through creative coding, animations, and interactive visualizations.",
    },
  ]

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    // { id: "mobile", label: "Mobile" },
    // { id: "devops", label: "DevOps" },
    { id: "cloud", label: "Cloud" },
    { id: "ai", label: "AI & ML" },
    { id: "design", label: "UI/UX" },
    { id: "testing", label: "Testing" },
    { id: "creative", label: "Creative" },
  ]

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10"></div>

      {/* Subtle background shapes */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-10" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">My Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-muted-foreground">Technologies and tools I work with</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`category-button ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-primary to-blue-400 hover:opacity-90"
                  : "border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              data-category={skill.category}
              className="skill-card glass-effect rounded-lg p-6 subtle-border hover:border-primary/50 transition-all hover:shadow-md group"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-md bg-primary/10 text-primary mr-3 group-hover:bg-primary/20 transition-colors">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-blue-300">{skill.title}</h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{skill.description}</p>

              <div className="space-y-3">
                {skill.technologies.slice(0, 4).map((tech, techIndex) => (
                  <div key={techIndex} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{tech.name}</span>
                      <span className="text-primary">{tech.level}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                        style={{ width: `${tech.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {skill.technologies.length > 4 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {skill.technologies.slice(4, 8).map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs px-2 py-1 rounded-full bg-accent/50 text-muted-foreground">
                      {tech.name}
                    </span>
                  ))}
                  {skill.technologies.length > 8 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      +{skill.technologies.length - 8}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

