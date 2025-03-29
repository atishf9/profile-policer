
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, Twitter, ExternalLink } from "lucide-react";
import { verifyTwitterProfile } from "@/lib/twitterVerification";
import { ProfileData } from "./ProfileAnalyzerForm";

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

    setIsLoading(true);
    setError(null);

    try {
      const result = await verifyTwitterProfile(username);
      
      if (result.success && result.profileData) {
        onVerified(result.profileData);
      } else {
        setError(result.error || "Failed to verify Twitter profile");
      }
    } catch (err) {
      setError("An error occurred during verification");
      console.error(err);
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
        <p className="text-sm text-muted-foreground">
          Verify a Twitter profile using the Twitter API to analyze authenticity.
        </p>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Twitter username"
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
