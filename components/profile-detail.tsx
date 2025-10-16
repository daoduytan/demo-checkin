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
import { useListEventCDP, useProfileCDP } from "@/hooks/cdp.hooks";
import type { HanetPersonModel } from "@/types/model/hanet-person";
import {
    AwardIcon,
    EyeIcon,
    Loader2Icon,
    ShoppingBagIcon,
    WalletIcon,
} from "lucide-react";
import Image from "next/image";
import { ProfileInfomation } from "./profile-infomation";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card } from "./ui/card";
import { JSX } from "react";

type Props = {
    person: HanetPersonModel;
    trigger?: JSX.Element;
};

const vnd = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

export function ProfileDetail({ person, trigger }: Props) {
    const { isLoading, data } = useProfileCDP(person.personID);
    // const { data: events } = useListEventCDP(person.personID);
    // const { isLoading, data } = useProfileCDP("2835582677883551744");
    // const { data: events } = useListEventCDP("2835582677883551744");

    // console.log(events, data);

    // const quantities = events?.result
    //     ?.filter((i: any) => i.type === "product-added-to-basket")
    //     .reduce((acc, event) => {
    //         return acc + event.properties.quantity;
    //     }, 0);

    // const total_price =
    //     events?.result
    //         ?.filter((i: any) => i.type === "product-added-to-basket")
    //         .reduce((acc, event) => {
    //             return acc + event.properties.subtotal;
    //         }, 0) || 0;
    //

    const total_price = data?.data?.metrics?.ltv ?? 0;

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

                <div className="text-center space-y-2">
                    <div className="text-sm text-muted-foreground">Rating:</div>

                    <Button
                        className="rounded-full !px-10 !bg-red-800 !text-white"
                        size="lg"
                    >
                        <AwardIcon />
                        <span>
                            {person.personID === "2835582677883551744"
                                ? "VIP"
                                : "Standard"}
                        </span>
                    </Button>
                </div>

                <div className="grid grid-cols-2 w-full gap-4">
                    <Card className="p-4 shadow-none gap-4">
                        <div className="flex flex-col text-center items-center space-x-2 space-y-4">
                            <Avatar className="size-10">
                                <AvatarFallback>
                                    <ShoppingBagIcon />
                                </AvatarFallback>
                            </Avatar>
                            <span className="uppercase text-xs text-gray-500 font-medium">
                                Total item
                            </span>
                        </div>
                        <div className="font-bold text-xl text-center">
                            {total_price === 0 ? 0 : 12}
                        </div>
                    </Card>
                    <Card className="p-4 shadow-none gap-4">
                        <div className="flex flex-col text-center items-center space-x-2 space-y-4">
                            <Avatar className="size-10">
                                <AvatarFallback>
                                    <WalletIcon />
                                </AvatarFallback>
                            </Avatar>
                            <span className="uppercase text-xs text-gray-500 font-medium">
                                Total price
                            </span>
                        </div>
                        <div className="font-bold text-xl text-center">
                            {vnd.format(total_price)}
                        </div>
                    </Card>
                </div>

                <ProfileInfomation profile={data} />

                {
                    // <div className="relative z-50 w-full px-4">
                    //     <Tabs defaultValue="profile">
                    //         <TabsList className="w-full">
                    //             <TabsTrigger value="profile">Profile</TabsTrigger>
                    //             <TabsTrigger value="events">Events</TabsTrigger>
                    //         </TabsList>
                    //         <TabsContent value="profile">
                    //             <ProfileInfomation profile={data} />
                    //         </TabsContent>
                    //         <TabsContent value="events">
                    //             <ProfileEvents profile_id={person.personID} />
                    //         </TabsContent>
                    //     </Tabs>
                    // </div>
                }
            </div>
        );
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger ?? (
                    <Button
                        size="lg"
                        className="rounded-full cursor-pointer !py-6 !px-10 bg-red-800 hover:bg-red-700"
                    >
                        <EyeIcon />
                        <span className="text-lg">View more</span>
                    </Button>
                )}
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
