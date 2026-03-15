import GNB from "@/components/gnb/gnb";
import "@/styles/globals.css";

export default function MainLayout ( {
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GNB />
      <main>{children}</main>
    </>
  );
}
