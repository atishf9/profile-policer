
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
    
    // Define mock users with consistent data
    const mockUsers: Record<string, Partial<ProfileData>> = {
      "elonmusk": {
        displayName: "Elon Musk",
        bio: "Technoking of Tesla, Chief Twit of Twitter",
        followerCount: 158700000,
        followingCount: 678,
        postCount: 31700,
        accountAge: 15,
        profilePicture: "yes"
      },
      "barackobama": {
        displayName: "Barack Obama",
        bio: "Dad, husband, President, citizen.",
        followerCount: 132800000,
        followingCount: 569,
        postCount: 16400,
        accountAge: 14,
        profilePicture: "yes"
      },
      "billgates": {
        displayName: "Bill Gates",
        bio: "Co-chair of the Bill & Melinda Gates Foundation.",
        followerCount: 59900000,
        followingCount: 283,
        postCount: 4200,
        accountAge: 13,
        profilePicture: "yes"
      },
      "narendramodi": {
        displayName: "Narendra Modi",
        bio: "Prime Minister of India",
        followerCount: 90700000,
        followingCount: 2450,
        postCount: 37500,
        accountAge: 12,
        profilePicture: "yes"
      },
      // Default case for any other username
      "default": {
        displayName: username.charAt(0).toUpperCase() + username.slice(1),
        bio: `This is a simulated profile for ${username}.`,
        followerCount: 1250,
        followingCount: 843,
        postCount: 267,
        accountAge: 3,
        profilePicture: "yes"
      }
    };
    
    // Create mock profile data - use predefined if available, otherwise use default
    const mockData = mockUsers[username.toLowerCase()] || mockUsers.default;
    
    const profileData: ProfileData = {
      username: username,
      displayName: mockData.displayName || username,
      bio: mockData.bio || `This is a simulated Twitter profile.`,
      followerCount: mockData.followerCount || 500,
      followingCount: mockData.followingCount || 300,
      postCount: mockData.postCount || 100,
      accountAge: mockData.accountAge || 2,
      profilePicture: mockData.profilePicture || "yes",
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
