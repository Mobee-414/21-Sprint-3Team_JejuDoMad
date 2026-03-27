import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/shared/providers/queryProvider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans")}>
      <QueryProvider>
        <body>
          {children}
          <Toaster />
        </body>
      </QueryProvider>
    </html>
  );
}
