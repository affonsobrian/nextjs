import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  // Here you would typically process the file, maybe save it to a storage service
  // For this example, we'll just log the file name and return a success message
  console.log(`File received: ${file.name}`)

  return NextResponse.json({ message: 'File uploaded successfully' }, { status: 200 })
}

