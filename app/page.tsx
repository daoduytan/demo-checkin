"use client";

import { useListPersonWithPlaceID } from "@/hooks/hanet.hooks";
import { Loader2Icon } from "lucide-react";
import dynamic from "next/dynamic";

const MqttCheckin = dynamic(() => import("./mqtt-checkin"), { ssr: false });

export default function Home() {
    const { isLoading, data, error } = useListPersonWithPlaceID("27950");

    if (isLoading) {
        return (
            <div className="flex items-center h-dvh justify-center">
                <Loader2Icon className="animate-spin size-20" />
            </div>
        );
    }

    return <MqttCheckin />;
}
