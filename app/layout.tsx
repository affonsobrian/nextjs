import "@/styles/globals.css"
import { ThemeProvider } from "next-themes"
import { Inter } from 'next/font/google'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Code, Cpu, Menu } from 'lucide-react'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "AZVD Tech Services",
  description: "Innovative software consultancy and AI-powered solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <header className="w-full border-b h-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
              <a className="flex items-center justify-center" href="/">
                <span className="sr-only">AZVD Technology Services</span>
                <Cpu className="h-6 w-6" />
                <span className="ml-2 text-lg font-semibold">AZVD Technology Services</span>
              </a>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <div className="hidden md:flex items-center space-x-4">
                <nav className="flex space-x-4">
                  <a className="text-sm font-medium hover:text-primary" href="/#services">
                    Services
                  </a>
                  <a className="text-sm font-medium hover:text-primary" href="/#products">
                    Products
                  </a>
                  <a className="text-sm font-medium hover:text-primary" href="/#contact">
                    Contact
                  </a>
                  <a className="text-sm font-medium hover:text-primary" href="/ai-chat">
                    Document Analyzer
                  </a>
                </nav>
                <Button variant="ghost" asChild>
                  <a href="/login">Log in</a>
                </Button>
                <Button asChild>
                  <a href="/signup">Sign up</a>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-grow">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
