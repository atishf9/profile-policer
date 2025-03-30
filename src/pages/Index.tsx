import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileAnalyzerForm, { ProfileData } from "@/components/ProfileAnalyzerForm";
import RiskScore from "@/components/RiskScore";
import ProfileSummary from "@/components/ProfileSummary";
import RiskFactors from "@/components/RiskFactors";
import RecommendedActions from "@/components/RecommendedActions";
import TwitterVerification from "@/components/TwitterVerification";
import ReverseImageSearch from "@/components/ReverseImageSearch";
import ChatBot from "@/components/ChatBot";
import { calculateOverallRisk } from "@/lib/riskCalculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [analyzedProfile, setAnalyzedProfile] = useState<ProfileData | null>(null);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  useEffect(() => {
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
    
    setTimeout(() => {
      setIsResultVisible(true);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleNewAnalysis = () => {
    setIsResultVisible(false);
    setActiveTab("form");
    
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen animated-gradient-bg animated-particle-bg">
      <Header />
      
      <main className="flex-1 container px-4 py-8 relative z-10">
        <section className="max-w-4xl mx-auto mb-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 md:text-4xl">Fake Account Detector</h1>
            <p className="text-lg text-muted-foreground">
              Analyze social media profiles to detect potential fake accounts
            </p>
          </div>

          {!isResultVisible && (
            <div className="flex justify-center my-8">
              <Tabs 
                defaultValue="form" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full max-w-xl"
              >
                <TabsList className="grid grid-cols-3 mb-8">
                  <TabsTrigger value="form">Manual Analysis</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter Verify</TabsTrigger>
                  <TabsTrigger value="image">Image Search</TabsTrigger>
                </TabsList>
                
                <TabsContent value="form">
                  <ProfileAnalyzerForm onAnalyze={handleAnalyze} />
                </TabsContent>
                
                <TabsContent value="twitter">
                  <TwitterVerification onVerified={handleAnalyze} />
                </TabsContent>
                
                <TabsContent value="image">
                  <ReverseImageSearch />
                </TabsContent>
              </Tabs>
            </div>
          )}
          
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
      <ChatBot />
    </div>
  );
};

export default Index;
