import { NextResponse } from 'next/server';

export async function GET() {
    const res = await fetch('https://api.imagineyuluo.com/ship');

    if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}