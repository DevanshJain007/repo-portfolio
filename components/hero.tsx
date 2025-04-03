"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import TextReveal from "./text-reveal"
import Image from "next/image"

export default function Hero() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const ctaRef = useRef(null)
  const socialsRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const tl = gsap.timeline()

    tl.from(headingRef.current, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
      .from(
        descriptionRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ctaRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .from(
        socialsRef.current,
        {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      )
      .from(
        imageRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.8",
      )

    // Parallax effect
    gsap.to(".hero-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="animated-bg"></div>

      {/* Subtle background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div ref={headingRef}>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm <TextReveal className="gradient-text inline-block">Devansh Jain</TextReveal>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 text-blue-300">
              <TextReveal delay={0.5}>Full Stack Developer</TextReveal>
            </h2>
          </div>

          <p ref={descriptionRef} className="text-lg text-muted-foreground max-w-md">
            I build exceptional digital experiences with modern technologies. Specializing in MERN stack and Java
            development.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <Button size="lg" className="group bg-gradient-to-r from-primary to-blue-400 hover:opacity-90">
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary hover:bg-primary/10">
              Contact Me
            </Button>
          </div>

          <div ref={socialsRef} className="flex items-center space-x-4">
            <Link
              href="https://github.com/DevanshJain007"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/devansh-jain-b196b9184/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-accent hover:bg-accent/80 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>

        <div ref={imageRef} className="relative flex justify-center">
          <div className="relative w-72 h-72 md:w-96 md:h-96 hero-image">
            {/* Subtle rotating circle */}
            <div className="absolute inset-0 w-full h-full rounded-full border border-primary/20 animate-rotate opacity-50"></div>

            {/* Gradient background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-blue-400/10 animate-pulse"></div>

            {/* Image container */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-background shadow-lg">
              <Image
                src="/img2.jpg"
                alt="Devansh Jain"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Subtle floating particles */}
            {[...Array(10)].map((_, i) => (
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
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center items-start p-1">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full animate-scroll"></div>
        </div>
      </div>
    </section>
  )
}

