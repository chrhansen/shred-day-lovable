import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SiGooglesheets } from "react-icons/si";

export default function IntegrationsPage() {
  const handleConnect = () => {
    // TODO: Implement Google Sheets OAuth flow
    console.log("Connect to Google Sheets");
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
            <Button onClick={handleConnect}>
              Connect Google Sheets
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
