
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { TextDraftDayList } from "@/components/TextDraftDayList";
import { type TextDraftDay } from "@/types/ski";
import { toast } from "sonner";

export default function TextImportPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [draftDays, setDraftDays] = useState<TextDraftDay[]>([]);
  const [showDrafts, setShowDrafts] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setInputText("");
    }
  };

  const handleTextChange = (value: string) => {
    setInputText(value);
    if (selectedFile) {
      setSelectedFile(null);
    }
  };

  const handleParse = async () => {
    if (!inputText.trim() && !selectedFile) {
      toast.error("Please enter text or select a file");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call to parse text/file
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock draft days response
      const mockDrafts: TextDraftDay[] = [
        {
          id: "1",
          date: new Date("2025-01-15"),
          resort: "Whistler Blackcomb",
          originalText: "Jan 15, 2025 - Skied at Whistler, powder day!",
          action: "duplicate",
          status: "pending"
        },
        {
          id: "2", 
          date: new Date("2025-02-01"),
          resort: "Revelstoke",
          originalText: "2025-02-01: Revelstoke backcountry adventure",
          action: "duplicate",
          status: "pending"
        }
      ];
      
      setDraftDays(mockDrafts);
      setShowDrafts(true);
      toast.success(`Found ${mockDrafts.length} potential ski days`);
      
    } catch (error) {
      toast.error("Failed to parse text/file");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDraftEdit = (id: string, updatedDay: Partial<TextDraftDay>) => {
    setDraftDays(prev => 
      prev.map(day => 
        day.id === id ? { ...day, ...updatedDay } : day
      )
    );
  };

  const handleCommit = async () => {
    const daysToProcess = draftDays.filter(day => day.action !== "skip");
    
    if (daysToProcess.length === 0) {
      toast.error("No days selected for import");
      return;
    }

    try {
      // Simulate API call to commit draft days
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(`Successfully imported ${daysToProcess.length} ski days`);
      navigate("/days");
      
    } catch (error) {
      toast.error("Failed to commit ski days");
    }
  };

  const handleReset = () => {
    setInputText("");
    setSelectedFile(null);
    setDraftDays([]);
    setShowDrafts(false);
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-slate-800"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <h1 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          Import Ski Days from Text/CSV
        </h1>

        {!showDrafts ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-medium text-slate-800 mb-4">
                Enter Text or Upload File
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Paste your ski day text
                  </label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Paste your ski day entries here...&#10;Example:&#10;Jan 15, 2025 - Skied at Whistler&#10;2025-02-01: Revelstoke powder day"
                    className="min-h-[120px]"
                    disabled={!!selectedFile}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="text-sm text-slate-500">OR</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Upload CSV/text file
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept=".csv,.txt,.text"
                      onChange={handleFileSelect}
                      disabled={!!inputText.trim()}
                      className="flex-1"
                    />
                    {selectedFile && (
                      <div className="flex items-center text-sm text-slate-600">
                        <FileText className="h-4 w-4 mr-1" />
                        {selectedFile.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleParse}
                disabled={isProcessing || (!inputText.trim() && !selectedFile)}
                className="w-full mt-6"
              >
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Parse and Create Draft Days
                  </>
                )}
              </Button>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-medium text-slate-800 mb-2">How it works:</h3>
              <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                <li>Enter text or upload a CSV/text file containing your ski day entries</li>
                <li>Our system will parse the text and extract dates and resort names</li>
                <li>Review and edit the detected ski days</li>
                <li>Choose to merge with existing days, create duplicates, or skip entries</li>
                <li>Commit your changes to add the days to your ski log</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-slate-800">
                Review Draft Days ({draftDays.length} found)
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleReset}>
                  Start Over
                </Button>
                <Button 
                  onClick={handleCommit}
                  disabled={draftDays.filter(d => d.action !== "skip").length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Commit {draftDays.filter(d => d.action !== "skip").length} Days
                </Button>
              </div>
            </div>

            <TextDraftDayList
              draftDays={draftDays}
              onDraftEdit={handleDraftEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
}
