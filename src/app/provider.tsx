"use client";

import { ThemeProvider } from "@mui/material";
import type React from "react";
import { theme } from "@/theme/theme";

type ProviderProps = { children: React.ReactNode };

export default function Provider({ children }: ProviderProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
