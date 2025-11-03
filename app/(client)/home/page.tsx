import Casestudy from "./components/Casestudy";
import CTAFooter from "./components/CTAFooter";
import Hero from "./components/Hero";
import Partner from "./components/Partner";
import PriceList from "./components/PriceList";
import Procedure from "./components/Procedure";
import Project from "./components/Project";
import Questions from "./components/Questions";
import Ready from "./components/Ready";
import Solution from "./components/Solution";
import Why from "./components/Why";

const DesignAppPage = () => {
  return (
    <div className="flex flex-col gap-6 xl:gap-14 overflow-hidden">
      <Hero />
      <Ready />
      <Why />
      <Procedure />
      <Solution />
      <Project />
      <PriceList />
      <Partner />
      <Casestudy />
      <Questions />
      <CTAFooter />
    </div>
  );
};

export default DesignAppPage;
