"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export default function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const contentRef = useRef(null)
  const statsRef = useRef(null)

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
        contentRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".stat-item",
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )

    // Add hover animations for stat items
    const statItems = document.querySelectorAll(".stat-item")

    statItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          y: -10,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      statItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {})
        item.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90 -z-10"></div>

      {/* Subtle background shapes */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16" ref={headingRef}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-muted-foreground">Get to know me better</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-blue-400/10 rounded-lg blur-lg opacity-50"></div>

            {/* Subtle rotating circle */}
            <div
              className="absolute inset-0 w-full h-full rounded-lg border border-primary/20 animate-rotate opacity-30"
              style={{ animationDuration: "20s" }}
            ></div>

            <div className="relative aspect-square rounded-lg overflow-hidden border-4 border-background shadow-lg">
              <img
                src="/img4.jpg"
                alt="Devansh Jain"
                className="w-full h-full object-cover"
              />

              {/* Subtle floating particles */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2,
                    animation: `float ${Math.random() * 3 + 3}s infinite`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <h3 className="text-2xl font-bold text-blue-300">
              I'm <span className="gradient-text">Devansh Jain</span>, a Full Stack Developer
            </h3>

            <p className="text-muted-foreground">
            With experience in full-stack development, I specialize in creating dynamic and scalable applications using modern technologies. My expertise extends from designing intuitive user interfaces to developing efficient backend systems, ensuring seamless performance and functionality.
            </p>

            <p className="text-muted-foreground">
            I am passionate about writing clean, optimized code and building user-friendly solutions that enhance the overall digital experience. My approach blends technical proficiency with creative problem-solving, enabling me to develop applications that align with business goals while prioritizing usability.
            </p>

            <p className="text-muted-foreground">
            Having worked on projects ranging from startups to established enterprises, I have contributed to transforming ideas into impactful digital products. I continuously explore new technologies and industry trends to refine my skills and stay ahead in the ever-evolving web development landscape.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-1">
                <p className="font-medium text-blue-300">Name:</p>
                <p className="text-muted-foreground">Devansh Jain</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-blue-300">Email:</p>
                <p className="text-muted-foreground">devanshjaj@gmail.com</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-blue-300">Location:</p>
                <p className="text-muted-foreground">Indore, India</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-blue-300">Availability:</p>
                <p className="text-muted-foreground">Open to opportunities</p>
              </div>
            </div>

            <Button className="mt-4 bg-gradient-to-r from-primary to-blue-400 hover:opacity-90">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { count: "1+", label: "Years Experience" },
            { count: "10+", label: "Projects Completed" },
            { count: "0+", label: "Soon Happy Clients" },
            { count: "10+", label: "Technologies" },
          ].map((stat, index) => (
            <div
              key={index}
              className="stat-item glass-effect rounded-lg p-6 text-center shadow-sm subtle-border hover:border-primary/50 transition-colors"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.count}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

