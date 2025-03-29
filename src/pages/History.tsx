
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HistoryList from "@/components/HistoryList";

const History = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Analysis History</h1>
          <p className="text-muted-foreground mb-8">
            View your previous profile analyses and check their risk scores
          </p>
          
          <HistoryList />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
