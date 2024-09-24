import HeroSection from "./components/hero-section";
import RenderSection from "./components/render-section";
const Home = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <RenderSection className="my-10" />
    </main>
  );
};

export default Home;
