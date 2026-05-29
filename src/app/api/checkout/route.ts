import { NextRequest, NextResponse } from 'next/server';

const POLAR_TOKEN = 'polar_oat_13lHah0boGAt0mtNFDqeQF8qJTjJpAaFNNlUS2McJpP';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { polarProductId, productName } = body;

    if (!polarProductId) {
      return NextResponse.json({ error: 'Missing polarProductId' }, { status: 400 });
    }

    console.log(`🚀 Creating Polar checkout session for product: ${productName} (ID: ${polarProductId})...`);

    // Call Polar API to generate a Checkout Session
    const polarRes = await fetch('https://api.polar.sh/v1/checkouts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${POLAR_TOKEN}`
      },
      body: JSON.stringify({
        products: [polarProductId],
        // You can redirect them to a success page on your domain after payment
        success_url: `https://greatwooden.com/products?success=true&product=${encodeURIComponent(productName || 'plans')}`
      })
    });

    if (!polarRes.ok) {
      const errText = await polarRes.text();
      console.error('❌ Polar API checkout session generation failed:', errText);
      return NextResponse.json({ error: 'Polar checkout creation failed', detail: errText }, { status: 500 });
    }

    const checkoutData = await polarRes.json();
    console.log('✅ Polar checkout session generated successfully! URL:', checkoutData.url);

    return NextResponse.json({ url: checkoutData.url });
  } catch (error: any) {
    console.error('❌ Checkout API error:', error);
    return NextResponse.json({ error: 'Internal Server Error', message: error.message }, { status: 500 });
  }
}
