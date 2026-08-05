import Header from "./components/Header";
import CardList from "./components/CardList";
import Study from "./components/Study";
import CardManager from "./components/CardManager";

export default function App() {
  return (
    <>
      <Header></Header>
      <main>
        <section className="all-cards">
          <CardManager></CardManager>
        </section>
      </main>
    </>
  );
}
