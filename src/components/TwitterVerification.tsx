
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Twitter, ExternalLink, Info, Search, User, Calendar, MessageSquare, Users } from "lucide-react";
import { verifyTwitterProfile } from "@/lib/twitterVerification";
import { ProfileData } from "./ProfileAnalyzerForm";
import { toast } from "sonner";

type TwitterVerificationProps = {
  onVerified: (profileData: ProfileData) => void;
};

const TwitterVerification = ({ onVerified }: TwitterVerificationProps) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<Partial<ProfileData> | null>(null);

  const handleVerify = async () => {
    if (!username) {
      setError("Please enter a Twitter username");
      return;
    }

    // Remove @ if included
    const cleanUsername = username.startsWith('@') ? username.substring(1) : username;
    
    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyTwitterProfile(cleanUsername);
      
      if (result.success && result.profileData) {
        setPreviewData(result.profileData);
        onVerified(result.profileData);
        toast.success("Profile analysis complete!");
      } else {
        setError(result.error || "Failed to verify Twitter profile");
        toast.error("Verification failed", {
          description: result.error || "Failed to verify Twitter profile"
        });
      }
    } catch (err) {
      setError("An error occurred during verification");
      console.error(err);
      toast.error("Verification error", {
        description: "An unexpected error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl overflow-hidden border-none shadow-lg animate-fade-in bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
      <CardHeader className="bg-gradient-to-r from-[#1DA1F2] to-blue-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <Twitter className="h-6 w-6 text-white animate-pulse-scale" />
          Twitter Profile Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <Alert className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 animate-fade-in">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-xs text-blue-700 dark:text-blue-300">
            For demo purposes, this uses simulated data. Try usernames like: elonmusk, barackobama, billgates, cristiano, ladygaga
          </AlertDescription>
        </Alert>
        
        <p className="text-sm text-muted-foreground">
          Enter a Twitter username to analyze account authenticity.
        </p>
        
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <Search className="h-4 w-4" />
            </div>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Twitter username (without @)"
              className="w-full pl-9 ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 transition-all border-blue-200 hover:border-blue-300 focus:border-blue-400"
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
          </div>
          <Button 
            onClick={handleVerify} 
            disabled={isLoading}
            className="bg-[#1DA1F2] hover:bg-[#1a94df] shadow-sm hover:shadow transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
        
        {error && (
          <Alert className="border-red-200 bg-red-50 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300 animate-fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            <a 
              href={`https://twitter.com/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline truncate text-blue-600 dark:text-blue-400 transition-colors"
            >
              {username && `https://twitter.com/${username}`}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2">
          {previewData ? (
            // Display actual data from API response
            <>
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow animate-fade-in">
                <div className="text-gray-500 dark:text-gray-400 flex justify-center mb-1">
                  <Users className="h-3 w-3" />
                </div>
                <div className="text-xs font-medium">{previewData.followerCount?.toLocaleString()}</div>
                <div className="text-xs capitalize">followers</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow animate-fade-in">
                <div className="text-gray-500 dark:text-gray-400 flex justify-center mb-1">
                  <User className="h-3 w-3" />
                </div>
                <div className="text-xs font-medium">{previewData.followingCount?.toLocaleString()}</div>
                <div className="text-xs capitalize">following</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow animate-fade-in">
                <div className="text-gray-500 dark:text-gray-400 flex justify-center mb-1">
                  <MessageSquare className="h-3 w-3" />
                </div>
                <div className="text-xs font-medium">{previewData.postCount?.toLocaleString()}</div>
                <div className="text-xs capitalize">posts</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow animate-fade-in">
                <div className="text-gray-500 dark:text-gray-400 flex justify-center mb-1">
                  <Calendar className="h-3 w-3" />
                </div>
                <div className="text-xs font-medium">{previewData.accountAge}</div>
                <div className="text-xs capitalize">years</div>
              </div>
            </>
          ) : (
            // Empty placeholders
            ["followers", "following", "posts", "years"].map((stat, i) => (
              <div 
                key={stat} 
                className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm text-center border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow animate-fade-in" 
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-gray-500 dark:text-gray-400 flex justify-center mb-1">
                  {stat === "followers" && <Users className="h-3 w-3" />}
                  {stat === "following" && <User className="h-3 w-3" />}
                  {stat === "posts" && <MessageSquare className="h-3 w-3" />}
                  {stat === "years" && <Calendar className="h-3 w-3" />}
                </div>
                <div className="text-xs capitalize">{stat}</div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TwitterVerification;
