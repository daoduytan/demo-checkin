"use client";

//import type { CheckIn } from "@/types/checkin";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

type RecentCheckInsProps = {
    checkIns: any[];
};

export function RecentCheckIns({ checkIns }: RecentCheckInsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -300,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="px-8 py-6 relative">
            <div className="container mx-auto">
                {checkIns.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-base text-muted-foreground font-light">
                            No recent check-ins
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div
                            ref={scrollContainerRef}
                            className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-12"
                        >
                            {checkIns.map((checkIn) => (
                                <div
                                    key={checkIn.id}
                                    className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-card hover:bg-muted/30 transition-all duration-200 flex-shrink-0 min-w-[280px] shadow-sm"
                                >
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md flex-shrink-0">
                                        <Image
                                            src={
                                                checkIn.imageUrl ||
                                                "/placeholder.svg"
                                            }
                                            alt={checkIn.userName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-foreground truncate text-base tracking-tight">
                                            {checkIn.userName}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-light">
                                            {checkIn.timestamp.toLocaleTimeString(
                                                "en-US",
                                                {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                },
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
