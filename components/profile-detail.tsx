import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { HanetPersonModel } from "@/types/model/hanet-person";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ProfileInfomation } from "./profile-infomation";
import { ProfileEvents } from "./profile-events";

type Props = {
    person: HanetPersonModel;
};

export function ProfileDetail({ person }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full !py-6 !px-10 bg-red-800">
                    View more
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md p-0">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="flex flex-col items-center gap-5">
                    <div className="size-48 relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-60" />
                        <div className="absolute inset-1 rounded-full bg-background" />

                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow blur-xl" />

                        <div className="absolute inset-1 overflow-hidden rounded-full bg-green-200">
                            <Image
                                className="size-full object-cover block"
                                width={500}
                                height={500}
                                alt={person?.name ?? ""}
                                src={person?.avatar ?? ""}
                            />
                        </div>
                    </div>

                    <div className="text-center relative z-10">
                        <div className="font-bold text-2xl">{person.name}</div>
                        <div className="text-gray-400">{person.title}</div>
                    </div>

                    <Button className="rounded-full" size="lg">
                        Silver
                    </Button>

                    <div className="relative z-50 w-full px-4">
                        <Tabs defaultValue="profile">
                            <TabsList className="w-full">
                                <TabsTrigger value="profile">
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger value="events">Events</TabsTrigger>
                            </TabsList>
                            <TabsContent value="profile">
                                <ProfileInfomation profile_id={person.personID} />
                                <div>
                                    <div>
                                        <pre>
                                            {JSON.stringify(person, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="events">
                                <ProfileEvents
                                    profile_id={person.personID}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
