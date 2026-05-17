import { useState } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Advantages from "../Advantages/Advantages";
import Team from "../Team/Team";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import styles from "./App.module.css";
import Portfolio from "../Portfolio/Portfolio";
import Pricing from "../Pricing/Pricing";
import Footer from "../Footer/Footer";
import Modal from "../Modal/Modal";

function App() {
  const [currentPage, setCurrentPage] = useState("studio");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className={styles.mainContent}>
        {/* Головна сторінка: виводимо всі секції підряд */}
        {currentPage === "studio" && (
          <>
            <Hero onOpenModal={() => setIsModalOpen(true)} />
            <Advantages />
            <Team />
            <Portfolio />
            <Pricing />
          </>
        )}

        {/* Сторінка Portfolio тепер ізольована, якщо на неї клікнути в меню */}
        {currentPage === "portfolio" && (
          <>
            <Portfolio />
          </>
        )}

        {/* Сторінка Контактів */}
        {currentPage === "contacts" && (
          <div
            className="container"
            style={{ paddingTop: "120px", paddingBottom: "60px" }}
          >
            <h1 className={styles.pageTitle}>Our Office Details</h1>
            <WeatherWidget />
            <Pricing />
          </div>
        )}
      </main>

      <Footer />

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}

export default App;
