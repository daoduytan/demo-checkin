import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckinFrame } from "@/components/check-in-frame";

export default function SettingsPage() {
    return (
        <div className="flex h-dvh bg-stone-100">
            <div className="bg-white flex flex-col w-full max-w-md">
                <div className="bg-white flex items-center space-x-4 px-4 py-2">
                    <Button asChild size="icon">
                        <Link href="/">
                            <ChevronLeftIcon />
                        </Link>
                    </Button>
                    <div>Settings</div>
                </div>
                <div className="flex-1">
                    <div>FormSetting</div>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <CheckinFrame person={null} />
            </div>
        </div>
    );
}
