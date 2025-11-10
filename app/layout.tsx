
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';

export const metadata = {
  title: 'Simple Ticket',
  description: 'Minimal ticketing with attachments, auth, and notifications',
};

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="th">
      <body>
        <header className="border-b dark:border-zinc-800">
          <div className="container flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="logo" className="w-8 h-8" />
              <span className="font-semibold">Simple Ticket</span>
            </div>
            <div className="flex items-center gap-2">
              <LangToggle />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}
