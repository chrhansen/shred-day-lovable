import { useState } from "react";
import { Copy, Check, Link, Link2Off } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { type SkiDay } from "@/types/ski";

interface ShareDayDialogProps {
  day: SkiDay;
  isOpen: boolean;
  onClose: () => void;
  onToggleShare: (enabled: boolean) => void;
}

export function ShareDayDialog({ day, isOpen, onClose, onToggleShare }: ShareDayDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const isShared = !!day.shared_at;
  const shareUrl = `shred.day/s/${day.id}`;
  const fullShareUrl = `https://${shareUrl}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullShareUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Share link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const handleToggleShare = (enabled: boolean) => {
    onToggleShare(enabled);
    if (enabled) {
      toast({
        title: "Sharing enabled",
        description: "Anyone with the link can now view this day",
      });
    } else {
      toast({
        title: "Sharing disabled",
        description: "This day is now private",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5 shrink-0" />
            <span className="truncate">
              Share {day.resort}, {format(new Date(day.date), "MMM d, yyyy")}
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Share Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="share-toggle" className="text-base font-medium">
                Public link
              </Label>
              <p className="text-sm text-muted-foreground">
                {isShared 
                  ? "Anyone with the link can view this day" 
                  : "Enable to create a shareable link"}
              </p>
            </div>
            <Switch
              id="share-toggle"
              checked={isShared}
              onCheckedChange={handleToggleShare}
            />
          </div>

          {/* Share Link Section */}
          {isShared && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border">
                <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm truncate font-mono">{shareUrl}</span>
              </div>
              
              <Button 
                onClick={handleCopy} 
                className="w-full"
                variant="default"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Disabled State Message */}
          {!isShared && (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                <Link2Off className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Turn on the toggle above to create a shareable link
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
