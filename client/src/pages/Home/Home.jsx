import MainLayout from "../../components/layout/MainLayout";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/ui/Hero";
import Features from "../../components/ui/Features";
import HowItWorks from "../../components/ui/HowItWorks";
import TechStack from "../../components/ui/TechStack";
import Architecture from "../../components/ui/Architecture";
import CTA from "../../components/ui/CTA";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <MainLayout>
      <Navbar />
      <Hero />
      <Features />
       <HowItWorks />
      <TechStack />
      <Architecture />
      <CTA />
      <Footer />
    </MainLayout>
  );
}

export default Home;