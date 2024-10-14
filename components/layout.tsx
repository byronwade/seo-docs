'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, Github, Menu, Sun, Moon, Command } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const mainNav = [
  { title: "Documentation", href: "/docs", icon: Menu },
  { title: "Components", href: "/docs/components", icon: Menu },
  { title: "Examples", href: "/examples", icon: Menu },
  { title: "Blog", href: "/blog", icon: Menu },
]

const sidebarNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "SEO Basics", href: "/docs/seo-basics" },
      { title: "Keyword Research", href: "/docs/keyword-research" },
    ],
  },
  {
    title: "On-Page SEO",
    items: [
      { title: "Content Optimization", href: "/docs/content-optimization" },
      { title: "Meta Tags", href: "/docs/meta-tags" },
      { title: "URL Structure", href: "/docs/url-structure" },
    ],
  },
  {
    title: "Technical SEO",
    items: [
      { title: "Site Speed", href: "/docs/site-speed" },
      { title: "Mobile Optimization", href: "/docs/mobile-optimization" },
      { title: "Structured Data", href: "/docs/structured-data" },
    ],
  },
  {
    title: "Off-Page SEO",
    items: [
      { title: "Link Building", href: "/docs/link-building" },
      { title: "Social Media SEO", href: "/docs/social-media-seo" },
      { title: "Local SEO", href: "/docs/local-seo" },
    ],
  },
]

const faqItems = [
  {
    question: "What is SEO?",
    answer: "SEO stands for Search Engine Optimization. It's the practice of optimizing websites to make them reach a high position in Google's (or another search engine's) search results."
  },
  {
    question: "Why is SEO important?",
    answer: "SEO is crucial because it makes your website more visible, and that means more traffic and more opportunities to convert prospects into customers. It's also a valuable tool for brand awareness, building relationships with prospects, and positioning yourself as an authoritative and trustworthy expert in your field."
  },
  {
    question: "How long does it take to see results from SEO?",
    answer: "SEO is a long-term strategy, and the time to see results can vary. Generally, you can start to see improvements within 4-6 months, but SEO is an ongoing process that requires consistent effort to maintain and improve rankings."
  },
  {
    question: "What's the difference between on-page and off-page SEO?",
    answer: "On-page SEO refers to optimizations you can make directly on your website, such as improving content, optimizing title tags, and enhancing site speed. Off-page SEO involves activities outside of your website that can impact your rankings, such as building backlinks and managing your online reputation."
  },
]

