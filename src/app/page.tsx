import Header from "@/components/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHFT - Home Page",
  description: "Home page",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Header />
    </main>
  );
}
