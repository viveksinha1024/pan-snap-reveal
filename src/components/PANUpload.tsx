import { useState } from "react";
import { Camera, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface PANUploadProps {
  onUpload: (file: File) => void;
}

const PANUpload = ({ onUpload }: PANUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      validateAndUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      validateAndUpload(files[0]);
    }
  };

  const validateAndUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPEG, PNG, or GIF image.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    onUpload(file);
  };

  const handleCameraCapture = () => {
    // In a real app, this would open camera interface
    toast({
      title: "Camera Feature",
      description: "Camera functionality would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Verify your
          </h1>
          <h2 className="text-2xl font-bold text-foreground">
            PAN Card Details
          </h2>
          <p className="text-muted-foreground text-sm">
            Upload a clear image of your PAN card for verification
          </p>
        </div>

        <Card 
          className={`p-8 border-2 border-dashed transition-colors ${
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            
            <div>
              <p className="text-foreground font-medium mb-1">
                Drop your PAN card image here
              </p>
              <p className="text-muted-foreground text-sm">
                or click to upload
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            
            <div className="space-y-3">
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              
              <Button
                onClick={handleCameraCapture}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Supported formats: JPEG, PNG, GIF</p>
              <p>Maximum file size: 5MB</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PANUpload;