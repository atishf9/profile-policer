
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
};

const ProfileAnalyzerForm = ({
  onAnalyze,
}: {
  onAnalyze: (data: ProfileData) => void;
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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
    },
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
