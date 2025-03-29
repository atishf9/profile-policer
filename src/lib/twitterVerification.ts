
import { ProfileData } from "@/components/ProfileAnalyzerForm";
import { toast } from "sonner";

// Twitter API is restricted from browser due to CORS
// In a production app, this should be handled by a backend service
// For demo purposes, we'll generate mock data

/**
 * Verify a Twitter profile (Mock implementation due to CORS restrictions)
 * @param username The Twitter username to verify
 * @returns Promise with verification result
 */
export const verifyTwitterProfile = async (username: string): Promise<{
  success: boolean;
  data?: any;
  profileData?: ProfileData;
  error?: string;
}> => {
  try {
    // For demo purposes, we'll simulate API response with mock data
    // In production, this should be handled by a backend API
    console.log(`Simulating API call for Twitter user: ${username}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate consistent mock data based on username
    const nameParts = username.split(/[_.\d]+/);
    const displayName = nameParts.map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ').trim() || username;
    
    // Use username to generate consistent numbers
    const usernameHash = [...username].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    const followerCount = Math.floor((usernameHash % 1000) * 10) + 50;
    const followingCount = Math.floor((usernameHash % 500) * 5) + 100;
    const tweetCount = Math.floor((usernameHash % 300) * 20) + 30;
    const accountAge = Math.floor((usernameHash % 36) + 1);
    
    // Create mock profile data
    const profileData: ProfileData = {
      username: username,
      displayName: displayName,
      bio: `This is a simulated Twitter profile for ${displayName}. #TwitterUser`,
      followerCount: followerCount,
      followingCount: followingCount,
      postCount: tweetCount,
      accountAge: accountAge,
      profilePicture: "yes",
      platform: "twitter",
      profileUrl: `https://twitter.com/${username}`,
      timestamp: Date.now(),
      id: Math.random().toString(36).substring(2, 11),
    };
    
    toast.info("Using simulated Twitter data (API restricted in browser)", {
      description: "In a production app, this would use a backend service to access the Twitter API"
    });
    
    return {
      success: true,
      profileData,
    };
  } catch (error) {
    console.error("Twitter verification error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};

/**
 * Get URL for reverse image search
 * @param imageUrl URL of the image to check
 * @returns A URL to open Google reverse image search
 */
export const getGoogleReverseImageSearchUrl = (imageUrl: string): string => {
  return `https://www.google.com/searchbyimage?image_url=${encodeURIComponent(imageUrl)}`;
};

