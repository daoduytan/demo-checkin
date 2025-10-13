"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HanetPersonModel } from "@/types/model/hanet-person";

type PersonCheckIn = HanetPersonModel & {
    time: number;
};

type PersonStore = {
    person: PersonCheckIn | null;
    persons: Array<PersonCheckIn>;
    setPerson: (person: PersonCheckIn) => void;
};

export const usePersonStore = create<PersonStore>()(
    persist(
        (set, get) => ({
            person: null,
            persons: [],
            setPerson: (person) =>
                set(() => {
                    let persons = get().persons;

                    const existing_person = persons.find(
                        (p) => p.personID === person.personID,
                    );

                    if (existing_person) {
                        const _person = persons.filter(
                            (p) => p.personID !== person.personID,
                        );

                        persons = [person, ..._person];
                    } else {
                        persons = [person, ...persons];
                    }

                    return {
                        persons,
                        person,
                    };
                }),
        }),
        {
            name: "PersonStore",
        },
    ),
);
