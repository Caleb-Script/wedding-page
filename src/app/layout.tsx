"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { sans, serif } from "@/theme/fonts";
import { theme } from "@/theme/theme";

// export const metadata: Metadata = {
//   title: "Caleb & Rachel",
//   description: "Wedding information",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.className} ${sans.className}`}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
