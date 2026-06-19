// /app/_layout.tsx
import "../styles/global.css";
import { Slot } from "expo-router";

export default function RootLayout() {
    return (
        <Slot/>
    );
}