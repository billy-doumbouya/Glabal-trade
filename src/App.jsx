import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ToastProvider from "./components/ToastProvider";
import GlobalLoader from "./components/GlobalLoader.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import { ScrollToTop } from "./components/ui/ScroolTop.jsx";

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      mirror: false,
      offset: 120,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location]);

  return (
    <>
      <ScrollToTop />
      <GlobalLoader active={isLoading} />
      <div
        className={`min-h-screen bg-slate-950 text-white ${isLoading ? "pointer-events-none" : ""}`}
      >
        <ToastProvider />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
