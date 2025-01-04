'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// // Set up the worker
// pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Define interface for the PDF metadata
interface PdfMetadata {
  id: string | null;
  filename: string;
  stored_name: string;
  status: string;
}

export default function PDFViewerPage() {
  const { pdfId } = useParams()
  const [pdfData, setPdfData] = useState<PdfMetadata | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [pdfError, setPdfError] = useState<Error | null>(null)
  const [scale, setScale] = useState(1.0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPDFData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/upload?id=${pdfId}`)
        if (response.ok) {
          const data = await response.json()
          console.log('PDF metadata:', data[0])
          setPdfData(data[0])
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
      } catch (error) {
        console.error('Error fetching PDF data:', error)
        setPdfError(error instanceof Error ? error : new Error('Unknown error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPDFData()
  }, [pdfId])

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
    console.log(`PDF loaded successfully. Total pages: ${numPages}`)
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => {
      const newPageNumber = prevPageNumber + offset
      return Math.min(Math.max(1, newPageNumber), numPages || 1)
    })
  }

  function zoomIn() {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0))
  }

  function zoomOut() {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5))
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading PDF data...</div>
  }

  if (pdfError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">
          <h2>Error loading PDF</h2>
          <p>{pdfError.message}</p>
        </div>
      </div>
    )
  }

  if (!pdfData) {
    return <div className="flex justify-center items-center h-screen">No PDF data available.</div>
  }

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <Card className="w-full max-w-6xl mx-auto flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>PDF Viewer: {pdfData.filename}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden flex flex-col items-center">
          <div className="mb-4 space-x-2">
            <Button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>
              Previous
            </Button>
            <span className="mx-2">
              Page {pageNumber} of {numPages || '?'}
            </span>
            <Button onClick={() => changePage(1)} disabled={pageNumber >= (numPages || 1)}>
              Next
            </Button>
            <Button onClick={zoomIn}>Zoom In</Button>
            <Button onClick={zoomOut}>Zoom Out</Button>
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)] w-full">
            <div className="flex justify-center">
              <Document
                file={`/api/pdf/${pdfId}`}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(error: Error) => {
                  console.error('Error loading PDF:', error)
                  setPdfError(error)
                }}
                loading={<div>Loading PDF...</div>}
              >
                {pdfError ? (
                  <p className="text-red-500">Error loading PDF: {pdfError.message}</p>
                ) : (
                  <Page pageNumber={pageNumber} scale={scale} />
                )}
              </Document>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

