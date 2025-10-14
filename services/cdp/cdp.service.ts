const CDP_API_URL = "https://cdpapi.baoden.vn";

const CDP_EMAIL = "user@digihub.com";
const CDP_PASSWORD = "Thang@1234";
const SOURCE_EVENT_ID = "6b3639a4-0c81-45da-9d13-a76aeb4cb42c";

export const CDPService = {
    get_token: async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("username", CDP_EMAIL);
        urlencoded.append("password", CDP_PASSWORD);

        const url = `${CDP_API_URL}/user/token`;

        const response = await fetch(url, {
            method: "POST",
            headers: myHeaders,
            body: urlencoded,
            redirect: "follow",
        });

        return (await response.json()) as {
            access_token: string;
            token_type: string;
            roles: Array<string>;
            preference: any;
        };
    },

    push_event: async ({
        profile_id,
        session_id,
        events,
    }: {
        profile_id: string;
        session_id: string;
        events: Array<{
            type: string;
            properties: Record<string, any>;
            context?: {
                tag: string;
            };
        }>;
    }) => {
        const dataEventHanet = {
            source: {
                id: SOURCE_EVENT_ID, // connect.cdp_source_id,
            },
            session: {
                id: session_id, // data.hash, //'user-session-id', webhook id
            },
            profile: {
                id: profile_id, // data.id, // 'user-profile-id', webhook id
            },
            context: {
                // user_agent: 'Hanet Camera System',
            },
            properties: {},
            events,
            // [
            //     {
            //         type: 'custom-event',
            //         properties: data,
            //         context: {
            //             tag: 'hanet-camera-checkin',
            //         },
            //     },
            // ],
        };

        const response = await fetch(`${CDP_API_URL}/track`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataEventHanet),
        });

        const data = await response.json();
        return data;
    },
    get_profile: async ({ profile_id }: { profile_id: string }) => {
        const token = await CDPService.get_token();

        const response = await fetch(`${CDP_API_URL}/profile/${profile_id}`, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });

        return await response.json();
    },

    get_events: async ({
        profile_id,
    }: {
        profile_id: string;
    }) => {
        const token = await CDPService.get_token();

        const url = `${CDP_API_URL}/events/profile/${profile_id}`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        }).then((res) => res.json());

        return {
            ...response,
            result: response.result
            // .filter((item: any) =>
            //     LIST_EVENT_TYPE.includes(item.name),
            // ),
        };
    }
};
