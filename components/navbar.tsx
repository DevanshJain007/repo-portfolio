"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      gsap.to(".mobile-menu", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      })
    } else {
      gsap.to(".mobile-menu", {
        y: -50,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      })
    }
  }, [isOpen])

  useEffect(() => {
    const tl = gsap.timeline()
    tl.from(".nav-item", {
      y: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    })
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter">
          <span className="gradient-text">D</span>evansh
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-item text-sm font-medium hover:text-primary transition-colors"
            >
              {item}
            </Link>
          ))}
          <Button className="nav-item bg-neon-glow hover:bg-neon-glow/80 text-black font-bold neon-border">
            Resume
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div
        className={`mobile-menu absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md opacity-0 -translate-y-12 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="container py-5 flex flex-col space-y-4">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Button className="w-full bg-neon-glow hover:bg-neon-glow/80 text-black font-bold neon-border">Resume</Button>
        </div>
      </div>
    </nav>
  )
}

