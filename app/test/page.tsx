"use client";

import { CDPService } from "@/services/cdp";

export default function Test() {
    function onClick() {
        CDPService.get_token().then((res) => console.log(res));
    }

    return (
        <div>
            <button type="button" onClick={onClick}>
                A
            </button>
        </div>
    );
}
