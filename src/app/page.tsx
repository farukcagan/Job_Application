import AuthModal from "@/components/Auth/AuthScreen";
import Content from "@/components/Content/Content";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";


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
