import { create } from "zustand";
import { persist } from "zustand/middleware/persist";

export type SettingStore = {
    settings: {
        backgroundImage?: string;
        backgroundColor: string;
        fontSize: number; // 16,
        borderRadius: number; // 50,
        shadowIntensity: number; // 20,
    };
    changeSettings: (settings: Partial<SettingStore["settings"]>) => void;
};

export const useSettingStore = create<SettingStore>()(
    persist(
        (set) => ({
            settings: {
                backgroundImage: "",
                backgroundColor: "#ffffff",
                fontSize: 16,
                borderRadius: 50,
                shadowIntensity: 20,
            },
            changeSettings: (settings) =>
                set((state) => ({
                    ...state,
                    settings: { ...state.settings, ...settings },
                })),
        }),
        {
            name: "SettingStore",
        },
    ),
);
