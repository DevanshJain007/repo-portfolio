"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export default function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseDown = () => {
      setClicked(true)
      createSplash(position.x, position.y)
    }

    const handleMouseUp = () => setClicked(false)

    const handleMouseEnterLink = () => setLinkHovered(true)
    const handleMouseLeaveLink = () => setLinkHovered(false)

    const handleMouseLeave = () => setHidden(true)
    const handleMouseEnter = () => setHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    const links = document.querySelectorAll("a, button, input, [role='button']")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnterLink)
      link.addEventListener("mouseleave", handleMouseLeaveLink)
    })

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnterLink)
        link.removeEventListener("mouseleave", handleMouseLeaveLink)
      })
    }
  }, [isMobile, position])

  useEffect(() => {
    if (isMobile || !cursorRef.current || !followerRef.current) return

    gsap.to(cursorRef.current, {
      x: position.x,
      y: position.y,
      duration: 0.1,
      ease: "power2.out",
    })

    gsap.to(followerRef.current, {
      x: position.x,
      y: position.y,
      duration: 0.3,
      ease: "power2.out",
    })
  }, [isMobile, position])

  const createSplash = (x, y) => {
    if (isMobile) return

    const splash = document.createElement("div")
    splash.className = "cursor-splash"
    document.body.appendChild(splash)

    const colors = [
      "rgba(138, 43, 226, 0.2)",  // BlueViolet
      "rgba(30, 144, 255, 0.2)",  // DodgerBlue
      "rgba(0, 191, 255, 0.2)",   // DeepSkyBlue
      "rgba(127, 255, 212, 0.2)", // Aquamarine
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    
    gsap.set(splash, {
      x: x,
      y: y,
      width: 0,
      height: 0,
      backgroundColor: randomColor,
    })

    gsap.to(splash, {
      width: "300px",
      height: "300px",
      x: x,
      y: y,
      duration: 0.8,
      ease: "power2.out",
      opacity: 0,
      onComplete: () => {
        document.body.removeChild(splash)
      },
    })
  }

  if (isMobile) return null

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-50 mix-blend-difference ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: clicked ? "24px" : "12px",
          height: clicked ? "24px" : "12px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={followerRef}
        className={`fixed pointer-events-none z-40 ${
          hidden ? "opacity-0" : "opacity-60"
        } ${linkHovered ? "scale-150" : ""}`}
        style={{
          width: "40px",
          height: "40px",
          border: "1px solid #fff",
          borderRadius: "50%",
          transition: "transform 0.3s",
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
      <style jsx global>{`
        .cursor-splash {
          position: fixed;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 40;
          mix-blend-mode: multiply;
        }
        
        html,
        body {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          html,
          body {
            cursor: auto;
          }
        }
        
        a,
        button,
        input,
        textarea,
        select,
        [role="button"] {
          cursor: none;
        }
        
        @media (max-width: 768px) {
          a,
          button,
          input,
          textarea,
          select,
          [role="button"] {
            cursor: pointer;
          }
        }
      `}</style>
    </>
  )
}

