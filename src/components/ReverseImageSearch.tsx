
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGoogleReverseImageSearchUrl } from "@/lib/twitterVerification";
import { Search, ExternalLink, Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";

const ReverseImageSearch = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!imageUrl) {
      toast.error("Please enter an image URL");
      return;
    }

    try {
      setIsSearching(true);
      
      // Create a new HTML Image element to check if the URL is valid
      const img = document.createElement('img');
      img.onload = () => {
        // Image loaded successfully
        const url = getGoogleReverseImageSearchUrl(imageUrl);
        setSearchUrl(url);
        // Open in new tab
        window.open(url, "_blank");
        setIsSearching(false);
        toast.success("Search opened in a new tab");
      };
      img.onerror = () => {
        // Image failed to load
        setIsSearching(false);
        toast.error("Invalid image URL. Please check and try again.");
      };
      img.src = imageUrl;
    } catch (error) {
      setIsSearching(false);
      toast.error("Failed to open search");
      console.error("Reverse image search error:", error);
    }
  };

  // Example image URLs that work for demonstration
  const exampleUrls = [
    "https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg", // Example Twitter profile pic
    "https://avatars.githubusercontent.com/u/6571379?v=4" // Example GitHub avatar
  ];

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Reverse Image Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Check if a profile picture appears elsewhere online by using reverse image search.
        </p>
        
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={!imageUrl || isSearching}
          >
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground mt-2">
          <div className="flex items-center gap-1 mb-2">
            <ImageIcon className="h-4 w-4" />
            <span>Example URLs (click to use):</span>
          </div>
          <div className="space-y-2">
            {exampleUrls.map((url, index) => (
              <div 
                key={index}
                className="bg-muted p-2 rounded text-xs overflow-hidden cursor-pointer hover:bg-muted/80"
                onClick={() => setImageUrl(url)}
              >
                <code>{url}</code>
              </div>
            ))}
          </div>
        </div>
        
        {searchUrl && (
          <div className="pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <a 
                href={searchUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline truncate"
              >
                Open Google Reverse Image Search
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReverseImageSearch;
