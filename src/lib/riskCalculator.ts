
import { ProfileData } from "@/components/ProfileAnalyzerForm";

// Calculate an overall risk score based on the profile data
export const calculateOverallRisk = (profile: ProfileData): number => {
  // Initialize weights for different factors
  const weights = {
    username: 0.15,
    profileCompleteness: 0.20,
    followerRatio: 0.20,
    activity: 0.25,
    accountAge: 0.20
  };

  // Calculate individual risk factors
  const usernameRisk = calculateUsernameRisk(profile.username, profile.displayName);
  const profileCompletenessRisk = calculateProfileCompletenessRisk(profile);
  const followerRatioRisk = calculateFollowerRatioRisk(profile.followerCount, profile.followingCount);
  const activityRisk = calculateActivityRisk(profile.postCount, profile.accountAge);
  const accountAgeRisk = calculateAgeRisk(profile.accountAge);

  // Calculate weighted average
  const overallRisk = (
    usernameRisk * weights.username +
    profileCompletenessRisk * weights.profileCompleteness +
    followerRatioRisk * weights.followerRatio +
    activityRisk * weights.activity +
    accountAgeRisk * weights.accountAge
  );

  // Return rounded score
  return Math.round(overallRisk);
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
