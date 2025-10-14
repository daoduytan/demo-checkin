"use client";

import Link from "next/link";
import mqtt from "mqtt";
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { HanetPersonModel } from "@/types/model/hanet-person";
import { RecentCheckIns } from "@/components/recent-check-in";
import { Button } from "@/components/ui/button";
import { DEVICE_ID, MQTT_PORT, MY_IP } from "@/constants";
import { personService } from "@/services/person";
import { usePersonStore } from "@/store/person.store";
import { CheckinFrame } from "@/components/check-in-frame";

const TOPIC = `/topic/detected/${DEVICE_ID}`;

export default function MqttCheckin() {
    const [showRecent, setShowRecent] = useState(false);
    const [status, setStatus] = useState("Disconnected");
    const persons = usePersonStore((state) => state.persons);
    const setPerson = usePersonStore((state) => state.setPerson);
    const [personCheckIn, setPersonCheckIn] = useState<HanetPersonModel | null>(
        null,
    );

    useEffect(() => {
        const client = mqtt.connect(`ws://${MY_IP}:${MQTT_PORT}`);

        client.on("connect", () => {
            console.log("✅ Connected to MQTT Broker");
            client.subscribe(TOPIC);
            setStatus("Connected");
        });

        client.on("message", async (topic, msg) => {
            try {
                if (topic === TOPIC) {
                    const payload = JSON.parse(msg.toString());

                    const person_id = payload?.person_id;

                    const new_person = await personService.get_person({
                        person_id,
                    });

                    if (new_person) {
                        setPersonCheckIn(new_person);
                        setPerson({ ...new_person });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });

        return () => {
            client.end();
        };
    }, [setPerson]);

    return (
        <div className="flex h-dvh flex-col bg-stone-100">
            <Button
                asChild
                size="icon"
                className="absolute top-4 right-4 rounded-full"
            >
                <Link href="/settings">
                    <SettingsIcon />
                </Link>
            </Button>
            <div className="flex-1 flex items-center justify-center">
                <CheckinFrame person={personCheckIn} />
            </div>
            <div className="shrink-0">
                <button
                    type="button"
                    onClick={() => setShowRecent(!showRecent)}
                    className="w-full py-3 backdrop-blur-xl bg-background/80 border-t border-b flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                    {showRecent ? (
                        <>
                            <ChevronDownIcon className="w-4 h-4" />
                            Hide Recent
                        </>
                    ) : (
                        <>
                            <ChevronUpIcon className="w-4 h-4" />
                            Show Recent ({persons.length})
                        </>
                    )}
                </button>

                <div className="bg-white">
                    {showRecent ? <RecentCheckIns /> : null}
                </div>
            </div>
        </div>
    );
}
