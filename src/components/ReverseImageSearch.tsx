
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGoogleReverseImageSearchUrl } from "@/lib/twitterVerification";
import { Search, ExternalLink } from "lucide-react";

const ReverseImageSearch = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [searchUrl, setSearchUrl] = useState("");

  const handleSearch = () => {
    if (imageUrl) {
      const url = getGoogleReverseImageSearchUrl(imageUrl);
      setSearchUrl(url);
      window.open(url, "_blank");
    }
  };

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
            disabled={!imageUrl}
          >
            Search
          </Button>
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
