import { NextRequest, NextResponse } from 'next/server';

const POLAR_TOKEN = process.env.POLAR_API_KEY!;
const POLAR_PRODUCT_ID = process.env.POLAR_PRODUCT_ID!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productName } = body;

    const polarRes = await fetch('https://api.polar.sh/v1/checkouts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${POLAR_TOKEN}`
      },
      body: JSON.stringify({
        products: [POLAR_PRODUCT_ID],
        success_url: `https://heroanimalart.com/products?success=true&product=${encodeURIComponent(productName || '')}`
      })
    });

    if (!polarRes.ok) {
      const errText = await polarRes.text();
      return NextResponse.json({ error: 'Polar checkout creation failed', detail: errText }, { status: 500 });
    }

    const checkoutData = await polarRes.json();
    return NextResponse.json({ url: checkoutData.url });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
