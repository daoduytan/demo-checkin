"use client";

import { useListEventCDP } from "@/hooks/cdp.hooks";
import { formatSmartTime } from "@/lib/format-time";
import { Loader2Icon } from "lucide-react";

type Props = {
    profile_id: string;
};

export function ProfileEvents({ profile_id }: Props) {
    const { isLoading, data } = useListEventCDP(profile_id);

    if (isLoading) {
        return <Loader2Icon className="animate-spin" />;
    }

    return (
        <div className="relative">
            <div className="relative z-10 pt-4 space-y-4">
                {data?.result?.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex items-center space-x-4"
                        >
                            <div className="size-[21px] flex items-center justify-center rounded-full bg-white border">
                                {
                                    // <div className="size-[11px] rounded-full bg-red-800" />
                                }
                            </div>
                            <div className="bg-white border flex-1 rounded-lg p-2">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-gray-500 text-sm">
                                    {item?.metadata?.time?.insert
                                        ? formatSmartTime(
                                            item?.metadata?.time
                                                ?.insert as string,
                                        )
                                        : null}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute top-0 left-[10px] bottom-0 border-l" />
            {
                // <pre>{JSON.stringify(data, null, 2)}</pre>
            }
        </div>
    );
}
