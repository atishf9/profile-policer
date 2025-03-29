
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Twitter, ExternalLink, Info } from "lucide-react";
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
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Twitter className="h-5 w-5 text-[#1DA1F2]" />
          Twitter Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="outline" className="bg-blue-50">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-xs text-blue-700">
            For demo purposes, this uses simulated data. In a production app, Twitter API would be accessed via a backend service.
          </AlertDescription>
        </Alert>
        
        <p className="text-sm text-muted-foreground">
          Enter a Twitter username to analyze account authenticity.
        </p>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Twitter username (without @)"
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleVerify} 
            disabled={isLoading}
            className="bg-[#1DA1F2] hover:bg-[#1a94df]"
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
          <Alert variant="destructive">
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
              className="hover:underline truncate"
            >
              {username && `https://twitter.com/${username}`}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TwitterVerification;
