"use client";

import { CDPService } from "@/services/cdp";
import { useEffect } from "react";

type Props = {
    profile_id: string;
}

export function ProfileInfomation({ profile_id }: Props) {
    useEffect(() => {
        async function fetchProfile() {
            try {
                const profile = await CDPService.get_profile({ profile_id })

                console.log(profile)

            } catch (error) { }
        }

        fetchProfile();
    }, []);

    return <div></div>;
}
