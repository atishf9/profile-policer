
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";

type EducationCardProps = {
  title: string;
  description: string;
  signs: string[];
  tips: string[];
};

const EducationCard = ({ title, description, signs, tips }: EducationCardProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{description}</p>
        
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-detection-danger" />
            Warning Signs
          </h4>
          <ul className="space-y-1">
            {signs.map((sign, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-detection-danger mt-1">•</span>
                <span>{sign}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2 text-detection-safe" />
            Safety Tips
          </h4>
          <ul className="space-y-1">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-detection-safe mt-1">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
