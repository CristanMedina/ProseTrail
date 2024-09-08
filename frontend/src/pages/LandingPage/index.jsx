import Hero from '../../components/LandingPageComponents/Hero';
import RecentBooks from '../../components/LandingPageComponents/RecentBooks';
import TutorialSection from '../../components/LandingPageComponents/TutorialSection';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 gap-4">
      <Hero />
      <RecentBooks />
      <TutorialSection />
    </div>
  );
};

export default LandingPage;
