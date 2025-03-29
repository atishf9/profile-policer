
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProfileData } from "./ProfileAnalyzerForm";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type RiskFactor = {
  name: string;
  score: number;
  description: string;
  tooltip: string;
};

const RiskFactors = ({ profile }: { profile: ProfileData }) => {
  // Calculate risk factors based on the profile data
  const calculateRiskFactors = (profile: ProfileData): RiskFactor[] => {
    const factors: RiskFactor[] = [
      {
        name: "Username Characteristics",
        score: calculateUsernameRisk(profile.username, profile.displayName),
        description: getUsernameRiskDescription(profile.username),
        tooltip: "Evaluates patterns in the username that may indicate automated creation"
      },
      {
        name: "Profile Completeness",
        score: calculateProfileCompletenessRisk(profile),
        description: getProfileCompletenessDescription(profile),
        tooltip: "Measures how completely the profile has been filled out"
      },
      {
        name: "Follower/Following Ratio",
        score: calculateFollowerRatioRisk(profile.followerCount, profile.followingCount),
        description: getFollowerRatioDescription(profile.followerCount, profile.followingCount),
        tooltip: "Analyzes the balance between followers and accounts being followed"
      },
      {
        name: "Activity Level",
        score: calculateActivityRisk(profile.postCount, profile.accountAge),
        description: getActivityDescription(profile.postCount, profile.accountAge),
        tooltip: "Evaluates posting frequency relative to account age"
      },
      {
        name: "Account Age",
        score: calculateAgeRisk(profile.accountAge),
        description: getAgeDescription(profile.accountAge),
        tooltip: "Newer accounts are generally higher risk than established ones"
      }
    ];

    return factors;
  };

  // Calculate username risk (random-looking usernames score higher risk)
  const calculateUsernameRisk = (username: string, displayName: string): number => {
    if (!username) return 90;
    
    // Check for patterns indicating fake accounts
    const hasNumbers = /\d/.test(username);
    const hasRandomChars = /[_.\-]/.test(username);
    const isLong = username.length > 15;
    const nameMatch = displayName && username.toLowerCase().includes(displayName.toLowerCase());
    
    // Calculate base score
    let score = 0;
    if (hasNumbers) score += 20;
    if (hasRandomChars) score += 15;
    if (isLong) score += 15;
    if (!nameMatch) score += 20;
    if (/\d{4,}/.test(username)) score += 30; // Many sequential numbers
    
    return Math.min(score, 100);
  };

  // Calculate profile completeness risk
  const calculateProfileCompletenessRisk = (profile: ProfileData): number => {
    let missingFields = 0;
    
    if (!profile.bio || profile.bio.length < 10) missingFields++;
    if (profile.profilePicture === "no") missingFields += 2;
    if (profile.profilePicture === "default") missingFields += 1;
    if (profile.postCount === 0) missingFields++;
    
    const score = missingFields * 25;
    return Math.min(score, 100);
  };

  // Calculate follower/following ratio risk
  const calculateFollowerRatioRisk = (followers: number, following: number): number => {
    if (followers === 0 && following === 0) return 50;
    if (followers === 0) return 70;
    if (following === 0) return 40;
    
    const ratio = following / followers;
    
    if (ratio > 10) return 80; // Following many, few followers
    if (ratio > 5) return 60;
    if (ratio < 0.1) return 70; // Many followers, following few (potential bot)
    
    return 30; // Balanced ratio
  };

  // Calculate activity level risk
  const calculateActivityRisk = (posts: number, ageMonths: number): number => {
    if (ageMonths === 0) return 70;
    if (posts === 0) return 80;
    
    const postsPerMonth = posts / ageMonths;
    
    if (postsPerMonth > 100) return 70; // Extremely high posting frequency
    if (postsPerMonth < 0.5) return 60; // Very low activity
    
    return 30; // Moderate activity
  };

  // Calculate account age risk
  const calculateAgeRisk = (ageMonths: number): number => {
    if (ageMonths === 0) return 90;
    if (ageMonths < 1) return 80;
    if (ageMonths < 3) return 60;
    if (ageMonths < 6) return 40;
    return 20;
  };

  // Get description for username risk
  const getUsernameRiskDescription = (username: string): string => {
    if (!username) return "No username provided";
    if (/\d{4,}/.test(username)) return "Contains many numbers (potential automated creation)";
    if (/[_.\-]/.test(username) && /\d/.test(username)) return "Contains random characters and numbers";
    if (/\d/.test(username)) return "Contains numbers in username";
    return "Username appears normal";
  };

  // Get description for profile completeness
  const getProfileCompletenessDescription = (profile: ProfileData): string => {
    if (!profile.bio && profile.profilePicture === "no") return "Missing bio and profile picture";
    if (!profile.bio) return "Missing or minimal bio information";
    if (profile.profilePicture === "no") return "No profile picture uploaded";
    if (profile.profilePicture === "default") return "Using default profile picture";
    return "Profile is reasonably complete";
  };

  // Get description for follower ratio
  const getFollowerRatioDescription = (followers: number, following: number): string => {
    if (followers === 0 && following === 0) return "No followers or following anyone";
    if (followers === 0) return "Following others but has no followers";
    if (following === 0) return "Has followers but not following anyone";
    
    const ratio = following / followers;
    
    if (ratio > 10) return `Following ${following} accounts but only has ${followers} followers`;
    if (ratio < 0.1) return `Has many followers (${followers}) but following few (${following})`;
    
    return "Balanced follower/following ratio";
  };

  // Get description for activity
  const getActivityDescription = (posts: number, ageMonths: number): string => {
    if (posts === 0) return "No posts detected";
    if (ageMonths === 0) return "Brand new account";
    
    const postsPerMonth = posts / ageMonths;
    
    if (postsPerMonth > 100) return `Very high activity (${Math.round(postsPerMonth)} posts/month)`;
    if (postsPerMonth < 0.5) return "Very low posting activity";
    
    return `Normal activity level (${Math.round(postsPerMonth)} posts/month)`;
  };

  // Get description for account age
  const getAgeDescription = (ageMonths: number): string => {
    if (ageMonths === 0) return "Brand new account";
    if (ageMonths < 1) return "Account less than a month old";
    if (ageMonths < 3) return `Account only ${ageMonths} months old`;
    if (ageMonths < 12) return `Account created ${ageMonths} months ago`;
    return `Established account (${ageMonths} months old)`;
  };

  // Get color based on score
  const getScoreColor = (score: number) => {
    if (score < 30) return "text-detection-safe";
    if (score < 70) return "text-detection-warning";
    return "text-detection-danger";
  };

  const riskFactors = calculateRiskFactors(profile);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Risk Factors</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {riskFactors.map((factor, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="font-medium">{factor.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-80">{factor.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className={`font-medium ${getScoreColor(factor.score)}`}>
                {factor.score}%
              </span>
            </div>
            <Progress value={factor.score} className="h-2" />
            <p className="text-sm text-muted-foreground">{factor.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RiskFactors;
