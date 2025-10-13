import Image from "next/image";
import type { HanetPersonModel } from "@/types/model/hanet-person";

type Props = {
    person: HanetPersonModel;
};

export function PersonCheckin({ person }: Props) {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-md animate-fade-in">
            <div className="relative w-96 h-96 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-60" />
                <div className="absolute inset-1 rounded-full bg-background" />

                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow blur-xl" />

                <div className="absolute inset-1 z-50 overflow-hidden rounded-full bg-green-200">
                    <Image
                        className="size-full object-cover block"
                        width={500}
                        height={500}
                        alt={person?.name ?? ""}
                        src={person?.avatar ?? ""}
                    />
                </div>
                <div className="absolute inset-12 rounded-full border-1 border-gray-300 animate-pulse-slower" />
            </div>

            <div className="space-y-3 animate-fade-in-delay">
                <h2 className="text-5xl font-semibold tracking-tight text-foreground">
                    {person?.name}
                </h2>
                <p className="text-xl text-muted-foreground font-light">
                    {person?.title}
                </p>
            </div>
        </div>
    );
}
