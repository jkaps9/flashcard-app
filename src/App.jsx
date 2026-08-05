import Header from "./components/Header";
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
