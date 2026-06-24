import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/common/LoadingScreen";
import gsap from "gsap";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        gsap.to("#logo-wrapper", {
          scale: 0.85,
          duration: 0.3,
        });
      } else {
        gsap.to("#logo-wrapper", {
          scale: 1,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return <AppRoutes />;
}

export default App;
