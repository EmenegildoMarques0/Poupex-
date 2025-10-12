"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ThemeSelect() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // if (!mounted) return null;

    return (
        <Select value={theme} onValueChange={(val) => setTheme(val)}>
            <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Escolher tema" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="light">🌞 Light</SelectItem>
                <SelectItem value="dark">🌙 Dark</SelectItem>
                <SelectItem value="system">💻 System</SelectItem>
            </SelectContent>
        </Select>
    );
}
