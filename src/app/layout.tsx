import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn("font-sans")}>
      <body>{children}</body>
    </html>
  );
}
