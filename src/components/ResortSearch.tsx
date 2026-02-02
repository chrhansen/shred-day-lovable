import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <Popover open={open} onOpenChange={setOpen}>
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
          
          {!isLoading && query.length >= 2 && results.length === 0 && (
            <div className="py-4 text-center text-sm text-muted-foreground">
              No resorts found
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
      </PopoverContent>
    </Popover>
  );
}
