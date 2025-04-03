"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
  staggerDelay?: number
  triggerOnScroll?: boolean
  triggerElement?: React.RefObject<HTMLElement>
  triggerPosition?: string
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.05,
  triggerOnScroll = false,
  triggerElement = null,
  triggerPosition = "top 80%",
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!textRef.current) return

    const element = textRef.current
    const text = children

    // Clear any existing content
    element.innerHTML = ""

    // Create spans for each letter
    text.split("").forEach((letter, index) => {
      const span = document.createElement("span")
      span.textContent = letter === " " ? "\u00A0" : letter
      span.className = "inline-block opacity-0 transform translate-y-8"
      element.appendChild(span)
    })

    // Animation
    const animate = () => {
      gsap.to(`${element.tagName.toLowerCase()}[data-text-reveal="true"] span`, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: "power3.out",
        delay: delay,
      })
    }

    if (triggerOnScroll) {
      const trigger = triggerElement ? triggerElement.current : element

      ScrollTrigger.create({
        trigger: trigger,
        start: triggerPosition,
        onEnter: animate,
        once: true,
      })
    } else {
      animate()
    }

    return () => {
      if (triggerOnScroll) {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }
  }, [children, delay, staggerDelay, triggerOnScroll, triggerElement, triggerPosition])

  return (
    <div ref={textRef} className={className} data-text-reveal="true">
      {children}
    </div>
  )
}

