
import React, { useRef, useEffect, useState } from 'react';
import { Video, X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPreviewProps {
  onClose: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please ensure you have granted permission.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="rounded-xl border bg-card p-4 shadow-md animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Camera Preview</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {error ? (
        <div className="bg-red-50 p-4 rounded-md text-center mb-4">
          <p className="text-red-600 mb-2">{error}</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={startCamera}
            className="gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        </div>
      ) : (
        <div className="relative rounded-md overflow-hidden bg-muted aspect-video mb-4">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover"
          />
          
          {!cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <p className="mb-2">Starting camera...</p>
                <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="text-center text-sm text-muted-foreground">
        <p>This is how you will appear during your video consultation.</p>
        <p className="mt-1">Make sure you have good lighting and a quiet environment.</p>
      </div>
    </div>
  );
};

export default VideoPreview;
