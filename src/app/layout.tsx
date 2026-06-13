/** biome-ignore-all lint/suspicious/noExplicitAny: any in use */
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Provider from "@/app/provider";
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

  return (
    <html className={`${serif.variable} ${sans.variable}`} lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
