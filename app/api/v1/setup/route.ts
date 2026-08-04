import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Log data ingestion yang diterima dari Setup Wizard
    console.log('[API /api/v1/setup] Received setup data:', body);

    return NextResponse.json({
      success: true,
      message: 'Setup data successfully ingested into BULAENG OS',
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process setup data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'READY',
    system: 'BULAENG Clean Slate Engine',
  });
}