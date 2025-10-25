"use client";

import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    console.log("Theme applied:", theme, "Classes:", root.className);
  }, [theme]);

  return <>{children}</>;
}
