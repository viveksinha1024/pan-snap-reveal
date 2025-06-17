import { Loader2, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";

interface OCRProcessingProps {
  fileName: string;
}

const OCRProcessing = ({ fileName }: OCRProcessingProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            Processing your
          </h1>
          <h2 className="text-2xl font-bold text-foreground">
            PAN Card
          </h2>
          <p className="text-muted-foreground text-sm">
            Please wait while we extract the information from your document
          </p>
        </div>

        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-foreground font-medium">
                  Extracting information...
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  File: {fileName}
                </p>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Analyzing document layout</p>
                <p>• Extracting text content</p>
                <p>• Validating PAN format</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OCRProcessing;