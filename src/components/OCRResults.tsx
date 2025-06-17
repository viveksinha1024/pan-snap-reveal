import { useState } from "react";
import { Check, Edit2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PANData {
  panNumber: string;
  name: string;
  fatherName: string;
  dateOfBirth: string;
  confidence: number;
}

interface OCRResultsProps {
  panData: PANData;
  onConfirm: (data: PANData) => void;
  onRetry: () => void;
}

const OCRResults = ({ panData, onConfirm, onRetry }: OCRResultsProps) => {
  const [editedData, setEditedData] = useState(panData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: keyof PANData, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    onConfirm(editedData);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 90) return "High";
    if (confidence >= 70) return "Medium";
    return "Low";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Verify your
          </h1>
          <h2 className="text-2xl font-bold text-foreground">
            PAN Card Details
          </h2>
          <p className="text-muted-foreground text-sm">
            Please review and confirm the extracted information
          </p>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-foreground">
                Information Extracted
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-muted-foreground">Confidence:</span>
              <span className={`text-xs font-medium ${getConfidenceColor(panData.confidence)}`}>
                {getConfidenceText(panData.confidence)} ({panData.confidence}%)
              </span>
            </div>
          </div>

          {panData.confidence < 70 && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Low confidence detected</p>
                <p className="text-yellow-700">Please review the information carefully</p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="panNumber" className="text-sm font-medium text-foreground">
                PAN Number
              </Label>
              {isEditing ? (
                <Input
                  id="panNumber"
                  value={editedData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value)}
                  className="mt-1"
                  placeholder="Enter PAN Number"
                />
              ) : (
                <div className="mt-1 p-3 bg-secondary rounded-md">
                  <span className="font-mono text-foreground">{editedData.panNumber}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editedData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="mt-1"
                  placeholder="Enter Name"
                />
              ) : (
                <div className="mt-1 p-3 bg-secondary rounded-md">
                  <span className="text-foreground">{editedData.name}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="fatherName" className="text-sm font-medium text-foreground">
                Father's Name
              </Label>
              {isEditing ? (
                <Input
                  id="fatherName"
                  value={editedData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="mt-1"
                  placeholder="Enter Father's Name"
                />
              ) : (
                <div className="mt-1 p-3 bg-secondary rounded-md">
                  <span className="text-foreground">{editedData.fatherName}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
                Date of Birth
              </Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  value={editedData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="mt-1"
                  placeholder="DD/MM/YYYY"
                />
              ) : (
                <div className="mt-1 p-3 bg-secondary rounded-md">
                  <span className="text-foreground">{editedData.dateOfBirth}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Continue
          </Button>
          
          <Button
            onClick={onRetry}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Upload Another Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OCRResults;