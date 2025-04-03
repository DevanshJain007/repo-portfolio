"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
        ".contact-info-item",
        {
          x: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        formRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )

    // Add hover animations for contact info items
    const contactItems = document.querySelectorAll(".contact-info-item")

    contactItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          y: -5,
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
          borderColor: "rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
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
      contactItems.forEach((item) => {
        item.removeEventListener("mouseenter", () => {})
        item.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formState)
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Show success animation
      const formElements = formRef.current.querySelectorAll("input, textarea, button")
      gsap.to(formElements, {
        opacity: 0,
        y: -10,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Show success message
          const successMessage = document.querySelector(".success-message")
          gsap.fromTo(successMessage, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        },
      })

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        setIsSubmitted(false)

        // Animate form elements back
        const successMessage = document.querySelector(".success-message")
        gsap.to(successMessage, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            const formElements = formRef.current.querySelectorAll("input, textarea, button")
            gsap.fromTo(
              formElements,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" },
            )
          },
        })
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-blue-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-muted-foreground">Let's work together on your next project</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="contact-info-item flex items-start space-x-4 p-4 rounded-lg glass-effect hover:bg-card transition-colors subtle-border">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium mb-1 text-blue-300">Location</h3>
                <p className="text-muted-foreground">Indore, India</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start space-x-4 p-4 rounded-lg glass-effect hover:bg-card transition-colors subtle-border">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium mb-1 text-blue-300">Email</h3>
                <p className="text-muted-foreground">devanshjaj@gmail.com</p>
              </div>
            </div>

            <div className="contact-info-item flex items-start space-x-4 p-4 rounded-lg glass-effect hover:bg-card transition-colors subtle-border">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium mb-1 text-blue-300">Phone</h3>
                <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div className="p-4 rounded-lg glass-effect mt-8 subtle-border">
              <h3 className="font-medium mb-2 text-blue-300">Available for</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  Full-time positions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  Freelance projects
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  Consulting
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  Remote work
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2" ref={formRef}>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 rounded-lg subtle-border glass-effect relative overflow-hidden"
            >
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Send Me a Message</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-blue-300">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="bg-accent/50 border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-blue-300">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="bg-accent/50 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-blue-300">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  className="bg-accent/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-blue-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="bg-accent/50 border-border focus:border-primary"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-blue-400 hover:opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>

              <div className="success-message absolute inset-0 flex flex-col items-center justify-center bg-card opacity-0 pointer-events-none">
                <div className="text-green-500 mb-4">
                  <CheckCircle className="h-16 w-16" />
                </div>
                <h3 className="text-xl font-bold text-blue-300 mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-center">
                  Thank you for your message. I'll get back to you soon!
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

