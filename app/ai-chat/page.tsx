'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, Send, User, Bot } from 'lucide-react'

export default function AIChatPage() {
  const [file, setFile] = useState<File | null>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('File uploaded successfully')
        // You can add further logic here, such as sending a message to the AI about the uploaded file
      } else {
        console.error('File upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <Card className="w-full max-w-4xl mx-auto flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>AI Chat Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-[calc(100vh-16rem)]">
            <div className="space-y-4 pb-4">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`p-2 rounded-full ${m.role === 'user' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                      {m.role === 'user' ? <User className="h-6 w-6 text-white" /> : <Bot className="h-6 w-6 text-gray-700" />}
                    </div>
                    <div className={`rounded-lg p-3 max-w-[80%] ${m.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full space-x-2">
            <Input
              type="file"
              onChange={handleFileChange}
              className="flex-grow"
            />
            <Button onClick={handleFileUpload} disabled={!file}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

