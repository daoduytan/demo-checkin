"use client";

import { LucideIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
    profile: any;
};

export function ProfileInfomation({ profile }: Props) {
    return (
        <div>
            <ProfileInfoRow
                label="Email"
                value={profile?.data?.name}
                icon={MailIcon}
            />

            <ProfileInfoRow
                label="Phone"
                value={profile?.data?.contact?.phone?.main}
                icon={PhoneIcon}
            />

            <div>
                {
                    <pre>
                        {
                            //JSON.stringify(profile?.data, null, 2)
                        }
                    </pre>
                }
            </div>
        </div>
    );
}

function ProfileInfoRow({
    label,
    value,
    icon: Icon,
}: {
    label: string;
    value: string;
    icon: LucideIcon;
}) {
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
                {value ?? "No value"}
            </div>
        </div>
    );
}
