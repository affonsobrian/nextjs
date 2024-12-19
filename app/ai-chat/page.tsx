'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Upload, FileText } from 'lucide-react'

interface PDFFile {
  id: string;
  filename: string;
  stored_name: string;
  status: 'analyzed' | 'queued';
  processed_data: string;
}

export default function AIChatPage() {
  const [file, setFile] = useState<File | null>(null)
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([])
  const router = useRouter()

  useEffect(() => {
    // Fetch the list of PDF files from your API
    const fetchPDFs = async () => {
      try {
        const response = await fetch('/api/upload')
        if (response.ok) {
          const data = await response.json()
          setPdfFiles(data)
        } else {
          console.error('API call failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching PDFs:', error)
      }
    }

    fetchPDFs()
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = async () => {
    console.log("OLHA AQUI PORRA")
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('File uploaded successfully')
        // Refresh the list of PDFs
        const updatedPDFs = await fetch('http://localhost:8000/api/pdfs').then(res => res.json())
        setPdfFiles(updatedPDFs)
        setFile(null)
      } else {
        console.error('File upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const handleExplore = (pdfId: string) => {
    router.push(`/ai-chat/explore/${pdfId}`)
  }

  return (
    <div className="container mx-auto p-4 flex flex-col h-[85vh]">
      <Card className="w-full max-w-4xl mx-auto flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>AI Chat Assistant - PDF Analyzer</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-[calc(85vh-12rem)]">
            <div className="space-y-4 pb-4">
              {pdfFiles.map(pdf => (
                <div key={pdf.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-6 w-6" />
                    <span>{pdf.filename}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={pdf.status === 'analyzed' ? 'text-green-500' : 'text-yellow-500'}>
                      {pdf.status === 'analyzed' ? 'Analyzed' : 'Queued'}
                    </span>
                    {pdf.status === 'analyzed' && (
                      <Button onClick={() => handleExplore(pdf.id)}>Explore</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex space-x-2">
          <Input
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            className="flex-grow"
          />
          <Button onClick={handleFileUpload} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
