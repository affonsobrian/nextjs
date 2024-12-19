"use server"

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // This is a mock response. In a real application, you would fetch this data from your database or file system.
    const mockPDFs = [
      { id: '1', filename: 'document1.pdf', stored_name: 'doc1.pdf', status: 'analyzed', processed_data: 'Sample data 1' },
      { id: '2', filename: 'document2.pdf', stored_name: 'doc2.pdf', status: 'queued', processed_data: '' },
    ];

    return NextResponse.json(mockPDFs);
  } catch (error) {
    console.error('Error in GET /api/upload:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Here you would typically save the file and process it
    console.log(`File received: ${file.name}`);

    // Return a success response
    return NextResponse.json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error in POST /api/upload:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
