import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { sans, serif } from "@/theme/fonts";

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = getMessages();

  return (
    <html
      className={`${serif.className} ${sans.className}`}
      lang={params.locale}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
