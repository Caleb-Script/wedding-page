/** biome-ignore-all lint/suspicious/noExplicitAny: any in use */

import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Provider from "@/app/provider";
import { readAnalyticsConsent } from "@/lib/analytics/consent";
import { WeddingAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { sans, serif } from "@/theme/fonts";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  const analyticsConsent = readAnalyticsConsent(await cookies());

  return (
    <html className={`${serif.variable} ${sans.variable}`} lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <WeddingAnalyticsProvider initialConsent={analyticsConsent}>
            <Provider>{children}</Provider>
          </WeddingAnalyticsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
