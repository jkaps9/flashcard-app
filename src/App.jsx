import { useState } from "react";
import Header from "./components/Header";
import CardManager from "./components/CardManager";
import Study from "./components/Study.jsx";

const VIEWS = { study: "STUDY", card_manager: "CARD_MANAGER" };
export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.card_manager);
  const toggleView = () => {
    if (currentView === VIEWS.study) {
      setCurrentView(VIEWS.card_manager);
    } else {
      setCurrentView(VIEWS.study);
    }
  };

  return (
    <>
      <Header
        toggled={currentView === VIEWS.study}
        onChange={toggleView}
      ></Header>
      <main>
        <section className="all-cards">
          <div className="container">
            <CardManager
              currentView={currentView}
              toggleView={toggleView}
            ></CardManager>
          </div>
        </section>
      </main>
    </>
  );
}
