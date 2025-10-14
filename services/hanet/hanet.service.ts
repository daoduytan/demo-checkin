import { HanetPersonModel } from "@/types/model/hanet-person";

const HANET_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NjAzNjg3MDE3MjQ4MjA0ODIiLCJlbWFpbCI6ImhpZXB0cmFuLmRldkBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJiZDRjMzdkOGFlZTRhNDAwYjdlODQzZTViNGMwMjJhOCIsInR5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJpYXQiOjE3NjAzNDM5MTYsImV4cCI6MTc5MTg3OTkxNn0.Ji-5SNVyl-XAtwClEfT4sEtSU3kiFYq_mJqLSg-4EB8";

export const hanetService = {
    async get_person({ person_id }: { person_id: string }) {
        const res = await fetch(
            "https://partner.hanet.ai/person/getUserInfoByPersonID",
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    token: HANET_TOKEN,
                    personID: person_id,
                }),
            },
        );

        const res_data = await res.json();

        if (res_data.returnMessage !== "Success") {
            return null;
        }

        return res_data?.data;
    },
    async list_person_with_placeID({ place_id }: { place_id: string }) {
        const res = await fetch(
            "https://partner.hanet.ai/person/getListByPlace",
            {
                method: "POST",
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    token: HANET_TOKEN,
                    placeID: place_id,
                    type: String(-1),
                    page: String(1),
                    size: String(100),
                }),
            },
        );

        const res_data = await res.json();

        if (res_data.returnMessage !== "Success") {
            return null;
        }

        return res_data?.data as Array<HanetPersonModel>;
    },
};
