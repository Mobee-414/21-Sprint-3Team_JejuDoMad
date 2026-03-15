import GNB from "@/components/gnb/gnb";
import Footer from "@/components/footer/footer";

export default function MainLayout ( {
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GNB />
      <main>{children}</main>
      <Footer />
    </>
  );
}
