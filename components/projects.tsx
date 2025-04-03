"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ExternalLink, Github, Maximize2, X } from "lucide-react"
import Link from "next/link"

export default function Projects() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const [filter, setFilter] = useState("all")
  const modalRef = useRef(null)

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
        ".filter-button",
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".project-card",
        {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )

    // Add hover animations for project cards
    const projectCards = document.querySelectorAll(".project-card")

    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        })

        // Animate the image
        const image = card.querySelector(".project-image")
        if (image) {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out",
          })
        }
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          borderColor: "rgba(59, 130, 246, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })

        // Reset the image
        const image = card.querySelector(".project-image")
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          })
        }
      })
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      projectCards.forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [filter])

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden"

      // Animate modal opening
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
      )

      // Animate modal content
      const modalContent = modalRef.current.querySelector(".modal-content")
      gsap.fromTo(
        modalContent,
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: 0.1,
          ease: "power3.out",
        },
      )
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [activeProject])

  const closeModal = () => {
    // Animate modal closing
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power3.in",
      onComplete: () => setActiveProject(null),
    })
  }

  // Animation for filtering
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card")

    cards.forEach((card) => {
      const category = card.getAttribute("data-category")

      if (filter === "all" || category === filter) {
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
  }, [filter])

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, cart functionality, and payment integration.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe"],
      category: "fullstack",
      liveUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7309500996920008704/",
      githubUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7309500996920008704/",
      details:
        "This e-commerce platform provides a seamless shopping experience with features like product search, filtering, user authentication, cart management, and secure payment processing. The admin dashboard allows for easy product and order management.",
      features: [
        "User authentication and authorization",
        "Product catalog with categories and filters",
        "Shopping cart and checkout process",
        "Payment integration with Stripe",
        "Order tracking and history",
        "Admin dashboard for product and order management",
        "Responsive design for all devices",
        "Product reviews and ratings",
      ],
      challenges:
        "Implementing a secure payment system and optimizing database queries for large product catalogs were the main challenges. Used Redis for caching frequently accessed data to improve performance.",
      year: 2025,
    }, {
      id: 2,
      title: "Quora Backend Project",
      description: "A Quora-like backend system that allows users to post, answer, and interact with content dynamically.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["Node.js", "Express.js", "MongoDB", "JWT Authentication","EJS"],
      category: "frontend",
      liveUrl: "https://github.com/DevanshJain007",
      githubUrl: "https://github.com/DevanshJain007",
      details:
        "This dashboard provides real-time analytics for social media accounts, allowing users to track engagement, schedule posts, and analyze audience demographics. It features interactive charts and data visualization tools.",
      features: [
        "User Authentication", "Post Creation", "Commenting & Replies", "Upvotes & Downvotes", "REST API Design"
      ],
      challenges:
        "Handling real-time data updates and creating responsive, interactive charts that work across all devices. ",
      year: 2024,
    },
    // {
    //   id: 2,
    //   title: "Social Media Dashboard",
    //   description: "A comprehensive dashboard for social media analytics and content management.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js", "Firebase"],
    //   category: "frontend",
    //   liveUrl: "https://social-dashboard.example.com",
    //   githubUrl: "https://github.com/devanshjain/social-dashboard",
    //   details:
    //     "This dashboard provides real-time analytics for social media accounts, allowing users to track engagement, schedule posts, and analyze audience demographics. It features interactive charts and data visualization tools.",
    //   features: [
    //     "Real-time analytics dashboard",
    //     "Social media account integration",
    //     "Content scheduling and calendar",
    //     "Audience demographics analysis",
    //     "Engagement metrics and reporting",
    //     "Interactive charts and visualizations",
    //     "Export reports as PDF or CSV",
    //     "Dark and light theme support",
    //   ],
    //   challenges:
    //     "Handling real-time data updates and creating responsive, interactive charts that work across all devices. Implemented WebSocket connections for live updates.",
    //   year: 2023,
    // },
    {
      id: 3,
      title: "Movie Booking Website",
      description:"A movie ticket booking platform enabling users to browse and book movie tickets with ease.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "Redux"],
      category: "fullstack",
      liveUrl: "https://github.com/DevanshJain007",
      githubUrl: "https://github.com/DevanshJain007",
      details:
        "This task management app helps teams organize work with features like task assignment, due dates, priority levels, and progress tracking. It includes real-time notifications and collaborative editing capabilities.",
      features: [
        " Browse through the latest releases and upcoming movies",
        "Interactive seat selection for a personalized experience",
        "Seamless and safe transactions",
        "Secure login and sign-up for ticket bookings",
        "Users can track their past and upcoming bookings",
        "Fully responsive design for all devices",
        
      ],
      challenges:
        "Optimizing real-time seat availability updates while ensuring smooth user interactions.Managing concurrent ticket bookings to avoid conflicts.Enhancing UI/UX for a more engaging user journey.",
      year: 2024,
    },
    {
      id: 4,
      title: "Preloader Project",
      description: "A stylish preloader animation to enhance the user experience while loading content.",
      image: "/placeholder.svg?height=600&width=800",
      technologies: ["HTML", "CSS", "JavaScript","GSAP",],
      category: "Animations",
      liveUrl: "https://fascinating-sherbet-0bdc1f.netlify.app/",
      githubUrl: "https://fascinating-sherbet-0bdc1f.netlify.app/",
      details:
        "This fitness platform allows users to track workouts, set goals, and monitor progress with interactive charts. It includes features like custom workout creation, nutrition tracking, and social sharing capabilities.",
      features:  ["Custom Animations", "Smooth Loading", "Performance Optimized"],
      challenges:
        "Creating a seamless experience across both web and mobile platforms. Implemented a shared codebase using React Native Web for maximum code reuse.",
      year: 2025,
    },
    {
      "id": 5,
      "title": "Pagination Project",
      "description": "A dynamic pagination system for handling large datasets efficiently.",
      "image": "/pagination-preview.png",
      "technologies": ["API","Pagination","Javascript","React"],
      "category": "Fullstack",
      "liveUrl": "https://nimble-kataifi-a6432b.netlify.app/",
      "githubUrl": "https://nimble-kataifi-a6432b.netlify.app/",
      "details": "This project implements a robust pagination system designed for handling large datasets efficiently. It ensures smooth data retrieval with minimal load time using server-side pagination, caching strategies, and optimized database queries. The project integrates interactive maps, search filters, and cloud storage for enhanced user experience.",
      "features": [
        "Server-side pagination for large datasets",
        "Infinite scrolling and page-based pagination options",
        "Optimized database queries for faster response times",
        "Debounced search and filtering",
        "Interactive map integration with Google Maps API",
        "User authentication and saved searches",
        "Cloud storage integration with AWS S3"
      ],
      "challenges": "Implementing an efficient pagination strategy for large datasets without impacting performance. Used PostgreSQL with indexing and caching mechanisms to speed up queries, and optimized API requests to minimize unnecessary data loads.",
      "year": 2023
    },
    
    {
      "id": 6,
      "title": "GSAP Animation Project",
      "description": "An interactive webpage with GSAP animations for enhanced user engagement.",
      "image": "/gsap-animation-preview.png",
      "technologies": ["GSAP", "React", "JavaScript", "Vite"],
      "category": "Animations",
      "liveUrl": "https://dazzling-gecko-7abce5.netlify.app/",
      "githubUrl": "https://dazzling-gecko-7abce5.netlify.app/",
      "details": "This project showcases a modern and dynamic webpage using GSAP (GreenSock Animation Platform) to create smooth animations and engaging transitions. The webpage features fluid scroll-based effects, parallax scrolling, and interactive elements that enhance user experience.",
      "features": [
        "Smooth Scroll Animations",
        "Parallax Effects",
        "Interactive Hover Animations",
        "Text Reveal Animations",
        "GSAP Timeline Sequences"
      ],
      "challenges": "Optimizing animation performance for smooth rendering, ensuring compatibility across different browsers, and fine-tuning animation timing for a natural feel.",
      "year": 2025
    },
    {
      "id": 7,
      "title": "User Authentication Form",
      "description": "A secure authentication system for user login and registration.",
      "image": "/auth-form-preview.png",
      "technologies": ["React", "Node.js", "Express.js", "MongoDB", "JWT", "bcrypt"],
      "category": "Fullstack",
      "liveUrl": "https://whimsical-pastelito-a87569.netlify.app/",
      "githubUrl": "https://whimsical-pastelito-a87569.netlify.app/",
      "details": "This project features a secure user authentication system with signup, login, and role-based access control. It implements password hashing using bcrypt, JSON Web Tokens (JWT) for authentication, and session management for enhanced security. The system supports user roles, such as admin and regular users, ensuring controlled access to different parts of the application.",
      "features": [
        "User Signup & Login",
        "Password Hashing with bcrypt",
        "JWT-based Authentication",
        "Role-based Access Control (RBAC)",
        "Email Verification & Password Reset",
        "Session Management",
        "Protected API Routes"
      ],
      "challenges": "Ensuring secure password storage and authentication while preventing common vulnerabilities like SQL injection and token theft. Implemented JWT expiration and refresh tokens for better security.",
      "year": 2024
    }
    
    
    // {
    //   id: 7,
    //   title: "AI-Powered Content Generator",
    //   description: "A tool that uses AI to generate marketing content, blog posts, and social media updates.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["React", "Python", "Flask", "OpenAI API", "MongoDB"],
    //   category: "ai",
    //   liveUrl: "https://ai-content-generator.example.com",
    //   githubUrl: "https://github.com/devanshjain/ai-content-generator",
    //   details:
    //     "This AI-powered tool helps marketers and content creators generate high-quality content for various platforms. It uses advanced language models to create blog posts, social media updates, and marketing copy.",
    //   features: [
    //     "AI-powered content generation",
    //     "Multiple content types and formats",
    //     "Content editing and refinement",
    //     "SEO optimization suggestions",
    //     "Content scheduling and publishing",
    //     "Performance analytics",
    //     "Team collaboration features",
    //     "Content templates and presets",
    //   ],
    //   challenges:
    //     "Optimizing API usage costs while maintaining quality output. Implemented caching and rate limiting to manage API consumption efficiently.",
    //   year: 2023,
    // },
    // {
    //   id: 8,
    //   title: "Inventory Management System",
    //   description: "A comprehensive system for tracking inventory, managing suppliers, and processing orders.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["Angular", "Java", "Spring Boot", "PostgreSQL", "Docker"],
    //   category: "fullstack",
    //   liveUrl: "https://inventory-system.example.com",
    //   githubUrl: "https://github.com/devanshjain/inventory-system",
    //   details:
    //     "This inventory management system helps businesses track stock levels, manage suppliers, process orders, and generate reports. It includes barcode scanning, automated reordering, and comprehensive analytics.",
    //   features: [
    //     "Real-time inventory tracking",
    //     "Supplier management",
    //     "Purchase order processing",
    //     "Barcode scanning integration",
    //     "Low stock alerts and automated reordering",
    //     "Inventory forecasting",
    //     "Comprehensive reporting",
    //     "Multi-location support",
    //   ],
    //   challenges:
    //     "Creating a system that could handle high transaction volumes while maintaining data integrity. Implemented database sharding and caching strategies for improved performance.",
    //   year: 2020,
    // },
    // {
    //   id: 9,
    //   title: "Cryptocurrency Trading Bot",
    //   description:
    //     "An automated trading bot for cryptocurrency markets with strategy customization and performance analytics.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["Node.js", "Express", "MongoDB", "TensorFlow.js", "WebSockets"],
    //   category: "ai",
    //   liveUrl: "https://crypto-trading-bot.example.com",
    //   githubUrl: "https://github.com/devanshjain/crypto-trading-bot",
    //   details:
    //     "This cryptocurrency trading bot allows users to create and deploy automated trading strategies across multiple exchanges. It features backtesting capabilities, real-time market data analysis, and performance tracking.",
    //   features: [
    //     "Automated trading strategy execution",
    //     "Custom strategy creation interface",
    //     "Backtesting with historical data",
    //     "Real-time market data analysis",
    //     "Multi-exchange support",
    //     "Risk management tools",
    //     "Performance analytics dashboard",
    //     "Email and mobile notifications",
    //   ],
    //   challenges:
    //     "Ensuring reliable execution of trades during high market volatility and implementing machine learning models for strategy optimization. Used WebSockets for real-time data and implemented circuit breakers for risk management.",
    //   year: 2022,
    // },
    // {
    //   id: 10,
    //   title: "Smart Home Control System",
    //   description:
    //     "An IoT platform for controlling and automating smart home devices with voice commands and scheduling.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["React", "Node.js", "MQTT", "MongoDB", "Raspberry Pi"],
    //   category: "iot",
    //   liveUrl: "https://smart-home-control.example.com",
    //   githubUrl: "https://github.com/devanshjain/smart-home",
    //   details:
    //     "This smart home control system allows users to manage and automate their connected devices through a web interface or mobile app. It supports voice commands, scheduling, and conditional automation based on sensors and triggers.",
    //   features: [
    //     "Device control and monitoring",
    //     "Voice command integration",
    //     "Scheduling and automation",
    //     "Energy usage tracking",
    //     "Sensor data visualization",
    //     "Scene creation and activation",
    //     "Multi-user access with permissions",
    //     "Integration with popular smart home platforms",
    //   ],
    //   challenges:
    //     "Creating a reliable communication protocol between the server and various IoT devices. Implemented MQTT for efficient messaging and designed a modular architecture for easy device integration.",
    //   year: 2021,
    // },
    // {
    //   id: 11,
    //   title: "Portfolio Website Generator",
    //   description: "A tool that helps developers create professional portfolio websites with customizable templates.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Supabase", "Vercel"],
    //   category: "frontend",
    //   liveUrl: "https://portfolio-generator.example.com",
    //   githubUrl: "https://github.com/devanshjain/portfolio-generator",
    //   details:
    //     "This portfolio generator helps developers create professional websites to showcase their work. It offers customizable templates, easy project management, and seamless deployment to Vercel or Netlify.",
    //   features: [
    //     "Customizable portfolio templates",
    //     "Project showcase management",
    //     "Skills and experience sections",
    //     "Contact form integration",
    //     "SEO optimization tools",
    //     "Analytics dashboard",
    //     "One-click deployment",
    //     "Custom domain setup",
    //   ],
    //   challenges:
    //     "Creating a flexible template system that allows for customization while maintaining design integrity. Implemented a component-based architecture with theme variants.",
    //   year: 2023,
    // },
    // {
    //   id: 12,
    //   title:  "GSAP Animation Project",
    //   description: "An interactive webpage with GSAP animations for enhanced user engagement.",
    //   image: "/placeholder.svg?height=600&width=800",
    //   technologies: ["GSAP", "React", "JavaScript"],
    //   category: "Animations",
    //   liveUrl: "https://ar-shopping.example.com",
    //   githubUrl: "https://github.com/devanshjain/ar-shopping",
    //   details:
    //     "This augmented reality shopping app allows users to visualize furniture, decor, and other products in their own space before purchasing. It features accurate 3D models, measurements, and seamless integration with e-commerce platforms.",
    //   features: ["Scroll Animations", "Page Transitions", "SVG Animations"],
    //   challenges:
    //     "Ensuring accurate scaling and placement of 3D models in various environments. Implemented advanced computer vision techniques for surface detection and lighting adaptation.",
    //   year: 2022,
    // },
  ]

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "frontend", label: "Frontend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "Animations", label: "Animations" },
    { id: "ai", label: "AI & ML" },
    { id: "Coming Soon", label: "IoT" },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10"></div>

      {/* Subtle background shapes */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">My Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-muted-foreground">Showcasing my recent work</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filter === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category.id)}
              className={`filter-button ${
                filter === category.id
                  ? "bg-gradient-to-r from-primary to-blue-400 hover:opacity-90"
                  : "border-primary/30 hover:bg-primary/10 hover:border-primary/50"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              data-category={project.category}
              className="project-card group relative glass-effect rounded-lg overflow-hidden subtle-border hover:border-primary/50 transition-all hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="project-image w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/20 border-white/20 text-white hover:bg-background/40 hover:text-white"
                    onClick={() => setActiveProject(project)}
                  >
                    <Maximize2 className="h-5 w-5" />
                    <span className="sr-only">View details</span>
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{project.year}</span>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="text-xs px-2 py-1 rounded-full bg-accent/50 text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10"
                    onClick={() => setActiveProject(project)}
                  >
                    View Details
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                  <div className="flex gap-2">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-accent transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-accent transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">Live Demo</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10 hover:border-primary/50">
            View All Projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {activeProject && (
          <div
            ref={modalRef}
            className="project-modal fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 opacity-0"
          >
            <div className="modal-content bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto subtle-border">
              <div className="sticky top-0 bg-card z-10 flex justify-between items-center p-4 border-b border-border">
                <h3 className="text-xl font-bold text-blue-300">{activeProject.title}</h3>
                <Button variant="ghost" size="icon" onClick={closeModal} className="rounded-full hover:bg-primary/20">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <div className="p-6">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 subtle-border">
                  <img
                    src={activeProject.image || "/placeholder.svg"}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-blue-300">Description</h4>
                    <p className="text-muted-foreground">{activeProject.details}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-blue-300">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {activeProject.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-blue-300">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-accent/50 text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-blue-300">Challenges & Solutions</h4>
                    <p className="text-muted-foreground">{activeProject.challenges}</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button asChild className="bg-gradient-to-r from-primary to-blue-400 hover:opacity-90">
                      <Link href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                    >
                      <Link href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

