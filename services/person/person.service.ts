const HANET_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI3NjAzNjg3MDE3MjQ4MjA0ODIiLCJlbWFpbCI6ImhpZXB0cmFuLmRldkBnbWFpbC5jb20iLCJjbGllbnRfaWQiOiJiZDRjMzdkOGFlZTRhNDAwYjdlODQzZTViNGMwMjJhOCIsInR5cGUiOiJhdXRob3JpemF0aW9uX2NvZGUiLCJpYXQiOjE3NjAzNDM5MTYsImV4cCI6MTc5MTg3OTkxNn0.Ji-5SNVyl-XAtwClEfT4sEtSU3kiFYq_mJqLSg-4EB8";

export const personService = {
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
};
