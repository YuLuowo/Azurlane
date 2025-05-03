import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { itemId: string } }) {
    const { itemId } = await params;

    const res = await fetch(`https://api.imagineyuluo.com/item/${itemId}`);

    if (!res.ok) {
        return NextResponse.json({ error: `Failed to fetch data for ${itemId}` }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}

