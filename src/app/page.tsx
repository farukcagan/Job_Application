import Content from "@/components/Content/Content";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/pages/Auth/AuthScreen"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AuthModal />
      <Header />
      <Content />
      <Footer />
    </main>
  );
}
