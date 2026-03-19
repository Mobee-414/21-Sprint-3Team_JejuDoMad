import GNB from "@/components/gnb/gnb";
import Footer from "@/components/footer/footer";

export default function MainLayout ( {
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <GNB />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
