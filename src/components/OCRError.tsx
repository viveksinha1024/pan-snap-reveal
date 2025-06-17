import { AlertCircle, RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface OCRErrorProps {
  errorType: 'upload' | 'processing' | 'network' | 'format';
  errorMessage?: string;
  onRetry: () => void;
  onUploadNew: () => void;
}

const OCRError = ({ errorType, errorMessage, onRetry, onUploadNew }: OCRErrorProps) => {
  const getErrorContent = () => {
    switch (errorType) {
      case 'upload':
        return {
          title: 'Upload Failed',
          description: 'There was an issue uploading your file. Please try again.',
          icon: <Upload className="w-8 h-8 text-red-500" />,
        };
      case 'processing':
        return {
          title: 'Processing Failed',
          description: 'We could not extract information from your PAN card. Please ensure the image is clear and try again.',
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
        };
      case 'network':
        return {
          title: 'Network Error',
          description: 'Please check your internet connection and try again.',
          icon: <RefreshCw className="w-8 h-8 text-red-500" />,
        };
      case 'format':
        return {
          title: 'Invalid Format',
          description: 'The uploaded file is not a valid image format or the PAN card could not be detected.',
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
        };
      default:
        return {
          title: 'Something went wrong',
          description: 'An unexpected error occurred. Please try again.',
          icon: <AlertCircle className="w-8 h-8 text-red-500" />,
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-foreground">
            PAN Card
          </h1>
          <h2 className="text-2xl font-bold text-foreground">
            Verification Failed
          </h2>
        </div>

        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              {errorContent.icon}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                {errorContent.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {errorContent.description}
              </p>
              {errorMessage && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="text-xs text-muted-foreground space-y-1">
                <h4 className="font-medium text-foreground">Tips for better results:</h4>
                <ul className="text-left space-y-1">
                  <li>• Ensure good lighting when taking the photo</li>
                  <li>• Keep the PAN card flat and avoid shadows</li>
                  <li>• Make sure all text is clearly visible</li>
                  <li>• Use a high-quality camera or scanner</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Button
            onClick={onRetry}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button
            onClick={onUploadNew}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload New Image
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OCRError;