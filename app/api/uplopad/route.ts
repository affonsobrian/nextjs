import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // You can handle GET request here
  return NextResponse.json(
    [
        {
          "id": "67640cda5344d0a440742e1f",
          "filename": "pdf.pdf",
          "stored_name": "29ef12ab-6270-4a1c-ad0e-6ae1a28fcbfa.pdf",
          "status": "queued",
          "processed_data": ""
        },
        {
          "id": "67640ce55344d0a440742e20",
          "filename": "Tiffany_Password_Reset_Process.pdf",
          "stored_name": "d4df43f7-ccc0-4da1-9be2-bc3db5108f0e.pdf",
          "status": "queued",
          "processed_data": ""
        },
        {
          "id": "67640ced5344d0a440742e21",
          "filename": "Oculavis_Factsheet.pdf",
          "stored_name": "8ea528c0-0eca-4964-ae4d-02156df5c6f5.pdf",
          "status": "queued",
          "processed_data": ""
        },
        {
          "id": "67640cf05344d0a440742e22",
          "filename": "TESTE.pdf",
          "stored_name": "2db72883-ae1f-4562-8ede-231da27f1e48.pdf",
          "status": "queued",
          "processed_data": ""
        }
      ]
  );
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  // Process the data from the request body here
  return NextResponse.json({ status: 'success', receivedData: data });
}
