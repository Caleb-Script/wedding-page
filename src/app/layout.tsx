/** biome-ignore-all lint/suspicious/noExplicitAny: any in use */
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Provider from "@/app/provider";
import { sans, serif } from "@/theme/fonts";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html className={`${serif.className} ${sans.className}`} lang="de">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Provider>{children}</Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
