import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import QueryProvider from "@/shared/providers/queryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans")}>
      <QueryProvider>
        <body>{children}</body>
      </QueryProvider>
    </html>
  );
}
