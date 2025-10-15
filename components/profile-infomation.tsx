"use client";

import {
    HeartIcon,
    LucideIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
    profile: any;
};

export function ProfileInfomation({ profile }: Props) {
    return (
        <div className="w-full">
            <ProfileInfoRow
                label="Email"
                value={
                    profile?.data?.contact?.email?.main ??
                    profile?.data?.contact?.email?.private ??
                    profile?.data?.contact?.email?.business
                }
                icon={MailIcon}
            />

            <ProfileInfoRow
                label="Phone"
                value={
                    profile?.data?.contact?.phone?.main ??
                    profile?.data?.contact?.phone?.business ??
                    profile?.data?.contact?.phone?.mobile
                }
                icon={PhoneIcon}
            />

            <ProfileInfoRow
                label="Address"
                value={Object.values(profile?.data?.contact?.address ?? {})
                    .filter(Boolean)
                    .join(", ")}
                icon={MapPinIcon}
            />

            <ProfileInfoRow
                label="Interst"
                value={(profile?.data?.preferences?.other ?? []).join(", ")}
                icon={HeartIcon}
            />
        </div>
    );
}

function ProfileInfoRow({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string | null;
    icon: LucideIcon;
}) {
    console.log({ value });
    return (
        <div className="flex space-x-4 border-b py-4 items-center">
            <div className="flex space-x-2 shrink-0 items-center">
                <Avatar>
                    <AvatarFallback>
                        <Icon />
                    </AvatarFallback>
                </Avatar>
                <span className="text-gray-500">{label}</span>
            </div>
            <div
                className={cn(
                    "flex-1 text-right",
                    !value ? "text-gray-500 italic" : "font-bold",
                )}
            >
                {!value ? "No value" : value}
            </div>
        </div>
    );
}
