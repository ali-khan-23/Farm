"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideNavbarOn = ["/login", "/register"];
  const showNavbar = !hideNavbarOn.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <main>{children}</main>
    </>
  );
}
