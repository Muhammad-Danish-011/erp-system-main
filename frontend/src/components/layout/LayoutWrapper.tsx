"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/sign-in" || pathname === "/sign-up-hidden-onlyForOffice";

  return (

    <div className="flex h-screen">
      {/* Sidebar */}
      {!isAuthPage && <Sidebar />}

      <div className="flex flex-1 flex-col">
        {/* Header */}
        {!isAuthPage && <Header />}

        {/* Main content with background */}
        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8"
          style={{
            backgroundImage: "url('/erp.png')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
