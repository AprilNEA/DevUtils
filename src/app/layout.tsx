import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import clsx from "clsx";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

const Toaster = dynamic(
  async () => ({
    default: (await import("react-hot-toast")).Toaster,
  }),
  { ssr: false },
);

export const metadata: Metadata = {
  title: "DevUtils",
  description: "All-in-one Toolbox for Developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "h-full")}>
        <Theme className="h-full">{children}</Theme>
        <Toaster />
      </body>
    </html>
  );
}
