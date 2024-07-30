"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/_base/theme-provider";
import { Sidebar } from "@/components/_base/nav/Sidebar";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export default function RootLayout({ children }: RootLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token && pathname !== "/login") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router, pathname]);

  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  const showLayout = pathname !== "/login";

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider children={undefined}>
                <div className="w-screen h-screen flex">
                  {showLayout && <Sidebar />}
                  <main className="w-full h-full items-center justify-center bg-muted/40">
                    {children}
                  </main>
                </div>
            </ThemeProvider>
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
