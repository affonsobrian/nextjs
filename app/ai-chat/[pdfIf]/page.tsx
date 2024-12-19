'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'

export default function ExplorePDFPage() {
  const { pdfId } = useParams()
  const [pdfData, setPdfData] = useState<{ name: string, content: string } | null>(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  useEffect(() => {
    const fetchPDFData = async () => {
      try {
        const response = await fetch(`/api/pdfs/${pdfId}`)
        if (response.ok) {
          const data = await response.json()
          setPdfData(data)
        }
      } catch (error) {
        console.error('Error fetching PDF data:', error)
      }
    }

    fetchPDFData()
  }, [pdfId])

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfId, question }),
      })

      if (response.ok) {
        const data = await response.json()
        setAnswer(data.answer)
      }
    } catch (error) {
      console.error('Error asking question:', error)
    }
  }

  if (!pdfData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4 flex flex-col h-[85vh]">
      <Card className="w-full max-w-4xl mx-auto flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>Explore PDF: {pdfData.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-[calc(85vh-20rem)]">
            <div className="space-y-4 pb-4">
              <h3 className="text-lg font-semibold">Ask AI</h3>
              <form onSubmit={handleQuestionSubmit} className="flex space-x-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about the document..."
                  className="flex-grow"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {answer && (
                <div className="mt-4">
                  <h4 className="font-semibold">Answer:</h4>
                  <p>{answer}</p>
                </div>
              )}
              <h3 className="text-lg font-semibold mt-8">Document Content</h3>
              <p className="whitespace-pre-wrap">{pdfData.content}</p>
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.open(`/api/pdfs/${pdfId}/view`, '_blank')}>
            View Original PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
