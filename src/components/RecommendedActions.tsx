
import { ProfileData } from "./ProfileAnalyzerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateOverallRisk } from "@/lib/riskCalculator";

const RecommendedActions = ({ profile }: { profile: ProfileData }) => {
  const riskScore = calculateOverallRisk(profile);

  // Generate action items based on risk score
  const getActionItems = () => {
    const actions = [];

    if (riskScore < 30) {
      // Low risk profile
      actions.push({
        icon: <CheckCircle className="h-5 w-5 text-detection-safe" />,
        title: "Likely Authentic",
        description: "This profile has a low risk score and appears to be authentic.",
        action: "Safe to Engage",
        actionClass: "bg-detection-safe text-white hover:bg-detection-safe/90",
      });
    } else if (riskScore < 70) {
      // Medium risk profile
      actions.push({
        icon: <AlertCircle className="h-5 w-5 text-detection-warning" />,
        title: "Exercise Caution",
        description: "This profile has some suspicious elements. Verify identity before sharing personal information.",
        action: "Verify First",
        actionClass: "bg-detection-warning text-white hover:bg-detection-warning/90",
      });
    } else {
      // High risk profile
      actions.push({
        icon: <Shield className="h-5 w-5 text-detection-danger" />,
        title: "High Risk - Likely Fake",
        description: "This profile shows strong indicators of being inauthentic. Avoid engaging or sharing information.",
        action: "Report & Block",
        actionClass: "bg-detection-danger text-white hover:bg-detection-danger/90",
      });
    }

    return actions;
  };

  // Get specific improvement suggestions
  const getImprovementSuggestions = () => {
    const suggestions = [];

    // Check for specific issues
    if (profile.accountAge < 3) {
      suggestions.push("Account is very new. Wait to see more activity history before engaging deeply.");
    }

    if (profile.profilePicture === "no" || profile.profilePicture === "default") {
      suggestions.push("Profile lacks a personalized profile picture, which is common in fake accounts.");
    }

    if (!profile.bio || profile.bio.length < 10) {
      suggestions.push("Minimal or missing bio information can indicate a hastily created profile.");
    }

    if (profile.postCount === 0) {
      suggestions.push("No posts detected. Most legitimate users create content regularly.");
    }

    if (profile.followingCount > profile.followerCount * 10 && profile.followingCount > 100) {
      suggestions.push("Following many accounts with few followers is a common pattern in fake profiles.");
    }

    if (profile.followerCount > profile.followingCount * 10 && profile.postCount < 10) {
      suggestions.push("High follower count with little content can indicate purchased followers.");
    }

    // If no specific issues, provide general advice
    if (suggestions.length === 0) {
      if (riskScore < 30) {
        suggestions.push("Profile appears authentic, but always use caution when sharing personal information online.");
      } else {
        suggestions.push("Verify this profile through external means before engaging deeply.");
      }
    }

    return suggestions;
  };

  const actionItems = getActionItems();
  const suggestions = getImprovementSuggestions();

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Recommended Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {actionItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1">{item.icon}</div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{item.title}</h3>
              <p className="text-muted-foreground mb-4">{item.description}</p>
              <Button className={item.actionClass}>{item.action}</Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">Suggestions</h3>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span className="text-sm">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedActions;
