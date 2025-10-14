import { type NextRequest, NextResponse } from "next/server";
import { CDPService } from "@/services/cdp";
import { personService } from "@/services/person";
import type { HanetWebhookData } from "@/types/model/hanet-webhook-data";

export function GET() {
    console.log("Hello World");
    return new NextResponse("Hello World1");
}

export async function POST(request: NextRequest) {
    const data = (await request.json()) as HanetWebhookData;

    if (data.personID) {
        try {
            const hanet_person = await personService.get_person({
                person_id: data.personID,
            });

            // const token = await CDPService.get_token();

            const event = await CDPService.push_event({
                profile_id: data.personID,
                session_id: data.hash,
                events: [
                    {
                        type: "custom-event",
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

// https://digihub.hilab.cloud/api/webhook/hanet/67317e6b697f013d14400244
