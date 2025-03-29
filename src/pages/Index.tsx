
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileAnalyzerForm, { ProfileData } from "@/components/ProfileAnalyzerForm";
import RiskScore from "@/components/RiskScore";
import ProfileSummary from "@/components/ProfileSummary";
import RiskFactors from "@/components/RiskFactors";
import RecommendedActions from "@/components/RecommendedActions";
import { calculateOverallRisk } from "@/lib/riskCalculator";

const Index = () => {
  const [analyzedProfile, setAnalyzedProfile] = useState<ProfileData | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);

  useEffect(() => {
    // Check if there's a profile in local storage from the history view
    const storedProfile = localStorage.getItem("currentProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setAnalyzedProfile(profile);
      setIsResultVisible(true);
      localStorage.removeItem("currentProfile");
    }
  }, []);

  const handleAnalyze = (data: ProfileData) => {
    setAnalyzedProfile(data);
    
    // Small delay before showing results for UX
    setTimeout(() => {
      setIsResultVisible(true);
      // Scroll to results
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleNewAnalysis = () => {
    setIsResultVisible(false);
    
    // Small delay before scrolling to top
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container px-4 py-8">
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 md:text-4xl">Fake Account Detector</h1>
            <p className="text-lg text-muted-foreground">
              Analyze social media profiles to detect potential fake accounts
            </p>
          </div>

          <div className="flex justify-center my-8">
            {!isResultVisible && (
              <ProfileAnalyzerForm onAnalyze={handleAnalyze} />
            )}
          </div>
          
          {isResultVisible && analyzedProfile && (
            <div id="results" className="space-y-6 pt-6">
              <div className="flex justify-end">
                <button
                  onClick={handleNewAnalysis}
                  className="text-primary hover:text-primary/70 text-sm font-medium"
                >
                  New Analysis
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <ProfileSummary profile={analyzedProfile} />
                </div>
                <div>
                  <RiskScore score={calculateOverallRisk(analyzedProfile)} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RiskFactors profile={analyzedProfile} />
                <RecommendedActions profile={analyzedProfile} />
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
