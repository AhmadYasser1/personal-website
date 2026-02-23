"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { useLenis } from "@/components/smooth-scroll-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "https://medium.com/@ahmadyasser03", label: "Blog", external: true },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorProps, setIndicatorProps] = useState({ left: 0, width: 0 });
  const navLinksRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useLenis(useCallback(({ scroll }: { scroll: number }) => {
    setIsScrolled(scroll > 50);
  }, []));

  useEffect(() => {
    const activeIndex = navLinks.findIndex(link => link.href === pathname);
    if (activeIndex !== -1 && navLinksRefs.current[activeIndex] && navContainerRef.current) {
      const activeLink = navLinksRefs.current[activeIndex];
      const container = navContainerRef.current;
      
      if (activeLink && container) {
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const left = linkRect.left - containerRect.left;
        const width = linkRect.width;
        
        setIndicatorProps({ left, width });
      }
    }
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? "border-border/60 bg-background/90 backdrop-blur-md"
          : "border-border/40 bg-background/80 backdrop-blur-sm"
      }`}
    >
      <nav className={`container mx-auto flex items-center justify-between px-4 transition-all duration-300 ${
        isScrolled ? "h-14" : "h-16"
      }`}>
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight transition-transform duration-200 hover:scale-105"
        >
          <span className="text-foreground">Ahmad</span>
          <span className="text-emerald-500 animate-dot-pulse">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div ref={navContainerRef} className="hidden md:flex md:items-center md:gap-6 relative">
          {navLinks.map((link, index) => (
            <div key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-emerald-500 hover:-translate-y-0.5 inline-flex items-center gap-1"
                >
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              ) : (
                <Link
                  ref={(el) => { navLinksRefs.current[index] = el; }}
                  href={link.href}
                  className={`relative text-sm font-medium transition-all duration-200 hover:text-emerald-500 hover:-translate-y-0.5 ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
          {indicatorProps.width > 0 && (
            <m.div
              className="absolute -bottom-1 h-0.5 bg-emerald-500"
              initial={false}
              animate={{
                left: indicatorProps.left,
                width: indicatorProps.width,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden transition-transform duration-200 hover:scale-110 active:scale-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden.Root>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden.Root>
              <nav className="flex flex-col gap-4 mt-8 px-6">
                <AnimatePresence>
                  {navLinks.map((link, index) => (
                    <m.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-medium text-muted-foreground transition-all duration-200 hover:text-emerald-500 hover:translate-x-2 inline-flex items-center gap-1.5"
                        >
                          {link.label}
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7" />
                            <path d="M7 7h10v10" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`block text-lg font-medium transition-all duration-200 hover:text-emerald-500 hover:translate-x-2 ${
                            pathname === link.href
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </m.div>
                  ))}
                </AnimatePresence>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
