import { NextResponse } from 'next/server';
import { getClient } from '../../../lib/mongodb'; // MongoDB connection
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ObjectId } from 'mongodb';

// Define the directory where PDFs will be stored
const UPLOAD_DIRECTORY = path.join(process.cwd(), 'data/pdfs');

// Ensure the directory exists
if (!fs.existsSync(UPLOAD_DIRECTORY)) {
  fs.mkdirSync(UPLOAD_DIRECTORY, { recursive: true });
}

// Define interface for the PDF metadata
interface PdfMetadata {
  id: string | null;
  filename: string;
  stored_name: string;
  status: string;
  processed_data: string;
}

// GET endpoint to fetch all PDF metadata from MongoDB
export async function GET(request: Request) {
  try {
    // Get the `id` query parameter from the URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Extracts the 'id' from the URL query parameters

    const db = await getClient();
    const pdfsCollection = db.collection<PdfMetadata>('pdfs');

    let pdfs;

    if (id) {
      // If an id is provided, fetch the specific PDF metadata by id
      const pdf = await pdfsCollection.findOne({ _id: new ObjectId(id) }); // Use MongoDB's ObjectId
      if (!pdf) {
        return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
      }

      pdfs = [pdf]; // Wrap the result in an array
    } else {
      // If no id is provided, fetch all PDF metadata
      pdfs = await pdfsCollection.find().toArray();
    }

    // Map the results to match the desired output format
    const result = pdfs.map(pdf => ({
      id: pdf._id.toString(), // Convert ObjectId to string
      filename: pdf.filename,
      stored_name: pdf.stored_name,
      status: pdf.status,
      processed_data: pdf.processed_data || '',
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in GET /api/upload:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST endpoint to handle file uploads
export async function POST(request: Request) {
  try {
    // Parse the form data using request.formData()
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }

    // Generate a unique name for the file
    const storedName = `${uuidv4()}.pdf`;
    const fileLocation = path.join(UPLOAD_DIRECTORY, storedName);

    // Convert the file to a Buffer and save it to the file system
    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    // Save the uploaded PDF file to the file system
    fs.writeFileSync(fileLocation, fileBuffer);

    // Create metadata to insert into MongoDB
    const pdfMetadata: PdfMetadata = {
      id: null,
      filename: file.name,
      stored_name: storedName,
      status: 'analyzed', // Default status
      processed_data: '', // Initially empty
    };

    // Insert the metadata into MongoDB
    const db = await getClient();
    const pdfsCollection = db.collection<PdfMetadata>('pdfs');
    const result = await pdfsCollection.insertOne(pdfMetadata);

    // Fetch the newly inserted PDF metadata
    const storedPdf = await pdfsCollection.findOne({ _id: result.insertedId });

    return NextResponse.json({
      id: storedPdf?._id.toString(),
      filename: storedPdf?.filename,
      stored_name: storedPdf?.stored_name,
      status: storedPdf?.status,
      processed_data: storedPdf?.processed_data || '',
    });
  } catch (error) {
    console.error('Error in POST /api/upload:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
