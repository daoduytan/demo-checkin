"use client";

import mqtt, { type IClientOptions, MqttClient } from "mqtt";
import { useCallback, useEffect, useState } from "react";
import { CheckinBlank } from "@/components/checkin-blank";

function useMqttClient() {
    const [client, setClient] = useState<MqttClient | null>(null);

    const mqttConnect = useCallback(() => {
        try {
            const options: IClientOptions = {
                host: "mqtt.hilab.cloud",
                port: 443,
                clientId: "mqttx_e87e3aa5",
                protocol: "wss",
                username: "hilab",
                password: "hilab@2024",
            };

            const mqttClient = mqtt.connect(options);

            setClient(mqttClient);
        } catch (error) {
            console.error(error);
            console.log("error", error);
        }
    }, []);

    useEffect(() => {
        mqttConnect();
    }, []);

    return client;
}

const deviceId = "V21441M504";
const MY_IP = "192.168.1.22";

export default function Home() {
    const [showRecent, setShowRecent] = useState(false);
    const [status, setStatus] = useState("Disconnected");
    const [messages, setMessages] = useState<Array<any>>([]);

    useEffect(() => {
        // const clientId = process.env.NEXT_MQTT_CLIENTID || "nextjs_client";
        // const uri =
        //     process.env.NEXT_MQTT_URI || "wss://test.mosquitto.org:8081/mqtt";
        const options = {
            clientId: "mqttx_e87e3aa5",
            username: "hilab",
            password: "hilab@2024",
            reconnectPeriod: 1000, // Tự reconnect sau 1s
        };

        const uri = "wss://mqtt.hilab.cloud:443";

        // const options: IClientOptions = {
        //     host: "mqtt.hilab.cloud",
        //     port: 443,
        //     clientId: "mqttx_e87e3aa5",
        //     protocol: "wss",
        //     username: "hilab",
        //     password: "hilab@2024",
        // };

        // const client = mqtt.connect(options);
        //

        const client = mqtt.connect(uri, options);

        console.log({ client });

        client.on("connect", () => {
            setStatus("Connected");
            //  client.subscribe("test/topic"); // Subscribe topic
            client.subscribe(`/topic/detected/${deviceId}`);
            console.log("Connected to MQTT broker");
        });

        client.on("message", (topic, message) => {
            const newMessage = { topic, message: message.toString() };
            setMessages((prev) => [...prev, newMessage]);
        });

        client.on("error", (err) => {
            setStatus("Error: " + err.message);
        });

        // Cleanup khi unmount
        return () => {
            client.end();
        };
    }, []);

    return (
        <div className="flex h-dvh flex-col bg-stone-100">
            <div className="flex-1 flex items-center justify-center">
                <CheckinBlank />
            </div>
            <div className="shrink-0">
                <div className="text-center flex items-center justify-center relative">
                    <button
                        type="button"
                        className="bg-white border-t cursor-pointer border-x relative z-40 border-gray-300 inline-block px-4 py-2 rounded-t-xl uppercase text-gray-500 hover:text-gray-600 text-sm font-medium"
                        onClick={() => setShowRecent((v) => !v)}
                    >
                        <span>Show Recent</span>
                    </button>
                    <div className="border-t border-gray-300 absolute z-10 bottom-0 left-0 w-full" />
                </div>

                <div className="bg-white">
                    {showRecent && (
                        <div className="p-4 rouned-t-md">Recent</div>
                    )}
                </div>
            </div>
        </div>
    );
}
