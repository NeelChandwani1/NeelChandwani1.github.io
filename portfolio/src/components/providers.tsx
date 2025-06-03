'use client';

import { useEffect, useState } from 'react';
import { Navbar } from './navbar';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </>
  );
}
