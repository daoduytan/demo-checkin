"use client";

import { useQuery } from "@tanstack/react-query";
import { hanetService } from "@/services/hanet";

export function useListPersonWithPlaceID(place_id: string) {
    return useQuery({
        queryKey: ["ListPersonWithPlaceID", place_id],
        queryFn: () => hanetService.list_person_with_placeID({ place_id }),
    });
}
