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
import { useProfileCDP } from "@/hooks/cdp.hooks";
import { AwardIcon, Loader2Icon } from "lucide-react";

type Props = {
    person: HanetPersonModel;
};

export function ProfileDetail({ person }: Props) {
    const { isLoading, data } = useProfileCDP(person.personID);

    function renderContent() {
        if (isLoading) {
            return (
                <div className="flex items-center  justify-center">
                    <Loader2Icon className="animate-spin size-20" />
                </div>
            );
        }

        return (
            <div className="flex flex-col pb-6 items-center gap-5">
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

                <Button
                    className="rounded-full !px-10 !bg-red-800 !text-white"
                    size="lg"
                >
                    <AwardIcon />
                    <span>Silver</span>
                </Button>

                <div className="relative z-50 w-full px-4">
                    <Tabs defaultValue="profile">
                        <TabsList className="w-full">
                            <TabsTrigger value="profile">Profile</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                        </TabsList>
                        <TabsContent value="profile">
                            <ProfileInfomation profile={data} />
                        </TabsContent>
                        <TabsContent value="events">
                            <ProfileEvents profile_id={person.personID} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="rounded-full !py-6 !px-10 bg-red-800">
                    View more
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                {renderContent()}
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
