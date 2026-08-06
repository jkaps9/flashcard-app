import { useState } from "react";
import Header from "./components/Header";
import CardManager from "./components/CardManager";

const VIEWS = { study: "STUDY", card_manager: "CARD_MANAGER" };
export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.card_manager);
  const toggleView = () => {
    if(currentView === VIEWS.study) {
      setCurrentView(VIEWS.card_manager);
    } else {
      setCurrentView(VIEWS.study);
    }
  };

  return (
    <>
      <Header onChange={toggleView}></Header>
      <main>
        <section className="all-cards">
          <div className="container">
            {currentView === VIEWS.card_manager && <CardManager></CardManager>}
          </div>
        </section>
      </main>
    </>
  );
}
