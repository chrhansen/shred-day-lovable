import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Loader2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina", "Brazil", "Bulgaria",
  "Canada", "Chile", "China", "Colombia", "Croatia", "Czech Republic",
  "Denmark",
  "Ecuador", "Estonia",
  "Finland", "France",
  "Georgia", "Germany", "Greece", "Greenland",
  "Hungary",
  "Iceland", "India", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Japan",
  "Kazakhstan", "Kosovo", "Kyrgyzstan",
  "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg",
  "Mexico", "Moldova", "Mongolia", "Montenegro", "Morocco",
  "Nepal", "Netherlands", "New Zealand", "North Macedonia", "Norway",
  "Pakistan", "Peru", "Poland", "Portugal",
  "Romania", "Russia",
  "Serbia", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland",
  "Tajikistan", "Turkey", "Turkmenistan",
  "Ukraine", "United Kingdom", "United States", "Uzbekistan",
  "Venezuela"
];

interface Resort {
  name: string;
  location: string;
}

interface ResortSearchProps {
  onSelect: (resort: string) => void;
}

// Mock search function - replace with actual API call
const searchResorts = async (query: string): Promise<Resort[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - in production this would come from your backend
  const mockResorts: Resort[] = [
    { name: "Rossberg", location: "Bern, Switzerland" },
    { name: "Kadernberg-Schoenberg", location: "Freyung-Grafenau, Germany" },
    { name: "Storlappberget", location: "Norrbotten, Sweden" },
    { name: "Steinberg am Rofan", location: "Schwaz, Austria" },
    { name: "Hillberg", location: "Alaska, USA" },
    { name: "Gerichtsberg", location: "Erzgebirgskreis, Germany" },
    { name: "Kegelberg", location: "Vogtlandkreis, Germany" },
    { name: "Bergfex Resort", location: "Tyrol, Austria" },
    { name: "Alpenberg", location: "Bavaria, Germany" },
  ];
  
  if (query.length < 2) return [];
  
  return mockResorts.filter(resort => 
    resort.name.toLowerCase().includes(query.toLowerCase()) ||
    resort.location.toLowerCase().includes(query.toLowerCase())
  );
};

export function ResortSearch({ onSelect }: ResortSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Resort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // Add resort form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResortName, setNewResortName] = useState("");
  const [newResortCountry, setNewResortCountry] = useState("");

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchResorts(query);
        setResults(data);
        setSelectedIndex(-1);
      } finally {
        setIsLoading(false);
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (resort: Resort) => {
    onSelect(resort.name);
    setOpen(false);
    setQuery("");
    setResults([]);
    setShowAddForm(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  const handleStartAddResort = () => {
    setNewResortName(query); // Pre-fill with search query
    setNewResortCountry("");
    setShowAddForm(true);
  };

  const handleBackToSearch = () => {
    setShowAddForm(false);
  };

  const handleAddNewResort = () => {
    if (!newResortName.trim() || !newResortCountry.trim()) {
      return;
    }
    
    // In production, this would call your backend API to create the resort
    // For now, we just select it and let the backend verify
    onSelect(newResortName.trim());
    setOpen(false);
    setQuery("");
    setResults([]);
    setShowAddForm(false);
    setNewResortName("");
    setNewResortCountry("");
  };

  const showNoResults = !isLoading && query.length >= 2 && results.length === 0;

  return (
    <Popover open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setShowAddForm(false);
        setQuery("");
        setResults([]);
      }
    }}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 h-auto border-dashed border-muted-foreground/50 text-muted-foreground hover:text-foreground hover:border-foreground"
        >
          <Plus className="h-4 w-4 mr-1" />
          Find resort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-background border shadow-lg" align="start">
        {!showAddForm ? (
          <>
            <div className="flex items-center border-b px-3">
              <Input
                placeholder="Search resorts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
                autoFocus
              />
              {query && (
                <button
                  onClick={clearSearch}
                  className="p-1 hover:bg-muted rounded"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            
            <div className="max-h-64 overflow-y-auto">
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
              
              {showNoResults && (
                <div className="py-3 px-3">
                  <p className="text-sm text-muted-foreground text-center mb-3">
                    No resorts found
                  </p>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={handleStartAddResort}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add "{query}" as new resort
                  </Button>
                </div>
              )}
              
              {!isLoading && query.length > 0 && query.length < 2 && (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  Type at least 2 characters
                </div>
              )}
              
              {!isLoading && results.length > 0 && (
                <ul className="py-1">
                  {results.map((resort, index) => (
                    <li
                      key={`${resort.name}-${resort.location}`}
                      className={cn(
                        "px-3 py-2 cursor-pointer hover:bg-accent",
                        selectedIndex === index && "bg-accent"
                      )}
                      onClick={() => handleSelect(resort)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <span className="font-medium text-foreground">{resort.name}</span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        ({resort.location})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        ) : (
          <div className="p-3 space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleBackToSearch}
                className="p-1 hover:bg-muted rounded"
              >
                <ChevronLeft className="h-4 w-4 text-muted-foreground" />
              </button>
              <span className="font-medium text-sm">Add new resort</span>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Resort name"
                value={newResortName}
                onChange={(e) => setNewResortName(e.target.value)}
                autoFocus
              />
              <Select value={newResortCountry} onValueChange={setNewResortCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button
              onClick={handleAddNewResort}
              disabled={!newResortName.trim() || !newResortCountry.trim()}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add resort
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
