"use client";

import { CDPService } from "@/services/cdp";
import { useQuery } from "@tanstack/react-query";

export function useProfileCDP(profile_id: string) {
    return useQuery({
        queryKey: ["ProfileCDP", profile_id],
        queryFn: () =>
            CDPService.get_profile({
                profile_id,
            }),
    });
}

export function useListEventCDP(profile_id: string) {
    return useQuery({
        queryKey: ["ListEventCDP", profile_id],
        queryFn: () =>
            CDPService.get_events({
                profile_id,
            }),
    });
}
