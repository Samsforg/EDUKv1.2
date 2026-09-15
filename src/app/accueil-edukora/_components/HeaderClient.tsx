"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

interface HeaderClientProps {
  user: {
    first_name: string;
    last_name: string;
    avatar_url?: string | null;
  };
  unread: number;
}

export default function HeaderClient({ user, unread }: HeaderClientProps) {
  function handleLogout() {
    window.location.href = "/api/auth/logout";
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed bg-surface-container">
          {user.avatar_url ? (
            <Image className="w-full h-full object-cover" src={user.avatar_url} alt="" width={40} height={40} />
          ) : (
            <Image className="w-full h-full object-cover" src="/images/ecran-001.webp" alt="" width={40} height={40} />
          )}
        </div>
        <Image alt="Edukora Logo" className="h-8 object-contain" src="/images/logo-edukora.webp" loading="lazy" width={120} height={32} />
      </div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button onClick={handleLogout} aria-label="Se déconnecter" className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
          <span className="material-symbols-outlined">logout</span>
        </button>
        <Link href="/notifications" className="relative w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
          <span className="material-symbols-outlined">notifications</span>
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-error border-2 border-surface text-[10px] font-bold text-on-primary">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}