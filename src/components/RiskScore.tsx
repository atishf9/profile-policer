
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type RiskScoreProps = {
  score: number;
  className?: string;
};

const RiskScore = ({ score, className }: RiskScoreProps) => {
  const [showScore, setShowScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScore(score);
    }, 500);

    return () => clearTimeout(timer);
  }, [score]);

  // Get color based on score
  const getScoreColor = () => {
    if (score < 30) return "text-detection-safe";
    if (score < 70) return "text-detection-warning";
    return "text-detection-danger";
  };

  // Get icon based on score
  const ScoreIcon = () => {
    if (score < 30) return <Shield className="w-6 h-6 text-detection-safe" />;
    if (score < 70) return <AlertTriangle className="w-6 h-6 text-detection-warning" />;
    return <AlertCircle className="w-6 h-6 text-detection-danger" />;
  };

  // Get text description based on score
  const getScoreDescription = () => {
    if (score < 30) return "Likely Authentic";
    if (score < 70) return "Potentially Suspicious";
    return "High Risk - Likely Fake";
  };

  return (
    <div className={cn("p-6 rounded-lg border bg-card", className)}>
      <div className="flex items-center gap-2 mb-2">
        <ScoreIcon />
        <h3 className="text-lg font-medium">Risk Score</h3>
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="text-3xl font-bold">
          <span className={getScoreColor()}>{showScore}%</span>
        </div>
        <div className="text-sm font-medium">
          <span className={getScoreColor()}>{getScoreDescription()}</span>
        </div>
      </div>

      <div className="relative w-full h-3 overflow-hidden rounded-full">
        <div className="absolute inset-0 risk-meter-gradient"></div>
        <Progress 
          value={showScore} 
          className="h-3 bg-transparent" 
          // Remove the indicatorClassName prop since it's not supported
        />
      </div>

      <div className="flex justify-between mt-1">
        <span className="text-xs text-detection-safe">Safe</span>
        <span className="text-xs text-detection-warning">Suspicious</span>
        <span className="text-xs text-detection-danger">Fake</span>
      </div>
    </div>
  );
};

export default RiskScore;
