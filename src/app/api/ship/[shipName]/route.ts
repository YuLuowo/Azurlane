import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { shipName: string } }) {
    const { shipName } = await params;

    const res = await fetch(`https://api.imagineyuluo.com/ship/${shipName}`);

    if (!res.ok) {
        return NextResponse.json({ error: `Failed to fetch data for ${shipName}` }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}

