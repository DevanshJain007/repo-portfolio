"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const preloaderRef = useRef(null)
  const progressTextRef = useRef(null)
  const welcomeTextRef = useRef(null)
  const progressBarRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    // Simulate loading
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.floor(Math.random() * 5) + 1
        return newProgress > 100 ? 100 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress === 100) {
      // Wait a moment at 100% before transitioning
      const timeout = setTimeout(() => {
        const tl = gsap.timeline()

        tl.to(progressTextRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        })
          .to(
            progressBarRef.current,
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.inOut",
            },
            "-=0.3",
          )
          .to(
            welcomeTextRef.current,
            {
              y: -20,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            },
            "-=0.3",
          )
          .to(
            circleRef.current,
            {
              scale: 1.5,
              opacity: 0,
              duration: 0.8,
              ease: "power3.inOut",
            },
            "-=0.3",
          )
          .to(
            preloaderRef.current,
            {
              opacity: 0,
              duration: 0.8,
              ease: "power3.inOut",
              onComplete: () => {
                setIsComplete(true)
                // Enable scrolling after preloader is gone
                document.body.style.overflow = "auto"
              },
            },
            "-=0.4",
          )
      }, 800)

      return () => clearTimeout(timeout)
    }
  }, [progress])

  useEffect(() => {
    // Disable scrolling during preloader
    document.body.style.overflow = "hidden"

    // Split text animation
    const welcomeText = "Welcome to My Portfolio"
    const welcomeTextElement = document.querySelector(".welcome-text")

    if (welcomeTextElement) {
      welcomeTextElement.innerHTML = ""

      // Create spans for each letter
      welcomeText.split("").forEach((letter, index) => {
        const span = document.createElement("span")
        span.textContent = letter === " " ? "\u00A0" : letter
        span.className = "inline-block opacity-0 transform translate-y-8"
        welcomeTextElement.appendChild(span)
      })

      // Animate each letter
      gsap.to(".welcome-text span", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.3,
      })
    }

    // Initial animation
    const tl = gsap.timeline()

    tl.from(circleRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
    }).from(
      progressTextRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6",
    )

    // Animate the particles
    gsap.to(".preloader-particle", {
      y: -20,
      opacity: 0.5,
      duration: 1,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    })

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  if (isComplete) return null

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="preloader-particle absolute w-1 h-1 bg-primary rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div ref={circleRef} className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-blue-400/20 blur-xl animate-pulse"></div>
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-blue-400/10 flex items-center justify-center border border-primary/20 relative">
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-rotate opacity-70"></div>
          <div
            className="absolute inset-4 rounded-full border border-blue-400/30 animate-rotate opacity-70"
            style={{ animationDirection: "reverse", animationDuration: "15s" }}
          ></div>
          <div className="text-5xl font-bold gradient-text">{progress}%</div>
        </div>
      </div>

      <div className="relative w-full max-w-md px-4 z-10">
        <div ref={welcomeTextRef} className="text-center mb-8">
          <h1 className="welcome-text text-4xl md:text-5xl font-bold gradient-text">Welcome to My Portfolio</h1>
          <div className="h-1 w-40 bg-gradient-to-r from-primary to-blue-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="relative w-full h-2 bg-accent rounded-full overflow-hidden mb-6">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Animated particles on progress bar */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-1 bg-white/30"
                style={{
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.5,
                  animation: `pulse ${Math.random() * 2 + 1}s infinite`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div ref={progressTextRef} className="text-center">
          <span className="text-lg font-medium text-muted-foreground">Loading your experience</span>
          <span className="animate-pulse">...</span>
        </div>

        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-400 scale-x-0 origin-left"
        ></div>
      </div>

      {/* Subtle animated circles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-rotate opacity-20"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-400/10 rounded-full animate-rotate opacity-20"
          style={{ animationDirection: "reverse" }}
        ></div>
      </div>
    </div>
  )
}

