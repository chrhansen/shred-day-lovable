import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGooglesheets } from "react-icons/si";
import { ExternalLink } from "lucide-react";

export default function IntegrationsPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");

  const handleConnect = () => {
    // TODO: Implement Google Sheets OAuth flow
    console.log("Connect to Google Sheets");
    // Temporary mock connection
    setIsConnected(true);
    setSheetUrl("https://docs.google.com/spreadsheets/d/example");
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSheetUrl("");
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your ski tracking app with external services
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                <SiGooglesheets className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Google Sheets</CardTitle>
                <CardDescription>
                  Automatically sync your ski days to a Google Sheet
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Keep your ski data synced with Google Sheets in real-time. 
              Perfect for custom analysis and sharing with friends.
            </p>
            
            {!isConnected ? (
              <Button onClick={handleConnect}>
                Connect Google Sheets
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 rounded-md bg-muted/50">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Connected</p>
                    <p className="text-xs text-muted-foreground">Ski days are syncing automatically</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(sheetUrl, "_blank")}
                    className="gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Google Sheet
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
