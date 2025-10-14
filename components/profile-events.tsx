"use client";

import { CDPService } from "@/services/cdp";
import { useEffect } from "react";

type Props = {
    profile_id: string;
};

export function ProfileEvents({ profile_id }: Props) {
    useEffect(() => {
        async function fetchProfile() {
            try {
                const events = await CDPService.get_events({ profile_id });

                console.log({ events });
            } catch (error) {}
        }

        fetchProfile();
    }, [profile_id]);

    return <div>dasd</div>;
}
