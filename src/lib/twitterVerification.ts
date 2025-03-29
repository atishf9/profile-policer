
import { ProfileData } from "@/components/ProfileAnalyzerForm";

// Twitter API Bearer Token - Note: In a production app, this should be stored securely
const TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAPT00AEAAAAAybZHgRAAi4uZfcGI%2FedzH6cfKWc%3DetrmhHKeOYChcYKdnZhoHoccsnPKp8oPNN3h40P8MQrX4gKLyQ";

// Interface for Twitter API response
interface TwitterUserData {
  id: string;
  name: string;
  username: string;
  verified: boolean;
  created_at: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  description: string;
  profile_image_url: string;
}

/**
 * Verify a Twitter profile using the Twitter API
 * @param username The Twitter username to verify
 * @returns Promise with verification result
 */
export const verifyTwitterProfile = async (username: string): Promise<{
  success: boolean;
  data?: TwitterUserData;
  profileData?: ProfileData;
  error?: string;
}> => {
  try {
    // Twitter API V2 endpoint for user lookup by username
    const endpoint = `https://api.twitter.com/2/users/by/username/${username}?user.fields=created_at,description,profile_image_url,public_metrics,verified`;
    
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.data) {
      return { success: false, error: "User not found" };
    }

    const twitterData: TwitterUserData = result.data;
    
    // Calculate account age in months
    const createdAt = new Date(twitterData.created_at);
    const now = new Date();
    const ageMonths = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30));
    
    // Convert Twitter API data to ProfileData format
    const profileData: ProfileData = {
      username: twitterData.username,
      displayName: twitterData.name,
      bio: twitterData.description || "",
      followerCount: twitterData.public_metrics.followers_count,
      followingCount: twitterData.public_metrics.following_count,
      postCount: twitterData.public_metrics.tweet_count,
      accountAge: ageMonths,
      profilePicture: twitterData.profile_image_url ? "yes" : "default",
      platform: "twitter",
      profileUrl: `https://twitter.com/${twitterData.username}`,
      timestamp: Date.now(),
      id: twitterData.id,
    };
    
    return {
      success: true,
      data: twitterData,
      profileData
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
 * Check if an image is used elsewhere using reverse image search
 * Note: This is a simplified implementation as direct Google reverse image search is
 * not possible client-side due to CORS. A complete solution would require a backend.
 * 
 * @param imageUrl URL of the image to check
 * @returns A URL to open Google reverse image search
 */
export const getGoogleReverseImageSearchUrl = (imageUrl: string): string => {
  return `https://www.google.com/searchbyimage?image_url=${encodeURIComponent(imageUrl)}`;
};
