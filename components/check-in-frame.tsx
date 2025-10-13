import { UserIcon } from "lucide-react";
import Image from "next/image";
import type { HanetPersonModel } from "@/types/model/hanet-person";

type Props = {
    person: HanetPersonModel | null;
};

export function CheckinFrame({ person }: Props) {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8 max-w-md animate-fade-in">
            <div className="relative w-96 h-96 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-60" />
                <div className="absolute inset-1 rounded-full bg-background" />

                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow blur-xl" />

                {person ? (
                    <div className="absolute inset-1 z-50 overflow-hidden rounded-full bg-green-200">
                        <Image
                            className="size-full object-cover block"
                            width={500}
                            height={500}
                            alt={person?.name ?? ""}
                            src={person?.avatar ?? ""}
                        />
                    </div>
                ) : (
                    <div className="absolute inset-6 rounded-full bg-gradient-to-br from-muted via-muted/80 to-muted/60 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-blue-400/40 animate-float-1" />
                        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-float-2" />
                        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-pink-400/40 animate-float-3" />
                        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 rounded-full bg-blue-400/40 animate-float-4" />

                        <UserIcon className="size-28 text-muted-foreground/30 animate-breathing" />
                    </div>
                )}
                <div className="absolute inset-12 rounded-full border-1 border-gray-300 animate-pulse-slower" />
            </div>

            <div className="space-y-3 animate-fade-in-delay">
                <h2 className="text-5xl font-semibold tracking-tight text-foreground">
                    {person ? person.name : "Ready"}
                </h2>
                <p className="text-xl text-muted-foreground font-light">
                    {person ? person.title : "Waiting for check-in"}
                </p>
            </div>
        </div>
    );
}
