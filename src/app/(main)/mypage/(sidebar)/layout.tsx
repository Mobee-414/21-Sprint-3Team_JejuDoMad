import SideMenu from '@/components/ui/sideMenu';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='mx-auto mt-10 flex w-full max-w-245 flex-col items-center gap-6 px-4 pb-20 md:mt-7.5 md:max-w-186 md:flex-row md:items-start md:gap-7.5 md:px-7.5 md:pb-24 lg:mt-10 lg:max-w-245 lg:gap-7.5 lg:px-10 lg:pb-30'>
      <div className='w-full max-w-72.5 md:w-40 md: shrink-0 lg:w-72.5'>
        <SideMenu />
      </div>

      <div className='w-full md:min-w-0 md:flex-1 lg:max-w-160'>{children}</div>
    </div>
  );
}