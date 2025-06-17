import { useState } from "react";
import PANUpload from "@/components/PANUpload";
import OCRProcessing from "@/components/OCRProcessing";
import OCRResults from "@/components/OCRResults";
import OCRError from "@/components/OCRError";
import { toast } from "@/hooks/use-toast";

type AppState = 'upload' | 'processing' | 'results' | 'error';

interface PANData {
  panNumber: string;
  name: string;
  fatherName: string;
  dateOfBirth: string;
  confidence: number;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [panData, setPanData] = useState<PANData | null>(null);
  const [errorType, setErrorType] = useState<'upload' | 'processing' | 'network' | 'format'>('processing');

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setCurrentState('processing');
    
    // Simulate OCR processing
    setTimeout(() => {
      // Simulate different outcomes based on file name or random
      const random = Math.random();
      
      if (random < 0.1) {
        // 10% chance of failure
        setErrorType('processing');
        setCurrentState('error');
      } else {
        // 90% chance of success with varying confidence
        const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
        
        const mockData: PANData = {
          panNumber: 'ABCDE1234F',
          name: 'JOHN MATHEWS',
          fatherName: 'ROBERT MATHEWS',
          dateOfBirth: '15/08/1990',
          confidence: confidence
        };
        
        setPanData(mockData);
        setCurrentState('results');
      }
    }, 3000);
  };

  const handleConfirmData = (data: PANData) => {
    toast({
      title: "PAN Card Verified",
      description: "Your PAN card information has been successfully verified.",
    });
    
    // Here you would typically send data to your backend
    console.log('Confirmed PAN Data:', data);
  };

  const handleRetry = () => {
    setCurrentState('upload');
    setUploadedFile(null);
    setPanData(null);
  };

  const handleUploadNew = () => {
    setCurrentState('upload');
    setUploadedFile(null);
    setPanData(null);
  };

  const renderCurrentState = () => {
    switch (currentState) {
      case 'upload':
        return <PANUpload onUpload={handleFileUpload} />;
      
      case 'processing':
        return <OCRProcessing fileName={uploadedFile?.name || 'Unknown'} />;
      
      case 'results':
        return panData ? (
          <OCRResults
            panData={panData}
            onConfirm={handleConfirmData}
            onRetry={handleUploadNew}
          />
        ) : null;
      
      case 'error':
        return (
          <OCRError
            errorType={errorType}
            onRetry={handleRetry}
            onUploadNew={handleUploadNew}
          />
        );
      
      default:
        return <PANUpload onUpload={handleFileUpload} />;
    }
  };

  return renderCurrentState();
};

export default Index;
