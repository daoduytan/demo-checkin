"use client";

import Image from "next/image";
import { useRef } from "react";
import { usePersonStore } from "@/store/person.store";
import { Button } from "./ui/button";
import { ProfileDetail } from "./profile-detail";
import { EyeIcon } from "lucide-react";

export function RecentCheckIns() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const persons = usePersonStore((state) => state.persons);

    return (
        <div className="py-6 relative">
            <div className="mx-auto px-6">
                {!persons.length ? (
                    <div className="text-center py-11">
                        <p className="text-base text-muted-foreground font-light">
                            No recent check-ins
                        </p>
                    </div>
                ) : (
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="grid grid-cols-5 gap-3 overflow-x-auto pb-2 scrollbar-hide"
                        >
                            {persons.map((person) => {
                                return (
                                    <div
                                        key={person.aliasID}
                                        className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-card hover:bg-muted/30 transition-all duration-200 flex-shrink-0 min-w-[280px] shadow-sm"
                                    >
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-md flex-shrink-0">
                                            <Image
                                                key={person.personID}
                                                src={person.avatar}
                                                alt={person.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground truncate text-base tracking-tight">
                                                {person.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground font-light">
                                                {
                                                    //         new Date(
                                                    //     Number(person.time),
                                                    // ).toLocaleTimeString("en-US", {
                                                    //     hour: "2-digit",
                                                    //     minute: "2-digit",
                                                    // })
                                                }
                                            </p>
                                        </div>
                                        <ProfileDetail
                                            trigger={
                                                <Button
                                                    variant="secondary"
                                                    size="icon"
                                                >
                                                    <EyeIcon />
                                                </Button>
                                            }
                                            person={person}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
