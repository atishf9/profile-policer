
import { ProfileData } from "./ProfileAnalyzerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, MessageSquare, Users, ExternalLink, Instagram, Facebook, Twitter } from "lucide-react";

const ProfileSummary = ({ profile }: { profile: ProfileData }) => {
  // Generate a consistent avatar fallback based on display name
  const generateAvatarFallback = (name: string) => {
    if (!name) return "?";
    const nameParts = name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Get avatar image source or avatar type
  const getAvatarContent = () => {
    if (profile.profilePicture === "yes") {
      // We're using a placeholder for the demo - in a real implementation, this would be a user-uploaded image
      return {
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`,
        fallback: generateAvatarFallback(profile.displayName),
      };
    } else if (profile.profilePicture === "default") {
      return {
        image: "https://api.dicebear.com/7.x/bottts/svg?seed=default",
        fallback: generateAvatarFallback(profile.displayName),
      };
    } else {
      return {
        image: "",
        fallback: generateAvatarFallback(profile.displayName),
      };
    }
  };

  const getPlatformIcon = () => {
    if (!profile.platform) return null;
    
    switch (profile.platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPlatformName = () => {
    if (!profile.platform) return "Social Media";
    
    switch (profile.platform) {
      case "instagram":
        return "Instagram";
      case "facebook":
        return "Facebook";
      case "twitter":
        return "Twitter";
      default:
        return "Social Media";
    }
  };

  const avatarContent = getAvatarContent();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profile Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="h-24 w-24">
            {avatarContent.image && <AvatarImage src={avatarContent.image} />}
            <AvatarFallback className="text-lg">{avatarContent.fallback}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">{profile.displayName}</h3>
            <div className="flex items-center gap-1 justify-center sm:justify-start">
              {getPlatformIcon()}
              <p className="text-sm text-muted-foreground">
                @{profile.username}
                {profile.profileUrl && (
                  <a 
                    href={profile.profileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center ml-1 text-primary hover:underline"
                  >
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </p>
            </div>
            
            {profile.bio ? (
              <p className="text-sm">{profile.bio}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No bio provided</p>
            )}
            
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-3">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">{profile.followerCount}</span> followers
                </span>
                <span className="text-muted-foreground mx-1">·</span>
                <span className="text-sm">
                  <span className="font-medium">{profile.followingCount}</span> following
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">{profile.postCount}</span> posts
                </span>
              </div>

              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <span className="font-medium">{profile.accountAge}</span> months old
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
