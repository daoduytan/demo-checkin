"use client";

import { CheckinFrame } from "@/components/check-in-frame";
import { RecentCheckIns } from "@/components/recent-check-in";
import { Button } from "@/components/ui/button";
import { DEVICE_ID, MQTT_PORT, MY_IP } from "@/constants";
import { personService } from "@/services/person";
import { usePersonStore } from "@/store/person.store";
import { ChevronDownIcon, ChevronUpIcon, SettingsIcon } from "lucide-react";
import mqtt, { MqttClient } from "mqtt";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const TOPIC = `topic/detected/${DEVICE_ID}`;

export default function Home() {
    const [showRecent, setShowRecent] = useState(false);
    const [status, setStatus] = useState("Disconnected");
    const persons = usePersonStore((state) => state.persons);
    const person = usePersonStore((state) => state.person);
    const setPerson = usePersonStore((state) => state.setPerson);

    useEffect(() => {
        const client = mqtt.connect(`ws://${MY_IP}:${MQTT_PORT}`);

        // 🧠 Đổi IP thành IP của máy chạy Mosquitto

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
                        setPerson({ ...new_person, time: Date.now() });
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

    // useEffect(() => {
    //     // const clientId = process.env.NEXT_MQTT_CLIENTID || "nextjs_client";
    //     // const uri =
    //     //     process.env.NEXT_MQTT_URI || "wss://test.mosquitto.org:8081/mqtt";
    //     const options = {
    //         clientId: "mqttx_e87e3aa5",
    //         username: "hilab",
    //         password: "hilab@2024",
    //         reconnectPeriod: 1000, // Tự reconnect sau 1s
    //     };
    //
    //     const uri = "wss://mqtt.hilab.cloud:443";
    //
    //     // const options: IClientOptions = {
    //     //     host: "mqtt.hilab.cloud",
    //     //     port: 443,
    //     //     clientId: "mqttx_e87e3aa5",
    //     //     protocol: "wss",
    //     //     username: "hilab",
    //     //     password: "hilab@2024",
    //     // };
    //
    //     // const client = mqtt.connect(options);
    //     //
    //
    //     const client = mqtt.connect(uri, options);
    //
    //     console.log({ client });
    //
    //     client.on("connect", () => {
    //         setStatus("Connected");
    //         //  client.subscribe("test/topic"); // Subscribe topic
    //         client.subscribe(`/ topic / detected / ${ deviceId }`);
    //
    //         console.log("Connected to MQTT broker");
    //     });
    //
    //     client.on("message", (topic, message) => {
    //         const newMessage = { topic, message: message.toString() };
    //         setMessages((prev) => [...prev, newMessage]);
    //     });
    //
    //     client.on("error", (err) => {
    //         setStatus("Error: " + err.message);
    //     });
    //
    //     // Cleanup khi unmount
    //     return () => {
    //         client.end();
    //     };
    // }, []);
    //

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
                <CheckinFrame person={person} />
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
                    {showRecent && <RecentCheckIns />}
                </div>
            </div>
        </div>
    );
}
