import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExternalLink, Instagram, Facebook, Twitter } from "lucide-react";

// Define the form schema
const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  displayName: z.string().min(1, "Display name is required"),
  bio: z.string().optional(),
  followerCount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: "Must be a non-negative number" }
  ),
  followingCount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: "Must be a non-negative number" }
  ),
  postCount: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: "Must be a non-negative number" }
  ),
  accountAge: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) >= 0,
    { message: "Must be a non-negative number" }
  ),
  profilePicture: z.enum(["yes", "no", "default"]),
  platform: z.enum(["instagram", "facebook", "twitter"]),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export type ProfileData = {
  username: string;
  displayName: string;
  bio: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  accountAge: number;
  profilePicture: "yes" | "no" | "default";
  timestamp: number;
  id: string;
  platform: "instagram" | "facebook" | "twitter";
  profileUrl: string;
};

const getPlatformBaseUrl = (platform: string): string => {
  switch (platform) {
    case "instagram":
      return "https://www.instagram.com/";
    case "facebook":
      return "https://www.facebook.com/";
    case "twitter":
      return "https://twitter.com/";
    default:
      return "";
  }
};

const getPlatformIcon = (platform: string) => {
  switch (platform) {
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

const ProfileAnalyzerForm = ({
  onAnalyze,
}: {
  onAnalyze: (data: ProfileData) => void;
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fullProfileUrl, setFullProfileUrl] = useState("");
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
      bio: "",
      followerCount: "0",
      followingCount: "0",
      postCount: "0",
      accountAge: "0",
      profilePicture: "default",
      platform: "instagram",
    },
  });

  // Update the profile URL when username or platform changes
  const username = form.watch("username");
  const platform = form.watch("platform");
  
  useState(() => {
    if (username) {
      const baseUrl = getPlatformBaseUrl(platform);
      setFullProfileUrl(`${baseUrl}${username}`);
    } else {
      setFullProfileUrl("");
    }
  });

  const onSubmit = (data: ProfileFormValues) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      // Make sure all required fields are present for ProfileData
      const profileData: ProfileData = {
        username: data.username,
        displayName: data.displayName,
        bio: data.bio || "", // Ensure bio is never undefined
        followerCount: Number(data.followerCount),
        followingCount: Number(data.followingCount),
        postCount: Number(data.postCount),
        accountAge: Number(data.accountAge),
        profilePicture: data.profilePicture,
        platform: data.platform,
        profileUrl: `${getPlatformBaseUrl(data.platform)}${data.username}`,
        timestamp: Date.now(),
        id: Math.random().toString(36).substring(2, 11),
      };
      
      // Save to local storage for history
      const history = JSON.parse(localStorage.getItem("profileHistory") || "[]");
      localStorage.setItem(
        "profileHistory",
        JSON.stringify([profileData, ...history].slice(0, 20))
      );
      
      onAnalyze(profileData);
      toast.success("Profile analysis complete!");
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Platform</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="instagram" id="instagram" />
                      </FormControl>
                      <FormLabel className="font-normal flex items-center gap-1" htmlFor="instagram">
                        <Instagram className="h-4 w-4" /> Instagram
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="facebook" id="facebook" />
                      </FormControl>
                      <FormLabel className="font-normal flex items-center gap-1" htmlFor="facebook">
                        <Facebook className="h-4 w-4" /> Facebook
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="twitter" id="twitter" />
                      </FormControl>
                      <FormLabel className="font-normal flex items-center gap-1" htmlFor="twitter">
                        <Twitter className="h-4 w-4" /> Twitter
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} />
                  </FormControl>
                  {username && (
                    <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      <a 
                        href={fullProfileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline truncate"
                      >
                        {fullProfileUrl}
                      </a>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Display Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="User's bio or description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="followerCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follower Count</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="followingCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Following Count</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="postCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Count</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountAge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Age (months)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className="flex space-x-4">
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="profile-yes"
                        value="yes"
                        checked={field.value === "yes"}
                        onChange={() => field.onChange("yes")}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="profile-yes" className="text-sm">
                        Custom Picture
                      </label>
                    </div>
                  </FormControl>
                  
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="profile-default"
                        value="default"
                        checked={field.value === "default"}
                        onChange={() => field.onChange("default")}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="profile-default" className="text-sm">
                        Default Avatar
                      </label>
                    </div>
                  </FormControl>
                  
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="profile-no"
                        value="no"
                        checked={field.value === "no"}
                        onChange={() => field.onChange("no")}
                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="profile-no" className="text-sm">
                        No Picture
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileAnalyzerForm;
