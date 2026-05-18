import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Advantages from "../Advantages/Advantages";
import Team from "../Team/Team";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import Portfolio from "../Portfolio/Portfolio";
import Pricing from "../Pricing/Pricing";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";

function App() {
  const [currentPage, setCurrentPage] = useState("studio");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  // Ініціалізація стану з localStorage для запобігання зникненню акаунту при оновленні
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/status");
        if (response.ok) {
          const data = await response.json();
          setIsNightMode(data.isNight);
        }
      } catch (error) {
        console.error("Server connection error:", error);
      }
    };
    fetchServerStatus();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage("studio");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setCurrentPage("studio");
  };

  return (
    <div
      style={
        isNightMode ? { backgroundColor: "#1e1e1e", color: "#f4f4fd" } : {}
      }
    >
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <main>
        {currentPage === "studio" && (
          <>
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <Advantages />
            <Team />
            <Portfolio />
            <Pricing />
          </>
        )}

        {currentPage === "portfolio" && <Portfolio />}

        {currentPage === "contacts" && (
          <div style={{ paddingTop: "120px", paddingBottom: "60px" }}>
            <WeatherWidget />
            <Pricing />
          </div>
        )}

        {currentPage === "auth" && (
          <AuthForm onAuthSuccess={handleAuthSuccess} />
        )}
      </main>

      <Footer />

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
