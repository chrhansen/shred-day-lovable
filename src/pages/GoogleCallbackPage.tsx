
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function GoogleCallbackPage() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Get the authorization code or error from URL params
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          throw new Error(errorDescription || `OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received from Google');
        }

        console.log('Processing Google OAuth callback with code:', code);

        // Here you would typically exchange the code for tokens
        // For now, we'll simulate the process
        await new Promise(resolve => setTimeout(resolve, 1000));

        // TODO: Replace with actual API call to exchange code for session
        // const response = await fetch('/api/auth/google/callback', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ code })
        // });
        
        // if (!response.ok) {
        //   throw new Error('Failed to authenticate with Google');
        // }

        console.log('Google authentication successful');
        
        // Redirect to dashboard or intended destination
        navigate('/', { replace: true });
        
      } catch (err) {
        console.error('Google OAuth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [searchParams, navigate]);

  const handleRetry = () => {
    navigate('/signin', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          
          {isProcessing ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Signing you in...
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Please wait while we complete your Google sign-in
              </p>
              
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4 mx-auto" />
                <Skeleton className="h-4 w-1/2 mx-auto" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
              </div>
              
              <div className="mt-6 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Sign-in Failed
              </h1>
              
              <Alert className="mb-6">
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleRetry}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Try Again
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/', { replace: true })}
                  className="w-full"
                >
                  Go to Homepage
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
