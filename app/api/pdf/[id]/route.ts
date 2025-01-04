import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  
  console.log("Pegou id")
  console.log(id)

  // Fetch the PDF metadata (you'll need to implement this based on your data storage)
  const pdfMetadata = await getPdfMetadata(id)
  
  console.log("Pegou Metadata")
  console.log(pdfMetadata)

  if (!pdfMetadata) {
    return new NextResponse('PDF not found', { status: 404 })
  }

  const filePath = path.join(process.cwd(), 'data', 'pdfs', pdfMetadata.stored_name)

  try {
    const pdfBuffer = fs.readFileSync(filePath)
    
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${pdfMetadata.filename}"`,
      },
    })
  } catch (error) {
    console.error('Error reading PDF file:', error)
    return new NextResponse('Error reading PDF file', { status: 500 })
  }
}

async function getPdfMetadata(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload?id=${id}`);
  if (response.ok) {
    const data = await response.json();
    return data[0];
  } else {
    console.log(response.json())
    console.log(response.formData())
  }
  return null;
}