function Breadcrumb({ items }: { items: Array<{ title: string; href: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground">{item.title}</span>
          ) : (
            <Link href={item.href} className="hover:text-foreground">
              {item.title}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState("light")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as "light" | "dark" | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setIsSearchOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: string | (() => void)) => {
    setIsSearchOpen(false)
    if (typeof command === 'string') {
      router.push(command)
    } else {
      command()
    }
  }

  return (
    <div className={cn(
      "min-h-screen bg-background font-sans antialiased",
      theme === "dark" ? "dark" : ""
    )}>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-2">
          <div className="flex items-center space-x-6">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[80%] sm:w-[385px]">
                <Link href="/" className="flex items-center">
                  <span className="font-bold">Menu</span>
                </Link>
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                  <div className="flex flex-col space-y-3">
                    {mainNav.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-sm font-medium transition-colors hover:text-primary",
                          pathname === item.href
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold">SEO Docs</span>
            </Link>
          </div>
          <div className="flex items-center justify-between flex-1 space-x-4 ml-6">
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {mainNav.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setIsSearchOpen(true)} className="px-2 py-1">
                <span className="sr-only">Search</span>
                <Command className="h-5 w-5" />
                <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Link href="https://github.com/yourusername/seo-docs" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="/donate" passHref>
                <Button variant="outline" size="sm">
                  Donate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
            {sidebarNav.map((section, index) => (
              <div key={index} className="pb-8">
                <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">{section.title}</h4>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-accent">
                    <span>{section.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-1 space-y-1">
                      {section.items.map((item, itemIndex) => (
                        <Link
                          key={itemIndex}
                          href={item.href}
                          className={cn(
                            "block rounded-md px-2 py-1 text-sm hover:bg-accent",
                            pathname === item.href
                              ? "bg-accent font-medium text-accent-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <Breadcrumb items={[
              { title: "Docs", href: "/docs" },
              { title: "Introduction to SEO", href: "/docs" }
            ]} />
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Introduction to SEO</h1>
              <p className="text-xl text-muted-foreground">
                Learn the fundamentals of Search Engine Optimization and how to improve your website&apos;s visibility.
              </p>
            </div>
            <div className="mt-8 space-y-8">
              <section>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" id="what-is-seo">What is SEO?</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Search Engine Optimization (SEO) is the practice of improving a website&apos;s visibility and ranking in search engine results pages (SERPs). By optimizing various aspects of your website, you can increase organic traffic and attract more potential customers or readers to your content.
                </p>
              </section>
              <section>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" id="why-is-seo-important">Why is SEO important?</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  SEO is crucial for several reasons:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li>Increased visibility: Higher rankings in search results lead to more visibility for your website.</li>
                  <li>Targeted traffic: SEO helps you attract users who are actively searching for your content or products.</li>
                  <li>Cost-effective: Compared to paid advertising, SEO can provide long-term benefits at a lower cost.</li>
                  <li>Credibility: Users often trust organic search results more than paid advertisements.</li>
                  <li>Better user experience: Many SEO practices also improve the overall user experience of your website.</li>
                </ul>
              </section>
              <section>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" id="key-components-of-seo">Key components of SEO</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  SEO encompasses various strategies and  techniques, which can be broadly categorized into three main areas:
                </p>
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                  <li>On-Page SEO: Optimizing individual web pages to rank higher and earn more relevant traffic.</li>
                  <li>Technical SEO: Improving the technical aspects of a website to increase the ranking of its pages in search engines.</li>
                  <li>Off-Page SEO: Improving the perception of a site&apos;s popularity, relevance, trustworthiness, and authority by other reputable places on the Internet linking to or promoting it.</li>
                </ol>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  We&apos;ll explore each of these components in detail in the following sections.
                </p>
              </section>
              <section>
                <h2 className="scroll-m-20 border-b pb-2  text-3xl font-semibold tracking-tight first:mt-0" id="getting-started-with-seo">Getting Started with SEO</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  To begin your SEO journey, consider the following steps:
                </p>
                <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                  <li>Conduct keyword research to understand what your target audience is searching for.</li>
                  <li>Optimize your website&apos;s content and structure for both users and search engines.</li>
                  <li>Ensure your website is technically sound, with fast loading times and  mobile-friendliness.</li>
                  <li>Build high-quality backlinks from reputable websites in your industry.</li>
                  <li>Regularly monitor your website&apos;s performance and adjust your SEO strategy as needed.</li>
                </ol>
              </section>
              <section>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" id="next-steps">Next Steps</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Now that you have an overview of SEO, dive deeper into each component by exploring our detailed guides:
                </p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                  <li><Link href="/docs/on-page-seo" className="text-primary hover:underline">On-Page SEO Guide</Link></li>
                  <li><Link href="/docs/technical-seo" className="text-primary hover:underline">Technical SEO Guide</Link></li>
                  <li><Link href="/docs/off-page-seo" className="text-primary hover:underline">Off-Page SEO Guide</Link></li>
                </ul>
              </section>
              <section>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" id="faq">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </div>
          </div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 max-h-[calc(100vh-3.5rem)] overflow-hidden pt-10">
              <ScrollArea className="pb-10">
                <div className="space-y-2">
                  <p className="font-medium">On This Page</p>
                  <ul className="m-0 list-none">
                    <li className="mt-0 pt-2">
                      <a href="#what-is-seo" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">What is SEO?</a>
                    </li>
                    <li className="mt-0 pt-2">
                      <a href="#why-is-seo-important" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">Why is SEO important?</a>
                    </li>
                    <li className="mt-0 pt-2">
                      <a href="#key-components-of-seo" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">Key components of SEO</a>
                    </li>
                    <li className="mt-0 pt-2">
                      <a href="#getting-started-with-seo" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">Getting Started with SEO</a>
                    </li>
                    <li className="mt-0 pt-2">
                      <a href="#next-steps" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">Next Steps</a>
                    </li>
                    <li className="mt-0 pt-2">
                      <a href="#faq" className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground">FAQ</a>
                    </li>
                  </ul>
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t mt-auto">
        <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:justify-between md:py-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">Your Company</a>. The source code is available on <a href="https://github.com/yourusername/seo-docs" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">GitHub</a>.
          </p>
        </div>
      </footer>
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand("/docs")}>
              <span>Search Documentation</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand("/docs/components")}>
              <Menu className="mr-2 h-4 w-4" />
              <span>Components</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(toggleTheme)}>
              {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
              <span>Toggle Theme</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="SEO Topics">
            {sidebarNav.flatMap(section => 
              section.items.map(item => (
                <CommandItem key={item.href} onSelect={() => runCommand(item.href)}>
                  <span>{item.title}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}