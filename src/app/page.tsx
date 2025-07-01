"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Notification } from "@/components/ui/notification";

// Extend Window interface for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string,
        options: { sitekey: string; callback: (token: string) => void },
      ) => void;
    };
  }
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  } | null>(null);

  const router = useRouter();

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  // Form handlers
  const handleEmailFocus = () => {
    // Analytics tracking would require Pro plan
    console.log("Email field focused");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Track when user enters a valid email (Pro plan feature)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(e.target.value)) {
      console.log("Valid email entered");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showNotification("Please enter your email address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get Turnstile token
      const turnstileToken = await new Promise<string | null>((resolve) => {
        if (window.turnstile && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
          window.turnstile.render("#turnstile-container", {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
            callback: resolve,
          });
        } else {
          // Fallback if Turnstile is not loaded
          resolve(null);
        }
      });

      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          turnstileToken,
          honeypot: "", // Empty honeypot field
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful submission (analytics would track this on Pro plan)
        console.log("Waitlist submission successful");
        // Redirect to thank you page
        router.push("/thank-you");
      } else {
        // Failed submission (analytics would track this on Pro plan)
        console.log("Waitlist submission failed");
        showNotification(data.error || "Something went wrong", "error");
      }
    } catch {
      showNotification("Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen bg-[#1C1917] relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial"></div>

      <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-7xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Brand */}
            <div
              className="text-4xl md:text-5xl font-normal text-[#FEB204]"
              style={{ fontFamily: "Gambarino, serif" }}
            >
              amber
            </div>

            {/* Main Heading */}
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#FEFEFD] leading-tight font-sans">
                Your <span className="text-[#FEB204]">Personal</span>
                <br />
                <span className="text-[#FEB204]">Finance</span> Manager
              </h1>
              <p className="text-lg md:text-xl text-[#A69B93] leading-relaxed font-sans font-normal max-w-lg mx-auto lg:mx-0">
                Never ask &quot;Sorry, what were you guys talking about?&quot;
                ever again 👀
              </p>
            </div>

            {/* Waitlist Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={handleEmailFocus}
                  className="flex-1 bg-white/5 backdrop-blur-sm border border-white/10 text-[#FEFEFD] placeholder:text-[#86827C] focus:border-[#FEB204] focus:bg-white/10 font-sans px-3 md:px-4 py-2.5 md:py-3 rounded-lg outline-none transition-all duration-200 shadow-lg text-sm md:text-base"
                  required
                  disabled={isSubmitting}
                />
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FEB204] hover:bg-[#FEB204]/90 text-[#1C1917] font-sans font-medium px-6 md:px-8 py-2.5 md:py-3 rounded-lg whitespace-nowrap transition-all duration-200 shadow-lg hover:shadow-xl text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin h-4 w-4"
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
                  )}
                  {isSubmitting ? "Joining..." : "Join waitlist"}
                </button>
              </div>
              {/* Turnstile container - will be populated by script */}
              <div
                id="turnstile-container"
                className="flex justify-center"
              ></div>
            </form>

            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={hideNotification}
              />
            )}
          </div>

          {/* Right Column - Mockup Image */}
          <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative">
              <Image
                src="/amber_mockup.png"
                alt="Amber Finance Dashboard"
                width={1200}
                height={900}
                className="w-full h-auto max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-3xl relative z-10"
                priority
              />
              {/* Bottom shadow */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 w-4/5 h-4 bg-black/20 blur-lg rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
