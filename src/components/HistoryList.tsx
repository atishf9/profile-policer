
import { useState, useEffect } from "react";
import { ProfileData } from "./ProfileAnalyzerForm";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { calculateOverallRisk } from "@/lib/riskCalculator";

const HistoryList = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("profileHistory") || "[]");
    setProfiles(history);
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleView = (profile: ProfileData) => {
    localStorage.setItem("currentProfile", JSON.stringify(profile));
    navigate("/");
  };

  const handleDelete = (id: string) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem("profileHistory", JSON.stringify(updatedProfiles));
  };

  const handleClearAll = () => {
    setProfiles([]);
    localStorage.removeItem("profileHistory");
  };

  // Get color class based on risk score
  const getRiskColorClass = (profile: ProfileData) => {
    const score = calculateOverallRisk(profile);
    if (score < 30) return "bg-green-100 text-green-800";
    if (score < 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analysis History</h2>
        {profiles.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearAll}
            className="text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No analysis history yet</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/")}
            className="mt-4"
          >
            Analyze a Profile
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">
                    @{profile.username}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getRiskColorClass(profile)}`}>
                      {calculateOverallRisk(profile)}% Risk
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(profile.timestamp)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(profile)}
                        title="View analysis"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(profile.id)}
                        title="Delete from history"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
