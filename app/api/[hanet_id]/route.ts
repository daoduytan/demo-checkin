import { type NextRequest, NextResponse } from "next/server";
import { CDPService } from "@/services/cdp";
import { hanetService } from "@/services/hanet";
import type { HanetWebhookData } from "@/types/model/hanet-webhook-data";

export function GET() {
    console.log("Hello World");
    return new NextResponse("Hello World1");
}

export async function POST(request: NextRequest) {
    const data = (await request.json()) as HanetWebhookData;

    if (data.personID) {
        try {
            const hanet_person = await hanetService.get_person({
                person_id: data.personID,
            });

            // const token = await CDPService.get_token();

            const event = await CDPService.push_event({
                profile_id: data.personID,
                session_id: data.hash,
                events: [
                    {
                        //type: "custom-event",
                        type: "cutomer-checkin",
                        properties: {
                            ...data,
                            ...hanet_person,
                        },
                        context: {
                            tag: "hanet-camera-checkin",
                        },
                    },
                ],
            });

            console.log(event);
        } catch (error) {
            console.log(error);
        }
    }

    return new NextResponse("Ok", { status: 200 });
}
