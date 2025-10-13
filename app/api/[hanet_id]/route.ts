import { type NextRequest, NextResponse } from "next/server";

export function GET() {
    console.log("Hello World");
    return new NextResponse("Hello World1");
}

export async function POST(request: NextRequest) {
    const a = await request.json();

    console.log(a);

    return new NextResponse(a, { status: 200 });
}

// https://digihub.hilab.cloud/api/webhook/hanet/67317e6b697f013d14400244
