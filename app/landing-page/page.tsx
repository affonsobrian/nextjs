import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Code, Cpu, Menu } from 'lucide-react'

export default function LandingPage() {
  return (
    <div>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
          <div className="container mx-auto  px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Innovative Software Solutions
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  AZVD Technology Services provides cutting-edge software consultancy and AI-powered products to transform your business.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Our Services</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Software Consultancy</CardTitle>
                  <Code className="h-8 w-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <p>Identify and recruit top talent to strengthen your team and drive success.</p>
                  <p>Access a skilled team of developers, designers, and managers to accelerate your growth.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI Integration</CardTitle>
                  <Cpu className="h-8 w-8 mb-2" />
                </CardHeader>
                <CardContent>
                  Seamlessly integrate AI capabilities into your existing systems to enhance efficiency and decision-making.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Custom Solutions</CardTitle>
                  <FileText className="h-8 w-8 mb-2" />
                </CardHeader>
                <CardContent>
                  Tailored software solutions designed to meet your specific business needs and challenges.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="products" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Our AI Products</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Document Analyzer</CardTitle>
                  <FileText className="h-8 w-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    Our advanced AI-powered document analyzer extracts key insights from your documents, saving time and improving accuracy.
                  </CardDescription>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Automated data extraction</li>
                    <li>Sentiment analysis</li>
                    <li>Topic classification</li>
                    <li>Customizable to your industry</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>AI Consultant</CardTitle>
                  <Cpu className="h-8 w-8 mb-2" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    An AI-powered consultant that provides real-time advice and solutions for your business challenges.
                  </CardDescription>
                  <ul className="list-disc list-inside space-y-2">
                    <li>24/7 availability</li>
                    <li>Industry-specific knowledge</li>
                    <li>Data-driven recommendations</li>
                    <li>Continuous learning and improvement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform Your Business?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Contact us today to learn how AZVD Technology Services can help you leverage cutting-edge technology for your success.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full">Contact Us</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">© 2024 AZVD Technology Services. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </a>
            <a className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

